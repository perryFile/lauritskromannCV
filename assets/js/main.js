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

  // Click-to-rotate images in highlight cards (delegated, robust across reloads)
  document.addEventListener('click', (event) => {
    const nextButton = event.target.closest('.img-rotator-next');
    const clickedRotator = event.target.closest('[data-rotator]');
    if (!nextButton && !clickedRotator) return;

    const rotator = nextButton ? nextButton.closest('[data-rotator]') : clickedRotator;
    if (!rotator) return;

    const images = Array.from(rotator.querySelectorAll('.rotator-image'));
    if (images.length < 2) return;
    const dots = Array.from(rotator.querySelectorAll('.rotator-dots .dot'));

    let activeIndex = images.findIndex((img) => img.classList.contains('is-active'));
    if (activeIndex < 0) activeIndex = 0;

    const nextIndex = (activeIndex + 1) % images.length;
    images.forEach((img, index) => {
      img.classList.toggle('is-active', index === nextIndex);
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === nextIndex);
    });

    if (nextButton) event.preventDefault();
  });
})();
