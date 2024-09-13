// * ``` Курсор ```
document.addEventListener('DOMContentLoaded', () => {
    const createCursor = document.createElement('div');
    createCursor.className = 'cursor';
    document.body.appendChild(createCursor);

    const customCursor = document.querySelector('.cursor');

    const updateCursorBackgroundPosition = (hoveredElement) => {
        if (hoveredElement && hoveredElement.matches('a, button, input[type="button"], input[type="submit"]')) {
            customCursor.style.backgroundPosition = '35% 0';
        } else if (document.getSelection().toString().length > 0) {
            customCursor.style.backgroundPosition = '65% 0';
        } else {
            customCursor.style.backgroundPosition = '0% 0%';
        }
    };

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;

        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        updateCursorBackgroundPosition(hoveredElement);
    });

    document.addEventListener('mouseenter', () => {
        customCursor.style.display = 'block';
    });

    document.addEventListener('mouseleave', () => {
        customCursor.style.display = 'none';
    });

    document.addEventListener('scroll', () => {
        const rect = customCursor.getBoundingClientRect();
        const hoveredElement = document.elementFromPoint(rect.left, rect.top);
        updateCursorBackgroundPosition(hoveredElement);
    });

    document.addEventListener('selectionchange', () => {
        const rect = customCursor.getBoundingClientRect();
        const hoveredElement = document.elementFromPoint(rect.left, rect.top);
        updateCursorBackgroundPosition(hoveredElement);
    });
});

// * ``` Слайдер на главной ```
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.homepage__sect-1-slider-slide'); // Все слайды
    const nextBtn = document.querySelector('.homepage__sect-1-slider-next-btn'); // Кнопка "Next"
    let currentIndex = 0, userInactiveTimeout, autoClickInterval;

    // Функция для обновления активного слайда и текста кнопки
    const updateSlider = () => {
        // Удаляем активный класс со всех слайдов
        slides.forEach(slide => slide.classList.remove('homepage__sect-1-slider-slide--active'));
        // Добавляем активный класс текущему слайду
        slides[currentIndex].classList.add('homepage__sect-1-slider-slide--active');
        // Обновляем текст кнопки
        nextBtn.textContent = `${currentIndex + 1}/${slides.length}`;
    };

    // Функция для сброса таймера неактивности пользователя и авто-клика
    const resetUserInactiveTimer = () => {
        clearTimeout(userInactiveTimeout); // Очищаем предыдущий таймер
        clearInterval(autoClickInterval); // Очищаем интервал авто-кликов
        userInactiveTimeout = setTimeout(() => { // Запускаем новый таймер
            nextBtn.click(); // Автоматически нажимаем кнопку
            autoClickInterval = setInterval(() => nextBtn.click(), 5000); // Интервал авто-кликов
        }, 10000); // Таймер запускается через указанное число секунд неактивности
    };

    // Обработчик клика по кнопке "Next"
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length; // Переход к следующему слайду
        updateSlider(); // Обновляем слайдер
        resetUserInactiveTimer(); // Сбрасываем таймер неактивности
    });

    updateSlider(); // Первоначальная настройка слайдера
    resetUserInactiveTimer(); // Запускаем таймер при загрузке страницы
});
