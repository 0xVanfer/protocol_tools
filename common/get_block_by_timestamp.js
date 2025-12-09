/**
 * @param {string} chainName - Name of the blockchain (ethereum or arbitrum)
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {Promise<number>} - Block number for the given timestamp
 */
async function getBlockNumberByTimestamp(chainName, timestamp) {
    const CHAIN_IDS = {
        "ethereum": "1",
        "arbitrum": "42161",
        "bsc": "56",
        "mantle": "5000",
        "sei": "1329"
    };
    
    const chainId = CHAIN_IDS[chainName];
    if (!chainId) return 0;

    let uri = "https://api.etherscan.io/v2/api";
    // For all routescan supported chains
    if (chainId === "9745") {
        uri = `https://api.routescan.io/v2/network/mainnet/evm/${chainId}/etherscan/api`
    }

    const apiKey = "DSI4RR76CWXBTFNGRBRW234DNS11YSRCDQ";
    const url = `${uri}?chainid=${chainId}&module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "1" && data.result) {
            return data.result;
        } else {
            throw new Error(data.message || 'Failed to get block number');
        }
    } catch (error) {
        console.error("Error fetching block number:", error);
        return 0; 
    }
}