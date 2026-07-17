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
    xagUsd: "$32.45",
    xagIdr: "Rp 545.000",
    date: "17 Juli 2026"
};

// 3. PRODUK READY STOCK
// Tambah/hapus/edit bebas di sini
// Untuk foto produk: simpan di assets/images/products/
// Format nama: supplier-namaproduk.webp (lowercase, tanpa spasi)
const PRODUCTS = [
    {
        name: "Perak Reguler 3.3gr",
        category: "Press",
        supplier: "Silverium",
        weight: "3.3gr",
        purity: "999.9",
        price: "Rp 349.250",
        initial: "P",
        image: "assets/images/products/silverium-reguler-33gr.webp"
    },
    {
        name: "Perak Reguler 9.9gr",
        category: "Press",
        supplier: "Silverium",
        weight: "9.9gr",
        purity: "999.9",
        price: "Rp 962.500",
        initial: "P",
        image: "assets/images/products/silverium-reguler-99gr.webp"
    },
    {
        name: "Perak Bullion 33gr",
        category: "Press",
        supplier: "Silverium",
        weight: "33gr",
        purity: "999.9",
        price: "Rp 3.033.300",
        initial: "P",
        image: "assets/images/products/silverium-bullion-33gr.webp"
    },
    {
        name: "Perak Coin ABA 5 Dirham",
        category: "Coin",
        supplier: "Silverium",
        weight: "15.55gr",
        purity: "999.9",
        price: "Rp 1.550.000",
        initial: "C",
        image: "assets/images/products/silverium-coin-5dirham.webp"
    },
    {
        name: "Perak Coin ABA 1 Dirham",
        category: "Coin",
        supplier: "Silverium",
        weight: "3.11gr",
        purity: "999.9",
        price: "Rp 334.700",
        initial: "C",
        image: "assets/images/products/silverium-coin-1dirham.webp"
    },
    {
        name: "Perak Bullion 50gr",
        category: "Bullion",
        supplier: "Key Silver",
        weight: "50gr",
        purity: "999.5",
        price: "Rp 4.261.376",
        initial: "B",
        image: "assets/images/products/keysilver-bullion-50gr.webp"
    },
    {
        name: "Perak Bullion 99gr",
        category: "Bullion",
        supplier: "Silverium",
        weight: "99gr",
        purity: "999.9",
        price: "Rp 375.400",
        initial: "B",
        image: "assets/images/products/silverium-bullion-99gr.webp"
    },
    {
        name: "Perak Medalion 1gr",
        category: "Medalion",
        supplier: "JSG",
        weight: "1gr",
        purity: "999.5",
        price: "Rp 102.950",
        initial: "M",
        image: "assets/images/products/jsg-medalion-1gr.webp"
    }
];

// 4. HARGA BUYBACK (update harian)
const BUYBACK_RATES = [
    { name: "Antam", price: "Rp 43.550/gr" },
    { name: "Silverium", price: "Rp 51.900/gr" },
    { name: "Key Silver", price: "Rp 51.950/gr" },
    { name: "JSG / TDS", price: "Rp 52.800/gr" }
];

// 5. STATISTIK
const STATS = {
    transactions: "120+",
    deliveryDays: "1-3"
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
    { name: "Medalion", icon: "M" }
];
