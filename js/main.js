document.addEventListener('DOMContentLoaded', () => {
  const topNav = document.querySelector('.nav-container');
  const fadeIns = document.querySelectorAll('.fade-in');

  function handleFadeIn() {
    fadeIns.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 50;

      if (isVisible) {
        el.classList.add('show');
      } else {
        el.classList.remove('show');
      }
    });
  }

  // Run once on load
  handleFadeIn();

  // Run on scroll
  window.addEventListener('scroll', () => {
    // Top nav logic
    if (window.scrollY > window.innerHeight * 0.6) {
      topNav.style.top = '0';
    } else {
      topNav.style.top = '-100px';
    }

    // Re-check fade-in visibility
    handleFadeIn();
  });
});
