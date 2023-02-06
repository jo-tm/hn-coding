pragma solidity ^0.8.18;

import "./HnVault.sol";

contract Rebalancer {
    HnVault public vault;

    event RebalancerLog(string msg, uint ref);

    constructor(address payable _vaultAddress) {
        vault = HnVault(_vaultAddress);
    }

  function rebalance(uint256 usdTargetPercentage) public {
    uint usdBalance = vault.getDaiBalance();
    uint totalBalance = vault.getTotalBalance();
    uint usdBalancePercentage = 100 * usdBalance / totalBalance;
    emit RebalancerLog('usdBalancePercentage', usdBalancePercentage);
    if (usdBalancePercentage < usdTargetPercentage) {
      uint amountToSell = totalBalance / 100 * (usdTargetPercentage - usdBalancePercentage);
      emit RebalancerLog('amountToSell', amountToSell);
      require (amountToSell > 0, "Nothing to sell");
      vault.sellWeth(amountToSell);
    } else {
      uint amountToBuy = totalBalance / 100 * (usdBalancePercentage - usdTargetPercentage);
      emit RebalancerLog('amountToBuy', amountToBuy);
      require (amountToBuy > 0, "Nothing to buy");
      vault.buyWeth(amountToBuy);
    }
  }

}