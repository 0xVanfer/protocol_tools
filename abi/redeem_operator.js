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
    "function optionalDeposit(address _token, uint256 _assets, address _receiver, address _referral) payable returns (uint256 shares_)",
    "function optionalRedeem(address _token, uint256 _shares, uint256 _cutPercentage, address _receiver, address _owner) returns (uint256 assetsAfterFee_)",
    "function getWithdrawFee(uint256 _amount) view returns (uint256 amount_)",
    "function exchangePrice() view returns (uint256)",
    "function revenueExchangePrice() view returns (uint256)",
    "function revenue() view returns (uint256)",
    "function lastExchangePrice() view returns (uint256)",
    "function underlyingTvl() view returns (uint256)"
];

