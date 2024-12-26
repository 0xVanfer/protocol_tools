function lockButtons(selector){
    document.querySelectorAll(selector).forEach(button => {
        button.disabled = true;
        button.style.backgroundColor = '#ddd';
        button.style.cursor = 'not-allowed';
    });
}

function unlockButtons(selector) {
    document.querySelectorAll(selector).forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '';  // Reset button color
        button.style.cursor = 'pointer';
    });
}

function setButtonText(button, text) {
    button.textContent = text;
}