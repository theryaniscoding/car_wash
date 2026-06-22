/* =============================================
  Ryan Mobile Detailing — script.js
   ============================================= */

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Nav scroll state ----------
const nav  = document.getElementById('nav');

function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav(); // run on load

// ---------- Hamburger menu ----------
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const isOpen = burger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close menu on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// ---------- Scroll-triggered fade-up animations ----------
const fadeEls = document.querySelectorAll(
  '.pricing__card, .why__card, .gallery__item, .section__title, .section__eyebrow, .area__text, .area__visual, .contact__phone'
);

// Add the fade-up class to animatable elements
fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings in the same parent grid
        const siblings = Array.from(entry.target.parentElement.children)
          .filter(child => child.classList.contains('fade-up'));
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 320); // cap at 320ms stagger

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach(el => observer.observe(el));

// ---------- Contact form ----------
const form = document.getElementById('contactForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const phone   = form.phone.value.trim();
  const vehicle = form.vehicle.value;
  const message = form.message.value.trim();

  const vehicleLabel = vehicle === 'suv'
    ? 'SUV / Truck ($20)'
    : 'Sedan ($15)';

  const smsBody = encodeURIComponent(
    `🚗 New Car Wash Request\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Vehicle: ${vehicleLabel}\n` +
    (message ? `Message: ${message}\n` : '')
  );

  window.location.href = `sms:+13104282132?body=${smsBody}`;
});

function showConfirmation(name) {
  const btn = form.querySelector('[type="submit"]');
  const original = btn.textContent;

  btn.textContent = `✓ Thanks ${name.split(' ')[0]}! Text us at 310-428-2132`;
  btn.style.background = '#1a6650';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.disabled = false;
  }, 5000);
}

// ---------- Smooth anchor fallback (for older browsers) ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
