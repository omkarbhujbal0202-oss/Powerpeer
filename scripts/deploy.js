const hre = require("hardhat");

async function main() {
  const PowerPeer = await hre.ethers.getContractFactory("PowerPeer");
  const powerPeer = await PowerPeer.deploy();
  
  await powerPeer.waitForDeployment();
  
  console.log("PowerPeer deployed to:", await powerPeer.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
