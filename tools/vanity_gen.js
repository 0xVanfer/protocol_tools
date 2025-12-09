let isRunning = false;
let scannedCount = 0;
let workers = [];
let foundCount = 0;
let targetQuantity = 0;
let timeoutId = null;

document.getElementById('startBtn').addEventListener('click', startGeneration);
document.getElementById('stopBtn').addEventListener('click', stopGeneration);

const workerCode = `
importScripts('https://cdn.jsdelivr.net/npm/ethers@5.7.0/dist/ethers.umd.min.js');

self.onmessage = function(e) {
    const { prefix, suffix } = e.data;
    const prefixLower = prefix ? prefix.toLowerCase() : '';
    const suffixLower = suffix ? suffix.toLowerCase() : '';
    
    let count = 0;
    
    while (true) {
        // Optimization: Generate private key directly to avoid expensive mnemonic derivation
        const privateKey = ethers.utils.hexlify(ethers.utils.randomBytes(32));
        const wallet = new ethers.Wallet(privateKey);
        const address = wallet.address;
        const addressNoPrefix = address.substring(2).toLowerCase();
        
        let match = true;
        if (prefixLower && !addressNoPrefix.startsWith(prefixLower)) match = false;
        if (match && suffixLower && !addressNoPrefix.endsWith(suffixLower)) match = false;

        if (match) {
            self.postMessage({
                type: 'found',
                address: wallet.address,
                privateKey: wallet.privateKey
            });
        }
        
        count++;
        if (count >= 10000) { // Increased batch size for reporting
            self.postMessage({ type: 'progress', count: count });
            count = 0;
        }
    }
};
`;

async function startGeneration() {
    targetQuantity = parseInt(document.getElementById('quantity').value) || 1;
    const prefix = document.getElementById('prefix').value.trim();
    const suffix = document.getElementById('suffix').value.trim();
    const timeoutMins = parseInt(document.getElementById('timeout').value) || 10;

    // Validation
    const hexRegex = /^[0-9a-fA-F]*$/;
    if (!hexRegex.test(prefix) || !hexRegex.test(suffix)) {
        alert("Prefix and Suffix must be valid HEX characters (0-9, A-F)");
        return;
    }

    isRunning = true;
    scannedCount = 0;
    foundCount = 0;
    updateScannedDisplay();
    
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'block';
    lockButtons('.tag-button:not(#stopBtn)');

    // Start Workers
    const threadCount = navigator.hardwareConcurrency || 4;
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);

    for (let i = 0; i < threadCount; i++) {
        const worker = new Worker(workerUrl);
        worker.onmessage = handleWorkerMessage;
        worker.postMessage({ prefix, suffix });
        workers.push(worker);
    }

    // Timeout handler
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        if (isRunning) {
            alert("Timeout reached!");
            stopGeneration();
        }
    }, timeoutMins * 60 * 1000);
}

function handleWorkerMessage(e) {
    if (!isRunning) return;

    const data = e.data;
    if (data.type === 'progress') {
        scannedCount += data.count;
        updateScannedDisplay();
    } else if (data.type === 'found') {
        addResult(data.address, data.privateKey);
        foundCount++;
        if (foundCount >= targetQuantity) {
            stopGeneration();
        }
    }
}

function stopGeneration() {
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    isRunning = false;
    workers.forEach(w => w.terminate());
    workers = [];
    
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('stopBtn').style.display = 'none';
    unlockButtons('.tag-button');
}

function updateScannedDisplay() {
    document.getElementById('scanned-count').textContent = `Scanned: ${scannedCount.toLocaleString()}`;
}

function addResult(address, privateKey) {
    const container = document.getElementById('output');
    const div = document.createElement('div');
    div.className = 'result-item';
    
    div.innerHTML = `
        <div class="result-row">
            <span class="result-label">Address:</span>
            <span class="result-value">${address}</span>
            <button class="copy-btn" onclick="copyText(this, '${address}')">Copy</button>
        </div>
        <div class="result-row">
            <span class="result-label">Private Key:</span>
            <span class="result-value">${privateKey}</span>
            <button class="copy-btn" onclick="copyText(this, '${privateKey}')">Copy</button>
        </div>
    `;
    
    container.appendChild(div);
}

function copyText(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}
