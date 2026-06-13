document.getElementById("startbtn").addEventListener("click", function () {

    let semester = document.getElementById("semester").value;
    let branch = document.getElementById("branch").value;
    let cgpa = document.querySelector('input[name="cgpa"]:checked');

    console.log("clicked");

    if (semester === "" || branch === "" || !cgpa) {
        document.getElementById("msg").innerText = "Select all fields first ⚠️";
        return;
    }

    let userGoal = {
        semester: semester,
        branch: branch,
        targetCGPA: cgpa.value,
        xp: 0,
        completedTasks: 0,
        createdAt: Date.now()
    };

    localStorage.setItem("aktuUser", JSON.stringify(userGoal));

    let msg = document.getElementById("msg");
    msg.innerText = "Starting Journey... 🚀";

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1200);
});