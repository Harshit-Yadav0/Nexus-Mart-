/* -------------------------------------------
   NEXUS MART — ADMIN PANEL MAIN JAVASCRIPT
   Features:
   ✔ Product Management (Add / Edit / Delete)
   ✔ Category Management
   ✔ Order Management
   ✔ AI Analytics (Sales Graph)
   ✔ Firebase Auth
   ✔ Firestore Database
-------------------------------------------- */

// 🔥 FIREBASE CONFIG
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { 
    getAuth, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "nexusmart.firebaseapp.com",
  projectId: "nexusmart",
  storageBucket: "nexusmart.appspot.com",
  messagingSenderId: "00000000",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// 🔒 Only admins allowed
onAuthStateChanged(auth, user => {
    if (!user || user.email !== "admin@nexusmart.com") {
        alert("Access Denied — Admins Only!");
        window.location.href = "login.html";
    }
});

/* ------------------------------
      PAGE SECTION SWITCHER
------------------------------ */
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}
window.showSection = showSection;

/* ------------------------------
      LOAD ALL PRODUCTS
------------------------------ */
async function loadProducts() {
    const list = document.getElementById("productList");
    list.innerHTML = "Loading...";

    const querySnapshot = await getDocs(collection(db, "products"));
    list.innerHTML = "";

    querySnapshot.forEach(docSnap => {
        const p = docSnap.data();

        list.innerHTML += `
            <div class="product-card">
                <img src="${p.image}" alt="">
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <p>Category: ${p.category}</p>
                <p>Stock: ${p.stock}</p>
                <button onclick="deleteProduct('${docSnap.id}')">Delete</button>
            </div>
        `;
    });
}
window.onload = loadProducts;

/* ------------------------------
      DELETE PRODUCT
------------------------------ */
window.deleteProduct = async function(id) {
    await deleteDoc(doc(db, "products", id));
    alert("Product Deleted");
    loadProducts();
}

/* ------------------------------
      ADD PRODUCT
------------------------------ */
document.getElementById("addProductForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("pName").value;
    const price = document.getElementById("pPrice").value;
    const category = document.getElementById("pCategory").value;
    const stock = document.getElementById("pStock").value;
    const range = document.getElementById("pRange").value;
  
    const imageFile = document.getElementById("pImage").files[0];
    const reader = new FileReader();

    reader.onload = async () => {
        await addDoc(collection(db, "products"), {
            name,
            price,
            category,
            stock,
            range,
            image: reader.result
        });

        alert("Product Added!");
        loadProducts();
        e.target.reset();
    }

    reader.readAsDataURL(imageFile);
});

/* ------------------------------
       LOAD ORDERS
------------------------------ */
async function loadOrders() {
    const list = document.getElementById("orderList");
    list.innerHTML = "Loading...";

    const querySnapshot = await getDocs(collection(db, "orders"));
    list.innerHTML = "";

    querySnapshot.forEach(docSnap => {
        const o = docSnap.data();

        list.innerHTML += `
            <div class="order-card">
                <h3>Order ID: ${docSnap.id}</h3>
                <p>User: ${o.userEmail}</p>
                <p>Status: ${o.status}</p>
                <p>Total: ₹${o.total}</p>

                <button onclick="updateOrder('${docSnap.id}', 'Packed')">Packed</button>
                <button onclick="updateOrder('${docSnap.id}', 'Shipped')">Shipped</button>
                <button onclick="updateOrder('${docSnap.id}', 'Delivered')">Delivered</button>
            </div>
        `;
    });
}
window.updateOrder = async function(id, status) {
    await updateDoc(doc(db, "orders", id), { status });
    alert("Order Updated!");
    loadOrders();
};

/* ------------------------------
      CATEGORY MANAGEMENT
------------------------------ */
document.getElementById("categoryForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("categoryName").value;

    await addDoc(collection(db, "categories"), { name });

    alert("Category Added!");
    loadCategories();
    e.target.reset();
});

async function loadCategories() {
    const list = document.getElementById("categoryList");
    list.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "categories"));

    querySnapshot.forEach(docSnap => {
        list.innerHTML += `<li>${docSnap.data().name}</li>`;
    });
}
loadCategories();

/* ------------------------------
      AI ANALYTICS CHART
------------------------------ */
async function loadAnalytics() {
    const orders = await getDocs(collection(db, "orders"));
    let salesData = {};

    orders.forEach(docSnap => {
        const o = docSnap.data();
        const date = o.date || "Unknown";

        salesData[date] = (salesData[date] || 0) + o.total;
    });

    const ctx = document.getElementById("aiChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: Object.keys(salesData),
            datasets: [{
                label: "Daily Sales",
                data: Object.values(salesData),
                borderWidth: 3
            }]
        }
    });
}
loadAnalytics();
