import { auth } from "../firebase/config";
import { signInWithPopup, GoogleAuthProvider,
         signInWithEmailAndPassword,
         createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy font-jakarta">
      <div className="bg-charcoal p-8 rounded-2xl w-96 text-white border border-sage/20">
        <h1 className="text-4xl font-anton uppercase tracking-tight text-sage mb-2">⚡ PowerPeer</h1>
        <p className="text-taupe mb-6 font-light">Peer-to-peer energy marketplace</p>

        {/* Google Login */}
        <button
          onClick={googleLogin}
          className="w-full bg-white text-navy py-3 rounded-xl font-semibold mb-4 hover:bg-sage transition-colors duration-300"
        >
          🔵 Continue with Google
        </button>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button className="bg-sage text-navy py-3 rounded-xl font-bold hover:bg-white transition-colors duration-300">
            ⚡ I'm a Seller
          </button>
          <button className="bg-softblue text-navy py-3 rounded-xl font-bold hover:bg-white transition-colors duration-300">
            🛒 I'm a Buyer
          </button>
        </div>
      </div>
    </div>
  );
}
