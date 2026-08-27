// ============================================================
// 📁 assets/js/data.js
// ⭐ DATA STATIS — Jarang Berubah
// ============================================================

// 1. KATEGORI (untuk search modal)
const CATEGORIES = [
    { name: "Bullion", icon: "B" },
    { name: "Press", icon: "P" },
    { name: "Coin", icon: "C" },
    { name: "Medalion", icon: "M" },
    { name: "Argentum", icon: "A" },
    { name: "SAC", icon: "S" }
];

// 2. KONTAK
const CONTACT = {
    whatsapp: "628137271517",
    email: "veldionsilver@gmail.com"
};

// 3. STATISTIK
const STATS = {
    transactions: "110+",
    deliveryDays: "1-5"
};

// Export ke window agar bisa diakses app.js
window.CATEGORIES = CATEGORIES;
window.CONTACT = CONTACT;
window.STATS = STATS;

console.log("✅ data.js loaded");
