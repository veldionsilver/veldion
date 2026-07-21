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
        name: ""Press 10gr"",
        supplier: ""Key Silver"",
        weight: ""10gr"",
        purity: ""999.5"",
        price: ""Rp761.000"",
        initial: ""P"",
        image: ""assets/images/products/key-silver-press-10gr.webp""
    },
    {
        name: ""Argentum 10gr"",
        supplier: ""Key Silver"",
        weight: ""10gr"",
        purity: ""999"",
        price: ""Rp754.000"",
        initial: ""A"",
        image: ""assets/images/products/key-silver-argentum-10gr.webp""
    },
    {
        name: ""Bullion Klasik 50gr"",
        supplier: ""Key Silver"",
        weight: ""50gr"",
        purity: ""999.5"",
        price: ""Rp2.877.000"",
        initial: ""B"",
        image: ""assets/images/products/key-silver-bullion-klasik-50gr.webp""
    },
    {
        name: ""SAC Silver 1gr"",
        supplier: ""Key Silver"",
        weight: ""1gr"",
        purity: ""999"",
        price: ""Rp73.000"",
        initial: ""S"",
        image: ""assets/images/products/key-silver-sac-silver-1gr.webp""
    },
    {
        name: ""Reguler 3.3gr"",
        supplier: ""Silverium"",
        weight: ""3.3gr"",
        purity: ""999.9"",
        price: ""Rp223.000"",
        initial: ""P"",
        image: ""assets/images/products/silverium-reguler-3.3gr.webp""
    },
    {
        name: ""Reguler 9.9gr"",
        supplier: ""Silverium"",
        weight: ""9.9gr"",
        purity: ""999.9"",
        price: ""Rp632.000"",
        initial: ""P"",
        image: ""assets/images/products/silverium-reguler-9.9gr.webp""
    },
    {
        name: ""Coin ABA 1 Dirham"",
        supplier: ""Silverium"",
        weight: ""3.11gr"",
        purity: ""999.9"",
        price: ""Rp222.000"",
        initial: ""C"",
        image: ""assets/images/products/silverium-coin-aba-1-dirham.webp""
    },
    {
        name: ""Medalion 10gr"",
        supplier: ""JSG"",
        weight: ""10gr"",
        purity: ""999.5"",
        price: ""Rp672.000"",
        initial: ""M"",
        image: ""assets/images/products/jsg-medalion-10gr.webp""
    },
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
