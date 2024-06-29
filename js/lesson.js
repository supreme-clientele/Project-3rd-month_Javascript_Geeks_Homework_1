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

// ПЕРЕПИСАЛ С ИСПОЛЬЗОВАНИЕМ ASYNC/AWAIT И TRY/CATCH
// убрал targetElement после element, он был объявлен, но не использовался
const converter = (element) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json')
            const data = await response.json();
        
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
        } catch (error) {
            console.log(error)
        }
    }
}

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

const todosURL = 'https://jsonplaceholder.typicode.com/todos/'

// ПЕРЕПИСАЛ С ИСПОЛЬЗОВАНИЕМ ASYNC/AWAIT И TRY/CATCH
async function loadCard(number) {
    try {
        const response = await fetch(`${todosURL}${number}`)
        const data = await response.json()

        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>ID: ${data.id}</span>
        `
    } catch {
        console.log(error)
    }  
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


// fetch запрос на https://jsonplaceholder.typicode.com/posts и вывод в консоль

// ПЕРЕПИСАЛ С ИСПОЛЬЗОВАНИЕМ ASYNC/AWAIT И TRY/CATCH
const getDataAsync = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        console.log('data:', data)
    } catch (error) {
        console.log(error)
    }
}

getDataAsync()


// WEATHER

const searchInput = document.querySelector('.cityName')
// const searchButton = document.querySelector('#search')

const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

const URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

// query params = параметры запроса
// ПЕРЕПИСАЛ С ИСПОЛЬЗОВАНИЕМ ASYNC/AWAIT И TRY/CATCH
const citySearch = () => {
    searchInput.oninput = async (event) => {
        searchInput.onkeydown = async (event) => {
            if (event.code.toLowerCase() === 'enter') {
                try {
                    const response = await fetch(`${URL}?q=${event.target.value}&appid=${API_KEY}`);
                    const data = await response.json();

                    city.innerHTML = data.name ? data.name : 'Город не найден...';
                    temp.innerHTML = data.main?.temp ? `${Math.round(data.main.temp - 273)}&deg;C` : '///';

                    if (!event.target.value) {
                        city.innerHTML = '';
                        temp.innerHTML = '';
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
}

citySearch()

// optional chaining - опциональная цепочка - ?.


