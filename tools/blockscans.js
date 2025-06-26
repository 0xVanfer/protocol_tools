async function fetchBlockscans() {
    const resp = await fetch("https://what.vanfer.tech/list/blockscans");
    const json = await resp.json();
    if (json.code !== "ok" || !json.data) {
        throw new Error("Failed to fetch blockscans");
    }
    // 转换为 [{ name, url }]
    return Object.values(json.data).map(item => ({
        name: `${item.chain.charAt(0).toUpperCase()}${item.chain.slice(1)} (${item.chain_id})`,
        url: item.blockscan
    }));
}

async function initializeBlockscans() {
    let blockscans;
    try {
        blockscans = await fetchBlockscans();
    } catch (e) {
        // 可根据需要显示错误提示
        return;
    }
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
