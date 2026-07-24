// ============================================================
// 📁 assets/js/data.js
// ⭐ UPDATE SETIAP HARI DI SINI SAJA
// ============================================================
// Edit file ini, lalu commit & push ke GitHub
// ============================================================

// 1. STATUS MARKET (true = buka, false = tutup)
const MARKET_OPEN = true;

// 2. HARGA PASAR (update dari XAG/USD & XAG/IDR)
const MARKET = {
    xagUsd: "$57.70",
    xagIdr: "~Rp46.748",
    date: "24 Juli 2026"
};

// 3. PRODUK READY STOCK
// Tambah/hapus/edit bebas di sini
// Untuk foto produk: simpan di assets/images/products/
// Format nama: supplier-namaproduk.webp (lowercase, tanpa spasi)
const PRODUCTS = [
    {
        name: "Press 10gr",
        category: "Press",
        supplier: "Key Silver",
        weight: "10gr",
        purity: "999.5",
        price: "Rp762.000",
        initial: "P",
        image: "assets/images/products/key-silver-press-10gr.webp"
    },
    {
        name: "Argentum 10gr",
        category: "Argentum",
        supplier: "Key Silver",
        weight: "10gr",
        purity: "999",
        price: "Rp756.000",
        initial: "A",
        image: "assets/images/products/key-silver-argentum-10gr.webp"
    },
    {
        name: "Bullion Klasik 50gr",
        category: "Bullion",
        supplier: "Key Silver",
        weight: "50gr",
        purity: "999.5",
        price: "Rp2.877.000",
        initial: "B",
        image: "assets/images/products/key-silver-bullion-klasik-50gr.webp"
    },
    {
        name: "SAC Silver 1gr",
        category: "SAC",
        supplier: "Key Silver",
        weight: "1gr",
        purity: "999",
        price: "Rp73.000",
        initial: "S",
        image: "assets/images/products/key-silver-sac-silver-1gr.webp"
    },
    {
        name: "Reguler 3.3gr",
        category: "Press",
        supplier: "Silverium",
        weight: "3.3gr",
        purity: "999.9",
        price: "Rp226.000",
        initial: "P",
        image: "assets/images/products/silverium-reguler-3.3gr.webp"
    },
    {
        name: "Reguler 9.9gr",
        category: "Press",
        supplier: "Silverium",
        weight: "9.9gr",
        purity: "999.9",
        price: "Rp638.000",
        initial: "P",
        image: "assets/images/products/silverium-reguler-9.9gr.webp"
    },
    {
        name: "Coin ABA 1 Dirham",
        category: "Coin",
        supplier: "Silverium",
        weight: "3.11gr",
        purity: "999.9",
        price: "Rp225.000",
        initial: "C",
        image: "assets/images/products/silverium-coin-aba-1-dirham.webp"
    },
    {
        name: "Medalion 10gr",
        category: "Medalion",
        supplier: "JSG",
        weight: "10gr",
        purity: "999.5",
        price: "Rp688.000",
        initial: "M",
        image: "assets/images/products/jsg-medalion-10gr.webp"
    }
];

// 4. HARGA BUYBACK (update harian)
const BUYBACK_RATES = [
    { name: "Antam", price: "Rp 24.917/gr" },
    { name: "Silverium", price: "Rp 38.340/gr" },
    { name: "Key Silver", price: "Rp 37.000/gr" },
    { name: "JSG / TDS", price: "Rp 36.000/gr" }
];

// 5. STATISTIK
const STATS = {
    transactions: "110+",
    deliveryDays: "1-5"
};

// 6. KONTAK
const CONTACT = {
    whatsapp: "628137271517",
    email: "veldionsilver@gmail.com"
};

// 7. KATEGORI (untuk search modal)
const CATEGORIES = [
    { name: "Bullion", icon: "B" },
    { name: "Press", icon: "P" },
    { name: "Coin", icon: "C" },
    { name: "Medalion", icon: "M" },
    { name: "Argentum", icon: "A" },
    { name: "SAC", icon: "S" }
];
