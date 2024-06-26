// Phone Checker

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    };
};


// TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabContentItems = document.querySelectorAll('.tab_content_item');
const tabParent = document.querySelector('.tab_content_items');
let currentIndex = 0;
let interval;

const hideTabContent = () => {
    tabContentBlocks.forEach ((item) => {
        item.style.display = 'none';
    });
    tabContentItems.forEach ((item) => {
        item.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block';
    tabContentItems[index].classList.add('tab_content_item_active');
};

const startSlider = () => {
    interval = setInterval(() => {
        hideTabContent();
        currentIndex = (currentIndex + 1) % tabContentBlocks.length;
        showTabContent(currentIndex);
    }, 3000);
};

const stopSlider = () => {
    clearInterval(interval);
};

hideTabContent();
showTabContent();
startSlider();

tabParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabContentItems.forEach((item, index) => {
            if (event.target === item) {
                hideTabContent();
                showTabContent(index);
                currentIndex = index;  // Обновляет currentIndex на индекс нажатого таба
                stopSlider();          // Останавливает автоматическое переключение
                startSlider();         // Перезапускает автоматическое переключение
            };
        });
    };
};


// CONVERTER
const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
        request.open('GET', '../data/converter.json')
        request.setRequestHeader('Content-type', 'application/json')
        request.send()

        request.onload = () => {
            const data = JSON.parse(request.response)

            if (element.id === 'som') {
                usdInput.value = (element.value * data.som_to_usd).toFixed(2);
                eurInput.value = (element.value * data.som_to_eur).toFixed(2);
            }

            if (element.id === 'usd') {
                eurInput.value = (element.value * data.usd_to_eur).toFixed(2);
                somInput.value = (element.value / data.som_to_usd).toFixed(2);
            }

            if (element.id === 'eur') {
                somInput.value = (element.value / data.som_to_eur).toFixed(2);
                usdInput.value = (element.value / data.usd_to_eur).toFixed(2);
            }

            if (element.value === '') {
                somInput.value = '';
                usdInput.value = '';
                eurInput.value = '';
            }
        };
    };
};

converter(somInput, usdInput);
converter(usdInput, somInput);
converter(somInput, eurInput);
converter(eurInput, somInput);
converter(usdInput, eurInput);
converter(eurInput, usdInput);


// CARD SWITCHER
const cardBlock = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')
let cardNumber = 1


function loadCard(number) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${number}`)
        .then(response => response.json())
        .then(data => {
            cardBlock.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>ID: ${data.id}</span>
            `
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadCard(cardNumber);
});

btnNext.onclick = () => {
    if (cardNumber < 200) {
        cardNumber++;
    } else {
        cardNumber = 1;
    }
    loadCard(cardNumber);
}

btnPrev.onclick = () => {
    if (cardNumber > 1) {
        cardNumber--;
    } else {
        cardNumber = 200;
    }
    loadCard(cardNumber);
}


// fetch запрос на https://jsonplaceholder.typicode.com/posts
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        console.log('data:', data);
    });
