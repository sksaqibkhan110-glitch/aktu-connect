// ============================================================
// GAME LOGIC ENGINE — same rules as Silver Guide (the RN app)
// Kept in one file so every page uses IDENTICAL formulas.
// ============================================================

const XP_PER_LEVEL = 2000;          // same as Silver Guide's QuestContext
const FOCUS_XP_PER_MINUTE = 2;      // victory: +2 XP per minute focused
const FOCUS_FLEE_PENALTY = 20;      // fleeing the timer early: -20 XP

// ---- Level math ----
function calcLevel(totalXp) {
    return Math.floor((totalXp || 0) / XP_PER_LEVEL) + 1;
}

function calcLevelProgress(totalXp) {
    const xp = totalXp || 0;
    const xpInLevel = xp % XP_PER_LEVEL;
    const percent = Math.min((xpInLevel / XP_PER_LEVEL) * 100, 100);
    return { xpInLevel, percent, xpNeeded: XP_PER_LEVEL };
}

// ---- Auth guard: redirect to login if no session ----
async function requireAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        window.location.href = "index.html";
        return null;
    }
    return session.user;
}

// ---- Fetch this user's player_stats row ----
async function getMyStats(userId) {
    const { data, error } = await supabaseClient
        .from("player_stats")
        .select("*")
        .eq("user_id", userId)
        .single();
    return { data, error };
}

// ---- Push a partial update to player_stats ----
async function updateMyStats(userId, patch) {
    const { data, error } = await supabaseClient
        .from("player_stats")
        .update(patch)
        .eq("user_id", userId)
        .select()
        .single();
    return { data, error };
}

// ---- Streak logic (same "consecutive day" rule as the old dashboard.js) ----
function computeStreakUpdate(stats) {
    const today = new Date().toDateString();
    const lastDate = stats.last_study_date ? new Date(stats.last_study_date).toDateString() : null;

    if (lastDate === today) {
        return { alreadyDone: true, streak: stats.streak_days || 0 };
    }

    let newStreak;
    if (!lastDate) {
        newStreak = 1;
    } else {
        const diffDays = Math.round((new Date(today) - new Date(lastDate)) / 86400000);
        newStreak = diffDays === 1 ? (stats.streak_days || 0) + 1 : 1;
    }

    return { alreadyDone: false, streak: newStreak };
}

// ---- Badge rules (same conditions Silver Guide's ProfileScreen uses) ----
function getBadgeState(stats) {
    const level = stats.level || 1;
    const xp = stats.total_xp || 0;
    const streak = stats.streak_days || 0;
    const questsCompleted = stats.quests_completed || 0;
    const focusMinutes = stats.total_focus_minutes || 0;

    return [
        { id: "b1", icon: "🥇", name: "Beginner", unlocked: true },
        { id: "b2", icon: "🔥", name: "Consistent", unlocked: streak >= 3 },
        { id: "b3", icon: "⚡", name: "100 XP", unlocked: xp >= 100 },
        { id: "b4", icon: "🎯", name: "Goal Setter", unlocked: !!stats.goal && stats.goal !== "Not set" },
        { id: "b5", icon: "📚", name: "Scholar (10 Quests)", unlocked: questsCompleted >= 10 },
        { id: "b6", icon: "🧠", name: "Deep Focus", unlocked: focusMinutes > 0 },
        { id: "b7", icon: "🎓", name: "Dean's List (Lvl 10)", unlocked: level >= 10 },
        { id: "b8", icon: "⚔️", name: "High Voltage (7d streak)", unlocked: streak >= 7 },
    ];
}

async function logout() {
    await supabaseClient.auth.signOut();
    window.location.href = "index.html";
}
