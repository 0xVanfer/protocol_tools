// Helper function to lock/unlock the UI
function lockUI() {
    // Disable all buttons
    document.querySelectorAll('.tag-button').forEach(button => {
        button.disabled = true;
        button.style.backgroundColor = '#ddd';  // Change button color to indicate disabled state
        button.style.cursor = 'not-allowed';
    });
}

function unlockUI() {
    // Enable all buttons
    document.querySelectorAll('.tag-button').forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '';  // Reset button color
        button.style.cursor = 'pointer';
    });
}

// Helper function to update button text
function setButtonText(button, text) {
    button.textContent = text;
}