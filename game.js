// Check if window.ethereum is available
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert('Please install MetaMask to use this application!');
}

// Create an instance of web3 with window.ethereum
const web3 = new Web3(window.ethereum);

// Contract details
const contractAddress = '0xe8583db6876f0F06B242BEC92AD7b8BaC05C5b8c';
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GOOClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimGOO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getGOOBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getProducedGOO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gooPerBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stake","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lastUpdated","type":"uint256"},{"internalType":"uint256","name":"gooProduced","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawGOO","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Connect to MetaMask
async function connectWallet() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Wallet connected');
        updateWalletInfo();
    } catch (error) {
        console.error('User denied account access');
    }
}

// Update wallet info
async function updateWalletInfo() {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);

    document.getElementById('userGOO').innerText = await getGOOBalance(accounts[0]);
    document.getElementById('stakedBNB').innerText = await getStakedBNB(accounts[0]);
    document.getElementById('userShare').innerText = await getUserShare(accounts[0]);
}

// Get the GOO balance of the user
async function getGOOBalance(account) {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const balance = await contract.methods.balanceOf(account).call();
    return web3.utils.fromWei(balance, 'ether');
}

// Get the staked BNB of the user
async function getStakedBNB(account) {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const stakedAmount = await contract.methods.stakedBalance(account).call();
    return web3.utils.fromWei(stakedAmount, 'ether');
}

// Get the user's share of the total pool
async function getUserShare(account) {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const totalPool = await contract.methods.totalStaked().call();
    const userStaked = await contract.methods.stakedBalance(account).call();
    const share = (userStaked / totalPool) * 100;
    return share.toFixed(2);
}

// Stake BNB function
async function stakeBNB() {
    const amount = document.getElementById('stakeAmount').value;
    if (amount <= 0) {
        alert('Please enter a valid amount to stake');
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Convert BNB to Wei (since Ethereum and Binance Smart Chain use Wei as the smallest unit)
    const amountInWei = web3.utils.toWei(amount, 'ether');

    try {
        await contract.methods.stake(amountInWei).send({ from: accounts[0] });
        alert('BNB Staked Successfully!');
        updateWalletInfo();
    } catch (error) {
        console.error('Error staking BNB', error);
    }
}

// Unstake BNB function (unstake 50%)
async function unstakeBNB() {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        const stakedAmount = await contract.methods.stakedBalance(accounts[0]).call();
        const unstakeAmount = stakedAmount / 2;

        await contract.methods.unstake(web3.utils.toWei(unstakeAmount.toString(), 'ether')).send({ from: accounts[0] });
        alert('50% of your staked BNB has been unstaked!');
        updateWalletInfo();
    } catch (error) {
        console.error('Error unstaking BNB', error);
    }
}

// Claim GOO function
async function claimGOO() {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        await contract.methods.claimGOO().send({ from: accounts[0] });
        alert('GOO claimed successfully!');
        updateWalletInfo();
    } catch (error) {
        console.error('Error claiming GOO', error);
    }
}

// Burn GOO function (for BNB rewards)
async function burnGOO() {
    const amount = document.getElementById('burnAmount').value;
    if (amount <= 0) {
        alert('Please enter a valid amount to burn');
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const amountInWei = web3.utils.toWei(amount, 'ether');

    try {
        await contract.methods.burn(amountInWei).send({ from: accounts[0] });
        alert('GOO burned successfully!');
        updateWalletInfo();
    } catch (error) {
        console.error('Error burning GOO', error);
    }
}

// Withdraw BNB function
async function withdrawBNB() {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        await contract.methods.withdraw().send({ from: accounts[0] });
        alert('BNB Withdrawn Successfully!');
        updateWalletInfo();
    } catch (error) {
        console.error('Error withdrawing BNB', error);
    }
}

// Initialize the page and update wallet info on load
window.onload = async function() {
    if (window.ethereum) {
        await connectWallet();
    } else {
        alert('MetaMask is required to use this app.');
    }
};
