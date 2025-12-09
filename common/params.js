// Base path, some pages might override this.
let toHome = "../"

// Zero address
const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

// Default RPC endpoints
// https://chainlist.org/?search=<CHAINID>&testnets=false
const DEFAULT_RPC_ETHEREUM = "https://1rpc.io/eth";
const DEFAULT_RPC_ARBITRUM = "https://arbitrum-one-rpc.publicnode.com";
const DEFAULT_RPC_BSC = "https://bsc.meowrpc.com";
const DEFAULT_RPC_MANTLE = "https://rpc.mantle.xyz";
const DEFAULT_RPC_SEI = "https://sei.drpc.org";
    
// RPC providers
let RPC_PROVIDER_ETH = new ethers.providers.JsonRpcProvider(DEFAULT_RPC_ETHEREUM);
let RPC_PROVIDER_ARB = new ethers.providers.JsonRpcProvider(DEFAULT_RPC_ARBITRUM);
let RPC_PROVIDER_BSC = new ethers.providers.JsonRpcProvider(DEFAULT_RPC_BSC);
let RPC_PROVIDER_MANTLE = new ethers.providers.JsonRpcProvider(DEFAULT_RPC_MANTLE);
let RPC_PROVIDER_SEI = new ethers.providers.JsonRpcProvider(DEFAULT_RPC_SEI);

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
    } else if (name === "bsc") {
        RPC = RPC_PROVIDER_BSC;
    } else if (name === "mantle") {
        RPC = RPC_PROVIDER_MANTLE;
    } else if (name === "sei") {
        RPC = RPC_PROVIDER_SEI;
    } else {
        return undefined;
    }
    return RPC;
}