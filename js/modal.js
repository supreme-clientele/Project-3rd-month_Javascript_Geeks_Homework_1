// MODAL

const modal = document.querySelector('.modal');
const modalTriggerButton = document.querySelector('#btn-get');
const modalCloseButton = document.querySelector('.modal_close');
// переменная, отслеживающая, было ли уже показано модальное окно
// let, так как это изменяемая переменнная во время выполнения
let hasModalBeenShown = false;

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
};


// Вызывает модальное окно по скролу до конца страницы один раз
const showModalOnScroll = () => {
    if (!hasModalBeenShown && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal();
        hasModalBeenShown = true;
        window.removeEventListener('scroll', showModalOnScroll);
    }
};

// modalTriggerButton.onclick = () => {
//     openModal()
// };

// эту же функцию сократили в одну строку
modalTriggerButton.onclick = () => openModal();
modalCloseButton.onclick = () => closeModal();
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    };
};

window.addEventListener('scroll', showModalOnScroll);

// Открытие модального окна через 10 секунд после загрузки страницы
setTimeout(() => {
    if (!hasModalBeenShown) {
        openModal();
        hasModalBeenShown = true;
    }
}, 10000);