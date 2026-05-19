import { useState, useEffect } from "react";

export default function WalletConnect() {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return;
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Error checking wallet connection", error);
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        setLoading(false);
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount("");
        }
      });
    }
  }, []);

  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="relative">
      {account ? (
        <div className="flex items-center gap-3 bg-white/5 border border-sage/30 px-5 py-2.5 rounded-full text-sage">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="font-mono text-xs uppercase tracking-wider font-semibold">
            {formatAddress(account)}
          </span>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={loading}
          className="border border-white/20 hover:border-white text-white font-bold py-2.5 px-6 uppercase tracking-widest text-[11px] rounded-full transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "CONNECTING..." : "CONNECT WALLET"}
        </button>
      )}
    </div>
  );
}
