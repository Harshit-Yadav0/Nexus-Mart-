let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Show Summary
function loadSummary() {
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const qty = item.qty || 1;
        total += item.price * qty;
        count += qty;
    });

    document.getElementById("totalPrice").innerText = total;
    document.getElementById("itemCount").innerText = count;
}

// Validate Inputs
function validateForm() {
    const name = document.getElementById("nameInput").value;
    const phone = document.getElementById("phoneInput").value;
    const street = document.getElementById("streetInput").value;
    const city = document.getElementById("cityInput").value;
    const pin = document.getElementById("pinInput").value;

    if (!name || !phone || !street || !city || !pin) {
        alert("Please fill all fields!");
        return false;
    }

    if (phone.length < 10) {
        alert("Enter valid phone number!");
        return false;
    }

    if (pin.length !== 6) {
        alert("Enter valid 6-digit PIN!");
        return false;
    }

    return true;
}

// Place Order
document.getElementById("placeOrderBtn").addEventListener("click", function () {

    if (!validateForm()) return;

    const order = {
        id: Date.now(),
        items: cart,
        amount: document.getElementById("totalPrice").innerText,
        name: document.getElementById("nameInput").value,
        phone: document.getElementById("phoneInput").value,
        address: {
            street: document.getElementById("streetInput").value,
            city: document.getElementById("cityInput").value,
            pin: document.getElementById("pinInput").value
        },
        status: "Pending"
    };

    // Save order in local storage for now
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("cart");

    alert("Order Placed Successfully! 🟢");
    window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", loadSummary);
