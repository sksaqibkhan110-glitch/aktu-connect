let data = JSON.parse(localStorage.getItem("aktuUser"));

if (!data) {
    data = {
        name: "Player",
        goal: "Not set",
        xp: 0,
        tasks: 0,
        avatar: "https://i.imgur.com/8RKXAIV.png"
    };
}

document.getElementById("name").innerText = data.name || "Player";
document.getElementById("goal").innerText = "Goal: " + (data.goal || "Not set");
document.getElementById("xp").innerText = data.xp || 0;
document.getElementById("tasks").innerText = data.tasks || 0;

let level = Math.floor((data.xp || 0) / 100) + 1;
document.getElementById("level").innerText = level;

let progress = (data.xp || 0) % 100;

document.getElementById("xpFill").style.width = progress + "%";
document.getElementById("xpText").innerText = `${progress} / 100 XP`;

let avatar = document.getElementById("avatar");
if (avatar) {
    avatar.src = data.avatar || "https://i.imgur.com/8RKXAIV.png";
}

function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 2000);
}

function unlockBadge(id, text) {
    let badge = document.getElementById(id);
    if (!badge) return;

    if (!badge.classList.contains("unlocked")) {
        badge.classList.add("unlocked");
        badge.style.boxShadow = "0 0 20px rgba(34,197,94,0.8)";

        if (text) {
            showToast("🏆 " + text + " Unlocked!");
        }
    }
}

function updateBadges(data) {
    unlockBadge("b1", "Beginner");

    if ((data.tasks || 0) >= 10) {
        unlockBadge("b2", "10 Tasks");
    }

    if ((data.xp || 0) >= 100) {
        unlockBadge("b3", "100 XP");
    }

    if (data.goal && data.goal !== "Not set") {
        unlockBadge("b4", "Goal Setter");
    }
}

function goBack() {
    window.location.href = "dashboard.html";
}

updateBadges(data);

function openEditPopup() {
    document.getElementById("editPopup").style.display = "flex";
    document.getElementById("editName").value = data.name || "";
    document.getElementById("editGoal").value = data.goal || "";
}

function closeEditPopup() {
    document.getElementById("editPopup").style.display = "none";
}

function saveProfile() {
    let newName = document.getElementById("editName").value;
    let newGoal = document.getElementById("editGoal").value;

    data.name = newName || "Player";
    data.goal = newGoal || "Not set";

    localStorage.setItem("aktuUser", JSON.stringify(data));

    document.getElementById("name").innerText = data.name;
    document.getElementById("goal").innerText = "Goal: " + data.goal;

    updateBadges(data);

    closeEditPopup();
    showToast("✅ Profile Updated");
}