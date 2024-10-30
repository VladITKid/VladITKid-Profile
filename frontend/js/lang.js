// * ``` Языки ```
// ! ``` Контролирует HTML код внутри блоков ```
(() => {
// Объект с текстом для каждого языка
const texts = {
    en: {
        DiscountTitle: 'Save up to -10% off<br><span class="header__discount-title-text">на первой неделе сотрудничества.</span>',
    },
    es: {
        DiscountTitle: 'Espanol -10% off<br>',
    },
    ru: {
        DiscountTitle: 'Сэкономьте до -10%<br><span class="header__discount-title-text">на первой неделе сотрудничества.</span>',
    }
};

// Функция для обновления HTML-содержимого элементов
function updateText(language) {
    document.getElementById("heading").innerHTML = texts[language].heading;
    document.getElementById("description").innerHTML = texts[language].description;
    document.getElementById("paragraph-1").innerHTML = texts[language].paragraph1;
    document.getElementById("paragraph-2").innerHTML = texts[language].paragraph2;
    document.getElementById("paragraph-3").innerHTML = texts[language].paragraph3;
}

// Добавляем обработчики для кнопок
document.getElementById("switch-to-en").addEventListener("click", function() {
    updateText('en');
});

document.getElementById("switch-to-es").addEventListener("click", function() {
    updateText('es');
});

document.getElementById("switch-to-ru").addEventListener("click", function() {
    updateText('ru');
});
})();