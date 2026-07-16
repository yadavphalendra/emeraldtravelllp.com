// ===== EMERALD TRAVEL LLP - Main JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initParticles();
  initCounters();
  initContactForm();
});

// ===== Sticky Header =====
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===== Mobile Menu =====
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
    }
  });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });
}

// ===== Hero Particles (Emerald) =====
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 6 + 3;
    const hue = Math.random() > 0.5 ? '160' : '28'; // emerald or copper
    const opacity = (Math.random() * 0.12 + 0.05).toFixed(2);
    particle.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 10}s;
      animation-duration: ${Math.random() * 10 + 10}s;
      background: hsla(${hue}, 70%, 55%, ${opacity});
    `;
    container.appendChild(particle);
  }
}

// ===== Counter Animation =====
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(target * eased).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===== Contact Form =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ===== Set active nav link =====
(function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
