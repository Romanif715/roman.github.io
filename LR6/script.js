// =============================
// DOM
// =============================

const tabsContainer = document.querySelector('#tabs');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

const topLeft = document.querySelector('#top-left');
const topRight = document.querySelector('#top-right');
const bottomRight = document.querySelector('#bottom-right');
const bottomLeft = document.querySelector('#bottom-left');

const topLeftValue = document.querySelector('#top-left-value');
const topRightValue = document.querySelector('#top-right-value');
const bottomRightValue = document.querySelector('#bottom-right-value');
const bottomLeftValue = document.querySelector('#bottom-left-value');

const preview = document.querySelector('#preview');
const previewButton = document.querySelector('#preview-button');
const coordinates = document.querySelector('#coordinates');

const cssCode = document.querySelector('#css-code');

const copyButton = document.querySelector('#copy-button');
const copyMessage = document.querySelector('#copy-message');

const presetForm = document.querySelector('#preset-form');
const presetName = document.querySelector('#preset-name');
const presetError = document.querySelector('#preset-error');

const scrollTopButton = document.querySelector('#scroll-top');

// Додаткові властивості (варіант 1: background-color + text-align)
const bgColor = document.querySelector('#bg-color');
const textAlign = document.querySelector('#text-align');


// =============================
// TABS
// =============================

function hideTabs() {
    tabs.forEach(function (tab) {
        tab.classList.remove('active');
    });
    tabContents.forEach(function (content) {
        content.classList.remove('active');
    });
}

function showTab(tabName) {
    const tab = document.querySelector(`[data-tab="${tabName}"]`);
    const content = document.querySelector(`[data-content="${tabName}"]`);

    if (tab) tab.classList.add('active');
    if (content) content.classList.add('active');
}

// Завдання 14: Делегування подій для вкладок
tabsContainer.addEventListener('click', function (event) {
    if (!event.target.classList.contains('tab')) {
        return;
    }

    const tabName = event.target.dataset.tab;

    hideTabs();
    showTab(tabName);
});


// =============================
// BORDER RADIUS
// =============================

function generateBorderRadius() {
    const tl = topLeft.value;
    const tr = topRight.value;
    const br = bottomRight.value;
    const bl = bottomLeft.value;

    // Відображення значень
    topLeftValue.textContent = `${tl} px`;
    topRightValue.textContent = `${tr} px`;
    bottomRightValue.textContent = `${br} px`;
    bottomLeftValue.textContent = `${bl} px`;

    const radius = `${tl}px ${tr}px ${br}px ${bl}px`;

    preview.style.borderRadius = radius;

    updateCSSCode();
}

topLeft.addEventListener('input', generateBorderRadius);
topRight.addEventListener('input', generateBorderRadius);
bottomRight.addEventListener('input', generateBorderRadius);
bottomLeft.addEventListener('input', generateBorderRadius);


// =============================
// ДОДАТКОВІ ВЛАСТИВОСТІ (Рівень II)
// =============================

bgColor.addEventListener('input', function () {
    preview.style.background = bgColor.value;
    updateCSSCode();
});

textAlign.addEventListener('change', function () {
    preview.style.textAlign = textAlign.value;
    updateCSSCode();
});


// =============================
// ГЕНЕРАЦІЯ CSS-КОДУ
// =============================

function updateCSSCode() {
    const tl = topLeft.value;
    const tr = topRight.value;
    const br = bottomRight.value;
    const bl = bottomLeft.value;

    let code = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;\n`;
    code += `background-color: ${bgColor.value};\n`;
    code += `text-align: ${textAlign.value};`;

    cssCode.value = code;
}

updateCSSCode();


// =============================
// COPY
// =============================

function copyCSS() {
    navigator.clipboard.writeText(cssCode.value)
        .then(function () {
            copyMessage.textContent = 'CSS-код скопійовано';
            setTimeout(function () {
                copyMessage.textContent = '';
            }, 2000);
        })
        .catch(function () {
            copyMessage.textContent = 'Помилка копіювання';
        });
}

copyButton.addEventListener('click', copyCSS);


// =============================
// FORM
// =============================

presetName.addEventListener('focus', function () {
    presetName.classList.add('focused');
});

presetName.addEventListener('blur', function () {
    presetName.classList.remove('focused');

    if (presetName.value.trim() === '') {
        presetName.classList.add('error');
        presetError.textContent = 'Введіть назву пресета';
    } else {
        presetName.classList.remove('error');
        presetError.textContent = '';
    }
});

function handlePresetSubmit(event) {
    event.preventDefault();

    if (presetName.value.trim() === '') {
        presetName.classList.add('error');
        presetError.textContent = 'Введіть назву пресета';
        return;
    }

    presetName.classList.remove('error');
    presetError.textContent = '';

    console.log('Пресет:', presetName.value.trim());
    console.log(cssCode.value);
}

presetForm.addEventListener('submit', handlePresetSubmit);


// =============================
// KEYBOARD
// =============================

function handleKeyDown(event) {
    if (event.key === 'Escape') {
        topLeft.value = 0;
        topRight.value = 0;
        bottomRight.value = 0;
        bottomLeft.value = 0;

        generateBorderRadius();
    }
}

document.addEventListener('keydown', handleKeyDown);


// =============================
// SCROLL
// =============================

function handleScroll() {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleScroll);


// =============================
// SCROLL TOP BUTTON
// =============================

scrollTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// =============================
// TASK 15: EVENT PROPAGATION
// =============================

preview.addEventListener('click', function (event) {
    console.log('Preview click');
});

previewButton.addEventListener('click', function (event) {
    event.stopPropagation();
    console.log('Button click');
});


// =============================
// TASK 16: MOUSE EVENTS
// =============================

preview.addEventListener('mouseover', function () {
    preview.classList.add('hovered');
});

preview.addEventListener('mouseout', function () {
    preview.classList.remove('hovered');
});

preview.addEventListener('mousemove', function (event) {
    coordinates.textContent = `X: ${event.clientX}; Y: ${event.clientY}`;
    console.log('clientX:', event.clientX, 'clientY:', event.clientY);
    console.log('pageX:', event.pageX, 'pageY:', event.pageY);
});