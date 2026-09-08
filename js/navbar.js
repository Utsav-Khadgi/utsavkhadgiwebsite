// navbar.js — reusable on every page
// Handles only the mobile navbar toggle. Nothing page-specific lives here.

document.addEventListener('DOMContentLoaded', () => {
  const navBtn = document.querySelector('.navbar-toggler');
  const navMenu = document.querySelector('.navbar-collapse');

  if (navBtn && navMenu) {
    navBtn.addEventListener('click', () => {
      navMenu.classList.toggle('toggleNav');
    });
  }
});