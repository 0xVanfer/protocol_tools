// map[vault address] = vault contract
const vaultContractCache = new Map(); 
// map[vault address] = info; 
// info: {redeem_operator_address, redeem_operator}
const vaultInfoCache = new Map();

async function getVaultContractByAddress(chainName, vaultAddress){
    if (vaultContractCache.has(vaultAddress)) {
        return vaultContractCache.get(vaultAddress);
    }

    const RPC = await getRPCByChainName(chainName);
    if (!RPC) {
        return undefined;
    }

    let abi = abi_yl_common_vault;
    if (vaultAddress === "0x3498fDed9C88Ae83b3BC6a302108F2da408e613b") {
        abi = abi_yl_eco_earn;
    }

    const vault = new ethers.Contract(vaultAddress, abi, RPC);
    vaultContractCache.set(vaultAddress, vault);
    return vault;
}

async function getVaultInfoByAddress(chainName, vaultAddress){
    if (vaultInfoCache.has(vaultAddress)) {
        return vaultInfoCache.get(vaultAddress);
    }

    const RPC = await getRPCByChainName(chainName);
    if (!RPC) {
        return undefined;
    }

    const vault = await getVaultContractByAddress(chainName, vaultAddress);
    if (!vault) {
        return undefined;
    }

    const newVaultInfo = new Map();
    let decimals, underlying, symbol, redeemOperatorAddress, redeemOperator;

    try {
        if (vaultAddress === "0x3498fDed9C88Ae83b3BC6a302108F2da408e613b") {
            const calls = [
                { contract: vault, method: "decimals" },
                { contract: vault, method: "symbol" },
                { contract: vault, method: "asset" },
                { contract: vault, method: "redeemOperator" },
                { contract: vault, method: "exchangePrice" }
            ];
            const results = await executeMulticall(RPC, calls);
            
            decimals = results[0];
            symbol = results[1];
            underlying = results[2];
            redeemOperatorAddress = results[3];
            const lpPrice = ethers.utils.formatUnits(results[4], decimals);
            
            redeemOperator = new ethers.Contract(redeemOperatorAddress, abi_yl_redeem_operator, RPC);

            newVaultInfo.set("revenueRate", 0.1);
            newVaultInfo.set("exitFeeRate", 0);
            newVaultInfo.set("lpPrice", lpPrice);
        } else {
            const calls = [
                { contract: vault, method: "decimals" },
                { contract: vault, method: "getVaultParams" },
                { contract: vault, method: "exchangePrice" }
            ];
            const results = await executeMulticall(RPC, calls);

            decimals = results[0];
            const vaultParams = results[1];
            underlying = vaultParams.underlyingToken;
            symbol = vaultParams.symbol;
            redeemOperatorAddress = vaultParams.redeemOperator;
            const lpPrice = ethers.utils.formatUnits(results[2], decimals);

            newVaultInfo.set("revenueRate", ethers.utils.formatUnits(vaultParams.revenueRate, 4));
            newVaultInfo.set("exitFeeRate", ethers.utils.formatUnits(vaultParams.exitFeeRate, 4));
            newVaultInfo.set("lpPrice", lpPrice);

            let redeemOperatorABI = abi_yl_redeem_operator;
            if (vaultAddress === "0xB13aa2d0345b0439b064f26B82D8dCf3f508775d") {
                redeemOperatorABI = abi_yl_redeem_operator_steth;
            }
            redeemOperator = new ethers.Contract(redeemOperatorAddress, redeemOperatorABI, RPC);
        }

        newVaultInfo.set("underlying", underlying);
        newVaultInfo.set("symbol", symbol);
        newVaultInfo.set("decimals", decimals);
        newVaultInfo.set("redeem_operator_address", redeemOperatorAddress);
        newVaultInfo.set("redeem_operator", redeemOperator);

        vaultInfoCache.set(vaultAddress, newVaultInfo);
        return newVaultInfo;

    } catch (error) {
        console.error(`Error fetching vault info for ${vaultAddress}:`, error);
        return undefined;
    }
}

