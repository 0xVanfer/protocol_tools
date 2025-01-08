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
    populateDropdown("blockchain_yl_info", "vaultName_yl_info")
    populateDropdown("blockchain_history_csv", "vaultName_history_csv")
    populateDropdown("blockchain_pending_withdrawals", "vaultName_pending_withdrawals")
    populateDropdown("blockchain_user_history", "vaultName_user_history")

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    document.getElementById('start_date_user_history').value = formattedDate;
    document.getElementById('end_date_user_history').value = formattedDate;


    setElementValueAndScrollDown("output", ``);
    unlockButtons('.tag-button');
}

   const currentDate = new Date();
   const formattedDate = currentDate.toISOString().split('T')[0];
   document.getElementById('start_date_user_history').value = formattedDate;


function populateDropdown(chainSelectID, vaultSelectID) {
    const blockchainSelect = document.getElementById(chainSelectID);
    const vaultSelect = document.getElementById(vaultSelectID);

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