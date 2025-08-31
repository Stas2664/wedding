
// Standalone Lightbox (no dependencies)
(function(){
  function createModal(){
    let modal = document.getElementById('lb-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'lb-modal';
    modal.className = 'lb-modal';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML = '<div class="lb-content">\
      <img class="lb-image" alt="Просмотр изображения"/>\
      <button class="lb-btn lb-prev" aria-label="Предыдущее">‹</button>\
      <button class="lb-btn lb-next" aria-label="Следующее">›</button>\
      <button class="lb-close" aria-label="Закрыть">×</button>\
    </div>';
    document.body.appendChild(modal);
    return modal;
  }

  function collectAnchors(){
    const container = document.querySelector('.portfolio-items') || document;
    const selector = '.portfolio-image > a, a[data-lightbox="portfolio"], .portfolio-items a';
    const list = Array.from(container.querySelectorAll(selector))
      .filter(a => /\.(jpe?g|png|webp|gif)$/i.test(a.getAttribute('href')||''));
    return list;
  }

  function init(){
    const anchors = collectAnchors();
    if (!anchors.length) return;

    const modal = createModal();
    const img = modal.querySelector('.lb-image');
    const prevBtn = modal.querySelector('.lb-prev');
    const nextBtn = modal.querySelector('.lb-next');
    const closeBtn = modal.querySelector('.lb-close');
    let idx = 0;

    function openAt(i){
      idx = (i + anchors.length) % anchors.length;
      img.src = anchors[idx].getAttribute('href');
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    }
    function close(){
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
      img.src = '';
    }
    function prev(){ openAt(idx-1); }
    function next(){ openAt(idx+1); }

    // Delegate clicks on the container
    const container = document.querySelector('.portfolio-items') || document;
    container.addEventListener('click', function(e){
      const a = e.target.closest('.portfolio-image > a, a[data-lightbox="portfolio"], .portfolio-items a');
      if (!a || !container.contains(a)) return;
      const href = a.getAttribute('href');
      let i = anchors.indexOf(a);
      if (i === -1){
        const href = a.getAttribute('href');
        i = anchors.findIndex(x => x.getAttribute('href')===href);
      }
      if (i !== -1){ e.preventDefault(); openAt(i); }
    });

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e)=>{ if(e.target === modal) close(); });
    document.addEventListener('keydown', (e)=>{
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
