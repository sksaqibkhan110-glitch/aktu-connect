// Universal Navigation & Multi-User State Isolation

function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar-card');
  const overlay = document.getElementById('mobile-drawer-overlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
  }
}

function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    window.location.href = "index.html";
  }
}

// FIRST + LAST NAME LOGO MAKER (e.g. Saqib Khan -> SK, Aman Verma -> AV)
function getInitials(name) {
  if (!name || typeof name !== 'string' || name.trim() === "" || name.trim().toLowerCase() === "student") {
    return "ST";
  }
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getCurrentUserEmail() {
  return (localStorage.getItem('user_email') || 'default_student').trim().toLowerCase();
}

function getUserXP() {
  const email = getCurrentUserEmail();
  const val = localStorage.getItem(`akt_xp_${email}`);
  return val !== null ? parseInt(val) : 0;
}

function setUserXP(newXp) {
  const email = getCurrentUserEmail();
  localStorage.setItem(`akt_xp_${email}`, newXp.toString());
  syncGlobalProfile();
}
function removeUserAvatar() {
  const email = getCurrentUserEmail();
  localStorage.removeItem(`user_avatar_${email}`);
  localStorage.removeItem('user_avatar'); // global clean
  syncGlobalProfile();
}
function getUserAvatar() {
  const email = getCurrentUserEmail();
  return localStorage.getItem(`user_avatar_${email}`) || null;
}

function setUserAvatar(dataUri) {
  const email = getCurrentUserEmail();
  localStorage.setItem(`user_avatar_${email}`, dataUri);
  syncGlobalProfile();
}

function getUserCompletedUnits() {
  const email = getCurrentUserEmail();
  return JSON.parse(localStorage.getItem(`akt_completed_units_${email}`) || '[]');
}

function setUserCompletedUnits(unitsArray) {
  const email = getCurrentUserEmail();
  localStorage.setItem(`akt_completed_units_${email}`, JSON.stringify(unitsArray));
}

// FORCE REMOVE ANY ROGUE INJECTED BACKGROUND IMAGES
function killRogueBackgroundImages() {
  document.querySelectorAll('.main-viewport > img, body > img:not(#logo), main > img').forEach(img => {
    img.remove();
  });
  if (document.body) {
    document.body.style.backgroundImage = "none";
  }
  const vp = document.querySelector('.main-viewport');
  if (vp) {
    vp.style.backgroundImage = "none";
  }
}

function syncGlobalProfile() {
  killRogueBackgroundImages();

  const email = getCurrentUserEmail();
  const savedName = localStorage.getItem('user_name') || 'Student';
  const xp = getUserXP();
  const avatar = getUserAvatar();
  const initials = getInitials(savedName);

  // Sync Names
  document.querySelectorAll('#top-user-name, #nav-user-name, #display-user-name').forEach(el => {
    if (el) el.innerText = savedName;
  });

  const lbUser = document.getElementById('lb-user-name');
  if (lbUser) lbUser.innerText = `${savedName} (You)`;

  // Sync XP
  document.querySelectorAll('#top-user-xp, #profile-xp-val, #lb-user-xp').forEach(el => {
    if (el) el.innerText = `${xp} XP`;
  });

  // JAB TAK PHOTO NAHI HOTI, FIRST+LAST NAME INITIALS LOGO RENDER HOGA
  document.querySelectorAll('.single-avatar-slot').forEach(slot => {
    if (avatar) {
      slot.innerHTML = `<img src="${avatar}" alt="${savedName}" class="w-full h-full object-cover rounded-full" />`;
    } else {
      slot.innerHTML = `<span>${initials}</span>`;
    }
  });

  const bannerAvatar = document.getElementById('profile-banner-avatar');
  if (bannerAvatar) {
    if (avatar) {
      bannerAvatar.innerHTML = `<img src="${avatar}" class="w-full h-full object-cover rounded-2xl" />`;
    } else {
      bannerAvatar.innerHTML = `<span class="font-black text-xl text-amber-300">${initials}</span>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const currentEmail = localStorage.getItem('user_email');
  const isAuthPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
  
  if (!currentEmail && !isAuthPage) {
    window.location.href = "index.html";
    return;
  }

  syncGlobalProfile();
});