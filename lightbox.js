
(function(){
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const $  = (sel, root=document) => root.querySelector(sel);

  let items = [];
  let idx = 0;
  const overlay = $('#lightbox-overlay');
  if (!overlay) return;
  const img = $('.lightbox__img', overlay);
  const counter = $('.lightbox__counter', overlay);
  const btnPrev = $('.lightbox__prev', overlay);
  const btnNext = $('.lightbox__next', overlay);
  const btnClose = $('.lightbox__close', overlay);

  function collect() {
    items = $$('.portfolio img[data-gallery], .gallery img[data-gallery], img[data-gallery]')
      .map(img => ({src: img.currentSrc || img.src, el: img}));
  }
  function openAt(i){
    if (!items.length) collect();
    idx = Math.max(0, Math.min(i, items.length-1));
    const cur = items[idx];
    img.src = cur.src;
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    updateCounter();
    // focus trap
    btnClose.focus();
  }
  function close(){
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  function prev(){ openAt((idx - 1 + items.length) % items.length); }
  function next(){ openAt((idx + 1) % items.length); }
  function updateCounter(){ if (counter) counter.textContent = (idx+1) + '/' + items.length; }

  // Delegated click
  document.addEventListener('click', function(e){
    const a = e.target.closest('a[data-lightbox], img[data-gallery]');
    if (!a) return;
    e.preventDefault();
    collect();
    let targetSrc = (a.tagName === 'A') ? a.getAttribute('href') : (a.currentSrc || a.src);
    const found = items.findIndex(it => it.src.split('#')[0] === targetSrc.split('#')[0]);
    openAt(found >= 0 ? found : 0);
  }, true);

  // Buttons
  btnPrev && btnPrev.addEventListener('click', prev);
  btnNext && btnNext.addEventListener('click', next);
  btnClose && btnClose.addEventListener('click', close);
  overlay.addEventListener('click', (e)=>{ if (e.target === overlay) close(); });

  // Keyboard
  document.addEventListener('keydown', (e)=>{
    if (overlay.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  });

  // Touch swipe
  let startX = 0;
  img.addEventListener('touchstart', (e)=>{ startX = e.touches[0].clientX; }, {passive:true});
  img.addEventListener('touchend', (e)=>{
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) (dx>0 ? prev() : next());
  });

})();
