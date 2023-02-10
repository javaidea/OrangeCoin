// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OrangeCoin is ERC20 {
    constructor() ERC20("Orange Coin", "ORAC") {
        _mint(msg.sender, 10 ** 18);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
