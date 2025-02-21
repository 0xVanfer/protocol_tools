document.getElementById('findAddressBtn').addEventListener('click', async () => {
    const button = document.getElementById('findAddressBtn');
    lockButtons('.tag-button');
    setButtonText(button, 'pending...');
    const chainID = document.getElementById('chain_id').value;
    const filters = document.getElementById('filters').value;
    const url = `https://what.vanfer.tech/list/addresses?chain=${chainID}&link=true&q=${filters}`

    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `Reading from: ${url}`; 

    try {
        const response = await fetch(url);
        const res = (await response.json()).data;

        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = ""; 

        Object.keys(res).forEach(key => {
            const { address, chain_id, link } = res[key];
            const entryDiv = document.createElement("div");

            entryDiv.innerHTML = `
                <div><strong>${key}</strong></div>
                <div>
                    Chain ID: ${chain_id}<br> 
                    Address: <a href="${link}" target="_blank" class="address-link">${address}</a>
                    <button class="copy-btn" onclick="copyToClipboard(this, '${address}')">Copy Address</button>
                    <span class="copied">Copied!</span></div>
                    <hr>
                </div>
            `;
            outputDiv.appendChild(entryDiv);
        });
    } catch (error) {
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = `Error: ${error.message}`; 
    } finally {
        unlockButtons('.tag-button');
        setButtonText(button, 'Find Address');
    }
})