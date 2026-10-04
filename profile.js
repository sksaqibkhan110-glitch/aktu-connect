let currentUser = null;
let currentStats = null;

(async () => {
    currentUser = await requireAuth();
    if (!currentUser) return;

    const { data: stats } = await getMyStats(currentUser.id);
    if (!stats) { window.location.href = "goal-setup.html"; return; }

    currentStats = stats;
    render();
})();

function render() {
    const s = currentStats;

    document.getElementById("name").textContent = s.name || "Player";
    document.getElementById("goal").textContent = "Goal: " + (s.goal || "Not set");
    document.getElementById("branchSem").textContent = `${s.branch || ""} • Semester ${s.semester || "?"}`;

    document.getElementById("level").textContent = s.level || 1;
    document.getElementById("xp").textContent = s.total_xp || 0;
    document.getElementById("streak").textContent = s.streak_days || 0;

    const progress = calcLevelProgress(s.total_xp || 0);
    document.getElementById("xpFill").style.width = progress.percent + "%";
    document.getElementById("xpText").textContent = `${progress.xpInLevel} / ${progress.xpNeeded} XP`;

    const avatar = document.getElementById("avatar");
    avatar.src = s.avatar_url ||
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23d1d5db'/%3E%3C/svg%3E";

    renderBadges();
}

function renderBadges() {
    const badges = getBadgeState(currentStats);
    const grid = document.getElementById("badgesGrid");

    grid.innerHTML = badges.map(b => `
        <div class="badge ${b.unlocked ? "unlocked" : ""}">
            ${b.icon}
            <p>${b.name}</p>
        </div>
    `).join("");
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.style.opacity = "1";
    setTimeout(() => { toast.style.opacity = "0"; }, 2000);
}

function goBack() {
    window.location.href = "dashboard.html";
}

function openEditPopup() {
    document.getElementById("editPopup").style.display = "flex";
    document.getElementById("editName").value = currentStats.name || "";
    document.getElementById("editGoal").value = currentStats.goal || "";
}

function closeEditPopup() {
    document.getElementById("editPopup").style.display = "none";
}

async function saveProfile() {
    const newName = document.getElementById("editName").value.trim() || "Player";
    const newGoal = document.getElementById("editGoal").value.trim() || "Not set";

    const { data, error } = await updateMyStats(currentUser.id, { name: newName, goal: newGoal });

    if (error) {
        showToast("❌ " + error.message);
        return;
    }

    currentStats = data;
    render();
    closeEditPopup();
    showToast("✅ Profile Updated");
}
