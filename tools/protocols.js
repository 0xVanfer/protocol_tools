const protocols = [
    { name: "Aave", url: "https://aave.com/" },
    { name: "Abracadabra", url: "https://abracadabra.money/" },
    { name: "Agora", url: "https://www.agora.finance/" },
    { name: "Alpaca", url: "https://alpaca.markets/" },
    { name: "Alpha", url: "https://alphaventuredao.io/" },
    { name: "Amphor", url: "https://amphor.io/" },
    { name: "Angle", url: "https://app.angle.money/" },
    { name: "Ankr", url: "https://www.ankr.com/" },
    { name: "Aerodrome", url: "https://aerodrome.finance/" },
    { name: "Astherus", url: "https://astherus.com/en" },
    { name: "Avalon", url: "https://www.avalonfinance.xyz/" },
    { name: "Axelar", url: "https://axelar.network/" },
    { name: "Babylon", url: "https://babylonlabs.io/ecosystem" },
    { name: "Balancer", url: "https://balancer.fi/" },
    { name: "Basic Attention", url: "https://basicattentiontoken.org/" },
    { name: "Bedrock", url: "https://www.bedrock.technology/" },
    { name: "Beefy", url: "https://app.beefy.finance/" },
    { name: "Beets", url: "https://beets.fi/" },
    { name: "Benqi", url: "https://benqi.fi/" },
    { name: "Binance", url: "https://binance.com/" },
    { name: "BiSwap", url: "https://biswap.org/" },
    { name: "Chainlink", url: "https://chain.link/" },
    { name: "Chorusone", url: "https://chorus.one/" },
    { name: "Cian", url: "https://cian.app/" },
    { name: "Circle", url: "https://www.circle.com/" },
    { name: "Coinbase", url: "https://www.coinbase.com/home" },
    { name: "Compound", url: "https://app.compound.finance/markets" },
    { name: "Concrete", url: "https://www.concrete.xyz/" },
    { name: "Convex", url: "https://www.convexfinance.com/" },
    { name: "Corn", url: "https://usecorn.com/" },
    { name: "Curve", url: "https://curve.fi/" },
    { name: "Dolomite", url: "https://dolomite.io/" },
    { name: "Dydx", url: "https://dydx.exchange/" },
    { name: "Eigenlayer", url: "https://www.eigenlayer.xyz/" },
    { name: "Enjin", url: "https://enjin.io/" },
    { name: "Equilibria", url: "https://equilibria.fi/home" },
    { name: "Ethena", url: "https://ethena.fi/" },
    { name: "Etherfi", url: "https://www.ether.fi/" },
    { name: "Euler", url: "https://www.euler.finance/" },
    { name: "FBTC", url: "https://fbtc.com/get-fbtc" },
    { name: "FirstDigital", url: "https://firstdigitallabs.com/" },
    { name: "Gnosis", url: "https://www.gnosis.io/" },
    { name: "Goldilocks", url: "https://www.goldilocksdao.io/" },
    { name: "Infstones", url: "https://infstones.com/" },
    { name: "Jellyverse", url: "https://jellyverse.org/" },
    { name: "Kelp", url: "https://kerneldao.com/kelp/restake/" },
    { name: "Kernel", url: "https://kerneldao.com/" },
    { name: "Kodiak", url: "https://kodiak.finance/" },
    { name: "Kraken", url: "https://www.kraken.com/" },
    { name: "Kyber", url: "https://kyberswap.com/" },
    { name: "Lido", url: "https://lido.fi/" },
    { name: "Lista", url: "https://lista.org/" },
    { name: "Lombard", url: "https://www.lombard.finance/" },
    { name: "Luganodes", url: "https://www.luganodes.com/" },
    { name: "Maker", url: "https://sky.money/" },
    { name: "Mantle", url: "https://www.mantle.xyz/meth" },
    { name: "Maple", url: "https://maple.finance/" },
    { name: "Maverick", url: "https://www.mav.xyz/" },
    { name: "Mellow", url: "https://app.mellow.finance/vaults" },
    { name: "Merlin (chain)", url: "https://merlinchain.io/" },
    { name: "Morpho", url: "https://app.morpho.org/" },
    { name: "OneInch", url: "https://1inch.io/" },
    { name: "P2P", url: "https://p2p.org/" },
    { name: "Pancakeswap", url: "https://pancakeswap.finance/" },
    { name: "Pangolin", url: "https://www.pangolin.exchange/" },
    { name: "Pendle", url: "https://www.pendle.finance/" },
    { name: "Planet", url: "https://app.planet.finance/" },
    { name: "pStake", url: "https://pstake.finance/" },
    { name: "PumpBTC", url: "https://mainnet.pumpbtc.xyz/" },
    { name: "Quickswap", url: "https://quickswap.exchange/" },
    { name: "Re7", url: "https://www.re7.capital/" },
    { name: "Renzo", url: "https://www.renzoprotocol.com/" },
    { name: "Rho", url: "https://www.rhomarkets.xyz/" },
    { name: "RocketPool", url: "https://rocketpool.net/" },
    { name: "Satlayer", url: "https://satlayer.xyz/" },
    { name: "Silov2", url: "https://v2.silo.finance/" },
    { name: "SiloStaking", url: "https://www.silostaking.io/" },
    { name: "Sky", url: "https://sky.money/" },
    { name: "Solv", url: "https://solv.finance/" },
    { name: "Spark", url: "https://app.spark.fi/markets/" },
    { name: "Stader", url: "https://www.staderlabs.com/" },
    { name: "Stakestone", url: "https://app.stakestone.io/u/stake" },
    { name: "Stakewise", url: "https://www.stakewise.io/" },
    { name: "Stargate", url: "https://stargate.finance/" },
    { name: "Steakhouse", url: "https://www.steakhouse.financial/" },
    { name: "Sushi", url: "http://sushi.com/" },
    { name: "Swell", url: "https://www.swellnetwork.io/" },
    { name: "Symbiotic", url: "https://app.symbiotic.fi/restake" },
    { name: "Synthetix", url: "https://synthetix.io/" },
    { name: "Tether", url: "https://tether.to/" },
    { name: "Thena", url: "https://thena.fi/" },
    { name: "Traderjoe", url: "https://lfj.gg/" },
    { name: "Trust Wallet", url: "https://trustwallet.com/" },
    { name: "Uniswap", url: "https://app.uniswap.org/swap" },
    { name: "Vector", url: "https://vectorfinance.io/" },
    { name: "Venus", url: "https://venus.io/" },
    { name: "Yearn", url: "https://yearn.fi/" }
];
        
function initializeProtocols() {
    const sortedProtocols = protocols.sort((a, b) => a.name.localeCompare(b.name));
    const groupedProtocols = {};
    
    sortedProtocols.forEach(protocol => {
        const firstLetter = protocol.name[0].toUpperCase();
        if (!groupedProtocols[firstLetter]) {
            groupedProtocols[firstLetter] = [];
        }
        groupedProtocols[firstLetter].push(protocol);
    });
    
    const container = document.getElementById("chain-container");
    container.innerHTML = "";
    
    for (const letter in groupedProtocols) {
        const section = document.createElement("div");
        section.classList.add("letter-section");
        
        const title = document.createElement("div");
        title.classList.add("letter-title");
        title.textContent = letter;
        
        const list = document.createElement("div");
        list.classList.add("chain-list");
        
        groupedProtocols[letter].forEach(protocol => {
            const item = document.createElement("div");
            item.classList.add("chain-item");
            const link = document.createElement("a");
            link.href = protocol.url;
            link.target = "_blank";
            link.textContent = protocol.name;
            item.appendChild(link);
            list.appendChild(item);
        });
        
        section.appendChild(title);
        section.appendChild(list);
        container.appendChild(section);
    }
}

initializeProtocols();
