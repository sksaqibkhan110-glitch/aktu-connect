// ========================================================
// AKTU Connect - Centralized Navigation & Global Avatar Engine
// ========================================================

function getSavedUserAvatar(email) {
  const cleanEmail = (email || '').toLowerCase().trim();
  const keys = [
    `user_avatar_${cleanEmail}`,
    'user_avatar',
    'profile_picture',
    `akt_avatar_${cleanEmail}`
  ];

  for (const k of keys) {
    const val = localStorage.getItem(k);
    if (val && val.startsWith('data:image')) {
      return val;
    }
  }
  return null;
}

function clearAllUserAvatarKeys(email) {
  const cleanEmail = (email || '').toLowerCase().trim();
  const keys = [
    `user_avatar_${cleanEmail}`,
    'user_avatar',
    'profile_picture',
    `akt_avatar_${cleanEmail}`
  ];
  keys.forEach(k => localStorage.removeItem(k));
}

function syncGlobalAvatars() {
  const currentEmail = (localStorage.getItem('current_user_email') || localStorage.getItem('user_email') || 'student@aktu.ac.in').toLowerCase().trim();
  let userName = localStorage.getItem('user_name') || currentEmail.split('@')[0];
  if (userName.toLowerCase() === 'student') userName = "Saqib Khan";

  const initial = (userName.charAt(0) || 'S').toUpperCase();
  const savedPhoto = getSavedUserAvatar(currentEmail);

  // Sync Names & Emails across all DOM elements
  const nameTargets = ['side-user-name', 'top-user-name', 'sidebar-username', 'welcome-name', 'profile-header-name'];
  nameTargets.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = userName;
  });

  const emailTargets = ['side-user-email', 'sidebar-useremail'];
  emailTargets.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = currentEmail;
  });

  // Target all avatar slots in header, sidebar & drawer
  const avatarSlots = [
    document.getElementById('top-user-avatar'),
    document.getElementById('side-user-avatar'),
    document.getElementById('sidebar-avatar'),
    document.getElementById('header-avatar')
  ];

  avatarSlots.forEach(slot => {
    if (!slot) return;
    slot.style.overflow = 'hidden';
    slot.style.display = 'flex';
    slot.style.alignItems = 'center';
    slot.style.justifyContent = 'center';

    if (savedPhoto) {
      slot.innerHTML = `<img src="${savedPhoto}" alt="Avatar" class="w-full h-full object-cover rounded-full pointer-events-none" />`;
      slot.style.padding = '0';
    } else {
      slot.innerHTML = initial;
      slot.style.padding = '';
      if (!slot.classList.contains('bg-emerald-800') && !slot.classList.contains('avatar-circle')) {
        slot.classList.add('bg-emerald-800', 'text-white', 'font-black');
      }
    }
  });

  // Sync Live XP across all headers
  const userXP = localStorage.getItem(`akt_xp_${currentEmail}`) || "200";
  const xpTargets = ['top-user-xp', 'stat-xp', 'profile-card-xp'];
  xpTargets.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = userXP + " XP";
  });
}

function toggleSidebar() {
  const sb = document.getElementById('main-sidebar') || document.querySelector('.sidebar-menu-card');
  let overlay = document.getElementById('drawer-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'drawer-overlay';
    overlay.className = 'mobile-drawer-overlay';
    overlay.onclick = toggleSidebar;
    document.body.appendChild(overlay);
  }

  if (sb) sb.classList.toggle('mobile-open');
  overlay.classList.toggle('active');
}

function handleLogout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('current_user_email');
  sessionStorage.clear();
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  syncGlobalAvatars();

  if (!document.getElementById('drawer-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'drawer-overlay';
    overlay.className = 'mobile-drawer-overlay';
    overlay.onclick = toggleSidebar;
    document.body.appendChild(overlay);
  }
});

// Run once immediately
syncGlobalAvatars();