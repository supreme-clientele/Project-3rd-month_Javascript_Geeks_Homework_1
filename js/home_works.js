// Gmail Checker

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


function moveBlock(block, currentPosition, endPosition) {
    if (currentPosition < endPosition) {
        currentPosition++;
        block.style.left = `${currentPosition}px`;
        requestAnimationFrame(() => moveBlock(block, currentPosition, endPosition));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const childBlock = document.querySelector('.child_block');
    const parentBlock = document.querySelector('.parent_block');
    const endPosition = parentBlock.clientWidth - childBlock.clientWidth;

    moveBlock(childBlock, 0, endPosition);
});