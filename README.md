# ⚡ PowerPeer — Decentralized Peer-to-Peer Energy Marketplace

PowerPeer is a full-stack decentralized application (dApp) designed for trustless, peer-to-peer solar energy trading. By leveraging a Solidity smart contract escrow system combined with a Firebase cloud database, PowerPeer allows users to securely list, purchase, verify, and complete energy trades directly without intermediaries.

Live Deployment: **[https://powerpeer-10f3d.web.app](https://powerpeer-10f3d.web.app)**
On-chain Smart Contract (Sepolia): **[0x3475f934E850fbc8bA58F739C694e5F3A61EE34e](https://sepolia.etherscan.io/address/0x3475f934E850fbc8bA58F739C694e5F3A61EE34e)**

---

## ✨ Features

- 👤 **Unified Authentication**: Sign in securely using Google or standard Email/Password powered by Firebase Auth.
- 🦊 **Metamask Wallet Integration**: Dynamically connect and listen for account/network changes using `ethers.js` (v6).
- ⚡ **Seller Portal**: List custom energy batches (in kWh) on-chain with specific price points in MATIC.
- 🛒 **Buyer Marketplace**: Browse available energy listings, purchase energy, and lock funds automatically in the escrow smart contract.
- 📋 **Deals Tracker (My Deals)**: Custom dashboard showing ongoing sales and purchases:
  - **Sellers** can confirm physical delivery once energy is bought.
  - **Buyers** can confirm receipt of energy (releasing the escrowed MATIC directly to the seller's wallet).
- 🔍 **Audit & Verification**: View deal details publicly showing transaction hashes linked to Sepolia Etherscan and:
  - An interactive **QR Code** for instant mobile verification.
  - Exportable **PDF Transaction Receipts** generated using `jspdf` and `html2canvas`.

---

## 🛠️ Technology Stack

- **Frontend**: React (v19), Tailwind CSS, React Router, React Firebase Hooks
- **Blockchain**: Solidity (0.8.0), Hardhat, Ethers.js (v6)
- **Database / Hosting**: Firebase Firestore, Firebase Authentication, Firebase Hosting
- **Utilities**: jsPDF, html2canvas, qrcode.react, uuid

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js and MetaMask installed on your machine.

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/omkarbhujbal0202-oss/Powerpeer.git
cd Powerpeer
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_metamask_private_key_without_0x_prefix
```

---

## 📦 Smart Contract & Deployment Pipeline

This repository features an automated contract deployment and compilation script.

### Local Development
To run a local Hardhat node and test the contract locally:
```bash
npx hardhat node
```
Update your Metamask network to `Localhost 8545` (Chain ID: `31337`).

### Automated Sepolia Deployment & Publishing
We've built a one-click script that compiles the Solidity code, deploys the smart contract to Sepolia, updates the frontend configuration with the new contract address, compiles the React build, and deploys it live to Firebase Hosting:
```bash
npm run deploy-sepolia
```

---

## 📁 Project Structure

```
├── contracts/
│   └── PowerPeer.sol        # Solidity Escrow Smart Contract
├── scripts/
│   ├── deploy.js            # Base deployment script
│   └── deploy-sepolia.js    # Automated pipeline deployment script
├── src/
│   ├── components/          # Reusable UI components (Navbar, WalletConnect, etc.)
│   ├── firebase/            # Firebase client initialization
│   ├── pages/               # Routing pages (Login, Dashboard, BuyerPage, SellerPage, MyListings, VerifyDeal)
│   ├── utils/               # Ethers.js & Firestore CRUD helper files
│   ├── App.jsx              # Main App Routing
│   └── index.css            # Custom fonts (Anton, Jakarta) & Global Styles
├── firebase.json            # Firebase SPA routing specifications
└── hardhat.config.js        # Hardhat configuration file
```

---

## 🛡️ License

This project is licensed under the MIT License.
