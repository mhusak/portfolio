const burger = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');

function positionNavMenu() {
  const burgerRect = burger.getBoundingClientRect();
  navMenu.style.top = `${burgerRect.bottom + 5}px`;
  navMenu.style.left = `${burgerRect.left}px`;
}

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navMenu.classList.toggle('active');
  if (navMenu.classList.contains('active')) {
    positionNavMenu();
  }
});

window.addEventListener('resize', () => {
  if (navMenu.classList.contains('active')) {
    positionNavMenu();
  }
});

window.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
    navMenu.classList.remove('active');
    burger.classList.remove('active');
  }
});

burger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
      positionNavMenu();
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    burger.classList.remove('active');
  }
});

// Skill Flip and Morph Logic
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach((card) => {
    let isFlipping = false;

    const toggleCard = () => {
        if (isFlipping) return;
        isFlipping = true;

        // Collapse all other cards
        skillCards.forEach((otherCard) => {
            if (otherCard !== card && otherCard.classList.contains('expanded')) {
                otherCard.classList.remove('flipped', 'expanded');
                otherCard.setAttribute('aria-expanded', 'false');
            }
        });

        if (!card.classList.contains('expanded')) {
            // Flip and expand
            card.classList.add('flipped', 'expanded');
            card.setAttribute('aria-expanded', 'true');
            card.querySelector('.skill-close').focus();
        } else {
            // Collapse immediately
            card.classList.remove('expanded');
            setTimeout(() => {
                card.classList.remove('flipped');
                card.setAttribute('aria-expanded', 'false');
            }, 0);
        }
        isFlipping = false;
    };

    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('skill-close')) return;
        toggleCard();
    });

    card.querySelector('.skill-close').addEventListener('click', () => {
        card.classList.remove('expanded');
        setTimeout(() => {
            card.classList.remove('flipped');
            card.setAttribute('aria-expanded', 'false');
        }, 0);
        isFlipping = false;
    });

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!e.target.classList.contains('skill-close')) {
                toggleCard();
            }
        }
    });
});

// Handle Escape key for closing expanded card
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const expandedCard = document.querySelector('.skill-card.expanded');
        if (expandedCard) {
            expandedCard.classList.remove('expanded');
            setTimeout(() => {
                expandedCard.classList.remove('flipped');
                expandedCard.setAttribute('aria-expanded', 'false');
            }, 0);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll('.link-box, .project-card, .skill-card, .cta-section p, .cta-button');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elementsToAnimate.forEach((element) => observer.observe(element));
});