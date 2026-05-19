import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SellerPage from "./pages/SellerPage";
import BuyerPage from "./pages/BuyerPage";
import VerifyDeal from "./pages/VerifyDeal";
import MyListings from "./pages/MyListings";
import Navbar from "./components/Navbar";
import { auth } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-navy font-jakarta">
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Dashboard user={user}/> : <Login/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/sell" element={<SellerPage user={user}/>}/>
          <Route path="/buy" element={<BuyerPage user={user}/>}/>
          <Route path="/my-listings" element={<MyListings user={user}/>}/>
          <Route path="/verify/:id" element={<VerifyDeal/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
