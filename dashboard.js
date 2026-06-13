let data = JSON.parse(localStorage.getItem("aktuUser"));

if (!data) {
    document.body.innerHTML = "<h2>No data found ❌ Go back and set goals</h2>";
} else {

    function todayDate() {
        return new Date().toDateString();
    }

    function resetDailyTasksIfNeeded() {
        let today = todayDate();

        if (data.lastResetDate !== today) {
            data.task1Done = false;
            data.task2Done = false;
            data.task3Done = false;
            data.studyDone = false;

            data.lastResetDate = today;

            localStorage.setItem("aktuUser", JSON.stringify(data));
        }
    }

    function updateUI() {
        document.getElementById("xp").innerText = data.xp || 0;
        document.getElementById("level").innerText = data.level || 1;
        document.getElementById("streak").innerText = (data.streak || 0) + " Days";

        let progress = (data.xp || 0) % 50;
        let percent = (progress / 50) * 100;
        document.getElementById("progress-bar").style.width = percent + "%";
    }

    resetDailyTasksIfNeeded();

    document.getElementById("welcome").innerText =
        "Welcome 🎯 Your Journey Starts Now";

    document.getElementById("sem").innerText = data.semester;
    document.getElementById("branch").innerText = data.branch;
    document.getElementById("cgpa").innerText = data.targetCGPA;

    updateUI();
}


// ================= STUDY BUTTON =================
document.getElementById("studybtn").addEventListener("click", function () {

    let data = JSON.parse(localStorage.getItem("aktuUser"));

    if (data.studyDone) {
        alert("⚠️ Aaj ka study boost already used!");
        return;
    }

    data.xp = (data.xp || 0) + 10;

    let oldLevel = data.level || 1;
    data.level = Math.floor(data.xp / 50) + 1;

    if (data.level > oldLevel) {
        alert("🎉 LEVEL UP! You reached Level " + data.level);
    }

    data.studyDone = true;

    localStorage.setItem("aktuUser", JSON.stringify(data));
    location.reload();
});


// ================= TASK 1 =================
document.getElementById("task1").addEventListener("click", function () {

    let data = JSON.parse(localStorage.getItem("aktuUser"));

    if (data.task1Done) {
        alert("Task 1 already completed today ✅");
        return;
    }

    data.xp = (data.xp || 0) + 20;
    data.level = Math.floor(data.xp / 50) + 1;

    data.task1Done = true;

    localStorage.setItem("aktuUser", JSON.stringify(data));
    location.reload();
});


// ================= TASK 2 =================
document.getElementById("task2").addEventListener("click", function () {

    let data = JSON.parse(localStorage.getItem("aktuUser"));

    if (data.task2Done) {
        alert("Task 2 already completed today ✅");
        return;
    }

    data.xp = (data.xp || 0) + 15;
    data.level = Math.floor(data.xp / 50) + 1;

    data.task2Done = true;

    localStorage.setItem("aktuUser", JSON.stringify(data));
    location.reload();
});


// ================= TASK 3 =================
document.getElementById("task3").addEventListener("click", function () {

    let data = JSON.parse(localStorage.getItem("aktuUser"));

    if (data.task3Done) {
        alert("Task 3 already completed today ✅");
        return;
    }

    data.xp = (data.xp || 0) + 30;
    data.level = Math.floor(data.xp / 50) + 1;

    data.task3Done = true;

    localStorage.setItem("aktuUser", JSON.stringify(data));
    location.reload();
});


// ================= EXAM COUNTDOWN =================
let examDate = new Date("July 15, 2026");
let today = new Date();

let diff = examDate - today;
let daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

document.getElementById("countdown").innerText =
    daysLeft + " days left for exams 📚";


// ================= STREAK SYSTEM =================
document.getElementById("streakBtn").addEventListener("click", function () {

    let data = JSON.parse(localStorage.getItem("aktuUser"));

    let today = new Date().toDateString();
    let lastDate = data.lastStudyDate;

    if (lastDate === today) {
        alert("Aaj ka streak already marked ✅");
        return;
    }

    if (!lastDate) {
        data.streak = 1;
    } else {
        let last = new Date(lastDate);
        let now = new Date(today);

        let diff = now - last;
        let days = diff / (1000 * 60 * 60 * 24);

        if (days === 1) {
            data.streak = (data.streak || 0) + 1;
        } else {
            data.streak = 1;
        }
    }

    data.lastStudyDate = today;

    localStorage.setItem("aktuUser", JSON.stringify(data));
    location.reload();
});