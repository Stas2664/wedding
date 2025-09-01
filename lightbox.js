
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
      <div class="lb-counter">1 / 1</div>\
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
    const counter = modal.querySelector('.lb-counter');
    let idx = 0;
    let isAnimating = false;

    function openAt(i){
      if (isAnimating) return;
      isAnimating = true;
      
      idx = (i + anchors.length) % anchors.length;
      const newSrc = anchors[idx].getAttribute('href');
      
      // Если изображение уже загружено, показываем сразу
      if (img.src === newSrc) {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden','false');
        document.body.style.overflow='hidden';
        isAnimating = false;
        return;
      }
      
      // Загружаем новое изображение
      img.classList.add('loading');
      img.onload = function() {
        img.classList.remove('loading');
        modal.classList.add('open');
        modal.setAttribute('aria-hidden','false');
        document.body.style.overflow='hidden';
        // Обновляем счетчик
        counter.textContent = (idx + 1) + ' / ' + anchors.length;
        isAnimating = false;
      };
      
      img.onerror = function() {
        img.classList.remove('loading');
        console.error('Ошибка загрузки изображения:', newSrc);
        isAnimating = false;
      };
      
      img.src = newSrc;
    }
    
    function close(){
      if (isAnimating) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
      // Не очищаем src, чтобы изображение оставалось в кеше
    }
    
    function prev(){ 
      if (!isAnimating) openAt(idx-1); 
    }
    
    function next(){ 
      if (!isAnimating) openAt(idx+1); 
    }

    // Обработчик кликов по изображениям
    const container = document.querySelector('.portfolio-items') || document;
    container.addEventListener('click', function(e){
      const a = e.target.closest('.portfolio-image > a, a[data-lightbox="portfolio"], .portfolio-items a');
      if (!a || !container.contains(a)) return;
      const i = anchors.indexOf(a);
      if (i !== -1){
        e.preventDefault();
        e.stopPropagation();
        openAt(i);
      }
    });

    // Обработчики кнопок
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      prev();
    });
    
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      next();
    });
    
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      close();
    });
    
    // Закрытие по клику на фон
    modal.addEventListener('click', function(e){
      if(e.target === modal) {
        close();
      }
    });
    
    // Обработка клавиатуры
    document.addEventListener('keydown', function(e){
      if (!modal.classList.contains('open')) return;
      
      switch(e.key) {
        case 'Escape':
          e.preventDefault();
          close();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          next();
          break;
      }
    });
    
    // Поддержка свайпов на мобильных устройствах
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    
    modal.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
      }
    });
    
    modal.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      e.preventDefault();
    });
    
    modal.addEventListener('touchend', function(e) {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = startX - endX;
      const deltaY = startY - endY;
      
      // Минимальное расстояние для свайпа
      const minSwipeDistance = 50;
      
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          // Свайп влево - следующее изображение
          next();
        } else {
          // Свайп вправо - предыдущее изображение
          prev();
        }
      }
      
      isDragging = false;
    });
    
    // Предзагрузка изображений для плавного пролистывания
    function preloadImages() {
      anchors.forEach(anchor => {
        const img = new Image();
        img.src = anchor.getAttribute('href');
      });
    }
    
    // Запускаем предзагрузку после небольшой задержки
    setTimeout(preloadImages, 1000);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
