// Fetch product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));

const products = JSON.parse(localStorage.getItem("products")) || [
    {id: 1, name: "Nexus Ultra Earbuds", price: 1299, category: "Electronics", img: "https://via.placeholder.com/400x300", maxRange: 10, baseTime: 20, perKm: 3},
    {id: 2, name: "Nexus SmartWatch X", price: 1999, category: "Electronics", img: "https://via.placeholder.com/400x300", maxRange: 15, baseTime: 25, perKm: 2},
    {id: 3, name: "Nexus Laptop Bag", price: 499, category: "Accessories", img: "https://via.placeholder.com/400x300", maxRange: 12, baseTime: 15, perKm: 1},
    {id: 4, name: "Nexus Keyboard RGB", price: 799, category: "Electronics", img: "https://via.placeholder.com/400x300", maxRange: 8, baseTime: 10, perKm: 2}
];

// Find product
const product = products.find(p => p.id === productId);

// Insert data
document.getElementById("productImg").src = product.img;
document.getElementById("productName").innerText = product.name;
document.getElementById("productPrice").innerText = "₹" + product.price;
document.getElementById("productCategory").innerText = "Category: " + product.category;

// Delivery calculation
document.getElementById("distanceInput").addEventListener("keyup", function () {
    const distance = parseInt(this.value);

    if (!distance) {
        document.getElementById("deliveryMsg").innerText = "";
        return;
    }

    if (distance > product.maxRange) {
        document.getElementById("deliveryMsg").innerHTML =
            `<span style="color:red;">Delivery NOT available at this distance!</span>`;
        return;
    }

    let eta = product.baseTime + (distance * product.perKm);

    document.getElementById("deliveryMsg").innerHTML =
        `<span style="color:green;">Estimated Delivery: ${eta} minutes</span>`;
});

// Add to Cart
document.getElementById("addToCartBtn").addEventListener("click", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.name + " added to cart!");
});
