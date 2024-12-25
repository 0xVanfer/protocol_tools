const EQB_PENDLE_BOOSTER_ADDRESS = "0x4D32C8Ff2fACC771eC7Efc70d6A8468bC30C26bF";
const DEFAULT_RPC_ETHEREUM = "https://rpc.ankr.com/eth";
            
const RPC_PROVIDER = new ethers.providers.JsonRpcProvider(DEFAULT_RPC_ETHEREUM);

let EQB_PENDLE_BOOSTER;
let EQBPoolLength;
let EQBPoolLength_local;
let EQB_pool_local_last_updated;
let printAll = false;

async function updateEQBPendleBooster() {
    EQBPoolLength_local = saved_eqb_pools.length;
    EQB_pool_local_last_updated = formatTimeUTC(saved_eqb_pools_updated_at)
    if (EQB_PENDLE_BOOSTER && EQBPoolLength !== 0) {
        return;
    }
    EQB_PENDLE_BOOSTER = new ethers.Contract(EQB_PENDLE_BOOSTER_ADDRESS, abi_iequilibria_pendle_booster_mainchain, RPC_PROVIDER);
    EQBPoolLength = await EQB_PENDLE_BOOSTER.poolLength();
}

function saveEQBPoolsResultAsJSFile(output) {
    const timestamp = Date.now();
    const jsContent = `const saved_eqb_pools = ${output};

const saved_eqb_pools_updated_at = ${timestamp};`;

    const blob = new Blob([jsContent], { type: 'application/javascript' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'saved_eqb_pools.js';
    link.click();
}

function formatEQBPoolJSON2Output(info, printAll = true){
    let output = "";
    output += `  {\n`;
    output += `    "eqb_pid": "${info.eqb_pid}",\n`;
    output += `    "pendle_lpt": "${info.pendle_lpt}",\n`;
    output += `    "pendle_lpt_expiry": "${info.pendle_lpt_expiry}",\n`;
    if (printAll){
        output += `    "sy_symbol": "${info.sy_symbol}",\n`;
        output += `    "pendle_SY": "${info.pendle_SY}",\n`;
        output += `    "pendle_PT": "${info.pendle_PT}",\n`;
        output += `    "pendle_YT": "${info.pendle_YT}",\n`;
        output += `    "eqb_token": "${info.eqb_token}",\n`;
    }
    output += `    "eqb_reward_pool": "${info.eqb_reward_pool}",\n`;
    output += `  }`;
    return output;
}
