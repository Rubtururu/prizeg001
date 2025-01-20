// Verificar si window.ethereum está disponible
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask está instalado');
} else {
    alert('Por favor, instala MetaMask para usar esta aplicación!');
}

// Crear una instancia de web3 con window.ethereum
const web3 = new Web3(window.ethereum);

// Detalles del contrato
const contractAddress = '0xe8583db6876f0F06B242BEC92AD7b8BaC05C5b8c';  // Reemplaza con la dirección de tu contrato
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GOOClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimGOO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getGOOBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getProducedGOO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gooPerBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stake","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lastUpdated","type":"uint256"},{"internalType":"uint256","name":"gooProduced","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawGOO","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Conectar a MetaMask
async function connectWallet() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Wallet conectada');
        updateWalletInfo();
    } catch (error) {
        console.error('El usuario denegó el acceso a la cuenta');
    }
}

// Actualizar la información de la wallet
async function updateWalletInfo() {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);

    document.getElementById('userGOO').innerText = await getGOOBalance(accounts[0]);
    document.getElementById('stakedBNB').innerText = await getStakedBNB(accounts[0]);
    document.getElementById('userShare').innerText = await getUserShare(accounts[0]);
}

// Obtener el balance de GOO del usuario
async function getGOOBalance(account) {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const balance = await contract.methods.balanceOf(account).call();
    return web3.utils.fromWei(balance, 'ether');
}

// Obtener la cantidad de BNB apostado por el usuario
async function getStakedBNB(account) {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const stakedAmount = await contract.methods.stakedBalance(account).call();
    return web3.utils.fromWei(stakedAmount, 'ether');
}

// Obtener la participación del usuario en el total del pool
async function getUserShare(account) {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const totalPool = await contract.methods.totalStaked().call();
    const userStaked = await contract.methods.stakedBalance(account).call();
    const share = (userStaked / totalPool) * 100;
    return share.toFixed(2);
}

// Función para apostar BNB
async function stakeBNB() {
    const amount = document.getElementById('stakeAmount').value;
    if (amount <= 0) {
        alert('Por favor ingresa una cantidad válida para apostar');
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Convertir BNB a Wei (la unidad más pequeña de Ethereum y BSC)
    const amountInWei = web3.utils.toWei(amount, 'ether');

    try {
        await contract.methods.stake(amountInWei).send({ from: accounts[0] });
        alert('¡BNB apostado exitosamente!');
        updateWalletInfo();
    } catch (error) {
        console.error('Error al apostar BNB', error);
    }
}

// Función para desapostar BNB (desapostar el 50%)
async function unstakeBNB() {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        const stakedAmount = await contract.methods.stakedBalance(accounts[0]).call();
        const unstakeAmount = stakedAmount / 2;

        await contract.methods.unstake(web3.utils.toWei(unstakeAmount.toString(), 'ether')).send({ from: accounts[0] });
        alert('¡El 50% de tu BNB ha sido desapostado!');
        updateWalletInfo();
    } catch (error) {
        console.error('Error al desapostar BNB', error);
    }
}

// Función para reclamar GOO
async function claimGOO() {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        await contract.methods.claimGOO().send({ from: accounts[0] });
        alert('¡GOO reclamado exitosamente!');
        updateWalletInfo();
    } catch (error) {
        console.error('Error al reclamar GOO', error);
    }
}

// Función para quemar GOO
async function burnGOO() {
    const amount = document.getElementById('burnAmount').value;
    if (amount <= 0) {
        alert('Por favor ingresa una cantidad válida para quemar');
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const amountInWei = web3.utils.toWei(amount, 'ether');

    try {
        await contract.methods.burn(amountInWei).send({ from: accounts[0] });
        alert('¡GOO quemado exitosamente!');
        updateWalletInfo();
    } catch (error) {
        console.error('Error al quemar GOO', error);
    }
}

// Función para retirar BNB
async function withdrawBNB() {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        await contract.methods.withdraw().send({ from: accounts[0] });
        alert('¡BNB retirado exitosamente!');
        updateWalletInfo();
    } catch (error) {
        console.error('Error al retirar BNB', error);
    }
}

// Inicializar la página y actualizar la información de la wallet al cargar
window.onload = async function() {
    if (window.ethereum) {
        await connectWallet();
    } else {
        alert('MetaMask es requerido para usar esta aplicación.');
    }
};
