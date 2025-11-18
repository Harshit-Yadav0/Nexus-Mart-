// Load Firebase Config (same as auth.js)
const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_BUCKET",
    messagingSenderId: "YOUR_SENDER",
    appId: "YOUR_APPID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// -------------------------------
// LOAD USER DATA
// -------------------------------
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("userEmail").innerText = user.email;
    document.getElementById("userName").innerText = localStorage.getItem("userName") || "User";

    loadOrders();
});

// -------------------------------
// LOAD USER ORDERS
// -------------------------------
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const container = document.getElementById("ordersList");

    const userEmail = firebase.auth().currentUser.email;

    const userOrders = orders.filter(order => order.email === userEmail || true); 
    // For now show all orders (until backend is added)

    if (userOrders.length === 0) {
        container.innerHTML = "<p>No orders yet.</p>";
        return;
    }

    container.innerHTML = "";

    userOrders.forEach(order => {
        container.innerHTML += `
            <div class="order-card">
                <p><b>Order ID:</b> ${order.id}</p>
                <p><b>Status:</b> ${order.status}</p>
                <p><b>Total:</b> ₹${order.amount}</p>
                <p><b>Items:</b> ${order.items.length}</p>
            </div>
        `;
    });
}

// -------------------------------
// LOGOUT
// -------------------------------
document.getElementById("logoutBtn").addEventListener("click", () => {
    auth.signOut().then(() => {
        alert("Logged out!");
        window.location.href = "login.html";
    });
});
