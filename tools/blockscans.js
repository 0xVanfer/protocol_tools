const blockscans = [
    { name: "Arbitrum (42161)", url: "https://arbiscan.io/" },
    { name: "Avalanche (43114)", url: "https://snowscan.xyz/" },
    { name: "Base (8453)", url: "https://basescan.org/" },
    { name: "Bera (80094)", url: "https://berascan.com/" },
    { name: "Blast (81457)", url: "https://blastscan.io/" },
    { name: "BSC (56)", url: "https://bscscan.com/" },
    { name: "Celo (42220)", url: "https://celoscan.io/" },
    { name: "Centrifuge (2031)", url: "https://centrifuge.subscan.io/" },
    { name: "Ethereum (1)", url: "https://etherscan.io/" },
    { name: "Fantom (250)", url: "https://ftmscan.com/" },
    { name: "Filecoin (314)", url: "https://filscan.io/" },
    { name: "Fraxtal (252)", url: "https://fraxscan.com/" },
    { name: "Gnosis (100)", url: "https://gnosisscan.io/" },
    { name: "Immutable (13371)", url: "https://immutascan.io/" },
    { name: "Kava (2222)", url: "https://kavascan.com/" },
    { name: "Linea (59114)", url: "https://lineascan.build/" },
    { name: "Mantle (5000)", url: "https://explorer.mantle.xyz/" },
    { name:"Merlin (4200)", url:"https://scan.merlinchain.io/" },
    { name: "Mode (34443)", url: "https://modescan.io/address/" },
    { name: "Moonbeam (1284)", url: "https://moonscan.io/" },
    { name: "OK (66)", url: "https://www.oklink.com/" },
    { name: "Optimism (10)", url: "https://optimistic.etherscan.io/" },
    { name: "Polygon (137)", url: "https://polygonscan.com/" },
    { name: "PolygonZk (1101)", url: "https://zkevm.polygonscan.com/" },
    { name: "Scroll (534352)", url: "https://scrollscan.com/" },
    { name: "Sei (1329)", url: "https://seitrace.com/" },
    { name: "Sepolia (11155111)", url: "https://sepolia.etherscan.io/" },
    { name: "Sonic (146)", url: "https://sonicscan.org/" },
    { name: "Taiko (167000)", url: "https://taikoscan.io/" },
    { name: "Zircuit (48900)", url: "https://explorer.zircuit.com/" },
    { name: "ZkLinkNova (810180)", url: "https://explorer.zklink.io/" },
    { name: "ZkSync (324)", url: "https://explorer.zksync.io/" }
];
        
function initializeBlockscans() {
    const sortedBlockscans = blockscans.sort((a, b) => a.name.localeCompare(b.name));
    const groupedBlockscans = {};
    
    sortedBlockscans.forEach(blockscan => {
        const firstLetter = blockscan.name[0].toUpperCase();
        if (!groupedBlockscans[firstLetter]) {
            groupedBlockscans[firstLetter] = [];
        }
        groupedBlockscans[firstLetter].push(blockscan);
    });
    
    const container = document.getElementById("chain-container");
    container.innerHTML = "";
    
    for (const letter in groupedBlockscans) {
        const section = document.createElement("div");
        section.classList.add("letter-section");
        
        const title = document.createElement("div");
        title.classList.add("letter-title");
        title.textContent = letter;
        
        const list = document.createElement("div");
        list.classList.add("chain-list");
        
        groupedBlockscans[letter].forEach(blockscan => {
            const item = document.createElement("div");
            item.classList.add("chain-item");
            const link = document.createElement("a");
            link.href = blockscan.url;
            link.target = "_blank";
            link.textContent = blockscan.name;
            item.appendChild(link);
            list.appendChild(item);
        });
        
        section.appendChild(title);
        section.appendChild(list);
        container.appendChild(section);
    }
}

initializeBlockscans();
