import { ethers } from "ethers";
import ABI from "../contracts/PowerPeerABI.json";

// Using the locally deployed Hardhat address
const CONTRACT_ADDRESS = "0x3475f934E850fbc8bA58F739C694e5F3A61EE34e";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("No crypto wallet found");
  // ethers v6 syntax for browser provider
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
};

// List Energy
export const listEnergy = async (listingId, units, pricePerUnit) => {
  const contract = await getContract();
  const tx = await contract.listEnergy(
    listingId, 
    units,
    ethers.parseEther(pricePerUnit.toString()) // ethers v6 parseEther
  );
  await tx.wait();
  return tx.hash;
};

// Purchase Energy
export const purchaseEnergy = async (listingId, totalAmount) => {
  const contract = await getContract();
  const tx = await contract.purchaseEnergy(listingId, {
    value: ethers.parseEther(totalAmount.toString()) // ethers v6 parseEther
  });
  await tx.wait();
  return tx.hash;
};

// Confirm Delivery
export const confirmDelivery = async (listingId) => {
  const contract = await getContract();
  const tx = await contract.confirmDelivery(listingId);
  await tx.wait();
  return tx.hash;
};

// Confirm Receipt
export const confirmReceipt = async (listingId) => {
  const contract = await getContract();
  const tx = await contract.confirmReceipt(listingId);
  await tx.wait();
  return tx.hash;
};
