document.getElementById('convertAddressesBtn').addEventListener('click', async () => {
    const button = document.getElementById('convertAddressesBtn');
    lockButtons('.tag-button');
    setButtonText(button, 'pending...');

    const input = document.getElementById('addressesInput').value.trim();
    const outputElement = document.getElementById('output');
    const addresses = await findAddressesAndChecksum(input);

    outputElement.innerHTML += '<hr>';

    addresses.forEach(addr => {
        const lowercaseAddress = addr.toLowerCase();
        outputElement.innerHTML += `
            <div class="result">
                <strong>Checksum Address:</strong> 
                <span class="address">${addr}</span>
                <button class="copy-btn" onclick="copyToClipboard(this, '${addr}')">copy</button>
                <span class="copied">Copied!</span>
            </div>
            <div class="result">
                <strong>Lowercase Address:</strong> 
                <span class="address">${lowercaseAddress}</span>
                <button class="copy-btn" onclick="copyToClipboard(this, '${lowercaseAddress}')">copy</button>
                <span class="copied">Copied!</span>
            </div>
            <div class="empty-line"></div>
        `;
        outputElement.scrollTop = outputElement.scrollHeight;
    });

    document.getElementById('addressesInput').value = '';
    unlockButtons('.tag-button');
    setButtonText(button, 'Convert');
});