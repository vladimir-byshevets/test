var assert = require('assert');
const horseName = 'Spirit';
const animalSleep = "Z-z-z...";
const food = "plant";

describe("Contract Horse and Farmer", function () {
	async function deploy() {
		// const [user1, user2] = await ethers.getSigners();
		// return {user1, user2};
		const horse = await hre.ethers.deployContract("Horse", [horseName], {});
  		await horse.waitForDeployment();
		const farmer = await hre.ethers.deployContract("Farmer");
		await farmer.waitForDeployment();
		return {horse, farmer};

	}

	it("Horse and Farmer is deployed to blockchain", async function () {
      //const result = await deploy();
      let farmerIsDeployed = false;
      	try{
			const {horse, farmer} = await deploy();

			if(horse.target && farmer.target){
				farmerIsDeployed = true;
				}
		}catch(e){}

			assert.equal(farmerIsDeployed, true,"Horse and Farmer is not deployed");
    });

    it("Horse has the correct name", async function () {
      	const {horse, farmer} = await deploy();
    	name = await horse.getName();
		assert.equal(name, horseName,`Horse is not named ${horseName}`);
    });

    it("Horse can sleep", async function () {
      	const {horse, farmer} = await deploy();
    	sleep = await horse.sleep();
		assert.equal(sleep, animalSleep, "Horse does not sleep");
    });

    it("Horse can eat plant", async function () {
      	const {horse, farmer} = await deploy();
    	eat = await horse.eat("plant");
		assert.equal(eat, "Animal eats plant", "Horses don't eat this kind of food.");
    });

    it("Horse cannot eat 'meat', 'not-food', 'plastic'", async function () {
      	const {horse, farmer} = await deploy();
    	try{
 			var canEatMeat = await horse.eat("meat");
 		}catch(e){}
			assert.notEqual(canEatMeat, "meat", "Horse can eat this food");
    	try{
 			var canEatMeat = await horse.eat("not-food");
 		}catch(e){}
			assert.notEqual(canEatMeat, "not-food", "Horse can eat this food");
    	try{
 			var canEatMeat = await horse.eat("plastic");
 		}catch(e){}
			assert.notEqual(canEatMeat, "plastic", "Horse can eat this food");
    });

    it("Farmer can call Horse, Horse responds correctly", async function () {
      	const {horse, farmer} = await deploy();
    	speak = await farmer.callByAddress(horse.target);
		assert.equal(speak, "Igogo", "A horse doesn't make that kind of sound.");
    });

    it("Farmer can feed Horse with plant", async function () {
      	const {horse, farmer} = await deploy();
    	eats = await farmer.feedByAddress(horse.target, "plant");
		assert.equal(eats, "Animal eats plant", "The animal only eats the plant");
    });

    it("Farmer cannot feed Horse with anything else", async function () {
    	let products = false;

    	if(products == "meat"){
    		products = false;
    	}else if (products == "plastic") {
    		products = false;
    	}else if (products == "fingers") {
    		products = false;
    	}else{
    		products = "plant";
    	}
      	const {horse, farmer} = await deploy();
    	nutrition  = await farmer.feedByAddress(horse.target, products);
		assert.equal(nutrition, "Animal eats plant", "The animal only eats the plant");
    });






});