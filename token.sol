pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.4.0/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

    constructor () ERC20("MikePolygonCoin", "MPC") {
        _mint(msg.sender, 1000000000 * (10 ** uint256(decimals())));
    }
}