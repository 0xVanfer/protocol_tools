const MULTICALL3_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";

/**
 * Executes a multicall.
 * @param {ethers.providers.Provider} provider - The RPC provider.
 * @param {Array<{contract: ethers.Contract, method: string, params: Array}>} calls - Array of call objects.
 * @returns {Promise<Array>} - Array of results.
 */
async function executeMulticall(provider, calls) {
    const multicallContract = new ethers.Contract(MULTICALL3_ADDRESS, abi_multicall3, provider);
    
    const callRequests = calls.map(call => {
        return {
            target: call.contract.address,
            allowFailure: true, 
            callData: call.contract.interface.encodeFunctionData(call.method, call.params || [])
        };
    });

    try {
        const response = await multicallContract.callStatic.aggregate3(callRequests);
        
        return response.map((res, index) => {
            const call = calls[index];
            if (!res.success) {
                console.error(`Multicall failed for ${call.method} on ${call.contract.address}`);
                return null;
            }
            try {
                const result = call.contract.interface.decodeFunctionResult(call.method, res.returnData);
                return result.length === 1 ? result[0] : result;
            } catch (e) {
                console.error("Error decoding result for", call.method, e);
                return null;
            }
        });
    } catch (error) {
        console.error("Multicall execution failed:", error);
        throw error;
    }
}
