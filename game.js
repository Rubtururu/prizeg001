let provider;
let signer;
let contract;

const contractAddress = "0xD672c6FE894F094814ad9ce2154f91dF0ffF18FE"; // Dirección de tu contrato
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BurnDividendClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GOOBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnGOO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"burnRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimBurnDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributeBurnDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributeDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributionInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"generateGOO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNextDistributionTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPrizePool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalBNBDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalBNBStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalBurnDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalGOOBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserBNBDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserGOODividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gooGenerationRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDistributionTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeBNB","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBNBDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBNBStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBurnDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalGOOBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPrizePool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unstakeBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userBNBEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userGOO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userGOOEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userLastClaimTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userStakedBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userTotalGOOBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userTotalGOOGenerated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Solicitar acceso a la cuenta de MetaMask
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const userAccount = accounts[0];
            console.log('Conectado con la cuenta:', userAccount);

            // Crear proveedor y firmante de MetaMask
            provider = new ethers.BrowserProvider(window.ethereum);
            signer = provider.getSigner();

            // Conectar con el contrato inteligente
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Actualizar la interfaz con la cuenta
            document.getElementById('status').innerText = `Conectado como: ${userAccount}`;
            
            // Llamar a funciones del contrato, por ejemplo, obtener el prize pool
            const prizePool = await contract.getPrizePool();
            document.getElementById('prizePool').innerText = ethers.utils.formatEther(prizePool) + " BNB";

            // Llamar a más funciones que necesites, como la producción de GOO, etc.
            const gooProduction = await contract.getTotalGOOBurned();
            document.getElementById('gooProduction').innerText = ethers.utils.formatUnits(gooProduction, 18) + " goo/s";

            // También puedes actualizar otros elementos de la UI como el saldo de GOO y BNB
            updateUserStats();

        } catch (error) {
            console.error("Error al conectar MetaMask:", error);
            document.getElementById('status').innerText = "Error al conectar con MetaMask.";
        }
    } else {
        console.log("MetaMask no está instalado.");
        document.getElementById('status').innerText = "Por favor, instala MetaMask.";
    }
}

// Llamar a la función de conexión al cargar la página
window.onload = function() {
    connectMetaMask();
};

// Función para stakear BNB
async function stakeBNB() {
    const stakeAmount = document.getElementById('stakeAmount').value;
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
        alert("Por favor, ingresa una cantidad válida de BNB.");
        return;
    }

    const tx = await contract.stakeBNB({ value: ethers.utils.parseEther(stakeAmount) });
    await tx.wait();
    alert(`¡Staked ${stakeAmount} BNB con éxito!`);
    updateUserStats();
}

// Función para unstakear BNB
async function unstakeBNB() {
    const tx = await contract.unstakeBNB();
    await tx.wait();
    alert("¡Unstaked el 50% de tus BNB con éxito!");
    updateUserStats();
}

// Función para quemar GOO
async function burnGOO() {
    const burnAmount = document.getElementById('burnAmount').value;
    if (!burnAmount || parseInt(burnAmount) <= 0) {
        alert("Por favor, ingresa una cantidad válida de GOO.");
        return;
    }

    const tx = await contract.burnGOO(ethers.utils.parseUnits(burnAmount, 18));
    await tx.wait();
    alert(`¡Quemado ${burnAmount} GOO con éxito!`);
    updateUserStats();
}

// Función para retirar BNB
async function withdrawBNB() {
    const tx = await contract.claimDividends();
    await tx.wait();
    alert("¡Retirado con éxito tu BNB de dividendos!");
    updateUserStats();
}

// Función para actualizar las estadísticas del usuario
async function updateUserStats() {
    const userAddress = await signer.getAddress();

    // Obtener estadísticas de staking
    const userStakedBNB = await contract.userStakedBNB(userAddress);
    document.getElementById('stakedBNB').innerText = ethers.utils.formatEther(userStakedBNB) + " BNB";

    // Obtener estadísticas de GOO
    const userGOO = await contract.userGOO(userAddress);
    document.getElementById('userGOO').innerText = ethers.utils.formatUnits(userGOO, 18) + " goo";

    // Obtener los dividendos acumulados
    const userBNBEarnings = await contract.getUserBNBDividends(userAddress);
    const userGOOEarnings = await contract.getUserGOODividends(userAddress);

    document.getElementById('totalBNB').innerText = ethers.utils.formatEther(userBNBEarnings) + " BNB";

    // Actualizar el progreso de las barras
    const totalBNBStaked = await contract.totalBNBStaked();
    const totalGOOBurned = await contract.totalGOOBurned();
    const userShareBNB = (userStakedBNB / totalBNBStaked) * 100;
    const userShareGOO = (userGOO / totalGOOBurned) * 100;

    updateUserShare(userShareBNB);
    updateBurnShare(userShareGOO);
}

// Actualizar las barras de progreso de usuario
function updateUserShare(share) {
    document.getElementById('userShare').textContent = share.toFixed(2) + '%';
    document.getElementById('userShareProgress').style.width = share.toFixed(2) + '%';
}

function updateBurnShare(share) {
    document.getElementById('burnShare').textContent = share.toFixed(2) + '%';
    document.getElementById('burnShareProgress').style.width = share.toFixed(2) + '%';
}

// Actualización de la cuenta regresiva para la siguiente distribución
setInterval(async () => {
    const nextDistributionTime = await contract.getNextDistributionTime();
    const countdownElement = document.getElementById('countdown');

    if (nextDistributionTime > 0) {
        const minutes = Math.floor(nextDistributionTime / 60);
        const seconds = nextDistributionTime % 60;
        countdownElement.innerText = `${minutes}m ${seconds}s`;
    } else {
        countdownElement.innerText = "¡Distribución disponible!";
    }
}, 1000);
