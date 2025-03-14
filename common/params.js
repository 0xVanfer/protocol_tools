// Base path, some pages might override this.
let toHome = "../"

// Zero address
const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

// Default RPC endpoints
const DEFAULT_RPC_ETHEREUM = "https://rpc.ankr.com/eth";
const DEFAULT_RPC_ARBITRUM = "https://rpc.ankr.com/arbitrum";
    
// RPC providers
let RPC_PROVIDER_ETH = new ethers.providers.JsonRpcProvider(DEFAULT_RPC_ETHEREUM);
let RPC_PROVIDER_ARB = new ethers.providers.JsonRpcProvider(DEFAULT_RPC_ARBITRUM);

// Contract addresses
const EQB_PENDLE_BOOSTER_ADDRESS = "0x4D32C8Ff2fACC771eC7Efc70d6A8468bC30C26bF";

/**
 * @param {string} name - Chain name (ethereum or arbitrum)
 * @returns {ethers.providers.JsonRpcProvider|undefined} - RPC provider for the given chain
 */
async function getRPCByChainName(name){
    let RPC;
    if (name === "ethereum") {
        RPC = RPC_PROVIDER_ETH;
    } else if (name === "arbitrum") {
        RPC = RPC_PROVIDER_ARB;
    } else {
        return undefined;
    }
    return RPC;
}