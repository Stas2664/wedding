
// Simple Lightbox (injected) — robust to any markup
(function(){ if (window.__SLB_INIT__) return; window.__SLB_INIT__=true;
  function ready(fn){ if(document.readyState!='loading'){fn()} else document.addEventListener('DOMContentLoaded',fn); }
  ready(function(){ if (window.__SLB_INIT__) return; window.__SLB_INIT__=true;
    // Collect anchors that point to images inside portfolio or with data-lightbox
    var selector = [
      '.portfolio a',
      '.portfolio-items a',
      'a[data-lightbox]',
      '.gallery a',
      '.portfolio-item a'
    ].join(',');
    var anchors = Array.prototype.slice.call(document.querySelectorAll(selector))
      .filter(function(a){
        if(!a || !a.getAttribute) return false;
        var href = a.getAttribute('href')||'';
        return /\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(href);
      });
    if(anchors.length===0) return; // nothing to do

    // Build overlay
    var overlay = document.createElement('div');
    overlay.className='slb-overlay';
    overlay.innerHTML = ''+
      '<div class="slb-stage">'+
      '  <img class="slb-img" alt="" />'+
      '  <button class="slb-btn slb-prev" aria-label="Previous" title="Previous">&#10094;</button>'+
      '  <button class="slb-btn slb-next" aria-label="Next" title="Next">&#10095;</button>'+
      '  <button class="slb-close" aria-label="Close" title="Close">&#10005;</button>'+
      '</div>';
    document.body.appendChild(overlay);

    var img = overlay.querySelector('.slb-img');
    var btnPrev = overlay.querySelector('.slb-prev');
    var btnNext = overlay.querySelector('.slb-next');
    var btnClose = overlay.querySelector('.slb-close');

    var idx = 0;

    function openAt(i){
      if(i<0) i = anchors.length-1;
      if(i>=anchors.length) i = 0;
      idx = i;
      var href = anchors[idx].getAttribute('href');
      // Normalize relative path
      img.setAttribute('src', href);
      overlay.classList.add('open');
      document.documentElement.style.overflow='hidden';
    }
    function close(){
      overlay.classList.remove('open');
      img.removeAttribute('src');
      document.documentElement.style.overflow='';
    }
    function prev(){ openAt(idx-1); }
    function next(){ openAt(idx+1); }

    // Bind events
    anchors.forEach(function(a, i){
      a.addEventListener('click', function(e){
        // Only left button / no modifier
        if(e.button!==0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        openAt(i);
      });
    }, true);

    btnPrev.addEventListener('click', function(e){ e.preventDefault(); prev(); });
    btnNext.addEventListener('click', function(e){ e.preventDefault(); next(); });
    btnClose.addEventListener('click', function(e){ e.preventDefault(); close(); });
    overlay.addEventListener('click', function(e){
      if(e.target === overlay) close();
    });
    document.addEventListener('keydown', function(e){
      if(!overlay.classList.contains('open')) return;
      if(e.key==='Escape') close();
      else if(e.key==='ArrowLeft') prev();
      else if(e.key==='ArrowRight') next();
    });
  });
})();
