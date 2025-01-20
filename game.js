// Conexión al contrato
let contract;
let accounts;
let web3;
const contractAddress = '0xe8583db6876f0F06B242BEC92AD7b8BaC05C5b8c'; // Reemplaza con la dirección de tu contrato desplegado
const abi = [[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GOOClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimGOO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getGOOBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getProducedGOO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gooPerBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stake","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lastUpdated","type":"uint256"},{"internalType":"uint256","name":"gooProduced","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawGOO","outputs":[],"stateMutability":"nonpayable","type":"function"}];

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        // Web3 provider disponible
        web3 = new Web3(window.ethereum);
        try {
            // Solicitar conexión a Metamask
            await window.ethereum.enable();
            accounts = await web3.eth.getAccounts();
            contract = new web3.eth.Contract(abi, contractAddress);
            updateStats();
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        alert("Por favor, instala MetaMask para continuar.");
    }
});

// Actualización de estadísticas (GOO y staking)
async function updateStats() {
    const userGOO = await contract.methods.getGOOBalance(accounts[0]).call();
    const userProducedGOO = await contract.methods.getProducedGOO(accounts[0]).call();
    const totalSupply = await contract.methods.totalSupply().call();

    document.getElementById('userGOO').textContent = web3.utils.fromWei(userGOO, 'ether');
    document.getElementById('gooProduction').textContent = web3.utils.fromWei(userProducedGOO, 'ether');
    document.getElementById('totalBNB').textContent = web3.utils.fromWei(totalSupply, 'ether');

    // Actualización de la barra de progreso de GOO
    updateProgressBar(userProducedGOO, totalSupply);
}

// Función para actualizar las barras de progreso
function updateProgressBar(userProducedGOO, totalSupply) {
    const progress = (userProducedGOO / totalSupply) * 100;
    document.getElementById('userShareProgress').style.width = progress + '%';
    document.getElementById('userShare').textContent = Math.round(progress) + '%';
}

// Función para hacer staking de BNB
async function stakeBNB() {
    const stakeAmount = document.getElementById('stakeAmount').value;
    if (parseFloat(stakeAmount) <= 0) return alert("Introduce una cantidad válida de BNB");

    try {
        const amountInWei = web3.utils.toWei(stakeAmount, 'ether');
        await contract.methods.stake().send({
            from: accounts[0],
            value: amountInWei
        });

        updateStats();
    } catch (error) {
        console.error(error);
        alert("Hubo un error al hacer staking.");
    }
}

// Función para hacer unstake de BNB
async function unstakeBNB() {
    try {
        const stakeAmount = document.getElementById('stakeAmount').value;
        const amountInWei = web3.utils.toWei(stakeAmount, 'ether');
        
        await contract.methods.unstake(amountInWei).send({
            from: accounts[0]
        });

        updateStats();
    } catch (error) {
        console.error(error);
        alert("Hubo un error al hacer unstake.");
    }
}

// Función para reclamar los GOO generados
async function claimGOO() {
    try {
        await contract.methods.claimGOO().send({
            from: accounts[0]
        });

        updateStats();
        alert("GOO reclamado exitosamente.");
    } catch (error) {
        console.error(error);
        alert("Hubo un error al reclamar el GOO.");
    }
}

// Función para quemar GOO (opcional para tus necesidades)
async function burnGOO() {
    try {
        const burnAmount = document.getElementById('burnAmount').value;
        if (parseInt(burnAmount) <= 0) return alert("Introduce una cantidad válida de GOO para quemar.");

        await contract.methods.burnGOO(web3.utils.toWei(burnAmount, 'ether')).send({
            from: accounts[0]
        });

        alert(`${burnAmount} GOO quemados exitosamente.`);
    } catch (error) {
        console.error(error);
        alert("Hubo un error al quemar el GOO.");
    }
}
