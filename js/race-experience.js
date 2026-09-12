/* Progressive enhancement: native video and visible content work without JS. */
(() => {
  'use strict';
  document.querySelectorAll('.zia-video-frame').forEach(frame => {
    const video = frame.querySelector('video');
    const cover = frame.querySelector('.film-cover');
    const status = frame.parentElement.querySelector('.film-status');
    if (!video || !cover) return;
    const showCover = () => {
      cover.hidden = false;
      video.controls = false;
    };
    const fail = () => {
      cover.hidden = true;
      video.controls = true;
      status.textContent = 'Having trouble playing? Try the separate-player link below.';
      status.hidden = false;
    };
    showCover();
    cover.addEventListener('click', async () => {
      cover.hidden = true;
      status.hidden = true;
      video.controls = true;
      if (video.ended) video.currentTime = 0;
      try {
        await video.play();
        video.focus({ preventScroll: true });
      } catch {
        fail();
      }
    });
    video.addEventListener('play', () => { cover.hidden = true; });
    video.addEventListener('ended', showCover);
    video.addEventListener('error', fail);
  });

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const animations = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (motion.matches || !entry.target.animate) return;
      const animation = entry.target.animate(
        [{ opacity: .45, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
        { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)' }
      );
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
    });
  }, { threshold: .12 });
  document.querySelectorAll('.mission-story, .mission-point, .race-member, .race-calendar, .zia-head, .zia-item').forEach(el => observer.observe(el));
  motion.addEventListener('change', () => {
    if (motion.matches) {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    }
  });
})();
