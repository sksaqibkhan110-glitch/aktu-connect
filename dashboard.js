let currentUser = null;
let currentStats = null;

(async () => {
    currentUser = await requireAuth();
    if (!currentUser) return;

    const { data: stats, error } = await getMyStats(currentUser.id);

    if (error || !stats) {
        window.location.href = "goal-setup.html";
        return;
    }

    currentStats = stats;
    renderDashboard();
    loadQuestSummary();
    renderCountdown();
})();

function renderDashboard() {
    const s = currentStats;

    document.getElementById("welcome").textContent =
        `Welcome back, ${s.name} 🎯`;
    document.getElementById("sem").textContent = s.semester;
    document.getElementById("branch").textContent = s.branch;
    document.getElementById("cgpa").textContent = s.target_cgpa;

    document.getElementById("xp").textContent = s.total_xp || 0;
    document.getElementById("level").textContent = s.level || 1;
    document.getElementById("streak").textContent = (s.streak_days || 0) + " Days";

    const progress = calcLevelProgress(s.total_xp || 0);
    document.getElementById("progress-bar").style.width = progress.percent + "%";
    document.getElementById("xpText").textContent =
        `${progress.xpInLevel} / ${progress.xpNeeded} XP to Level ${(s.level || 1) + 1}`;

    // Disable study boost button if already used today
    const today = new Date().toDateString();
    const boostUsed = s.study_boost_date && new Date(s.study_boost_date).toDateString() === today;
    const studyBtn = document.getElementById("studybtn");
    if (boostUsed) {
        studyBtn.disabled = true;
        studyBtn.textContent = "✅ Study Boost Used Today";
    }

    // Disable streak button if already marked today
    const streakDone = s.last_study_date && new Date(s.last_study_date).toDateString() === today;
    const streakBtn = document.getElementById("streakBtn");
    if (streakDone) {
        streakBtn.disabled = true;
        streakBtn.textContent = "✅ Marked Today";
    }
}

async function loadQuestSummary() {
    const { data: quests } = await supabaseClient
        .from("quests")
        .select("*")
        .eq("user_id", currentUser.id);

    const summaryEl = document.getElementById("questSummary");
    if (!quests || quests.length === 0) {
        summaryEl.textContent = "No quests yet — create one in the Quest Log!";
        return;
    }

    let totalTasks = 0, doneTasks = 0;
    quests.forEach(q => {
        totalTasks += q.tasks.length;
        doneTasks += q.tasks.filter(t => t.completed).length;
    });

    summaryEl.textContent = `${quests.length} active quest(s) • ${doneTasks}/${totalTasks} tasks completed`;
}

function renderCountdown() {
    const examDate = new Date("July 15, 2027");
    const today = new Date();
    const diff = examDate - today;
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    document.getElementById("countdown").textContent = daysLeft + " days left for exams 📚";
}

// ================= STUDY BOOST BUTTON =================
document.getElementById("studybtn").addEventListener("click", async function () {
    const today = new Date().toDateString();
    const boostUsed = currentStats.study_boost_date &&
        new Date(currentStats.study_boost_date).toDateString() === today;

    if (boostUsed) {
        alert("⚠️ Aaj ka study boost already used!");
        return;
    }

    const newXp = (currentStats.total_xp || 0) + 10;
    const oldLevel = currentStats.level || 1;
    const newLevel = calcLevel(newXp);

    const { data, error } = await updateMyStats(currentUser.id, {
        total_xp: newXp,
        level: newLevel,
        study_boost_date: new Date().toISOString().slice(0, 10)
    });

    if (error) {
        alert("Error: " + error.message);
        return;
    }

    currentStats = data;

    if (newLevel > oldLevel) {
        alert("🎉 LEVEL UP! You reached Level " + newLevel);
    }

    renderDashboard();
});

// ================= STREAK BUTTON =================
document.getElementById("streakBtn").addEventListener("click", async function () {
    const result = computeStreakUpdate(currentStats);

    if (result.alreadyDone) {
        alert("Aaj ka streak already marked ✅");
        return;
    }

    const { data, error } = await updateMyStats(currentUser.id, {
        streak_days: result.streak,
        last_study_date: new Date().toISOString().slice(0, 10)
    });

    if (error) {
        alert("Error: " + error.message);
        return;
    }

    currentStats = data;
    renderDashboard();
});
