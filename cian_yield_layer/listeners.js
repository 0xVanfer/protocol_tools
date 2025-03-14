const handleVaultInfoError = (button, message) => {
    setElementValueAndScrollDown("output", message);
    unlockButtons('.tag-button');
    setButtonText(button, button.textContent.replace('pending...', '').trim());
};

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

    setElementValueAndScrollDown("output", `Reading from onchain...`);

    try {
        const vaultInfo = await getVaultInfoByAddress(blockchain, vaultAddress);
        if (!vaultInfo) {
            return handleVaultInfoError(button, "Get vault info error.");
        }

        const redeemOperator = vaultInfo.get("redeem_operator");
        const redeemOperatorAddress = vaultInfo.get("redeem_operator_address");
        if (redeemOperatorAddress === ADDRESS_ZERO) {
            return handleVaultInfoError(button, "Cannot withdraw (?).");
        }

        let pendingUsers, allUsersShares;
        if (vaultAddress === "0xB13aa2d0345b0439b064f26B82D8dCf3f508775d") {
            [pendingUsers, notUsedeETHUsers] = await redeemOperator.allPendingWithdrawers();
        } else {
            pendingUsers = await redeemOperator.allPendingWithdrawers();
        }

        if (!pendingUsers || pendingUsers.length === 0) {
            return handleVaultInfoError(button, "No pending users.");
        }

        allUsersShares = await redeemOperator.withdrawalRequests(pendingUsers);

        let sharesSum = 0;
        let users = [];
        for (let i = 0; i < allUsersShares.length; i++) {
            const user = pendingUsers[i];
            const userShares = ethers.utils.formatUnits(allUsersShares[i], vaultInfo.get("decimals"));
            users.push({ user: user, shares: userShares });
            sharesSum += Number(userShares);
        }

        let table = `User                                        | Shares (total = ${sharesSum})\n`;
        table += "--------------------------------------------|--------------------\n";

        users.forEach(userData => {
            const user = userData.user.padEnd(44, ' ');
            const shares = userData.shares.toString().padStart(8, ' ');
            table += `${user}| ${shares}\n`;
        });

        setElementValueAndScrollDown("output", table);

    } catch (error) {
        setElementValueAndScrollDown("output", `Error: ${error.message}`);
    } finally {
        unlockButtons('.tag-button');
        setButtonText(button, 'Get Vault Pending Withdrawals');
    }
})

document.getElementById('get_yl_info').addEventListener('click', async () => {
    const button = document.getElementById('get_yl_info');
    lockButtons('.tag-button');
    setButtonText(button, 'pending...');
    const blockchain = document.getElementById('blockchain_yl_info').value;
    const vaultAddress = document.getElementById('vaultName_yl_info').value;

    setElementValueAndScrollDown("output", `Reading from onchain...`);

    try {
        const vaultInfo = await getVaultInfoByAddress(blockchain, vaultAddress)
        if (vaultInfo === undefined){
            setElementValueAndScrollDown("output", `Get vault info error.`);
            unlockButtons('.tag-button');
            setButtonText(button, 'Get Vault Info');
            return;
        }
        let output = "";

        output += `vault          : ${vaultAddress}\n`
        output += `symbol         : ${vaultInfo.get("symbol")}\n`
        output += `underlying     : ${vaultInfo.get("underlying")}\n`
        output += `redeem operator: ${vaultInfo.get("redeem_operator_address")}\n`
        output += `performance fee: ${vaultInfo.get("revenueRate")*100}%\n`
        output += `exit fee       : ${vaultInfo.get("exitFeeRate")*100}%\n`
        output += `lp price       : ${vaultInfo.get("lpPrice")}\n`

        setElementValueAndScrollDown("output", output);

    } catch (error) {
        setElementValueAndScrollDown("output", `Error: ${error.message}`);
    } finally {
        unlockButtons('.tag-button');
        setButtonText(button, 'Get Vault Info');
    }
})

document.getElementById('get_user_history').addEventListener('click', async () => {
    const button = document.getElementById('get_user_history');
    lockButtons('.tag-button');
    setButtonText(button, 'pending...');
    const blockchain = document.getElementById('blockchain_user_history').value;
    const vaultAddress = document.getElementById('vaultName_user_history').value;
    const userAddress = document.getElementById('address_input_user_history').value;
    const startDate = document.getElementById('start_date_user_history').value;
    const endDate = document.getElementById('end_date_user_history').value;
    const downloadCsv = document.getElementById('downloadCsv_user_history').value === 'true';
    const vaultName = document.getElementById('vaultName_user_history').selectedOptions[0].textContent.split(' (')[0]; // Get pool name

    let startTimestamp = 0;
    let endTimestamp = 0;

    if (startDate) startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);;
    if (endDate) endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);
    if (startDate >= endDate) {
        setElementValueAndScrollDown("output", `Failed: start date >= end date`);
        unlockButtons('.tag-button');
        setButtonText(button, 'Get User History Info');
        return;
    }

    setElementValueAndScrollDown("output", `Reading from onchain...`);

    try {
        const vaultContract = await getVaultContractByAddress(blockchain, vaultAddress);
        if (!vaultContract) {
            return handleVaultInfoError(button, "Get vault contract error.");
        }

        const vaultInfo = await getVaultInfoByAddress(blockchain, vaultAddress);
        if (!vaultInfo) {
            return handleVaultInfoError(button, "Get vault info error.");
        }

        const decimals = vaultInfo.get("decimals");
        let res = [];

        for (let timestamp = startTimestamp; timestamp < endTimestamp; timestamp += 86400) {
            const blockNum = await getBlockNumberByTimestamp(blockchain, timestamp);
            if (blockNum === 0) {
                continue;
            }
            const balanceBig = await vaultContract.balanceOf(userAddress, { blockTag: Number(blockNum) });
            const totalSupplyBig = await vaultContract.totalSupply({ blockTag: Number(blockNum) });
            const balance = ethers.utils.formatUnits(balanceBig, decimals);
            const totalSupply = ethers.utils.formatUnits(totalSupplyBig, decimals);
            res.push({
                "timestamp": timestamp,
                "date": new Date(timestamp * 1000).toISOString().split('T')[0],
                "shares": balance,
                "total supply": totalSupply,
                "weight": (balance / totalSupply).toFixed(8),
            });
            setElementValueAndScrollDown("output", JSON.stringify(res, null, 2));
        }

        if (downloadCsv) downloadJsonToCsv(res, `user_history_shares_${vaultName}_${userAddress}_${startDate}_${endDate}.csv`)
        return;

    } catch (error) {
        setElementValueAndScrollDown("output", `Error: ${error.message}`);
    } finally {
        unlockButtons('.tag-button');
        setButtonText(button, 'Get User History Info');
    }
})