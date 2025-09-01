// Simple Lightbox
document.addEventListener('DOMContentLoaded', function() {
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

    // Получаем все изображения в портфолио
    const images = document.querySelectorAll('.portfolio-image a[href*=".jpg"], .portfolio-image a[href*=".jpeg"], .portfolio-image a[href*=".png"]');
    let currentIndex = 0;

    const modalElement = document.getElementById('lightbox-modal');
    const imageElement = modalElement.querySelector('.lightbox-image');
    const prevButton = modalElement.querySelector('.lightbox-prev');
    const nextButton = modalElement.querySelector('.lightbox-next');
    const closeButton = modalElement.querySelector('.lightbox-close');
    const counterElement = modalElement.querySelector('.lightbox-counter');

    // Функция открытия lightbox
    function openLightbox(index) {
        currentIndex = index;
        const imageSrc = images[currentIndex].getAttribute('href');
        imageElement.src = imageSrc;
        counterElement.textContent = `${currentIndex + 1} / ${images.length}`;
        modalElement.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Функция закрытия lightbox
    function closeLightbox() {
        modalElement.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Функция показа предыдущего изображения
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        const imageSrc = images[currentIndex].getAttribute('href');
        imageElement.src = imageSrc;
        counterElement.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    // Функция показа следующего изображения
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        const imageSrc = images[currentIndex].getAttribute('href');
        imageElement.src = imageSrc;
        counterElement.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    // Добавляем обработчики событий для изображений
    images.forEach((image, index) => {
        image.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(index);
        });
    });

    // Обработчики для кнопок
    prevButton.addEventListener('click', showPrev);
    nextButton.addEventListener('click', showNext);
    closeButton.addEventListener('click', closeLightbox);

    // Закрытие по клику на фон
    modalElement.addEventListener('click', function(e) {
        if (e.target === modalElement) {
            closeLightbox();
        }
    });

    // Обработка клавиатуры
    document.addEventListener('keydown', function(e) {
        if (!modalElement.classList.contains('active')) return;
        
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

    // Поддержка свайпов на мобильных устройствах
    let startX = 0;
    let startY = 0;

    modalElement.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    modalElement.addEventListener('touchend', function(e) {
        if (!modalElement.classList.contains('active')) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = startX - endX;
        const deltaY = startY - endY;
        
        // Минимальное расстояние для свайпа
        const minSwipeDistance = 50;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                showNext();
            } else {
                showPrev();
            }
        }
    });
});
