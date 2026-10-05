/* AKTU Connect - mobile helpers.
   Sirf phone/tablet (<1024px) pe chalta hai. Laptop pe turant return.
   Har page me </body> se pehle: <script src="mobile-nav.js"></script> (nav.js ke baad) */
(function () {
  var mq = window.matchMedia('(max-width: 1023px)');
  if (!mq.matches) return; // laptop: kuch nahi karna

  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  /* ---------- 1. Bottom tab bar ---------- */
  var tabs = [
    { href: 'study.html',       ico: '📖', label: 'Study' },
    { href: 'pyq.html',         ico: '📄', label: 'PYQs' },
    { href: 'quest.html',       ico: '🎯', label: 'Arena' },
    { href: 'leaderboard.html', ico: '🏆', label: 'Rank' },
    { href: 'chat.html',        ico: '🤖', label: 'Zen' },
    { href: 'profile.html',     ico: '👤', label: 'Me' }
  ];
  // login page pe nav nahi
  if (page !== 'index.html' && page !== '' && page !== 'goal-setup.html') {
    var nav = document.createElement('nav');
    nav.className = 'm-bottom-nav';
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML = tabs.map(function (t) {
      var active = page === t.href ? ' active' : '';
      return '<a href="' + t.href + '" class="' + active.trim() + '">' +
             '<span class="m-ico">' + t.ico + '</span><span>' + t.label + '</span></a>';
    }).join('');
    document.body.appendChild(nav);
  }

  /* ---------- 2. Zen empty state (chat.html) ---------- */
  var box = document.getElementById('chat-messages');
  if (box && page === 'chat.html') {
    document.body.classList.add('m-zen-page');
    var empty = document.createElement('div');
    empty.className = 'm-zen-empty';
    empty.innerHTML =
      '<h3>Zen se kuch bhi pucho</h3>' +
      '<p>Derivation, code, PYQ ya syllabus doubt</p>' +
      '<div class="m-zen-grid">' +
        '<button type="button" data-q="Explain Normalization in DBMS with 1NF, 2NF, 3NF and BCNF">Normalization 💡</button>' +
        '<button type="button" data-q="Master theorem formula aur uske 3 cases with solved examples">Master Theorem ⚡</button>' +
        '<button type="button" data-q="Important repeated 10-mark questions in AKTU DAA exams">DAA Repeats 📊</button>' +
        '<button type="button" data-q="Explain CPU scheduling FCFS SJF Round Robin with Gantt chart">OS Scheduling ⏱️</button>' +
      '</div>';
    box.insertBefore(empty, box.firstChild);
    empty.addEventListener('click', function (e) {
      var q = e.target && e.target.getAttribute && e.target.getAttribute('data-q');
      if (q && typeof sendQuickPrompt === 'function') sendQuickPrompt(q);
    });
    // pehla message aate hi empty state hata do
    new MutationObserver(function () {
      if (box.children.length > 2 && empty.parentNode) empty.remove();
    }).observe(box, { childList: true });
  }

  /* ---------- 3. PYQ cards: color bar + Ask Zen button ---------- */
  function tagPyq() {
    var nodes = document.querySelectorAll('body *');
    nodes.forEach(function (el) {
      if (el.children.length) return;
      var t = (el.textContent || '').trim();

      var m = /^(\d{1,3})%\s*PROBABLE$/i.exec(t);
      if (m) {
        var p = parseInt(m[1], 10);
        var card = el.closest('div[class*="rounded"], article, li');
        card = card && card.parentElement && card.parentElement.closest('div[class*="rounded"]') ? el.closest('div[class*="rounded"]') : card;
        // sabse paas ka card jisme "Ask Zen" bhi ho
        var c = el;
        while (c && c !== document.body && !/Ask Zen/i.test(c.textContent || '')) c = c.parentElement;
        if (c && c !== document.body) {
          c.classList.add('m-pyq-card');
          c.setAttribute('data-prob', p >= 90 ? 'high' : p >= 80 ? 'mid' : 'low');
        }
      }
      if (/Ask Zen to Explain/i.test(t)) {
        var btn = el.closest('a, button') || el;
        btn.classList.add('m-ask-zen');
      }
    });
  }
  if (page === 'pyq.html') {
    tagPyq();
    // results "Run Analyser" dabane ke baad render hote hain
    new MutationObserver(function () { tagPyq(); })
      .observe(document.body, { childList: true, subtree: true });
  }
})();
