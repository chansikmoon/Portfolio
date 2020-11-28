'use strict';

// Make the navbar transparent when the position is top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  }
  else {
    navbar.classList.remove('navbar--dark')
  }
});