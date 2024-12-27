function isValidEthereumAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

async function toChecksumAddress(address) {
    return ethers.utils.getAddress(address);
}

async function findAddressesAndChecksum(input){
    const addresses = [];
    let start = 0;

    while ((start = input.indexOf("0x", start)) !== -1) {
        const end = input.indexOf("0x", start + 2);
        let address = '';

        if (end !== -1) {
            address = input.substring(start, end);
        } else {
            address = input.substring(start);
        }

        if (address.length >= 42) {
            address = address.slice(0, 42);
        } else if (address.length < 42) {
            start += 2;
            continue;
        }

        let checksummed = "";
        try {
            checksummed = await toChecksumAddress(address);
        } catch (error) {
            start += 2;
            continue;
        }

        addresses.push(checksummed);
        start += 2;
    }

    return addresses
}