let provider;
let signer;
let contract;

const contractAddress = "0xD672c6FE894F094814ad9ce2154f91dF0ffF18FE"; // Dirección de tu contrato
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BurnDividendClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GOOBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnGOO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"burnRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimBurnDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributeBurnDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributeDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributionInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"generateGOO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNextDistributionTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPrizePool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalBNBDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalBNBStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalBurnDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalGOOBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserBNBDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserGOODividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gooGenerationRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDistributionTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeBNB","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBNBDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBNBStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBurnDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalGOOBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPrizePool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unstakeBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userBNBEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userGOO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userGOOEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userLastClaimTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userStakedBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userTotalGOOBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userTotalGOOGenerated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

// Conectar MetaMask
async function connectMetaMask() {
    if (typeof window.ethereum !== "undefined") {
        try {
            // Solicitar acceso a la cuenta de MetaMask
            await window.ethereum.request({ method: "eth_requestAccounts" });

            // Crear proveedor y firmante de MetaMask
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();

            // Conectar con el contrato inteligente
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Obtener la dirección de la cuenta de MetaMask
            const userAddress = await signer.getAddress();
            console.log(`Conectado con la cuenta: ${userAddress}`);

            // Cargar las estadísticas generales
            await loadStats();
            // Cargar las estadísticas del usuario
            await loadUserStats();

        } catch (error) {
            console.error("Error al conectar MetaMask:", error);
            alert("Por favor, asegúrate de que MetaMask esté instalado y que has conectado tu cuenta.");
        }
    } else {
        alert("MetaMask no está instalado. Por favor, instálalo para interactuar con el sitio.");
    }
}

// Llamar a la función de conexión al cargar la página
window.onload = connectMetaMask;

// Función para cargar las estadísticas generales
async function loadStats() {
    const totalBNBStaked = await contract.getTotalBNBStaked();
    const totalGOOBurned = await contract.getTotalGOOBurned();
    const prizePool = await contract.getPrizePool();
    const totalBNBDividends = await contract.getTotalBNBDividendsDistributed();
    const totalBurnDividends = await contract.getTotalBurnDividendsDistributed();
    const nextDistributionTime = await contract.getNextDistributionTime();

    document.getElementById('totalBNBStaked').innerText = ethers.utils.formatEther(totalBNBStaked) + " BNB";
    document.getElementById('totalGOOBurned').innerText = ethers.utils.formatUnits(totalGOOBurned, 18) + " GOO";
    document.getElementById('prizePool').innerText = ethers.utils.formatEther(prizePool) + " BNB";
    document.getElementById('totalBNBDividends').innerText = ethers.utils.formatEther(totalBNBDividends) + " BNB";
    document.getElementById('totalBurnDividends').innerText = ethers.utils.formatEther(totalBurnDividends) + " GOO";
    document.getElementById('nextDistributionTime').innerText = nextDistributionTime === 0 ? "Now" : new Date(nextDistributionTime * 1000).toLocaleString();
}

// Función para cargar las estadísticas del usuario
async function loadUserStats() {
    const userAddress = await signer.getAddress();
    
    const userStakedBNB = await contract.userStakedBNB(userAddress);
    const userGOO = await contract.userGOO(userAddress);
    const userGOOEarnings = await contract.userGOOEarnings(userAddress);
    const userTotalGOOGenerated = await contract.userTotalGOOGenerated(userAddress);
    const userTotalGOOBurned = await contract.userTotalGOOBurned(userAddress);
    const userBNBEarnings = await contract.userBNBEarnings(userAddress);

    document.getElementById('userStakedBNB').innerText = ethers.utils.formatEther(userStakedBNB) + " BNB";
    document.getElementById('userGOOBalance').innerText = ethers.utils.formatUnits(userGOO, 18) + " GOO";
    document.getElementById('userGOOEarnings').innerText = ethers.utils.formatUnits(userGOOEarnings, 18) + " GOO";
    document.getElementById('userTotalGOOGenerated').innerText = ethers.utils.formatUnits(userTotalGOOGenerated, 18) + " GOO";
    document.getElementById('userTotalGOOBurned').innerText = ethers.utils.formatUnits(userTotalGOOBurned, 18) + " GOO";
    document.getElementById('userBNBDividends').innerText = ethers.utils.formatEther(userBNBEarnings) + " BNB";
}
