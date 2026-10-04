let currentUser = null;
let currentStats = null;

let presetMinutes = 25;
let intervalId = null;

const timerDisplay = document.getElementById("timerDisplay");
const timerCircle = document.getElementById("timerCircle");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const claimBtn = document.getElementById("claimBtn");
const statusMsg = document.getElementById("statusMsg");

(async () => {
    currentUser = await requireAuth();
    if (!currentUser) return;

    const { data: stats } = await getMyStats(currentUser.id);
    if (!stats) { window.location.href = "goal-setup.html"; return; }
    currentStats = stats;

    renderStats();
    restoreTimerState(); // Agar tab switch ya reload hua ho toh timer wapas resume karega
})();

function renderStats() {
    document.getElementById("sessionsCompleted").textContent = currentStats.focus_sessions_completed || 0;
    document.getElementById("totalMinutes").textContent = currentStats.total_focus_minutes || 0;
}

// ---- Preset buttons ----
document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (localStorage.getItem("focus_endTime")) return; // Running timer ke dauran change nahi hoga
        document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        presetMinutes = parseInt(btn.dataset.min);
        updateDisplay(presetMinutes * 60);
    });
});

function updateDisplay(secondsLeft) {
    const mins = Math.max(0, Math.floor(secondsLeft / 60));
    const secs = Math.max(0, secondsLeft % 60);
    timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// ---- Restore timer state across tabs/reloads ----
function restoreTimerState() {
    const storedEndTime = localStorage.getItem("focus_endTime");
    const storedPreset = localStorage.getItem("focus_presetMinutes");

    if (storedPreset) {
        presetMinutes = parseInt(storedPreset);
        document.querySelectorAll(".preset-btn").forEach(b => {
            b.classList.toggle("active", parseInt(b.dataset.min) === presetMinutes);
        });
    }

    if (storedEndTime) {
        const remainingMs = parseInt(storedEndTime) - Date.now();
        const secondsLeft = Math.ceil(remainingMs / 1000);

        if (secondsLeft <= 0) {
            finishTimer();
        } else {
            resumeTimerUI();
        }
    } else {
        updateDisplay(presetMinutes * 60);
    }
}

// ---- Start Focus Session ----
startBtn.addEventListener("click", () => {
    const endTime = Date.now() + (presetMinutes * 60 * 1000);
    localStorage.setItem("focus_endTime", endTime);
    localStorage.setItem("focus_presetMinutes", presetMinutes);

    resumeTimerUI();
});

function resumeTimerUI() {
    timerCircle.classList.add("running");
    startBtn.style.display = "none";
    claimBtn.style.display = "none";
    stopBtn.style.display = "block";
    statusMsg.textContent = "Focus session active! You can switch tabs or watch lectures freely.";

    clearInterval(intervalId);
    runTimerTick();
    intervalId = setInterval(runTimerTick, 1000);
}

function runTimerTick() {
    const storedEndTime = localStorage.getItem("focus_endTime");
    if (!storedEndTime) {
        clearInterval(intervalId);
        return;
    }

    const remainingMs = parseInt(storedEndTime) - Date.now();
    const secondsLeft = Math.ceil(remainingMs / 1000);

    if (secondsLeft <= 0) {
        clearInterval(intervalId);
        finishTimer();
    } else {
        updateDisplay(secondsLeft);
    }
}

// Visibility listener for instant update when switching back
document.addEventListener("visibilitychange", () => {
    if (localStorage.getItem("focus_endTime")) {
        runTimerTick();
    }
});

// ---- Cancel Session ----
stopBtn.addEventListener("click", () => {
    if (!confirm("Cancel focus session? No XP will be earned.")) return;

    clearInterval(intervalId);
    localStorage.removeItem("focus_endTime");
    localStorage.removeItem("focus_presetMinutes");

    timerCircle.classList.remove("running");
    startBtn.style.display = "block";
    stopBtn.style.display = "none";
    claimBtn.style.display = "none";
    
    statusMsg.textContent = "Session cancelled.";
    updateDisplay(presetMinutes * 60);
});

// ---- Timer Finish ----
function finishTimer() {
    clearInterval(intervalId);
    timerCircle.classList.remove("running");
    stopBtn.style.display = "none";
    claimBtn.style.display = "block";
    updateDisplay(0);
    statusMsg.textContent = `🎯 Session complete! Click below to claim your +${presetMinutes * FOCUS_XP_PER_MINUTE} XP!`;
}

// ---- Claim XP Button ----
claimBtn.addEventListener("click", async () => {
    claimBtn.disabled = true;
    claimBtn.textContent = "Claiming...";

    const minutes = presetMinutes;
    const xpChange = minutes * FOCUS_XP_PER_MINUTE;
    const newTotalXP = Math.max(0, (currentStats.total_xp || 0) + xpChange);
    const newLevel = calcLevel(newTotalXP);

    const patch = {
        total_xp: newTotalXP,
        level: newLevel,
        focus_sessions_completed: (currentStats.focus_sessions_completed || 0) + 1,
        total_focus_minutes: (currentStats.total_focus_minutes || 0) + minutes
    };

    const { data, error } = await updateMyStats(currentUser.id, patch);

    if (!error) {
        localStorage.removeItem("focus_endTime");
        localStorage.removeItem("focus_presetMinutes");

        const leveledUp = newLevel > (currentStats.level || 1);
        currentStats = data;
        renderStats();

        if (leveledUp) {
            statusMsg.textContent = `🎉 LEVEL UP! You reached Level ${newLevel}`;
        } else {
            statusMsg.textContent = `⚔️ Victory! You earned +${xpChange} XP.`;
        }

        alert(`⚔️ Great job! You completed ${minutes} minutes of focus and earned +${xpChange} XP!`);
    } else {
        alert("Error saving stats. Please try again.");
    }

    claimBtn.disabled = false;
    claimBtn.textContent = "🎉 Claim XP";
    claimBtn.style.display = "none";
    startBtn.style.display = "block";

    updateDisplay(presetMinutes * 60);
});