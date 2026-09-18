(() => {
  'use strict';
  const dialog = document.querySelector('.carol-gallery');
  const trigger = document.querySelector('.carol-gallery-trigger');
  if (!dialog || !trigger || typeof dialog.showModal !== 'function') return;
  const ids = ['0641','0642','0643','0644','0646','0647','0648','0649','0650','0651','0653','0654','0657','0658','0662','0664','0667','0671'];
  const base = new URL('../assets/img/carol/', document.currentScript.src);
  const photos = ids.map(id => new URL(`IMG_${id}.jpg`, base).href);
  const image = dialog.querySelector('.carol-gallery-image');
  const count = dialog.querySelector('.carol-gallery-count');
  const thumbnails = dialog.querySelector('.carol-gallery-thumbnails');
  let current = 0;
  let returnFocus;
  let priorOverflow = '';
  function show(index) {
    current = (index + photos.length) % photos.length;
    image.src = photos[current];
    image.alt = `Team Zia photo shared from Roswell, ${current + 1} of ${photos.length}`;
    count.textContent = `${current + 1} / ${photos.length}`;
    [...thumbnails.children].forEach((button, i) => button.setAttribute('aria-current', String(i === current)));
  }
  function open(index, source) {
    returnFocus = source;
    show(index);
    priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    dialog.querySelector('.carol-gallery-close').focus();
  }
  photos.forEach((src, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Show photo ${i + 1}`);
    const thumb = document.createElement('img');
    thumb.src = src; thumb.alt = ''; thumb.loading = 'lazy';
    button.append(thumb);
    button.addEventListener('click', () => show(i));
    thumbnails.append(button);
  });
  trigger.hidden = false;
  trigger.addEventListener('click', () => open(0, trigger));
  document.querySelectorAll('[data-carol-photo]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault(); open(Number(link.dataset.carolPhoto), link);
  }));
  dialog.querySelector('.carol-gallery-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.carol-gallery-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.carol-gallery-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = priorOverflow;
    returnFocus?.focus({ preventScroll: true });
  });
})();
