// * ``` Курсор ```
document.addEventListener('DOMContentLoaded', () => {
    const createCursor = document.createElement('div');
    createCursor.className = 'cursor';
    document.body.appendChild(createCursor);

    const customCursor = document.querySelector('.cursor');
    let isCursorVisible = true; // Флаг для отслеживания видимости кастомного курсора

    // * Функция для обновления позиции фона курсора
    const updateCursorBackgroundPosition = (hoveredElement) => {
        // Поинтер
        if (hoveredElement && hoveredElement.matches('a, button, input[type="button"], input[type="submit"]')) {
            customCursor.style.backgroundPosition = '35% 0';
        }
        // Стержень
        else if (document.getSelection().toString().length > 0 || hoveredElement && hoveredElement.matches('input[type="text"]')) {
            customCursor.style.backgroundPosition = '65% 0';
        } 
        // По умолчанию
        else {
            customCursor.style.backgroundPosition = '0% 0%';
        }
    };

    // Функция для скрытия и показа курсора
    const toggleCursorVisibility = (visible) => {
        customCursor.style.display = visible ? 'block' : 'none';
        isCursorVisible = visible;
    };

    // Обработчик движения мыши
    document.addEventListener('mousemove', (e) => {
        if (!isCursorVisible) return; // Не обновляем позицию, если курсор скрыт
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;

        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        updateCursorBackgroundPosition(hoveredElement);
    });

    // Обработчик кликов мыши
    document.addEventListener('mousedown', (e) => {
        if (e.button === 2) { // Клик правой кнопкой мыши
            toggleCursorVisibility(false); // Скрыть кастомный курсор
        } else if (e.button === 0) { // Клик левой кнопкой мыши
            toggleCursorVisibility(true); // Показать кастомный курсор
        }
    });

    // Показываем курсор при входе мыши в окно
    document.addEventListener('mouseenter', () => {
        if (isCursorVisible) customCursor.style.display = 'block';
    });

    // Скрываем курсор, когда мышь выходит из окна
    document.addEventListener('mouseleave', () => {
        customCursor.style.display = 'none';
    });

    // Обработчик скролла
    document.addEventListener('scroll', () => {
        const rect = customCursor.getBoundingClientRect();
        const hoveredElement = document.elementFromPoint(rect.left, rect.top);
        updateCursorBackgroundPosition(hoveredElement);
    });

    // Обработчик изменения выделения текста
    document.addEventListener('selectionchange', () => {
        const rect = customCursor.getBoundingClientRect();
        const hoveredElement = document.elementFromPoint(rect.left, rect.top);
        updateCursorBackgroundPosition(hoveredElement);
    });
});

// * ``` Слайдер на главной ```
(() => {
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
})();

// * ``` Окно меню ```
(() => {
// Открытие меню при клике на любую кнопку с классом .menu-btn
document.querySelectorAll('.menu-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelector('.menu-wrap').classList.add('menu-wrap--active');
    });
});

// Закрытие меню при клике на область вне .menu, но внутри .menu-wrap
document.querySelector('.menu-wrap').addEventListener('click', function(event) {
    const menu = document.querySelector('.menu');
    
    // Проверяем, что клик был не по элементу .menu
    if (!menu.contains(event.target)) {
        this.classList.remove('menu-wrap--active'); // Убираем класс .menu-wrap--active
    }
});

})();