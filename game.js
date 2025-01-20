let provider;
let signer;
let contract;

const contractAddress = "0xD672c6FE894F094814ad9ce2154f91dF0ffF18FE"; // Dirección de tu contrato
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BurnDividendClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GOOBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnGOO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"burnRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimBurnDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributeBurnDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributeDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributionInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"generateGOO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNextDistributionTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPrizePool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalBNBDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalBNBStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalBurnDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalGOOBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserBNBDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserGOODividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gooGenerationRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDistributionTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeBNB","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBNBDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBNBStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBurnDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalGOOBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPrizePool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unstakeBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userBNBEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userGOO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userGOOEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userLastClaimTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userStakedBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userTotalGOOBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userTotalGOOGenerated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

async function connectMetaMask() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            const userAddress = await signer.getAddress();
            console.log(`Conectado con la cuenta: ${userAddress}`);

            // Estadísticas generales
            const prizePool = await contract.getPrizePool();
            document.getElementById('prizePool').innerText = ethers.utils.formatEther(prizePool) + " BNB";

            const gooBurned = await contract.getTotalGOOBurned();
            document.getElementById('gooBurned').innerText = ethers.utils.formatUnits(gooBurned, 18) + " GOO";

            const totalBNBStaked = await contract.totalBNBStaked();
            document.getElementById('totalBNBStaked').innerText = ethers.utils.formatEther(totalBNBStaked) + " BNB";

            const totalGOOBurned = await contract.totalGOOBurned();
            document.getElementById('totalGOOBurned').innerText = ethers.utils.formatUnits(totalGOOBurned, 18) + " GOO";

            const totalPrizePool = await contract.totalPrizePool();
            document.getElementById('totalPrizePool').innerText = ethers.utils.formatEther(totalPrizePool) + " BNB";

            updateUserStats();

        } catch (error) {
            console.error("Error al conectar MetaMask:", error);
            alert("Por favor, asegúrate de que MetaMask esté instalado y que has conectado tu cuenta.");
        }
    } else {
        alert("MetaMask no está instalado. Por favor, instálalo para interactuar con el sitio.");
    }
}

window.onload = connectMetaMask;

async function updateUserStats() {
    const userAddress = await signer.getAddress();

    // Obtener estadísticas de staking y GOO
    const userStakedBNB = await contract.userStakedBNB(userAddress);
    document.getElementById('stakedBNB').innerText = ethers.utils.formatEther(userStakedBNB) + " BNB";

    const userGOO = await contract.userGOO(userAddress);
    document.getElementById('userGOO').innerText = ethers.utils.formatUnits(userGOO, 18) + " GOO";

    // Obtener dividendos
    const userBNBEarnings = await contract.getUserBNBDividends(userAddress);
    const userGOOEarnings = await contract.getUserGOODividends(userAddress);
    document.getElementById('userBNBEarnings').innerText = ethers.utils.formatEther(userBNBEarnings) + " BNB";
    document.getElementById('userGOOEarnings').innerText = ethers.utils.formatUnits(userGOOEarnings, 18) + " GOO";

    // Actualizar barras de progreso
    updateUserShare(userStakedBNB, userGOO);
}

// Función para actualizar la barra de progreso de participación del usuario
function updateUserShare(userStakedBNB, userGOO) {
    const totalBNBStaked = await contract.totalBNBStaked();
    const totalGOOBurned = await contract.totalGOOBurned();

    const userShareBNB = (userStakedBNB / totalBNBStaked) * 100;
    const userShareGOO = (userGOO / totalGOOBurned) * 100;

    document.getElementById('userShareBNB').textContent = userShareBNB.toFixed(2) + '%';
    document.getElementById('userShareGOO').textContent = userShareGOO.toFixed(2) + '%';
    document.getElementById('userShareBNBProgress').style.width = userShareBNB.toFixed(2) + '%';
    document.getElementById('userShareGOOProgress').style.width = userShareGOO.toFixed(2) + '%';
}

// Función para manejar el retiro de dividendos BNB
async function withdrawBNB() {
    const tx = await contract.claimDividends();
    await tx.wait();
    alert("¡Retirado con éxito tu BNB de dividendos!");
    updateUserStats();
}

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

