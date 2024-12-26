document.getElementById('getHistory').addEventListener('click', async () => {
    const button = document.getElementById('getHistory');
    lockButtons('.tag-button');
    setButtonText(button, 'pending...');
    const blockchain = document.getElementById('blockchain').value;
    const vaultAddress = document.getElementById('vaultName').value;
    const downloadCsv = document.getElementById('downloadCsv').value === 'true';
    const vaultName = document.getElementById('vaultName').selectedOptions[0].textContent.split(' (')[0]; // Get pool name
    const url = `https://yieldlayer.cian.app/${blockchain}/pool/home/vault/history/${vaultAddress}?limit=-1`;

    setElementValueAndScrollDown("output", `Reading from: ${url}`);

    try {
        const response = await fetch(url);
        const res = await response.json();

        const title = ["timestamp", "date", "apy", "tvl asset", "net tvl asset", "tvl usd", "holders count"];
        const rows = res.data.map(line => [
            line.timestamp,
            formatDateOnly(line.timestamp), // Use the new format function
            (line.apy * Math.pow(10, -2)).toString(),  // Assuming APY needs to shift right by 2
            line.tvl_base.toString(),
            line.net_tvl_base.toString(),
            line.tvl_usd.toString(),
            line.holders.length.toString()
        ]);

        // Display JSON output (limit to 30 entries)
        const outputData = res.data.length > 30 ? res.data.slice(0, 30) : res.data;
        document.getElementById('output').value = JSON.stringify(outputData, null, 2);

        if (downloadCsv){
            const csvContent = [title, ...rows].map(e => e.join(",")).join("\n");
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const fileName = `history_${vaultName.replace(/ /g, '_')}_${vaultAddress}_${Date.now()}.csv`;
            const link = document.createElement("a");
            link.setAttribute("href", URL.createObjectURL(blob));
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (error) {
        setElementValueAndScrollDown("output", `Error: ${error.message}`);
    } finally {
        unlockButtons('.tag-button');
        setButtonText(button, 'Get Vault History Info');
    }
})