let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load Cart on Page
function loadCart() {
    const container = document.getElementById("cartItems");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<h2>Your cart is empty 😢</h2>";
        document.getElementById("totalPrice").innerText = 0;
        document.getElementById("itemCount").innerText = 0;
        return;
    }

    cart.forEach((item, index) => {
        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                </div>

                <div class="cart-actions">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.qty || 1}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>

                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    updateSummary();
}

// Change Quantity
function changeQty(index, value) {
    if (!cart[index].qty) cart[index].qty = 1;

    cart[index].qty += value;

    if (cart[index].qty < 1) cart[index].qty = 1;

    saveCart();
    loadCart();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    loadCart();
}

// Update totals
function updateSummary() {
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

// Save to Local Storage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", loadCart);
