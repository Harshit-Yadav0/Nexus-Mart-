// ------------------------------
// GLOBAL PRODUCT DATA
// ------------------------------
const products = [
    {
        id: 1,
        name: "Nexus Ultra Earbuds",
        price: 1299,
        category: "Electronics",
        img: "https://via.placeholder.com/400x300"
    },
    {
        id: 2,
        name: "Nexus SmartWatch X",
        price: 1999,
        category: "Electronics",
        img: "https://via.placeholder.com/400x300"
    },
    {
        id: 3,
        name: "Nexus Laptop Bag",
        price: 499,
        category: "Accessories",
        img: "https://via.placeholder.com/400x300"
    },
    {
        id: 4,
        name: "Nexus Keyboard RGB",
        price: 799,
        category: "Electronics",
        img: "https://via.placeholder.com/400x300"
    }
];

// ------------------------------
// CART SYSTEM
// ------------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(item.name + " added to cart!");
}

// ------------------------------
// LOAD PRODUCTS ON PAGE
// ------------------------------
function loadProducts() {
    const container = document.getElementById("products");

    products.forEach(product => {
        const card = `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        container.innerHTML += card;
    });
}

document.addEventListener("DOMContentLoaded", loadProducts);

// ------------------------------
// SEARCH FUNCTION
// ------------------------------
function searchProducts() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const container = document.getElementById("products");

    container.innerHTML = "";

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        container.innerHTML = "<h3>No products found!</h3>";
        return;
    }

    filtered.forEach(product => {
        const card = `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Trigger search when typing
document.getElementById("searchInput").addEventListener("keyup", searchProducts);

// ------------------------------
// SIMPLE AI RECOMMENDATION ENGINE
// ------------------------------
//
// How it works?
// -> Tracks categories of items added to cart
// -> Recommends similar category items automatically
//
function recommendAI() {
    if (cart.length === 0) return;

    const categories = cart.map(item => item.category);

    // Find most common category
    const freq = {};
    categories.forEach(c => freq[c] = (freq[c] || 0) + 1);

    const mostLiked = Object.keys(freq).reduce((a, b) =>
        freq[a] > freq[b] ? a : b
    );

    const recommended = products.filter(p => p.category === mostLiked);

    console.log("AI Recommended:", recommended);
}

setInterval(recommendAI, 2000); // runs every 2 sec
