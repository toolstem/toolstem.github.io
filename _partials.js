// Theme toggle (in-memory only, sandbox-safe) + mobile nav drawer
(function () {
  var root = document.documentElement;

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) btn.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode');
  }

  document.addEventListener('click', function (e) {
    var tt = e.target.closest('[data-theme-toggle]');
    if (tt) {
      var current = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
      setTheme(current === 'dark' ? 'light' : 'dark');
      return;
    }
    var navBtn = e.target.closest('[data-nav-toggle]');
    if (navBtn) {
      var nav = document.getElementById('site-nav');
      if (nav) {
        var open = nav.classList.toggle('site-nav--open');
        navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      return;
    }
  });

  // Close nav when a link is clicked (mobile)
  document.addEventListener('click', function (e) {
    if (e.target.closest('#site-nav a')) {
      var nav = document.getElementById('site-nav');
      if (nav && nav.classList.contains('site-nav--open')) {
        nav.classList.remove('site-nav--open');
        var btn = document.querySelector('[data-nav-toggle]');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    }
  });
})();
