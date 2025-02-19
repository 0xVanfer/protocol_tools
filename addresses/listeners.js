document.getElementById('findAddressBtn').addEventListener('click', async () => {
    const button = document.getElementById('findAddressBtn');
    lockButtons('.tag-button');
    setButtonText(button, 'pending...');
    const chainID = document.getElementById('chain_id').value;
    const filters = document.getElementById('filters').value;
    const linkNeeded = document.getElementById('need_blockscan_links').value === 'true';
    const url = `https://what.vanfer.tech/list/addresses?chain=${chainID}&link=${linkNeeded}&q=${filters}`

    setElementValueAndScrollDown("output", `Reading from: ${url}`);

    try {
        const response = await fetch(url);
        const res = await response.json();
        setElementValueAndScrollDown("output", JSON.stringify(res.data, null, 2));
    } catch (error) {
        setElementValueAndScrollDown("output", `Error: ${error.message}`);
    } finally {
        unlockButtons('.tag-button');
        setButtonText(button, 'Find Address');
    }
})