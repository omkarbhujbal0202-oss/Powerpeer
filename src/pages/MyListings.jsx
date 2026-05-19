import { useEffect, useState } from "react";
import { getUserListings, updateStatus } from "../utils/firestore";
import { confirmDelivery, confirmReceipt } from "../utils/contract";
import { Link } from "react-router-dom";

export default function MyListings({ user }) {
  const [listings, setListings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    if (user?.email) {
      getUserListings(user.email).then(setListings);
    }
  }, [user]);

  const handleConfirmDelivery = async (listing) => {
    setLoadingId(listing.id);
    try {
      await confirmDelivery(listing.listingId);
      await updateStatus(listing.id, "DELIVERED");
      alert("✅ Delivery confirmed on blockchain!");
      // Reload listings
      const updated = await getUserListings(user.email);
      setListings(updated);
    } catch (e) {
      console.error(e);
      alert("Transaction failed. Check console.");
    }
    setLoadingId(null);
  };

  const handleConfirmReceipt = async (listing) => {
    setLoadingId(listing.id);
    try {
      await confirmReceipt(listing.listingId);
      await updateStatus(listing.id, "COMPLETED");
      alert("✅ Receipt confirmed! Funds released to seller.");
      // Reload listings
      const updated = await getUserListings(user.email);
      setListings(updated);
    } catch (e) {
      console.error(e);
      alert("Transaction failed. Check console.");
    }
    setLoadingId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "LISTED": return "text-yellow-400 border-yellow-400/30 bg-yellow-400/5";
      case "PURCHASED": return "text-blue-400 border-blue-400/30 bg-blue-400/5";
      case "DELIVERED": return "text-purple-400 border-purple-400/30 bg-purple-400/5";
      case "COMPLETED": return "text-green-400 border-green-400/30 bg-green-400/5";
      default: return "text-gray-400 border-gray-400/30 bg-gray-400/5";
    }
  };

  // Filter listings
  const sellerListings = listings.filter(l => l.sellerEmail === user?.email);
  const buyerListings = listings.filter(l => l.buyerEmail === user?.email);

  return (
    <div className="bg-navy min-h-screen text-white font-jakarta pt-32 px-8 md:px-12 selection:bg-sage selection:text-navy">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-anton text-6xl md:text-8xl uppercase tracking-tighter text-white mb-16">
          TRACK <span className="text-outline">DEALS</span>
        </h2>

        {/* Listings as Seller */}
        <div className="mb-20">
          <h3 className="font-anton text-3xl uppercase tracking-wider text-sage mb-8">My Sales</h3>
          {sellerListings.length === 0 ? (
            <p className="text-taupe uppercase tracking-widest text-xs">No sales recorded yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sellerListings.map(l => (
                <div key={l.id} className="bg-charcoal border border-white/10 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className={`text-[10px] uppercase tracking-widest px-3 py-1 border font-bold ${getStatusColor(l.status)}`}>
                        {l.status}
                      </span>
                      <Link to={`/verify/${l.listingId}`} className="text-xs uppercase tracking-widest text-sage border-b border-sage hover:text-white hover:border-white transition-colors duration-300">
                        Verify Deal (QR)
                      </Link>
                    </div>
                    <h4 className="font-anton text-4xl text-white mb-6">{l.units} <span className="text-xl text-taupe font-sans">kWh</span></h4>
                    <p className="text-xs uppercase tracking-widest text-taupe font-bold mb-1">Buyer</p>
                    <p className="text-sm truncate text-white/70 mb-4">{l.buyerEmail || "Awaiting buyer..."}</p>
                    <p className="text-xs uppercase tracking-widest text-taupe font-bold mb-1">Amount</p>
                    <p className="text-sm text-white/70 mb-8">{l.units * l.pricePerUnit} MATIC</p>
                  </div>

                  {l.status === "PURCHASED" && (
                    <button
                      onClick={() => handleConfirmDelivery(l)}
                      disabled={loadingId === l.id}
                      className="w-full bg-sage text-navy py-4 font-anton text-sm tracking-widest uppercase hover:bg-white transition-colors duration-300 disabled:opacity-50"
                    >
                      {loadingId === l.id ? "CONFIRMING..." : "CONFIRM DELIVERY"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Listings as Buyer */}
        <div className="pb-32">
          <h3 className="font-anton text-3xl uppercase tracking-wider text-softblue mb-8">My Purchases</h3>
          {buyerListings.length === 0 ? (
            <p className="text-taupe uppercase tracking-widest text-xs">No purchases recorded yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {buyerListings.map(l => (
                <div key={l.id} className="bg-charcoal border border-white/10 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className={`text-[10px] uppercase tracking-widest px-3 py-1 border font-bold ${getStatusColor(l.status)}`}>
                        {l.status}
                      </span>
                      <Link to={`/verify/${l.listingId}`} className="text-xs uppercase tracking-widest text-sage border-b border-sage hover:text-white hover:border-white transition-colors duration-300">
                        Verify Deal (QR)
                      </Link>
                    </div>
                    <h4 className="font-anton text-4xl text-white mb-6">{l.units} <span className="text-xl text-taupe font-sans">kWh</span></h4>
                    <p className="text-xs uppercase tracking-widest text-taupe font-bold mb-1">Seller</p>
                    <p className="text-sm truncate text-white/70 mb-4">{l.sellerEmail}</p>
                    <p className="text-xs uppercase tracking-widest text-taupe font-bold mb-1">Amount</p>
                    <p className="text-sm text-white/70 mb-8">{l.units * l.pricePerUnit} MATIC</p>
                  </div>

                  {l.status === "DELIVERED" && (
                    <button
                      onClick={() => handleConfirmReceipt(l)}
                      disabled={loadingId === l.id}
                      className="w-full bg-white text-navy py-4 font-anton text-sm tracking-widest uppercase hover:bg-sage transition-colors duration-300 disabled:opacity-50"
                    >
                      {loadingId === l.id ? "CONFIRMING..." : "CONFIRM RECEIPT"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
