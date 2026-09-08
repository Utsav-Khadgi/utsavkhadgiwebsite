// home.js — index.html only. Navbar toggle now lives in navbar.js.

// Preloader: only runs (and only locks scroll) if this page actually has one.
const preloader = document.querySelector('.preloader');
if (preloader) {
  document.body.classList.add('is-loading');
  window.addEventListener('load', () => {
    preloader.classList.add('hidePreloader');
    document.body.classList.remove('is-loading');
  });
}

// typewriter header — only runs if #typeEffect exists on this page
const typeTarget = document.getElementById('typeEffect');
if (typeTarget && typeof Typewriter !== 'undefined') {
  const typewriter = new Typewriter(typeTarget, {
    loop: true
  });

  typewriter.typeString('Utsav Khadgi')
    .pauseFor(2500)
    .deleteAll()
    .typeString('C# Development')
    .pauseFor(2500)
    .deleteAll()
    .typeString('IT Enthusiast')
    .pauseFor(2500)
    .start();
}

// stopping transition during resizing — harmless to keep site-wide,
// but only needed where .resize-transition-stopper-affected CSS exists (home page)
let resizeTimer;
window.addEventListener('resize', () => {
  document.body.classList.add('resize-transition-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resize-transition-stopper');
  }, 400);
});