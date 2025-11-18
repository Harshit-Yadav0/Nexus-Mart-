/* -----------------------------------------------------
   NEXUS MART — Firebase Client SDK (User Side)
   Functions Included:
   ✔ User Signup/Login
   ✔ Fetch Products
   ✔ Save Cart to DB
   ✔ Place Order
   ✔ Load User Orders
   ✔ Logout
------------------------------------------------------ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc, updateDoc 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { 
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// -----------------------------------------------------
// 1️⃣ FIREBASE CONFIG (CHANGE THIS)
// -----------------------------------------------------
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFag8NQCJlAAfAL9b_pRbR77xzj651-9E",
  authDomain: "nexus-mart-18561.firebaseapp.com",
  projectId: "nexus-mart-18561",
  storageBucket: "nexus-mart-18561.firebasestorage.app",
  messagingSenderId: "17997299074",
  appId: "1:17997299074:web:4de2d55636e229d7bde39b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
};

// INIT
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();


// -----------------------------------------------------
// 2️⃣ SIGNUP FUNCTION
// -----------------------------------------------------
export async function signupUser(email, password) {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        // Create user profile in Firestore
        await setDoc(doc(db, "users", userCred.user.uid), {
            email,
            createdAt: Date.now(),
            orders: []
        });

        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
}


// -----------------------------------------------------
// 3️⃣ LOGIN FUNCTION
// -----------------------------------------------------
export async function loginUser(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
}


// -----------------------------------------------------
// 4️⃣ FETCH PRODUCTS
// -----------------------------------------------------
export async function fetchProducts() {
    const list = [];
    const snap = await getDocs(collection(db, "products"));

    snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() });
    });

    return list;
}


// -----------------------------------------------------
// 5️⃣ SAVE CART TO FIRESTORE
// -----------------------------------------------------
export async function saveCart(uid, cartItems) {
    await setDoc(doc(db, "carts", uid), {
        items: cartItems
    });
}


// -----------------------------------------------------
// 6️⃣ LOAD SAVED CART
// -----------------------------------------------------
export async function loadCart(uid) {
    const ref = doc(db, "carts", uid);
    const snap = await getDoc(ref);

    if (snap.exists()) return snap.data().items;
    return [];
}


// -----------------------------------------------------
// 7️⃣ PLACE ORDER
// -----------------------------------------------------
export async function placeOrder(uid, orderData) {
    const docRef = await addDoc(collection(db, "orders"), orderData);

    // Add order ID to User Profile
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    let existing = userSnap.data().orders || [];
    existing.push(docRef.id);

    await updateDoc(userRef, { orders: existing });

    return docRef.id;
}


// -----------------------------------------------------
// 8️⃣ LOAD USER ORDERS
// -----------------------------------------------------
export async function getUserOrders(uid) {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    const orderIds = userSnap.data().orders || [];
    let orders = [];

    for (let id of orderIds) {
        const o = await getDoc(doc(db, "orders", id));
        if (o.exists()) orders.push({ id, ...o.data() });
    }

    return orders;
}


// -----------------------------------------------------
// 9️⃣ AUTH STATE HANDLER
// -----------------------------------------------------
export function onUserChanged(callback) {
    onAuthStateChanged(auth, callback);
}


// -----------------------------------------------------
// 🔟 LOGOUT
// -----------------------------------------------------
export async function logout() {
    await signOut(auth);
}
