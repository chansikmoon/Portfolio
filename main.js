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

// Handle scrolling when clicking the navbar menu item
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link)
})

const homeContactMeBtn = document.querySelector('.home__contact');
homeContactMeBtn.addEventListener('click', (event) => {
  scrollIntoView('#contact')
})

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}