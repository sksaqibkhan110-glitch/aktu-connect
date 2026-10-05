/* AKTU Connect - Mobile UI Helpers (No Bottom Nav Bar) */
(function () {
  var mq = window.matchMedia('(max-width: 1023px)');
  if (!mq.matches) return;

  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  /* PYQ Cards Probability Bar & Zen Button */
  function tagPyq() {
    var nodes = document.querySelectorAll('body *');
    nodes.forEach(function (el) {
      if (el.children.length) return;
      var t = (el.textContent || '').trim();

      var m = /^(\d{1,3})%\s*PROBABLE$/i.exec(t);
      if (m) {
        var p = parseInt(m[1], 10);
        var c = el;
        while (c && c !== document.body && !/Ask Zen/i.test(c.textContent || '')) c = c.parentElement;
        if (c && c !== document.body) {
          c.classList.add('m-pyq-card');
          c.setAttribute('data-prob', p >= 90 ? 'high' : p >= 80 ? 'mid' : 'low');
        }
      }
      if (/Ask Zen to Explain/i.test(t)) {
        var btn = el.closest('a, button') || el;
        btn.classList.add('m-ask-zen');
      }
    });
  }

  if (page === 'pyq.html') {
    tagPyq();
    new MutationObserver(function () { tagPyq(); })
      .observe(document.body, { childList: true, subtree: true });
  }
})();