const redeemOperatorCache = new Map();

document.getElementById('getHistory_history_csv').addEventListener('click', async () => {
    const button = document.getElementById('getHistory_history_csv');
    lockButtons('.tag-button');
    setButtonText(button, 'pending...');
    const blockchain = document.getElementById('blockchain_history_csv').value;
    const vaultAddress = document.getElementById('vaultName_history_csv').value;
    const downloadCsv = document.getElementById('downloadCsv_history_csv').value === 'true';
    const vaultName = document.getElementById('vaultName_history_csv').selectedOptions[0].textContent.split(' (')[0]; // Get pool name
    const url = `https://yieldlayer.cian.app/${blockchain}/pool/home/vault/history/${vaultAddress}?limit=-1`;

    setElementValueAndScrollDown("output", `Reading from: ${url}`);

    try {
        const response = await fetch(url);
        const res = await response.json();

        const title = ["timestamp", "date", "apy", "tvl asset", "net tvl asset", "tvl usd", "holders count"];
        const rows = res.data.map(line => [
            line.timestamp,
            formatDateTime(line.timestamp), // Use the new format function
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

document.getElementById('get_pending_withdrawals').addEventListener('click', async () => {
    const button = document.getElementById('get_pending_withdrawals');
    lockButtons('.tag-button');
    setButtonText(button, 'pending...');
    const blockchain = document.getElementById('blockchain_pending_withdrawals').value;
    const vaultAddress = document.getElementById('vaultName_pending_withdrawals').value;
    // const vaultName = document.getElementById('vaultName_pending_withdrawals').selectedOptions[0].textContent.split(' (')[0]; // Get pool name

    setElementValueAndScrollDown("output", `Reading from onchain...`);

    try {
        let RPC;
        let users = [];

        if (blockchain === "ethereum") {
            RPC = RPC_PROVIDER_ETH;
        } else if (blockchain === "arbitrum") {
            RPC = RPC_PROVIDER_ARB;
        } else {
            setElementValueAndScrollDown("output", `Not supported chain: ${blockchain}`);
            unlockButtons('.tag-button');
            setButtonText(button, 'Get Vault History Info');
            return;
        }

        let redeemOperator;
        let pendingUsers, notUsedeETHUsers, allUsersShares;
        if (redeemOperatorCache.has(vaultAddress)) {
            redeemOperator = redeemOperatorCache.get(vaultAddress);
        } else {
            const vault = new ethers.Contract(vaultAddress, abi_yl_common_vault, RPC);
            const vaultParams = await vault.getVaultParams();
            const redeemOperatorAddress = vaultParams.redeemOperator;

            if (vaultAddress === "0xB13aa2d0345b0439b064f26B82D8dCf3f508775d") {
                redeemOperator = new ethers.Contract(redeemOperatorAddress, abi_yl_redeem_operator_steth, RPC);
            } else {
                redeemOperator = new ethers.Contract(redeemOperatorAddress, abi_yl_redeem_operator, RPC);
            }
            // Cache the redeemOperator contract instance for future use
            redeemOperatorCache.set(vaultAddress, redeemOperator);
        }

        if (vaultAddress === "0xB13aa2d0345b0439b064f26B82D8dCf3f508775d") {
            [pendingUsers, notUsedeETHUsers] = await redeemOperator.allPendingWithdrawers();
            if (pendingUsers.length === 0){
                setElementValueAndScrollDown("output", `[]`);
                unlockButtons('.tag-button');
                setButtonText(button, 'Get Vault History Info');
                return;
            }
            allUsersShares = await redeemOperator.withdrawalRequests(pendingUsers);
        } else {
            pendingUsers = await redeemOperator.allPendingWithdrawers();
            if (pendingUsers.length === 0){
                setElementValueAndScrollDown("output", `[]`);
                unlockButtons('.tag-button');
                setButtonText(button, 'Get Vault History Info');
                return;
            }
            allUsersShares = await redeemOperator.withdrawalRequests(pendingUsers);
        }

        for (let i = 0; i < allUsersShares.length; i++) {
            const user = pendingUsers[i];
            const userShares = ethers.utils.formatUnits(allUsersShares[i], 18);
            users.push({user: user, shares: userShares});
        }

        setElementValueAndScrollDown("output", JSON.stringify(users, null, 2));

    } catch (error) {
        setElementValueAndScrollDown("output", `Error: ${error.message}`);
    } finally {
        unlockButtons('.tag-button');
        setButtonText(button, 'Get Vault History Info');
    }
})