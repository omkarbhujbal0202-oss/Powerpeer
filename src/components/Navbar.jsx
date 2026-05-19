import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import WalletConnect from "./WalletConnect";

export default function Navbar() {
  const location = useLocation();
  const [user] = useAuthState(auth);

  const getLinkClass = (path) => {
    const baseClass = "text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300";
    return location.pathname === path 
      ? `${baseClass} text-sage` 
      : `${baseClass} text-taupe hover:text-white`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-navy/80 backdrop-blur-md border-b border-white/5 px-8 md:px-12 py-5 flex justify-between items-center">
      <Link to="/" className="font-anton text-2xl tracking-widest text-white hover:text-sage transition-colors duration-300">
        POWERPEER
      </Link>
      
      <div className="hidden md:flex gap-8 items-center">
        <Link to="/" className={getLinkClass("/")}>Dashboard</Link>
        <Link to="/buy" className={getLinkClass("/buy")}>Buy Energy</Link>
        <Link to="/sell" className={getLinkClass("/sell")}>Sell Energy</Link>
        <Link to="/my-listings" className={getLinkClass("/my-listings")}>My Deals</Link>
      </div>

      <div className="flex items-center gap-4">
        <WalletConnect />
        {user && (
          <button
            onClick={() => signOut(auth)}
            className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white border border-white/10 hover:border-white px-4 py-2 rounded-full transition-all duration-300 font-semibold"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
