// map[vault address] = vault contract
const vaultContractCache = new Map(); 
// map[vault address] = info; 
// info: {redeem_operator_address, redeem_operator}
const vaultInfoCache = new Map();

async function getVaultContractByAddress(chainName, vaultAddress){
    if (vaultContractCache.has(vaultAddress)) {
        const vault = vaultContractCache.get(vaultAddress);
        return vault;
    } else {
        const RPC = await getRPCByChainName(chainName)
        if (RPC === undefined){
            return undefined;
        }
        const vault = new ethers.Contract(vaultAddress, abi_yl_common_vault, RPC);
        vaultContractCache.set(vaultAddress, vault);
        return vault;
    }
}

async function getVaultInfoByAddress(chainName, vaultAddress){
    if (vaultInfoCache.has(vaultAddress)) {
        const vaultInfo = vaultInfoCache.get(vaultAddress);
        return vaultInfo;
    } else {
        const RPC = await getRPCByChainName(chainName)
        if (RPC === undefined){
            return undefined;
        }
        const vault = await getVaultContractByAddress(chainName, vaultAddress);
        if (vault === undefined){
            return undefined;
        }
        const newVaultInfo = new Map();

        const decimals = await vault.decimals();
        const vaultParams = await vault.getVaultParams();
        const lpPrice = ethers.utils.formatUnits((await vault.exchangePrice()),decimals);

        newVaultInfo.set("underlying", vaultParams.underlyingToken);
        newVaultInfo.set("symbol", vaultParams.symbol);
        newVaultInfo.set("decimals", decimals);
        newVaultInfo.set("revenueRate", ethers.utils.formatUnits(vaultParams.revenueRate, 4));
        newVaultInfo.set("exitFeeRate", ethers.utils.formatUnits(vaultParams.exitFeeRate, 4));
        newVaultInfo.set("lpPrice", lpPrice);

        let redeemOperator;
        if (vaultAddress === "0xB13aa2d0345b0439b064f26B82D8dCf3f508775d") {
            redeemOperator = new ethers.Contract(vaultParams.redeemOperator, abi_yl_redeem_operator_steth, RPC);
        } else {
            redeemOperator = new ethers.Contract(vaultParams.redeemOperator, abi_yl_redeem_operator, RPC);
        }
        newVaultInfo.set("redeem_operator_address", vaultParams.redeemOperator);
        newVaultInfo.set("redeem_operator", redeemOperator);

        vaultInfoCache.set(vaultAddress, newVaultInfo);
        return newVaultInfo;
    }
}

