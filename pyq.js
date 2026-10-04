let selectedFiles = [];
let analysedQuestions = [];
let totalPapersUploaded = 1;
let activeUnit = "all";
let activeMarks = "all";

function openUploadModal() {
  document.getElementById("uploadModal").classList.remove("hidden");
}

function closeUploadModal() {
  document.getElementById("uploadModal").classList.add("hidden");
  document.getElementById("ocrProgressBox").classList.add("hidden");
}

function handleFileSelection(input) {
  selectedFiles = Array.from(input.files);
  const preview = document.getElementById("fileListPreview");
  if (selectedFiles.length > 0) {
    totalPapersUploaded = selectedFiles.length;
    preview.innerHTML = selectedFiles.map(f => `📄 ${f.name} (${(f.size/1024).toFixed(0)} KB)`).join("<br>");
  } else {
    preview.innerHTML = "";
  }
}

// 1. PDF Text Extractor
async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(" ") + "\n";
  }
  return fullText;
}

// 2. Image OCR Extractor (Tesseract.js)
async function extractTextFromImage(file, updateProgress) {
  const result = await Tesseract.recognize(
    file,
    'eng',
    {
      logger: m => {
        if (m.status === 'recognizing text' && updateProgress) {
          updateProgress(Math.round(m.progress * 100));
        }
      }
    }
  );
  return result.data.text;
}

// 3. Similarity Matcher (Jaccard)
const stopWords = new Set(["what", "is", "explain", "describe", "discuss", "define", "the", "and", "or", "in", "of", "with", "a", "an", "for", "to", "state", "neat", "diagram", "suitable", "example", "examples", "write", "short", "note"]);

function getKeywords(text) {
  return new Set(
    text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w))
  );
}

function getSimilarity(a, b) {
  const wordsA = getKeywords(a);
  const wordsB = getKeywords(b);
  if (wordsA.size === 0 || wordsB.size === 0) return 0;
  const common = new Set([...wordsA].filter(x => wordsB.has(x)));
  const total = new Set([...wordsA, ...wordsB]);
  return common.size / total.size;
}

// 4. Main Run Pipeline
async function runFileAnalyser() {
  if (selectedFiles.length === 0) {
    alert("Please select at least one PDF or Image file!");
    return;
  }

  const progressBox = document.getElementById("ocrProgressBox");
  const progressBar = document.getElementById("ocrProgressBar");
  const progressText = document.getElementById("ocrStatusText");
  const percentLabel = document.getElementById("ocrPercent");
  const runBtn = document.getElementById("runAnalyserBtn");

  progressBox.classList.remove("hidden");
  runBtn.disabled = true;
  runBtn.classList.add("opacity-50");

  let aggregatedText = "";

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    progressText.innerText = `Processing ${i + 1}/${selectedFiles.length}: ${file.name}`;
    
    if (file.type === "application/pdf") {
      const pdfText = await extractTextFromPDF(file);
      aggregatedText += "\n" + pdfText;
    } else {
      const imgText = await extractTextFromImage(file, (p) => {
        progressBar.style.width = `${p}%`;
        percentLabel.innerText = `${p}%`;
      });
      aggregatedText += "\n" + imgText;
    }
  }

  progressText.innerText = "Clustering repeated questions...";
  parseAndClusterText(aggregatedText);

  runBtn.disabled = false;
  runBtn.classList.remove("opacity-50");
  closeUploadModal();
}

// 5. Line Parser & Grouping
function parseAndClusterText(rawText) {
  const lines = rawText
    .split(/\n+|\. (?=[A-Z0-9])/)
    .map(l => l.trim())
    .filter(l => l.length > 15 && /[a-zA-Z]/.test(l));

  const clusters = [];

  lines.forEach(line => {
    // Marks detection
    let marks = 7;
    if (/\b(2|two)\s*(marks?|m)\b/i.test(line) || /^[0-9]\s*\.\s*[a-e]/i.test(line)) {
      marks = 2;
    }

    // Unit detection
    let unit = 1;
    const unitMatch = line.match(/unit[\s\-_:]*([1-5])/i);
    if (unitMatch) unit = parseInt(unitMatch[1]);

    // Cleanup sentence
    const cleanQ = line
      .replace(/^(Q\d*[\.\:\-\)]*|\d+[\.\:\-\)])\s*/i, "")
      .replace(/\(?\b\d+\s*marks?\)?/gi, "")
      .trim();

    // Match with existing clusters
    let found = null;
    for (let c of clusters) {
      if (c.marks === marks && getSimilarity(c.q, cleanQ) >= 0.38) {
        found = c;
        break;
      }
    }

    if (found) {
      found.frequency += 1;
    } else {
      clusters.push({
        id: Date.now() + Math.random(),
        q: cleanQ,
        unit: unit,
        marks: marks,
        frequency: 1
      });
    }
  });

  // Calculate repetition percentage based on papers uploaded
  const basePapers = Math.max(selectedFiles.length, 1);
  clusters.forEach(c => {
    c.repeatPercent = Math.min(Math.round((c.frequency / basePapers) * 100), 100);
  });

  analysedQuestions = clusters;
  renderAnalysedCards();
}

// Filters
function onUnitChange(val) {
  activeUnit = val;
  renderAnalysedCards();
}

function onMarksChange(marks, btn) {
  activeMarks = marks;
  document.querySelectorAll('.marks-btn').forEach(b => {
    b.classList.remove('bg-indigo-600', 'text-white', 'active');
    b.classList.add('text-zinc-600', 'dark:text-zinc-400');
  });
  btn.classList.add('bg-indigo-600', 'text-white', 'active');
  btn.classList.remove('text-zinc-600', 'dark:text-zinc-400');
  renderAnalysedCards();
}

// Render Results
function renderAnalysedCards() {
  const container = document.getElementById("pyqList");
  const countBadge = document.getElementById("questionCountBadge");
  if (!container) return;

  if (analysedQuestions.length === 0) {
    if (countBadge) countBadge.innerText = "0 Questions";
    container.innerHTML = `
      <div class="p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        <span class="text-3xl">📤</span>
        <h3 class="font-bold text-sm text-zinc-800 dark:text-zinc-200 mt-2">No Papers Analysed Yet</h3>
        <p class="text-xs text-zinc-400 mt-1">Upload 4-5 year question paper PDFs or Photos above to get repeated questions and probabilities.</p>
      </div>`;
    return;
  }

  let filtered = analysedQuestions.filter(item => {
    const matchUnit = (activeUnit === "all" || item.unit == activeUnit);
    const matchMarks = (activeMarks === "all" || item.marks == activeMarks);
    return matchUnit && matchMarks;
  });

  // Sort descending by highest percentage
  filtered.sort((a, b) => b.repeatPercent - a.repeatPercent);

  if (countBadge) countBadge.innerText = `${filtered.length} Unique Questions Found`;

  container.innerHTML = filtered.map(item => {
    const pct = item.repeatPercent;
    const isHigh = pct >= 60 || item.frequency >= 2;

    return `
      <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border ${
        isHigh ? 'border-purple-500/80 shadow-md shadow-purple-500/10' : 'border-zinc-200 dark:border-zinc-800'
      } flex items-center justify-between gap-4">
        
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300">
              ${item.marks} Marks
            </span>
            <span class="text-xs font-bold text-zinc-700 dark:text-zinc-300">Unit ${item.unit}</span>
            <span class="text-[11px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
              Found ${item.frequency} times
            </span>
            ${isHigh ? `
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                🔥 High Probability
              </span>
            ` : ''}
          </div>

          <p class="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
            ${item.q}
          </p>
        </div>

        <!-- Repeat Probability % Badge -->
        <div class="text-center min-w-[90px] pl-4 border-l border-zinc-200 dark:border-zinc-800 shrink-0">
          <div class="text-2xl font-black ${pct >= 60 ? 'text-purple-500' : 'text-emerald-500'}">
            ${pct}%
          </div>
          <span class="text-[10px] uppercase font-bold text-zinc-400 block tracking-tight">Repeat Chance</span>
        </div>

      </div>
    `;
  }).join('');
}