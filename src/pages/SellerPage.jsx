import { useState } from "react";
import { listEnergy } from "../utils/contract";
import { saveListing } from "../utils/firestore";
import { v4 as uuid } from "uuid";

export default function SellerPage({ user }) {
  const [units, setUnits] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleList = async () => {
    setLoading(true);
    const listingId = uuid();
    try {
      const hash = await listEnergy(listingId, units, price);
      await saveListing({
        listingId,
        sellerEmail: user?.email || "anonymous",
        units,
        pricePerUnit: price,
        txHash: hash
      });
      setTxHash(hash);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="bg-navy min-h-screen text-white font-jakarta pt-32 px-8 md:px-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-anton text-6xl md:text-8xl uppercase tracking-tighter text-white mb-12">
          LIST <span className="text-outline">ENERGY</span>
        </h2>
        
        <div className="bg-charcoal p-8 md:p-12 relative overflow-hidden border border-white/10 group">
          {/* Aesthetic background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan opacity-[0.03] blur-3xl group-hover:opacity-[0.08] transition-opacity duration-700"></div>
          
          <div className="relative z-10 flex flex-col gap-8">
            <div>
              <label className="block text-taupe text-sm uppercase tracking-widest font-bold mb-3">Energy Units (kWh)</label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={units}
                onChange={e => setUnits(e.target.value)}
                className="w-full bg-navy/50 border border-white/10 p-4 text-white focus:outline-none focus:border-sage transition-colors duration-300 placeholder-white/20"
              />
            </div>
            
            <div>
              <label className="block text-taupe text-sm uppercase tracking-widest font-bold mb-3">Price per kWh (MATIC)</label>
              <input
                type="number"
                placeholder="e.g. 0.05"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full bg-navy/50 border border-white/10 p-4 text-white focus:outline-none focus:border-sage transition-colors duration-300 placeholder-white/20"
              />
            </div>

            <button
              onClick={handleList}
              disabled={loading}
              className="w-full bg-sage text-navy py-5 font-anton text-xl tracking-widest uppercase hover:bg-white transition-colors duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "PROCESSING..." : "CONFIRM LISTING"}
            </button>
            
            {txHash && (
              <div className="mt-6 p-4 border border-sage/30 bg-sage/5">
                <p className="text-sage text-sm uppercase tracking-widest font-bold mb-1">Success</p>
                <a 
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-xs break-all font-mono opacity-80 hover:text-sage hover:underline block"
                >
                  TX: {txHash}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
