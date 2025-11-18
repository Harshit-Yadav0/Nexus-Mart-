/* --------------------------------------------
   NEXUS MART — AI ENGINE (TensorFlow.js + Logic)
   Features:
   ✔ Delivery ETA prediction
   ✔ Dynamic pricing
   ✔ Recommendation engine
   ✔ Fraud detection
   ✔ Stock prediction
-------------------------------------------- */

/*  Load TensorFlow.js model (optional if hosted)
    const model = await tf.loadLayersModel('/ai/model.json');
*/

// -------------------------------------------------------
// 1️⃣ DELIVERY ETA PREDICTION (Distance + Weather + Weight)
// -------------------------------------------------------
export function predictDeliveryETA({ distance, weather, weight, traffic }) {
    
    // Weather effect
    const weatherFactor = {
        "clear": 0,
        "rain": 8,
        "storm": 20,
        "fog": 10
    }[weather.toLowerCase()] || 0;

    // Traffic effect
    const trafficFactor = {
        "low": 0,
        "medium": 6,
        "high": 12
    }[traffic.toLowerCase()] || 0;

    // Core formula
    let eta = 10 + (distance * 2) + (weight * 0.5) + weatherFactor + trafficFactor;

    return Math.round(eta);
}


// -------------------------------------------------------
// 2️⃣ DYNAMIC PRICING MODEL (Demand + Stock + Time)
// -------------------------------------------------------
export function dynamicPrice(basePrice, demandLevel, stockLeft) {
    let price = basePrice;

    // increase price when demand is high
    if (demandLevel === "high") price += basePrice * 0.20;
    if (demandLevel === "medium") price += basePrice * 0.10;

    // discount when stock is high
    if (stockLeft > 50) price -= basePrice * 0.05;

    return Math.round(price);
}


// -------------------------------------------------------
// 3️⃣ PRODUCT RECOMMENDATION SYSTEM
//    (User history + category + top sellers)
// -------------------------------------------------------
export function recommendProducts(userHistory, allProducts) {
    if (!userHistory.length) {
        return allProducts.slice(0, 5);  // default
    }

    const lastCategory = userHistory[userHistory.length - 1].category;

    let filtered = allProducts.filter(p => p.category === lastCategory);

    if (filtered.length < 5) filtered = filtered.concat(allProducts);

    return filtered.slice(0, 5);
}


// -------------------------------------------------------
// 4️⃣ FRAUD DETECTION (Simple rule-based model)
// -------------------------------------------------------
export function detectFraud(order) {
    let score = 0;

    if (order.total > 50000) score += 40;
    if (order.address.includes("PO Box")) score += 20;
    if (order.items.length === 0) score += 50;
    if (order.userOrdersLast24Hrs > 3) score += 30;

    return score > 60 ? "High Risk" : "Normal";
}


// -------------------------------------------------------
// 5️⃣ CHECK DELIVERY RANGE
// -------------------------------------------------------
export function checkDeliveryRange(distance, maxRange) {
    return distance <= maxRange;
}


// -------------------------------------------------------
// 6️⃣ STOCK PREDICTION (Very Simple Forecast)
// -------------------------------------------------------
export function predictStockUsage(currentStock, dailySalesRate) {
    if (dailySalesRate === 0) return "Unlimited";

    const daysLeft = currentStock / dailySalesRate;
    return Math.round(daysLeft);
}
