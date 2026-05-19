const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function main() {
  console.log("Compiling and deploying PowerPeer contract to Sepolia...");
  
  const PowerPeer = await hre.ethers.getContractFactory("PowerPeer");
  const powerPeer = await PowerPeer.deploy();
  
  await powerPeer.waitForDeployment();
  const address = await powerPeer.getAddress();
  console.log("🚀 Contract deployed successfully to Sepolia at:", address);
  
  // Update contract.js
  const contractJsPath = path.join(__dirname, "../src/utils/contract.js");
  let contractJs = fs.readFileSync(contractJsPath, "utf8");
  
  // Replace the CONTRACT_ADDRESS line
  contractJs = contractJs.replace(
    /const CONTRACT_ADDRESS = ".*?";/,
    `const CONTRACT_ADDRESS = "${address}";`
  );
  
  fs.writeFileSync(contractJsPath, contractJs, "utf8");
  console.log("📝 Updated src/utils/contract.js with the new contract address.");
  
  // Rebuild and Deploy to Firebase
  console.log("📦 Building React production bundle...");
  execSync("npm run build", { stdio: "inherit" });
  
  console.log("🔥 Deploying to Firebase hosting...");
  execSync("npx firebase-tools deploy", { stdio: "inherit" });
  
  console.log("🎉 All done! Visit your live website to test the verified Sepolia transactions!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
