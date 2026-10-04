// ========================================================
// AKTU Connect - Master Navigation & Global Avatar Sync
// ========================================================

function syncGlobalAvatars() {
  const currentEmail = (localStorage.getItem('current_user_email') || localStorage.getItem('user_email') || 'sksaqibkhan110@gmail.com').toLowerCase().trim();
  let userName = localStorage.getItem('user_name') || currentEmail.split('@')[0];
  if (userName.toLowerCase() === 'student') userName = "Saqib Khan";

  const initial = (userName.charAt(0) || 'S').toUpperCase();
  const savedPhoto = localStorage.getItem(`user_avatar_${currentEmail}`) 
                  || localStorage.getItem('user_avatar') 
                  || localStorage.getItem('profile_picture');

  ['side-user-name', 'top-user-name', 'sidebar-username'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = userName;
  });

  ['side-user-email', 'sidebar-useremail'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = currentEmail;
  });

  ['top-user-avatar', 'side-user-avatar', 'mobile-top-user-avatar', 'header-avatar'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.overflow = 'hidden';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';

    if (savedPhoto && savedPhoto.startsWith('data:image')) {
      el.innerHTML = `<img src="${savedPhoto}" alt="Avatar" class="w-full h-full object-cover rounded-full pointer-events-none" />`;
      el.style.padding = '0';
    } else {
      el.innerHTML = initial;
      el.style.padding = '';
    }
  });

  const userXP = localStorage.getItem(`akt_xp_${currentEmail}`) || "260";
  ['top-user-xp', 'stat-xp', 'profile-card-xp'].forEach(id => {
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

// YAHAN LAGEGA (Sabhi pages ke drawer me Logout Button lagane ka auto-engine)
document.addEventListener('DOMContentLoaded', () => {
  // Duplicate mobile bar remove karo
  const autoBar = document.getElementById('mobile-top-nav-bar');
  if (autoBar) autoBar.remove();

  // Sabhi pages ke sidebar me Logout Button auto-inject karo
  const userPill = document.querySelector('.sidebar-user-pill');
  if (userPill) {
    userPill.className = "sidebar-user-pill flex flex-col gap-2.5 pt-3 border-t border-white/10 mt-auto";
    
    // Check if logout button already exists, nahi hai toh inject karo
    if (!userPill.querySelector('button[onclick*="handleLogout"]')) {
      const btn = document.createElement('button');
      btn.type = "button";
      btn.onclick = handleLogout;
      btn.className = "w-full py-2 rounded-xl bg-white/10 hover:bg-rose-600/80 text-rose-200 hover:text-white text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer mt-1";
      btn.innerHTML = `<span>🚪</span> Logout Account`;
      userPill.appendChild(btn);
    }
  }

  syncGlobalAvatars();
});

syncGlobalAvatars();