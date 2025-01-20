// Variables del contrato
const contractAddress = "0x0354A964Bc3c8CA51ab519a4312Ca2C1f23380b3";  // Reemplaza con la dirección de tu contrato desplegado

// ABI del contrato (puedes obtenerlo desde Remix o Truffle después de desplegar el contrato)
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DividendsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GOOBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnGOO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"burnRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributeDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributionInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNextDistributionTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPrizePool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalGOOBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserBNBDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserGOODividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDistributionTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeBNB","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBNBStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalGOOBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPrizePool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unstakeBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userBNBEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userGOO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userGOOEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userLastClaimTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userStakedBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

// Conectar a la red y al contrato
const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
let contract;

async function initialize() {
    await provider.send("eth_requestAccounts", []);  // Solicitar acceso a las cuentas del usuario
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log("Conectado al contrato", contract);
}

// Función para stakear BNB
async function stakeBNB(amount) {
    const value = ethers.utils.parseEther(amount.toString());  // Convierte la cantidad a BNB
    const tx = await contract.stakeBNB({ value });
    await tx.wait();
    console.log(`Staked ${amount} BNB`);
}

// Función para unstakear BNB (50%)
async function unstakeBNB() {
    const tx = await contract.unstakeBNB();
    await tx.wait();
    console.log("Unstaked 50% of your BNB");
}

// Función para quemar GOO
async function burnGOO(amount) {
    const tx = await contract.burnGOO(ethers.utils.parseUnits(amount.toString(), 18));  // Quemar el GOO
    await tx.wait();
    console.log(`Burned ${amount} GOO`);
}

// Función para reclamar dividendos
async function claimDividends() {
    const tx = await contract.claimDividends();
    await tx.wait();
    console.log("Claimed your dividends");
}

// Función para obtener los dividendos acumulados del staking
async function getUserBNBDividends() {
    const dividends = await contract.getUserBNBDividends(signer.getAddress());
    console.log("Your staking dividends:", ethers.utils.formatEther(dividends));
}

// Función para obtener los dividendos acumulados de la quema de GOO
async function getUserGOODividends() {
    const dividends = await contract.getUserGOODividends(signer.getAddress());
    console.log("Your GOO burn dividends:", ethers.utils.formatEther(dividends));
}

// Función para obtener el total de GOO quemado
async function getTotalGOOBurned() {
    const totalBurned = await contract.getTotalGOOBurned();
    console.log("Total GOO burned:", ethers.utils.formatUnits(totalBurned, 18));
}

// Función para obtener el Game Prize Pool (total BNB en el contrato)
async function getPrizePool() {
    const prizePool = await contract.getPrizePool();
    console.log("Game Prize Pool:", ethers.utils.formatEther(prizePool));
}

// Función para obtener el tiempo restante para la siguiente distribución
async function getNextDistributionTime() {
    const timeRemaining = await contract.getNextDistributionTime();
    console.log("Time until next distribution:", timeRemaining);
}

// Función de emergencia para retirar BNB (solo el propietario)
async function emergencyWithdraw(amount) {
    const tx = await contract.emergencyWithdraw(ethers.utils.parseEther(amount.toString()));
    await tx.wait();
    console.log(`Emergency withdrew ${amount} BNB`);
}

// Inicializar la conexión
initialize().then(() => {
    console.log("Conexión inicializada");
});
