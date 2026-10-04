// ========================================================
// AKTU Connect - Master Navigation, Mobile Drawer & Global Sync
// ========================================================

function syncGlobalAvatars() {
  const currentEmail = (localStorage.getItem('current_user_email') || localStorage.getItem('user_email') || 'sksaqibkhan110@gmail.com').toLowerCase().trim();
  let userName = localStorage.getItem('user_name') || currentEmail.split('@')[0];
  if (userName.toLowerCase() === 'student') userName = "Saqib Khan";

  const initial = (userName.charAt(0) || 'S').toUpperCase();
  const savedPhoto = localStorage.getItem(`user_avatar_${currentEmail}`) 
                  || localStorage.getItem('user_avatar') 
                  || localStorage.getItem('profile_picture');

  // DOM Elements Text Sync
  ['side-user-name', 'top-user-name', 'sidebar-username'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = userName;
  });

  ['side-user-email', 'sidebar-useremail'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = currentEmail;
  });

  // Avatar Icons Sync
  ['top-user-avatar', 'side-user-avatar', 'desktop-header-avatar', 'mobile-nav-avatar'].forEach(id => {
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
      if (!el.classList.contains('avatar-circle')) {
        el.className = "w-8 h-8 rounded-full bg-emerald-800 text-white font-extrabold text-xs flex items-center justify-center";
      }
    }
  });

  const userXP = localStorage.getItem(`akt_xp_${currentEmail}`) || "720";
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

// Auto Inject Mobile Bar on pages that lack it
function ensureMobileNavBar() {
  if (window.innerWidth > 1024) return;
  if (document.getElementById('mobile-top-nav-bar')) return;
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') return;

  const main = document.querySelector('main');
  if (!main) return;

  const navBar = document.createElement('div');
  navBar.id = 'mobile-top-nav-bar';
  navBar.className = 'flex items-center justify-between p-3 bg-white/90 backdrop-blur rounded-2xl border border-emerald-100 lg:hidden shadow-xs mb-3';
  navBar.innerHTML = `
    <div class="flex items-center gap-2.5">
      <button type="button" onclick="toggleSidebar()" class="w-9 h-9 rounded-xl bg-emerald-50 text-[#1b4332] font-black text-lg flex items-center justify-center border border-emerald-200 cursor-pointer">
        ☰
      </button>
      <div class="flex items-center gap-1.5">
        <div class="w-6 h-6 rounded-md bg-[#1b4332] text-white text-[9px] font-black flex items-center justify-center">AC</div>
        <span class="text-xs font-black text-slate-800">AKTU Connect</span>
      </div>
    </div>
    <a href="profile.html">
      <div id="mobile-nav-avatar" class="w-7 h-7 rounded-full bg-emerald-800 text-white font-extrabold text-[10px] flex items-center justify-center overflow-hidden">S</div>
    </a>
  `;
  main.insertBefore(navBar, main.firstChild);
}

document.addEventListener('DOMContentLoaded', () => {
  ensureMobileNavBar();
  syncGlobalAvatars();
});

syncGlobalAvatars();