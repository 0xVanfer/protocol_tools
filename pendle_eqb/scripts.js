const EQB_PENDLE_BOOSTER_ADDRESS = "0x4D32C8Ff2fACC771eC7Efc70d6A8468bC30C26bF";
const DEFAULT_RPC_ETHEREUM = "https://rpc.ankr.com/eth";
            
const RPC_PROVIDER = new ethers.providers.JsonRpcProvider(DEFAULT_RPC_ETHEREUM);

function saveEQBPoolsResultAsJSFile(output) {
    const blob = new Blob([`const saved_eqb_pools = ${output};`], { type: 'application/javascript' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'saved_eqb_pools.js';
    link.click();
}

function formatEQBPoolOutput(
    expiry, 
    sy_symbol, 
    pendle_lpt, 
    pendle_sy, 
    pendle_pt, 
    pendle_yt, 
    eqb_pid, 
    eqb_token, 
    eqb_reward_pool,
    
    printAll = false,
    need_sy_symbol = true || printAll, 
    need_pendle_sy = false || printAll, 
    need_pendle_pt = false || printAll, 
    need_pendle_yt = false || printAll, 
    need_eqb_token = false || printAll, 
    need_eqb_reward_pool = true || printAll
    ){
        let output = "";
        output += `  {\n`;
        output += `    "eqb_pid": "${eqb_pid}",\n`;
        output += `    "pendle_lpt": "${pendle_lpt}",\n`;
        output += `    "pendle_lpt_expiry": "${expiry}",\n`;
        if (need_sy_symbol){output += `    "sy_symbol": "${sy_symbol}",\n`;}
        if (need_pendle_sy){output += `    "pendle_SY": "${pendle_sy}",\n`;}
        if (need_pendle_pt){output += `    "pendle_PT": "${pendle_pt}",\n`;}
        if (need_pendle_yt){output += `    "pendle_YT": "${pendle_yt}",\n`;}
        if (need_eqb_token){output += `    "eqb_token": "${eqb_token}",\n`;}
        if (need_eqb_reward_pool){output += `    "eqb_reward_pool": "${eqb_reward_pool}",\n`;}
        output += `  }`;
        return output;
}