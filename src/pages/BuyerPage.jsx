import { useEffect, useState } from "react";
import { getListings, updateStatus } from "../utils/firestore";
import { purchaseEnergy } from "../utils/contract";

export default function BuyerPage({ user }) {
  const [listings, setListings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    getListings().then(setListings);
  }, []);

  const handleBuy = async (listing) => {
    setLoadingId(listing.id);
    try {
      const total = listing.units * listing.pricePerUnit;
      
      // Execute smart contract transaction
      await purchaseEnergy(listing.listingId, total);
      
      // Update firestore to reflect the item is bought and link buyerEmail
      await updateStatus(listing.id, "PURCHASED", { 
        buyerEmail: user?.email || "anonymous" 
      });
      
      alert("✅ Purchase locked in smart contract!");
      
      // Remove listing from UI
      setListings(prev => prev.filter(l => l.id !== listing.id));
    } catch (e) {
      console.error(e);
      alert("Purchase failed. Check console for details.");
    }
    setLoadingId(null);
  };

  return (
    <div className="bg-navy min-h-screen text-white font-jakarta pt-32 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-anton text-6xl md:text-8xl uppercase tracking-tighter text-white mb-16">
          AVAILABLE <span className="text-outline">ENERGY</span>
        </h2>
        
        {listings.length === 0 ? (
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-taupe"></div>
            <p className="text-taupe uppercase tracking-widest text-sm font-bold">No active listings currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((l, i) => (
              <div 
                key={l.id} 
                className={`bg-charcoal border border-white/10 p-8 group relative overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-500 cursor-crosshair ${i % 2 !== 0 ? 'md:mt-12' : ''}`}
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-sage scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <div className="flex justify-between items-start mb-12">
                  <span className="font-anton text-5xl text-sage">{l.units} <span className="text-2xl text-taupe">kWh</span></span>
                  <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    <span className="text-[10px] uppercase tracking-widest text-white">Verified</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-10 flex-grow">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-taupe font-bold">Seller</p>
                    <p className="text-sm truncate text-white/80">{l.sellerEmail}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-taupe font-bold">Rate</p>
                      <p className="text-sm text-white/80">{l.pricePerUnit} MATIC / kWh</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-taupe font-bold">Total</p>
                      <p className="text-lg font-bold text-white">{l.units * l.pricePerUnit} MATIC</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBuy(l)}
                  disabled={loadingId === l.id}
                  className="w-full bg-white text-navy py-4 font-anton text-sm tracking-widest uppercase hover:bg-sage transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingId === l.id ? "PROCESSING TX..." : "PURCHASE ALLOCATION"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
