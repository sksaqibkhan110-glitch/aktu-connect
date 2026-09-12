(function () {
  const savedTheme = localStorage.getItem('aktu_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

function toggleGlobalTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('aktu_theme', isDark ? 'dark' : 'light');
  updateThemeIcons();
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.innerHTML = isDark ? '☀️ Light' : '🌙 Dark';
  });
}

window.addEventListener('DOMContentLoaded', updateThemeIcons);