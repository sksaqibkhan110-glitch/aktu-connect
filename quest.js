let currentUser = null;
let currentStats = null;
let quests = [];

(async () => {
    currentUser = await requireAuth();
    if (!currentUser) return;

    const { data: stats } = await getMyStats(currentUser.id);
    if (!stats) { window.location.href = "goal-setup.html"; return; }
    currentStats = stats;

    // Sync initial stats to localStorage for profile & leaderboard consistency
    if (currentStats.total_xp !== undefined) {
        localStorage.setItem('akt_xp', currentStats.total_xp);
    }

    await loadQuests();
})();

async function loadQuests() {
    const { data, error } = await supabaseClient
        .from("quests")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

    if (error) {
        document.getElementById("questList").innerHTML = `<p class="empty-msg">Error loading quests: ${error.message}</p>`;
        return;
    }

    quests = data || [];
    renderQuests();
}

function getProgress(quest) {
    if (!quest.tasks || quest.tasks.length === 0) return 0;
    const completed = quest.tasks.filter(t => t.completed).length;
    return Math.round((completed / quest.tasks.length) * 100);
}

function renderQuests() {
    const listEl = document.getElementById("questList");
    if (!listEl) return;

    if (quests.length === 0) {
        listEl.innerHTML = `<p class="empty-msg">No quests yet. Tap "New Quest" to break down your syllabus! 🎯</p>`;
        return;
    }

    listEl.innerHTML = quests.map((q) => {
        const progress = getProgress(q);
        const tasksHtml = (q.tasks || []).map((t, tIndex) => `
            <div class="task-row">
                <input type="checkbox" ${t.completed ? "checked" : ""}
                    onchange="toggleTask('${q.id}', ${tIndex})">
                <span class="task-title ${t.completed ? "done" : ""}">${escapeHtml(t.title)}</span>
                <span class="task-xp">+${t.xp} XP</span>
            </div>
        `).join("");

        return `
            <div class="quest-card">
                <div class="quest-header">
                    <h2>${q.icon || "📘"} ${escapeHtml(q.title)}</h2>
                    ${q.deadline ? `<span class="quest-deadline">${escapeHtml(q.deadline)}</span>` : ""}
                </div>
                <div class="quest-progress-box">
                    <div class="quest-progress-fill" style="width:${progress}%"></div>
                </div>
                <p style="font-size:13px;opacity:0.7;margin-bottom:8px;">${progress}% complete</p>
                ${tasksHtml}
                <button class="delete-quest-btn" onclick="deleteQuest('${q.id}')">🗑️ Delete Quest</button>
            </div>
        `;
    }).join("");
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

// ---- Toggle a task: Syncs with Supabase & LocalStorage for Profile/Leaderboard ----
async function toggleTask(questId, taskIndex) {
    const quest = quests.find(q => q.id === questId);
    if (!quest) return;

    const task = quest.tasks[taskIndex];
    const isNowCompleted = !task.completed;

    const updatedTasks = [...quest.tasks];
    updatedTasks[taskIndex] = { ...task, completed: isNowCompleted };

    const { error: qErr } = await supabaseClient
        .from("quests")
        .update({ tasks: updatedTasks })
        .eq("id", questId)
        .eq("user_id", currentUser.id);

    if (qErr) { alert("Error: " + qErr.message); return; }

    quest.tasks = updatedTasks;

    // Sync XP + level + quests_completed on player_stats
    const xpChange = isNowCompleted ? task.xp : -task.xp;
    const newTotalXP = Math.max(0, (currentStats.total_xp || 0) + xpChange);
    const newLevel = calcLevel(newTotalXP);
    const questChange = isNowCompleted ? 1 : -1;
    const newQuestsCompleted = Math.max(0, (currentStats.quests_completed || 0) + questChange);

    // Update LocalStorage so Profile & Leaderboard pages update instantly
    localStorage.setItem('akt_xp', newTotalXP);

    const { data: updatedStats, error: sErr } = await updateMyStats(currentUser.id, {
        total_xp: newTotalXP,
        level: newLevel,
        quests_completed: newQuestsCompleted
    });

    if (!sErr && updatedStats) {
        const leveledUp = newLevel > (currentStats.level || 1);
        currentStats = updatedStats;
        if (leveledUp) alert("🎉 LEVEL UP! You reached Level " + newLevel);
    }

    renderQuests();
}

async function deleteQuest(questId) {
    if (!confirm("Delete this quest?")) return;

    const { error } = await supabaseClient
        .from("quests")
        .delete()
        .eq("id", questId)
        .eq("user_id", currentUser.id);

    if (error) { alert("Error: " + error.message); return; }

    quests = quests.filter(q => q.id !== questId);
    renderQuests();
}

// ================= ADD QUEST POPUP =================
const popup = document.getElementById("addQuestPopup");
const addQuestBtn = document.getElementById("addQuestBtn");
const cancelQuestBtn = document.getElementById("cancelQuestBtn");
const addTaskRowBtn = document.getElementById("addTaskRowBtn");
const saveQuestBtn = document.getElementById("saveQuestBtn");

if (addQuestBtn && popup) {
    addQuestBtn.addEventListener("click", () => {
        popup.style.display = "flex";
    });
}

if (cancelQuestBtn && popup) {
    cancelQuestBtn.addEventListener("click", () => {
        popup.style.display = "none";
        resetQuestForm();
    });
}

if (addTaskRowBtn) {
    addTaskRowBtn.addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "task-row";
        row.innerHTML = `
            <input type="text" class="taskTitle" placeholder="Task name">
            <input type="number" class="taskXp" placeholder="XP" value="20">
        `;
        document.getElementById("taskInputs").appendChild(row);
    });
}

if (saveQuestBtn) {
    saveQuestBtn.addEventListener("click", async () => {
        const title = document.getElementById("questTitle").value.trim();
        const icon = document.getElementById("questIcon").value.trim() || "📘";
        const deadline = document.getElementById("questDeadline").value.trim();

        if (!title) {
            alert("Quest title is required ⚠️");
            return;
        }

        const taskTitles = document.querySelectorAll(".taskTitle");
        const taskXps = document.querySelectorAll(".taskXp");

        const tasks = [];
        for (let i = 0; i < taskTitles.length; i++) {
            const tTitle = taskTitles[i].value.trim();
            const tXp = parseInt(taskXps[i].value) || 10;
            if (tTitle) tasks.push({ title: tTitle, xp: tXp, completed: false });
        }

        if (tasks.length === 0) {
            alert("Add at least one task ⚠️");
            return;
        }

        const { data, error } = await supabaseClient
            .from("quests")
            .insert([{ user_id: currentUser.id, title, icon, deadline, tasks }])
            .select()
            .single();

        if (error) {
            alert("Error: " + error.message);
            return;
        }

        quests.unshift(data);
        renderQuests();
        if (popup) popup.style.display = "none";
        resetQuestForm();
    });
}

function resetQuestForm() {
    const qTitle = document.getElementById("questTitle");
    const qIcon = document.getElementById("questIcon");
    const qDeadline = document.getElementById("questDeadline");
    const taskInputs = document.getElementById("taskInputs");

    if (qTitle) qTitle.value = "";
    if (qIcon) qIcon.value = "";
    if (qDeadline) qDeadline.value = "";
    if (taskInputs) {
        taskInputs.innerHTML = `
            <div class="task-row">
                <input type="text" class="taskTitle" placeholder="Task name">
                <input type="number" class="taskXp" placeholder="XP" value="20">
            </div>
        `;
    }
}