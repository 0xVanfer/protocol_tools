const abi_yl_redeem_operator = [
    "function allPendingWithdrawers() view returns (address[] memory)",
    "function withdrawalRequest(address _user) view returns (uint256)",
    "function withdrawalRequests(address[] calldata _users) view returns (uint256[] memory shares_)"
];

const abi_yl_redeem_operator_steth = [
    "function allPendingWithdrawers() view returns (address[] memory, address[] memory)",
    "function withdrawalRequest(address _user) view returns (uint256)",
    "function withdrawalRequests(address[] calldata _users) view returns (uint256[] memory shares_)"
];

const abi_yl_common_vault = [
    "function symbol() view returns (string)",
    "function name() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",

    "function getVaultParams() view returns (tuple(address underlyingToken, string name, string symbol, uint256 marketCapacity, uint256 managementFeeRate, uint256 managementFeeClaimPeriod, uint256 maxPriceUpdatePeriod, uint256 revenueRate, uint256 exitFeeRate, address admin, address rebalancer, address feeReceiver, address redeemOperator))",
    "function getVaultState() view returns (tuple(uint256 exchangePrice, uint256 revenueExchangePrice, uint256 revenue, uint256 lastClaimMngFeeTime, uint256 lastUpdatePriceTime))",
    "function getWithdrawFee(uint256 _amount) view returns (uint256 amount_)",
    "function exchangePrice() view returns (uint256)",
    "function revenueExchangePrice() view returns (uint256)",
    "function revenue() view returns (uint256)",
    "function lastExchangePrice() view returns (uint256)",
    "function underlyingTvl() view returns (uint256)"
];


const abi_yl_eco_earn = [
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function name() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",

    "function asset() view returns (address)",
    "function totalAssets() view returns (uint256)",
    "function convertToShares(uint256 assets) view returns (uint256)",
    "function convertToAssets(uint256 shares) view returns (uint256)",
    "function maxDeposit(address receiver) view returns (uint256)",
    "function previewDeposit(uint256 assets) view returns (uint256)",
    "function maxMint(address receiver) view returns (uint256)",
    "function previewMint(uint256 shares) view returns (uint256)",
    "function maxWithdraw(address owner) view returns (uint256)",
    "function previewWithdraw(uint256 assets) view returns (uint256)",
    "function maxRedeem(address owner) view returns (uint256)",
    "function previewRedeem(uint256 shares) view returns (uint256)",
    
    "function PRECISION() view returns (uint256)",
    "function bridgeAdapter(uint256 _chainId) view returns (address)",
    "function depositCap() view returns (uint256)",
    "function directWithdraw() view returns (bool)",
    "function exchangePrice() view returns (uint256)",
    "function paused() view returns (bool)",
    "function rebalancer() view returns (address)",
    "function redeemOperator() view returns (address)"
];