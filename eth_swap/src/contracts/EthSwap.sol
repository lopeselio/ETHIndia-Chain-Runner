pragma solidity ^0.5.0;

import './Token.sol';

contract EthSwap{
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint public rate = 100;
    event TokenPurchased(
        address account, 
        address token,
        uint amount,
        uint rate
    );
    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        // redemption rate = number of tokens they receive for one ether

        // amount of ethereum * redemption rate

        // Calculate the number of token to buy
        uint tokenAmount = msg.value * rate;

        require(token.balanceOf(address(this)) >= tokenAmount);

        token.transfer(msg.sender, tokenAmount);

        // Emit an event 
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) {
        // Calculate the amount of Ether to redeem
        uint etherAmount = _amount / rate;
        
        // Perform sale
        msg.sender.transfer(etherAmount)
    }
}


