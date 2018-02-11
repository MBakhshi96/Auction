pragma solidity ^0.4.2;

contract Auction{
    address owner;
    uint crtBid;
    uint secondBid;
    uint intialPrice;
    bool anyBid;
    uint startBlock;
    uint endBlock;
    uint validInc;
    bool contractOpen;

    address topBider;
    mapping (address => uint) biders;
    event logTopBidChanged(uint bid);
    event logWinner(address winnerAddress,uint price);
    
    
    //modifier??
    
    function Auction(uint timeToLive ) public {
        owner = msg.sender;
        intialPrice = 0.1 ether;
        crtBid = intialPrice;
        secondBid = intialPrice;
        startBlock = block.number;
        endBlock = startBlock + timeToLive/15;
        anyBid = false;
        validInc = 1 ether;
        contractOpen = true;
    }
    function bid () payable public {
        require(msg.value > crtBid+validInc && block.number <= endBlock && msg.sender != owner && contractOpen); 
        secondBid = crtBid;
        crtBid = msg.value;
        if (anyBid){
            topBider.transfer(biders[topBider]);
        }
        else{
            anyBid = true;
        }
        topBider = msg.sender;              
        biders[msg.sender] = msg.value;
        topBider = msg.sender;
        logTopBidChanged(msg.value);
    }
    
    function closeCon() public {      
        //use require here?
        require(msg.sender==owner);
        topBider.transfer(crtBid-secondBid);
        logWinner(topBider,secondBid);
        owner.transfer(secondBid);
        contractOpen = false;
    }
    
    function highestBid() returns(uint) {
        return crtBid;
    }
    
}
