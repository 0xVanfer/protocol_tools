document.getElementById('readBtn').addEventListener('click', async () => {
    const button = document.getElementById('readBtn');
    lockButtons('.tag-button');
    try {
        setButtonText(button, 'pending...');
        await updateEQBPendleBooster(true);
        document.getElementById('output').value = `EQB Real Time Pool Length: ${EQBPoolLength}\nEQB Local Pool Length: ${EQBPoolLength_local}\nEQB Local Pool Updated At: ${EQB_pool_local_last_updated} UTC`;
    } catch (error) {
        document.getElementById('output').value = `Error: ${error.message}`;
    } finally {
        setButtonText(button, 'Read');
        unlockButtons('.tag-button');
    }
});

document.getElementById('getPoolInfoBtn').addEventListener('click', async () => {
    const button = document.getElementById('getPoolInfoBtn');
    lockButtons('.tag-button');
    try {
        setButtonText(button, 'pending...');
        await updateEQBPendleBooster(false);
        const downloadJS = document.getElementById('download_eqb_pools').value === 'js';
        const downloadJSON = document.getElementById('download_eqb_pools').value === 'json';
        output = await updateEQBPendleDetails(true, true)

        if (downloadJS) {
            saveEQBPoolsResultAsJSFile(output);
        }else if (downloadJSON){
            saveEQBPoolsResultAsJSONFile(output);
        }
    } catch (error) {
        setElementValueAndScrollDown("output", `Error: ${error.message}`);
    } finally {
        setButtonText(button, 'Get Pool Info');
        unlockButtons('.tag-button');
    }
});

document.getElementById('getPendleApiBtn').addEventListener('click', async () => {
    const button = document.getElementById('getPendleApiBtn');
    lockButtons('.tag-button');
    try {
        setButtonText(button, 'pending...');
        const chainID = document.getElementById('pendle_api_chain_id').value;
        const filter = document.getElementById('pendle_api_filter').value;
        const url =`https://api-v2.pendle.finance/core/v1/${chainID}/markets?order_by=name:1&skip=0&limit=100&is_expired=false&q=${filter}`
        setElementValueAndScrollDown("output", `New window opened for:\n${url}`);
        window.open(url, '_blank');
    } catch (error) {
        setElementValueAndScrollDown("output", `Error: ${error.message}`);
    } finally {
        setButtonText(button, 'Request Api');
        unlockButtons('.tag-button');
    }
});