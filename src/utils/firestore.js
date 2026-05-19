import { db } from "../firebase/config";
import { collection, addDoc,
         getDocs, updateDoc,
         doc, query, where } from "firebase/firestore";

// Save listing to Firestore
export const saveListing = async (data) => {
  await addDoc(collection(db, "listings"), {
    ...data,
    createdAt: new Date(),
    status: "LISTED"
  });
};

// Get all available listings
export const getListings = async () => {
  const q = query(
    collection(db, "listings"),
    where("status", "==", "LISTED")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// Update listing status
export const updateStatus = async (id, status, extraData = {}) => {
  await updateDoc(doc(db, "listings", id), { status, ...extraData });
};

// Update listing status by listingId
export const updateStatusByListingId = async (listingId, status, extraData = {}) => {
  const q = query(collection(db, "listings"), where("listingId", "==", listingId));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const docId = snap.docs[0].id;
    await updateDoc(doc(db, "listings", docId), { status, ...extraData });
  }
};

// Get listings for user (seller or buyer)
export const getUserListings = async (email) => {
  if (!email) return [];
  const qSeller = query(collection(db, "listings"), where("sellerEmail", "==", email));
  const qBuyer = query(collection(db, "listings"), where("buyerEmail", "==", email));
  
  const [sellerSnap, buyerSnap] = await Promise.all([
    getDocs(qSeller),
    getDocs(qBuyer)
  ]);
  
  const sellerListings = sellerSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  const buyerListings = buyerSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  // Merge and deduplicate
  const merged = [...sellerListings];
  buyerListings.forEach(bl => {
    if (!merged.some(ml => ml.id === bl.id)) {
      merged.push(bl);
    }
  });
  
  return merged;
};

// Get a single listing by its custom listingId
export const getListingByListingId = async (listingId) => {
  const q = query(collection(db, "listings"), where("listingId", "==", listingId));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
};
