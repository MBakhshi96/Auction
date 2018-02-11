web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi =JSON.parse('[{"constant":false,"inputs":[],"name":"bid","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"closeCon","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"highestBid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"timeToLive","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"bid","type":"uint256"}],"name":"logTopBidChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"winnerAddress","type":"address"},{"indexed":false,"name":"price","type":"uint256"}],"name":"logWinner","type":"event"}]');
contract = web3.eth.contract(abi);
contractInst = contract.at('0xd2a4caf01a4a77b8d412979de7677c725fc17130');
number = -1;
function getNumber() {
    if (number == -1) {
        number = document.getElementById("userNum").value;
        balance = JSON.parse(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[number]), 'ether')).toString();
        document.getElementById("balanceLbl").innerHTML = "You balance is : ".concat(balance);
        document.getElementById("balanceLbl").style.display = "block"
    }
}
function getTopBid() {
    highestBid = JSON.parse(web3.fromWei(contractInst.highestBid.call({from: web3.eth.accounts[number], gas: 5000000}), 'ether'));
    document.getElementById("topBidLbl").innerHTML = "Top bid is : ".concat(highestBid.toString());
    document.getElementById("topBidLbl").style.display = 'block';
    balance = JSON.parse(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[number]), 'ether')).toString();
    document.getElementById("balanceLbl").innerHTML = "You balance is : ".concat(balance);
}
function bid() {
    if (number != -1) {
        amount = document.getElementById("bidAmnt").value;
        try {
            contractInst.bid.sendTransaction({
                from: web3.eth.accounts[number],
                value: web3.toWei(amount, 'ether'),
                gas: 4700000
            });
        }
        catch (err){
            console.log(err)
        }
        balance = JSON.parse(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[number]), 'ether')).toString();
        document.getElementById("balanceLbl").innerHTML = "You balance is : ".concat(balance);
        highestBid = JSON.parse(web3.fromWei(contractInst.highestBid.call({from: web3.eth.accounts[number], gas: 5000000}), 'ether'));
        document.getElementById("topBidLbl").innerHTML = "Top bid is : ".concat(highestBid.toString());
    }
}
function closeCont() {
    console.log('close');
    try {
        contractInst.closeCon.call({from: web3.eth.accounts[number], gas: 5000000} );
    }
    catch (err){
        console.log(err);
    }
    balance = JSON.parse(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[number]), 'ether')).toString();
    document.getElementById("balanceLbl").innerHTML = "You balance is : ".concat(balance);
}
