(async () => {
    const user = await requireAuth();
    if (!user) return;

    const { data, error } = await supabaseClient
        .from("leaderboard")
        .select("*")
        .order("total_xp", { ascending: false })
        .limit(50);

    const listEl = document.getElementById("leaderboardList");

    if (error) {
        listEl.innerHTML = `<p style="text-align:center;opacity:0.7;">Error: ${error.message}</p>`;
        return;
    }

    if (!data || data.length === 0) {
        listEl.innerHTML = `<p style="text-align:center;opacity:0.7;">No players yet — be the first!</p>`;
        return;
    }

    const rankClass = (i) => i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "";
    const rankEmoji = (i) => i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : (i + 1);

    listEl.innerHTML = data.map((p, i) => `
        <div class="lb-row ${p.user_id === user.id ? "me" : ""}">
            <div class="lb-rank ${rankClass(i)}">${rankEmoji(i)}</div>
            <div class="lb-name">${escapeHtml(p.name || "Player")} ${p.user_id === user.id ? "(You)" : ""}</div>
            <div class="lb-level">Lvl ${p.level || 1}</div>
            <div class="lb-xp">${p.total_xp || 0} XP</div>
        </div>
    `).join("");
})();

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}
