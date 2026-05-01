/* Mobile nav toggle + active section highlight + smooth-scroll polyfill helper */

(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section highlight via IntersectionObserver
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    const map = new Map();
    navAnchors.forEach((a) => map.set(a.getAttribute('href').slice(1), a));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navAnchors.forEach((a) => a.classList.remove('active'));
            const link = map.get(entry.target.id);
            if (link) link.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((s) => obs.observe(s));
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Advance rotator to next image
  function rotatorAdvance(rotator) {
    const images = Array.from(rotator.querySelectorAll('.rotator-image'));
    if (images.length < 2) return;
    const dots = Array.from(rotator.querySelectorAll('.rotator-dots .dot'));
    let activeIndex = images.findIndex((img) => img.classList.contains('is-active'));
    if (activeIndex < 0) activeIndex = 0;
    const nextIndex = (activeIndex + 1) % images.length;
    images.forEach((img, i) => img.classList.toggle('is-active', i === nextIndex));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === nextIndex));
  }

  // Click-to-rotate (delegated)
  document.addEventListener('click', (event) => {
    const nextButton = event.target.closest('.img-rotator-next');
    const clickedRotator = event.target.closest('[data-rotator]');
    if (!nextButton && !clickedRotator) return;
    const rotator = nextButton ? nextButton.closest('[data-rotator]') : clickedRotator;
    if (!rotator) return;
    rotatorAdvance(rotator);
    if (nextButton) event.preventDefault();
  });

  // Swipe-to-rotate (touch support)
  document.addEventListener('touchstart', (event) => {
    const rotator = event.target.closest('[data-rotator]');
    if (!rotator) return;
    rotator._touchStartX = event.touches[0].clientX;
    rotator._touchStartY = event.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (event) => {
    const rotator = event.target.closest('[data-rotator]');
    if (!rotator || rotator._touchStartX == null) return;
    const dx = event.changedTouches[0].clientX - rotator._touchStartX;
    const dy = event.changedTouches[0].clientY - rotator._touchStartY;
    // Only count as a horizontal swipe if dx is dominant and at least 40px
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      rotatorAdvance(rotator);
    }
    rotator._touchStartX = null;
  }, { passive: true });
})();
