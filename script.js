/* ══════════════════════════════════════════
   PIZZAGRAM RESTAURANT — script.js
══════════════════════════════════════════ */

// ── NAVBAR ──────────────────────────────
const navbar   = document.getElementById('navbar');
const hamburger= document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

// ── SCROLL TO TOP ───────────────────────
const scrollTopBtn = document.getElementById('scrollTop');
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── CART TOAST ──────────────────────────
const cartToast = document.getElementById('cartToast');
let toastTimer = null;

function addToCart(btn) {
  // Animate button
  const original = btn.textContent;
  btn.textContent = '✓ Added!';
  btn.classList.add('added');
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove('added');
    btn.disabled = false;
  }, 1800);

  // Show toast
  clearTimeout(toastTimer);
  cartToast.classList.add('show');
  toastTimer = setTimeout(() => {
    cartToast.classList.remove('show');
  }, 2500);
}

// ── SCROLL ANIMATIONS ───────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Add fade-up to all cards and sections
const animTargets = document.querySelectorAll(
  '.menu-card, .feature-card, .review-card, .gallery-item, .app-card, .rstat'
);
animTargets.forEach((el, i) => {
  el.classList.add('fade-up');
  el.dataset.delay = (i % 4) * 80; // stagger in groups of 4
  observer.observe(el);
});

// Also observe section headings
document.querySelectorAll('.section-title, .section-label, .section-desc, .cta-title').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ── ACTIVE NAV LINK ON SCROLL ───────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
}, { passive: true });

// ── HAMBURGER ANIMATION ─────────────────
const style = document.createElement('style');
style.textContent = `
  .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .nav-links a.active { color: var(--gold) !important; }
`;
document.head.appendChild(style);

// ── LAZY LOAD ENHANCEMENT ───────────────
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported, nothing to do
} else {
  // Fallback for older browsers
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imgObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));
}

// ── SMOOTH ANCHOR SCROLL ─────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── PIZZA PARALLAX IN HERO ───────────────
const heroPizzaImg = document.querySelector('.hero-pizza-img');
if (heroPizzaImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroPizzaImg.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
  }, { passive: true });
}

console.log('%c🍕 Pizzagram Restaurant', 'font-size:18px; font-weight:bold; color:#ed1c24;');
console.log('%cIndia\'s Most Loved Pizza Experience', 'font-size:12px; color:#facb07;');
