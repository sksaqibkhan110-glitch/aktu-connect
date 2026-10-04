let currentUser = null;
let currentSelectedSubject = null;

(async () => {
    currentUser = await requireAuth();
    if (!currentUser) return;

    const subjects = window.AKTU_SUBJECTS || [];
    if (subjects.length > 0) {
        renderSubjectCards();
        selectSubject(subjects[0].id);
    }
})();

function renderSubjectCards() {
    const subjects = window.AKTU_SUBJECTS || [];
    const grid = document.getElementById("subjectGrid");
    if (!grid) return;

    grid.innerHTML = subjects.map(sub => `
        <div class="subject-card ${currentSelectedSubject === sub.id ? 'active' : ''}" onclick="selectSubject('${sub.id}')">
            <h3 style="margin-bottom: 0.3rem;">${sub.icon} ${sub.shortName}</h3>
            <p style="margin: 0; font-size: 0.85rem; color: #f59e0b; font-weight: 700;">${sub.code}</p>
            <p style="margin-top: 0.4rem; font-size: 0.9rem; color: #94a3b8;">${sub.name}</p>
        </div>
    `).join('');
}

function selectSubject(subjectId) {
    currentSelectedSubject = subjectId;
    renderSubjectCards();

    const subjects = window.AKTU_SUBJECTS || [];
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    document.getElementById("currentSubjectTitle").innerHTML = `${subject.icon} ${subject.name} (${subject.code})`;
    
    const list = document.getElementById("lectureList");
    list.innerHTML = subject.lectures.map(lec => `
        <div class="lecture-item">
            <div>
                <strong style="color: #f8fafc; font-size: 1.05rem;">${lec.unit}: ${lec.title}</strong>
                <span style="display:block; font-size:0.85rem; color:#94a3b8; margin-top:0.25rem;">⏳ Approx Duration: ${lec.duration}</span>
            </div>
            <div class="lecture-actions">
                <a href="${lec.url}" target="_blank" class="btn-watch">▶️ Watch One-Shot</a>
                <button class="btn-quest" onclick="addUnitQuest('${subject.shortName}', '${lec.unit}', '${lec.title}')">➕ Add to Quests</button>
            </div>
        </div>
    `).join('');
}

async function addUnitQuest(subName, unit, title) {
    const questTitle = `${subName} - ${unit}`;
    const taskTitle = `Complete: ${title}`;
    
    const { data: existingQuests } = await supabaseClient
        .from('quests')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('title', questTitle);

    if (existingQuests && existingQuests.length > 0) {
        alert("This unit is already added in your Quest Log!");
        return;
    }

    const newQuest = {
        user_id: currentUser.id,
        title: questTitle,
        icon: "📚",
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tasks: [
            { title: taskTitle, xp: 50, completed: false }
        ]
    };

    const { error } = await supabaseClient.from('quests').insert([newQuest]);

    if (!error) {
        alert(`🎯 "${questTitle}" (+50 XP) added to your Quest Log!`);
    } else {
        alert("Error adding quest: " + error.message);
    }
}