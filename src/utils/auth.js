import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in", error);
    throw error;
  }
};

export const logout = async () => {
  return signOut(auth);
};
