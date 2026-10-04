// Universal Theme Toggle Handler
function toggleGlobalTheme() {
  const htmlEl = document.documentElement;
  htmlEl.classList.toggle('dark');
  
  const isDark = htmlEl.classList.contains('dark');
  localStorage.setItem('aktu_theme', isDark ? 'dark' : 'light');
  
  updateThemeButtonText(isDark);
}

function updateThemeButtonText(isDark) {
  const btn = document.querySelector('.theme-toggle-btn');
  if (btn) {
    btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
  }
}

// Initialize theme immediately on script load & DOM content loaded
(function() {
  const savedTheme = localStorage.getItem('aktu_theme');
  const htmlEl = document.documentElement;
  
  if (savedTheme === 'light') {
    htmlEl.classList.remove('dark');
  } else {
    htmlEl.classList.add('dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const isDark = document.documentElement.classList.contains('dark');
  updateThemeButtonTestByState(isDark);
});

function updateThemeButtonTestByState(isDark) {
  const btn = document.querySelector('.theme-toggle-btn');
  if (btn) {
    btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
  }
}