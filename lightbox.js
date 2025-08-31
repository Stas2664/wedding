// Standalone Lightbox (no dependencies)
(function(){
  function createModal(){
    let modal = document.getElementById('lb-modal');
    if (modal) return modal;
    
    modal = document.createElement('div');
    modal.id = 'lb-modal';
    modal.className = 'lb-modal';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML = `
      <div class="lb-content">
        <img class="lb-image" alt="Просмотр изображения"/>
        <button class="lb-btn lb-prev" aria-label="Предыдущее">‹</button>
        <button class="lb-btn lb-next" aria-label="Следующее">›</button>
        <button class="lb-close" aria-label="Закрыть">×</button>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  function collectAnchors(){
    const container = document.querySelector('.portfolio-items') || document;
    const selector = '.portfolio-image > a, a[data-lightbox="portfolio"], .portfolio-items a';
    const list = Array.from(container.querySelectorAll(selector))
      .filter(a => {
        const href = a.getAttribute('href') || '';
        return /\.(jpe?g|png|webp|gif)$/i.test(href);
      });
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
      const href = anchors[idx].getAttribute('href');
      if (href) {
        img.src = href;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
        
        // Show/hide navigation buttons
        if (anchors.length > 1) {
          prevBtn.style.display = 'flex';
          nextBtn.style.display = 'flex';
        } else {
          prevBtn.style.display = 'none';
          nextBtn.style.display = 'none';
        }
      }
    }

    function close(){
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
      img.src = '';
    }

    function prev(){ 
      if (anchors.length > 1) {
        openAt(idx - 1); 
      }
    }

    function next(){ 
      if (anchors.length > 1) {
        openAt(idx + 1); 
      }
    }

    // Delegate clicks on the container
    const container = document.querySelector('.portfolio-items') || document;
    container.addEventListener('click', function(e){
      const a = e.target.closest('.portfolio-image > a, a[data-lightbox="portfolio"], .portfolio-items a');
      if (!a || !container.contains(a)) return;
      
      const i = anchors.indexOf(a);
      if (i !== -1){
        e.preventDefault();
        openAt(i);
      }
    });

    // Navigation buttons
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      prev();
    });
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      next();
    });
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      close();
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => { 
      if(e.target === modal) close(); 
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('open')) return;
      e.preventDefault();
      
      switch(e.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowLeft':
          prev();
          break;
        case 'ArrowRight':
          next();
          break;
      }
    });

    // Handle image load errors
    img.addEventListener('error', function() {
      console.error('Ошибка загрузки изображения:', this.src);
    });

    // Preload next/prev images for smoother navigation
    function preloadImages() {
      if (anchors.length <= 1) return;
      
      const nextIdx = (idx + 1) % anchors.length;
      const prevIdx = (idx - 1 + anchors.length) % anchors.length;
      
      [anchors[nextIdx], anchors[prevIdx]].forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href) {
          const preloadImg = new Image();
          preloadImg.src = href;
        }
      });
    }

    // Preload on open
    modal.addEventListener('transitionend', function() {
      if (modal.classList.contains('open')) {
        preloadImages();
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize if portfolio content changes dynamically
  window.lightboxReinit = init;
})();
