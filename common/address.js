/**
 * @param {string} address - Address to validate
 * @returns {boolean} - True if the address is a valid Ethereum address, false otherwise
 */
// Function to validate Ethereum address
function isValidEthereumAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * @param {string} address - Address to convert to checksummed address
 * @returns {string} - Checksummed address
 */
function toChecksumAddress(address) {
    return ethers.utils.getAddress(address);
}

/**
 * @param {string} input - Input string to search for addresses
 * @returns {Array<string>} - Array of checksummed addresses found in the input string
 */
async function findAddressesAndChecksum(input){
    const addresses = [];
    let start = 0;

    while ((start = input.indexOf("0x", start)) !== -1) {
        let address = input.substring(start, start + 42);

        if (address.length < 42) {
            start += 2;
            continue;
        }

        let checksummed = "";
        try {
            checksummed = toChecksumAddress(address);
        } catch (error) {
            start += 2;
            continue;
        }

        addresses.push(checksummed);
        start += 2;
    }

    return addresses
}