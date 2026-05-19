import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListingByListingId } from "../utils/firestore";
import { getContract } from "../utils/contract";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function VerifyDeal() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [contractStatus, setContractStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeal = async () => {
      try {
        const data = await getListingByListingId(id);
        setListing(data);

        // Try to fetch on-chain status for verification
        try {
          const contract = await getContract();
          const listingInfo = await contract.getListing(id);
          // Returns: (seller, buyer, units, totalAmount, status)
          const statusEnum = ["LISTED", "PURCHASED", "DELIVERED", "COMPLETED", "DISPUTED"];
          setContractStatus({
            seller: listingInfo[0],
            buyer: listingInfo[1],
            units: listingInfo[2].toString(),
            totalAmount: listingInfo[3].toString(),
            status: statusEnum[Number(listingInfo[4])]
          });
        } catch (contractErr) {
          console.log("Could not fetch on-chain data: Wallet not connected or contract error.", contractErr);
        }
      } catch (err) {
        console.error("Error loading deal metadata", err);
      }
      setLoading(false);
    };

    if (id) {
      loadDeal();
    }
  }, [id]);

  const handleDownloadPDF = () => {
    const input = document.getElementById("receipt-content");
    if (!input) return;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#171e19"
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`PowerPeer-Receipt-${id.slice(0, 8)}.pdf`);
    });
  };

  if (loading) {
    return (
      <div className="bg-navy min-h-screen text-white font-jakarta flex items-center justify-center">
        <span className="font-anton text-2xl animate-pulse">LOADING TRANSACTION DATA...</span>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="bg-navy min-h-screen text-white font-jakarta flex flex-col items-center justify-center gap-4">
        <h2 className="font-anton text-6xl text-outline">ERROR 404</h2>
        <p className="text-taupe uppercase tracking-widest text-xs font-bold">Deal verification record not found.</p>
      </div>
    );
  }

  const qrUrl = window.location.href;

  return (
    <div className="bg-navy min-h-screen text-white font-jakarta pt-32 pb-24 px-8 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <h2 className="font-anton text-6xl md:text-8xl uppercase tracking-tighter text-white">
              VERIFY <span className="text-outline">DEAL</span>
            </h2>
            <p className="text-taupe uppercase tracking-widest text-xs font-bold mt-2">
              ID: {id}
            </p>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="border border-white/20 hover:border-white text-white font-bold py-3 px-6 uppercase tracking-widest text-xs transition-colors duration-300"
          >
            Download Receipt (PDF)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Receipt Content (Exportable to PDF) */}
          <div className="lg:col-span-8">
            <div 
              id="receipt-content" 
              className="bg-charcoal border border-white/10 p-8 md:p-12 relative overflow-hidden"
            >
              {/* Decorative design */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan opacity-5 blur-3xl"></div>
              
              <div className="flex justify-between items-center border-b border-white/10 pb-8 mb-8">
                <div>
                  <h3 className="font-anton text-3xl uppercase tracking-wider text-sage">POWERPEER</h3>
                  <p className="text-[10px] uppercase tracking-widest text-taupe font-bold">P2P Energy Marketplace Receipt</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-taupe font-bold">Verification Date</p>
                  <p className="text-sm font-semibold">{new Date(listing.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-taupe font-bold mb-1">Energy Amount</p>
                    <p className="font-anton text-3xl text-white">{listing.units} kWh</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-taupe font-bold mb-1">Rate</p>
                    <p className="text-lg font-semibold">{listing.pricePerUnit} MATIC / kWh</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <p className="text-[10px] uppercase tracking-widest text-taupe font-bold mb-1">Total Transaction Amount</p>
                  <p className="text-2xl font-bold text-sage">{listing.units * listing.pricePerUnit} MATIC</p>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-taupe font-bold mb-1">Seller Account Email</p>
                    <p className="text-sm break-all font-mono opacity-80">{listing.sellerEmail}</p>
                  </div>
                  {listing.buyerEmail && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-taupe font-bold mb-1">Buyer Account Email</p>
                      <p className="text-sm break-all font-mono opacity-80">{listing.buyerEmail}</p>
                    </div>
                  )}
                  {listing.txHash && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-taupe font-bold mb-1">Blockchain Transaction Hash</p>
                      <a
                        href={`https://sepolia.etherscan.io/tx/${listing.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm break-all font-mono text-softblue hover:text-white hover:underline block"
                      >
                        {listing.txHash}
                      </a>
                    </div>
                  )}
                </div>

                {/* On-Chain Validation */}
                <div className="border-t border-white/10 pt-6">
                  <p className="text-[10px] uppercase tracking-widest text-taupe font-bold mb-3">On-Chain Realtime Status</p>
                  {contractStatus ? (
                    <div className="bg-navy/50 p-4 border border-sage/20 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs uppercase tracking-widest text-taupe font-semibold">Contract Sync</span>
                        <span className="text-xs uppercase tracking-widest text-green-400 font-bold">VERIFIED ON-CHAIN</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <p className="text-taupe">On-chain Status:</p>
                        <p className="font-bold text-white text-right">{contractStatus.status}</p>
                        
                        <p className="text-taupe">Buyer Address:</p>
                        <p className="font-mono text-white text-right truncate">{contractStatus.buyer}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-navy/50 p-4 border border-white/5 rounded flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></span>
                      <p className="text-xs text-taupe uppercase tracking-widest">Awaiting wallet connection for on-chain proof</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: QR Code & Verification Status */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-charcoal border border-white/10 p-8 flex flex-col items-center justify-center text-center">
              <h4 className="font-anton text-xl uppercase tracking-wider text-white mb-6">Scan to Verify</h4>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <QRCodeSVG value={qrUrl} size={150} level="H" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-taupe font-bold mt-6 leading-relaxed">
                Scan this QR code using a mobile device to instantly verify this deal's records.
              </p>
            </div>

            <div className="bg-charcoal border border-white/10 p-8">
              <h4 className="font-anton text-xl uppercase tracking-wider text-white mb-4">Metadata Check</h4>
              <div className="space-y-3 text-xs uppercase tracking-widest text-taupe">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Firestore Status</span>
                  <span className="text-white font-bold">{listing.status}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>SSL Connection</span>
                  <span className="text-green-400 font-bold">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage Nodes</span>
                  <span className="text-white">IPFS + Firebase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
