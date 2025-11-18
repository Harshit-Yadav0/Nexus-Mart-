// -------------------------------
// NEXUS MART - PROFILE JS
// -------------------------------

// Load user data when page opens
document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
    loadUserOrders();
});

function loadUserProfile() {
    let userData = JSON.parse(localStorage.getItem("nexusmart_user"));

    if (userData) {
        document.getElementById("profileName").innerText = userData.name;
        document.getElementById("profileEmail").innerText = userData.email;
    } else {
        alert("Please login first!");
        window.location.href = "login.html";
    }
}

function loadUserOrders() {
    let orders = JSON.parse(localStorage.getItem("nexusmart_orders")) || [];

    let container = document.getElementById("orderHistory");
    container.innerHTML = "";

    if (orders.length === 0) {
        container.innerHTML = "<p>No orders yet!</p>";
        return;
    }

    orders.forEach(order => {
        let div = document.createElement("div");
        div.className = "order-card";

        div.innerHTML = `
            <h3>Order #${order.id}</h3>
            <p><strong>Total:</strong> ₹${order.total}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Delivery Range:</strong> ${order.range}</p>

            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}">
                        <span>${item.name} (x${item.qty})</span>
                    </div>
                `).join("")}
            </div>
        `;

        container.appendChild(div);
    });
}
