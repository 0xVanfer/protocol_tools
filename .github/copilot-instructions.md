# Protocol Tools - Copilot Instructions

## Project Overview

A frontend-only DeFi toolkit for interacting with blockchain protocols (Cian Yield Layer, Pendle/Equilibria, etc.). Built with vanilla JavaScript + ethers.js v5, no build step. All code is AI-generated from TypeScript/Go logic by a non-JS developer.

## Architecture

### Multi-Page Structure

Each tool is a standalone HTML page with isolated scripts:

-   `cian_yield_layer/yield_layer.html` - Vault analytics and history
-   `pendle_eqb/eqb_pools.html` - Equilibria pool data scraping
-   `tools/blockscan.html`, `tools/protocol_links.html` - Utility tools
-   `addresses/addresses.html` - Address validation/checksumming

### Module Organization

-   `common/` - Shared utilities (loaded via `<script defer>`)
-   `abi/` - Contract ABIs as string arrays (ethers.js human-readable format)
-   `navbar/` - Shared navigation component
-   Each tool folder contains: `listeners.js` (event handlers), `scripts.js` (business logic)

### Key Pattern: `params_override.js`

Pages at different depths override `toHome` path before loading `common/params.js`:

```javascript
// In yield_layer.html: <script src="../params_override.js">
let toHome = "../"; // Overrides default "./" from common/params.js
```

## Blockchain Integration

### RPC Provider Pattern

Global providers initialized in `common/params.js`:

```javascript
let RPC_PROVIDER_ETH = new ethers.providers.JsonRpcProvider(DEFAULT_RPC_ETHEREUM);
async function getRPCByChainName(name) {
    /* returns RPC_PROVIDER_ETH or RPC_PROVIDER_ARB */
}
```

### Contract Instantiation

Always use caching Maps to avoid re-instantiation:

```javascript
const contractCache = new Map();
if (contractCache.has(address)) return contractCache.get(address);
const contract = new ethers.Contract(address, abi, RPC);
contractCache.set(address, contract);
```

### Multicall Optimization

Use `executeMulticall` for batching read operations. Requires `common/multicall.js` and `abi/multicall.js`.

```javascript
const calls = [
    { contract: vault, method: "decimals" },
    { contract: vault, method: "symbol" },
];
const results = await executeMulticall(RPC, calls);
const decimals = results[0];
const symbol = results[1];
```

### ABI Conventions

-   Use ethers.js human-readable format (string arrays)
-   Store in `abi/*.js` as `const abi_<protocol>_<contract> = [...]`
-   Example: `abi_yl_common_vault`, `abi_erc20metadata`, `abi_ipmarket`
-   Load in HTML: `<script src="../abi/yield_layer.js" defer></script>`

### Special Cases

Hardcoded logic for specific vault addresses (see `yl_info.js:18-20`, `yl_info.js:70-72`):

-   `0x3498fDed9C88Ae83b3BC6a302108F2da408e613b` - Uses `abi_yl_eco_earn` instead of `abi_yl_common_vault`
-   `0xB13aa2d0345b0439b064f26B82D8dCf3f508775d` - Uses `abi_yl_redeem_operator_steth`

## Common Utilities

### UI State Management

```javascript
lockButtons(".tag-button"); // Disable during async ops
setButtonText(button, "pending...");
setElementValueAndScrollDown("output", message); // Auto-scroll textarea
unlockButtons(".tag-button"); // Re-enable after completion
```

### Data Formatting

-   **Numbers**: `ethers.utils.formatUnits(bigNumber, decimals)` - always use decimals from contract
-   **Dates**: `formatDateTime(timestamp)` for `YYYY-MM-DD HH:mm:ss`, `formatDateOnly(timestamp)` for `YYYY-MM-DD`
-   **Addresses**: `ethers.utils.getAddress(address)` for checksumming

### CSV Export Pattern

```javascript
downloadJsonToCsv(jsonData, `filename_${Date.now()}.csv`);
// Or manual: jsonToCSV(data) + Blob + link.click()
```

## API Integration

Cian Yield Layer API endpoints follow pattern: `https://yieldlayer.cian.app/${blockchain}/pool/home/vaults`

-   Fetch vault lists on page load (see `scripts.js:initializeMappings()`)
-   Populate dropdowns dynamically based on blockchain selection
-   Use `limit=-1` for full history: `.../history/${vaultAddress}?limit=-1`

## Error Handling

Prefer inline error messages over console-only:

```javascript
try {
    // ... async operations
} catch (error) {
    setElementValueAndScrollDown("output", `Error: ${error.message}`);
} finally {
    unlockButtons(".tag-button"); // Always unlock
}
```

## Development Workflow

-   **No build step**: Edit files, refresh browser
-   **No package.json**: ethers.js loaded via CDN (`<script src="https://cdn.jsdelivr.net/npm/ethers@5.7.0/dist/ethers.umd.min.js">`)
-   **Testing**: Manual browser testing only, no automated tests
-   **Debugging**: Use browser DevTools, `setElementValueAndScrollDown("output", ...)` for tracing

## Code Style

-   **Variables**: camelCase for local, PascalCase for contract instances (`EQB_PENDLE_BOOSTER`)
-   **Functions**: Async/await for all blockchain calls, JSDoc comments for utilities
-   **Constants**: UPPER_SNAKE_CASE (e.g., `ADDRESS_ZERO`, `DEFAULT_RPC_ETHEREUM`)
-   **File naming**: kebab-case for HTML/CSS, snake_case for JS

## Critical Knowledge

1. **No transpilation**: Code must be browser-compatible vanilla JS (no JSX, TS, modules)
2. **Script loading order**: `defer` all scripts, ensure `params.js` loads before contract code
3. **ethers.js v5**: Use `ethers.utils.*`, `ethers.providers.*` (not v6 syntax)
4. **Caching strategy**: Always cache contract instances and vault info to reduce RPC calls
5. **Address hardcoding**: When adding new vault logic, check if special ABI/handling is needed (see Special Cases)
