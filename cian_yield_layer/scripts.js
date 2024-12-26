const networks = ["ethereum", "arbitrum"];
const mapping = {};

async function fetchVaults(network) {
    const url = `https://yieldlayer.cian.app/${network}/pool/home/vaults`;
    const response = await fetch(url);
    const res = await response.json();

    if (res.data) {
        res.data.forEach(item => {
            mapping[network] = mapping[network] || {};
            mapping[network][item.pool_name] = item.pool_address;
        });
    }
}

async function initializeMappings() {
    lockButtons('.tag-button');
    for (const network of networks) {
        setElementValueAndScrollDown("output", `Fetching ${network} Vaults List...`);
        await fetchVaults(network);
    }
    setElementValueAndScrollDown("output", `Processing Options...`);
    populateDropdown();
    setElementValueAndScrollDown("output", ``);
    unlockButtons('.tag-button');
}

function populateDropdown() {
    const blockchainSelect = document.getElementById('blockchain');
    const vaultSelect = document.getElementById('vaultName');

    networks.forEach(network => {
        const option = document.createElement('option');
        option.value = network;
        option.textContent = network.charAt(0).toUpperCase() + network.slice(1);
        blockchainSelect.appendChild(option);
    });

    blockchainSelect.addEventListener('change', () => {
        vaultSelect.innerHTML = ''; // Clear previous options
        const selectedNetwork = blockchainSelect.value;
        Object.entries(mapping[selectedNetwork] || {}).forEach(([poolName, poolAddress]) => {
            const option = document.createElement('option');
            option.value = poolAddress;
            option.textContent = `${poolName} (${poolAddress.substring(0, 6)})`;
            vaultSelect.appendChild(option);
        });
    });

    // Trigger change event to load initial vaults
    blockchainSelect.dispatchEvent(new Event('change'));
}

window.onload = initializeMappings;