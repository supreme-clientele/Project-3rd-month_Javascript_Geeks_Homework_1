// GMAIL BLOCK
const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

// const regExp = /^[xa-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// регулярное выражение для проверки любого email, оставил для себя

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
    } else {
        gmailResult.innerHTML = 'NOT OK'
        gmailResult.style.color = 'red'
    }
}


// MOVE BLOCK
const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let positionX = 0, positionY = 0;

const clientParentWidth = parentBlock.clientWidth - childBlock.clientWidth;
const clientParentHeight = parentBlock.clientHeight - childBlock.clientHeight;

const moveBlock = () => {
    if (positionX < clientParentWidth && positionY === 0) {
        positionX++
        childBlock.style.left = `${positionX}px`
    } else if (positionX >= clientParentWidth && positionY < clientParentHeight) {
        positionY++
        childBlock.style.top = `${positionY}px`
    } else if (positionY >= clientParentHeight && positionX > 0) {
        positionX--;
        childBlock.style.left = `${positionX}px`;
    } else if (positionX <= 0 && positionY > 0) {
        positionY--;
        childBlock.style.top = `${positionY}px`;
    } 

    requestAnimationFrame(moveBlock);
};

moveBlock();


// STOP WATCH
let seconds = 0;
let intervalId;

const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', () => {
    if (!intervalId) {
        intervalId = setInterval(() => {
            seconds++;
            secondsElement.textContent = seconds;
        }, 1000);
    }
});

stopButton.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
});

resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    seconds = 0;
    secondsElement.textContent = seconds;
});

