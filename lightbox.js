// Простой Lightbox
console.log('Lightbox script loaded');

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing lightbox');
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
        <div class="lightbox-content">
            <img class="lightbox-image" src="" alt="Просмотр изображения">
            <button class="lightbox-prev">‹</button>
            <button class="lightbox-next">›</button>
            <button class="lightbox-close">×</button>
            <div class="lightbox-counter">1 / 1</div>
        </div>
    `;
    document.body.appendChild(modal);
    console.log('Modal created');

    // Находим все изображения
    const images = document.querySelectorAll('.portfolio-image a');
    console.log('Found images:', images.length);
    
    if (images.length === 0) {
        console.log('No images found, trying alternative selector');
        const altImages = document.querySelectorAll('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"]');
        console.log('Alternative images found:', altImages.length);
    }

    let currentIndex = 0;

    const modalElement = document.getElementById('lightbox-modal');
    const imageElement = modalElement.querySelector('.lightbox-image');
    const prevButton = modalElement.querySelector('.lightbox-prev');
    const nextButton = modalElement.querySelector('.lightbox-next');
    const closeButton = modalElement.querySelector('.lightbox-close');
    const counterElement = modalElement.querySelector('.lightbox-counter');

    // Функция открытия lightbox
    function openLightbox(index) {
        console.log('Opening lightbox at index:', index);
        currentIndex = index;
        const imageSrc = images[currentIndex].getAttribute('href');
        console.log('Image src:', imageSrc);
        imageElement.src = imageSrc;
        counterElement.textContent = `${currentIndex + 1} / ${images.length}`;
        modalElement.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Функция закрытия lightbox
    function closeLightbox() {
        console.log('Closing lightbox');
        modalElement.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Функция показа предыдущего изображения
    function showPrev() {
        console.log('Showing previous image');
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        const imageSrc = images[currentIndex].getAttribute('href');
        imageElement.src = imageSrc;
        counterElement.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    // Функция показа следующего изображения
    function showNext() {
        console.log('Showing next image');
        currentIndex = (currentIndex + 1) % images.length;
        const imageSrc = images[currentIndex].getAttribute('href');
        imageElement.src = imageSrc;
        counterElement.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    // Добавляем обработчики событий для изображений
    images.forEach((image, index) => {
        console.log('Adding click handler to image', index);
        image.addEventListener('click', function(e) {
            console.log('Image clicked:', index);
            e.preventDefault();
            e.stopPropagation();
            openLightbox(index);
        });
    });

    // Обработчики для кнопок
    prevButton.addEventListener('click', function(e) {
        console.log('Prev button clicked');
        e.preventDefault();
        e.stopPropagation();
        showPrev();
    });
    
    nextButton.addEventListener('click', function(e) {
        console.log('Next button clicked');
        e.preventDefault();
        e.stopPropagation();
        showNext();
    });
    
    closeButton.addEventListener('click', function(e) {
        console.log('Close button clicked');
        e.preventDefault();
        e.stopPropagation();
        closeLightbox();
    });

    // Закрытие по клику на фон
    modalElement.addEventListener('click', function(e) {
        if (e.target === modalElement) {
            console.log('Background clicked');
            closeLightbox();
        }
    });

    // Обработка клавиатуры
    document.addEventListener('keydown', function(e) {
        if (!modalElement.classList.contains('active')) return;
        
        console.log('Key pressed:', e.key);
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });

    console.log('Lightbox initialization complete');
});
