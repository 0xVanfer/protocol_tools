/**
 * @param {string} selector - CSS selector for the buttons to lock
 */
// Function to lock buttons
function lockButtons(selector){
    document.querySelectorAll(selector).forEach(button => {
        button.disabled = true;
        button.style.backgroundColor = '#ddd';
        button.style.cursor = 'not-allowed';
    });
}

/**
 * @param {string} selector - CSS selector for the buttons to unlock
 */
// Function to unlock buttons
function unlockButtons(selector) {
    document.querySelectorAll(selector).forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '';  // Reset button color
        button.style.cursor = 'pointer';
    });
}

/**
 * @param {HTMLElement} button - The button element to set text on
 * @param {string} text - The text to set on the button
 */
// Function to set button text
function setButtonText(button, text) {
    button.textContent = text;
}

/**
 * @param {HTMLElement} button - The button element that was clicked
 * @param {string} text - The text to copy to the clipboard
 */
// Function to copy text to clipboard
function copyToClipboard(button, text) {
    navigator.clipboard.writeText(text);
    const copiedText = button.nextElementSibling;
    copiedText.style.visibility = 'visible';
    setTimeout(() => {
        copiedText.style.visibility = 'hidden';
    }, 1000);
}
