(async () => {
    const user = await requireAuth();
    if (!user) return;

    document.getElementById("startbtn").addEventListener("click", async function () {
        const semester = document.getElementById("semester").value;
        const branch = document.getElementById("branch").value;
        const cgpa = document.querySelector('input[name="cgpa"]:checked');
        const msg = document.getElementById("msg");

        if (semester === "" || branch === "" || !cgpa) {
            msg.textContent = "Select all fields first ⚠️";
            return;
        }

        const name = sessionStorage.getItem("pendingName") || user.user_metadata?.name || "Player";

        const { error } = await supabaseClient.from("player_stats").upsert({
            user_id: user.id,
            name: name,
            email: user.email,
            semester: parseInt(semester),
            branch: branch,
            target_cgpa: parseInt(cgpa.value),
            level: 1,
            total_xp: 0,
            streak_days: 0,
            quests_completed: 0,
            focus_sessions_completed: 0,
            total_focus_minutes: 0,
            goal: "Not set"
        });

        if (error) {
            msg.textContent = "Error: " + error.message;
            return;
        }

        sessionStorage.removeItem("pendingName");
        msg.style.color = "#4ade80";
        msg.textContent = "Starting Journey... 🚀";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    });
})();
