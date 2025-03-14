/**
 * @param {string} chainName - Name of the blockchain (ethereum or arbitrum)
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {Promise<number>} - Block number for the given timestamp
 */
async function getBlockNumberByTimestamp(chainName, timestamp) {
    let uri;
    let apiKey;
    if (chainName === "ethereum"){
        uri = "https://api.etherscan.io";
        apiKey = "BJ8RVG5I54Z9ZQ89R96F1KQ2UY7PF2N6JF";
    } else if (chainName === "arbitrum"){
        uri = "https://api.arbiscan.io";
        apiKey = "BCJX4984KDQ8A3U9WWH8P2EQKN76YV8T5T";
    } else {
        return 0;
    }

    const url = `${uri}/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "1" && data.result) {
            return data.result;
        } else {
            throw new Error('Failed to get block number');
        }
    } catch (error) {
        return 0; 
    }
}