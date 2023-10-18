const hre = require("hardhat");
let cowName = 'Musya';
let horseName = 'Spirit';
let wolfName = 'Akela';

async function main() {
    const cow = await hre.ethers.deployContract("Cow", [cowName], {}); 
  	await cow.waitForDeployment();
  	console.log("Contract КОРОВА deployed to Address:", cow.target);
  	const horse = await hre.ethers.deployContract("Horse", [horseName], {}); // Передача начального значеня у контракт
  	await horse.waitForDeployment();
  	console.log("Contract ЛОШАДЬ deployed to Address:", horse.target);
  	const wolf = await hre.ethers.deployContract("Wolf", [wolfName], {}); // Передача начального значеня у контракт
  	await wolf.waitForDeployment();
  	console.log("Contract ВОЛК deployed to Address:", wolf.target);
   	const farmer = await hre.ethers.deployContract("Farmer");
	await farmer.waitForDeployment(); 
	console.log("Контракт FARMER развернут по адресу:", farmer.target);
	async function callAnimal(address) {
    let result = await farmer.callByAddress(address);
    console.log("callAnimal result", result);
	}
	await callAnimal(cow.target);
	await callAnimal(horse.target);

 	let eatMeat = await farmer.feedByAddress(wolf.target, "meat");
	console.log(eatMeat);
	//let eatPlant = await farmer.feedByAddress(wolf.target, "plant");
	//console.log(eatPlant);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });