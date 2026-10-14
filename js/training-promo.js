(() => {
  const video = document.getElementById('training-promo-video');
  const button = document.querySelector('.training-promo-play');
  if (!video || !button) return;
  button.addEventListener('click', () => {
    if (video.ended) video.currentTime = 0;
    video.play().catch(() => { button.hidden = false; });
  });
  video.addEventListener('play', () => { button.hidden = true; });
  video.addEventListener('ended', () => { button.hidden = false; });
  video.addEventListener('error', () => { button.hidden = false; });
})();
