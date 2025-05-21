const burger = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');

function positionNavMenu() {
  const burgerRect = burger.getBoundingClientRect();
  // Position nav-menu directly below burger menu
  navMenu.style.top = `${burgerRect.bottom + 5}px`; // +5 for tight fit
  navMenu.style.left = `${burgerRect.left}px`;
}

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navMenu.classList.toggle('active');
  if (navMenu.classList.contains('active')) {
    positionNavMenu();
  }
});

// Update position on resize
window.addEventListener('resize', () => {
  if (navMenu.classList.contains('active')) {
    positionNavMenu();
  }
});

// Close menu when clicking outside
window.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
    navMenu.classList.remove('active');
    burger.classList.remove('active');
  }
});

// Toggle menu with Enter or Space key for accessibility
burger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault(); // Prevent scrolling with Space
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
      positionNavMenu();
    }
  }
});

// Close menu with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    burger.classList.remove('active');
  }
});