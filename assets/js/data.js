// ============================================================
// 📁 assets/js/data.js
// ⭐ FILE KONFIGURASI STATIS + MAPPING GAMBAR
// ============================================================
// Data dinamis (Market, Products, Buyback) diambil dari Google Sheets
// File ini hanya untuk data yang jarang berubah.
// ============================================================

// 1. KONTAK (jarang berubah)
const CONTACT = {
    whatsapp: "628137271517",
    email: "veldionsilver@gmail.com"
};

// 2. KATEGORI (untuk search modal)
const CATEGORIES = [
    { name: "Bullion", icon: "B" },
    { name: "Press", icon: "P" },
    { name: "Coin", icon: "C" },
    { name: "Medalion", icon: "M" },
    { name: "Argentum", icon: "A" },
    { name: "SAC", icon: "S" }
];

// 3. STATISTIK (jarang berubah)
const STATS = {
    transactions: "110+",
    deliveryDays: "1-5"
};

// 4. MAPPING GAMBAR & ALT UNTUK PRODUK
// Key = nama produk (harus sama persis dengan di sheet Products)
const PRODUCT_IMAGES = {
    "Press 10gr": {
        image: "assets/images/products/key-silver-press-10gr.webp",
        alt: "Veldion Silver — Perak fisik Press 10gr dari Key Silver, kemurnian 999.5"
    },
    "Argentum 10gr": {
        image: "assets/images/products/key-silver-argentum-10gr.webp",
        alt: "Veldion Silver — Perak fisik Argentum 10gr dari Key Silver, kemurnian 999"
    },
    "Bullion Klasik 50gr": {
        image: "assets/images/products/key-silver-bullion-klasik-50gr.webp",
        alt: "Veldion Silver — Perak fisik Bullion Klasik 50gr dari Key Silver, kemurnian 999.5"
    },
    "SAC Silver 1gr": {
        image: "assets/images/products/key-silver-sac-silver-1gr.webp",
        alt: "Veldion Silver — Perak fisik SAC Silver 1gr dari Key Silver, kemurnian 999"
    },
    "Reguler 3.3gr": {
        image: "assets/images/products/silverium-reguler-3.3gr.webp",
        alt: "Veldion Silver — Perak fisik Reguler 3.3gr dari Silverium, kemurnian 999.9"
    },
    "Reguler 9.9gr": {
        image: "assets/images/products/silverium-reguler-9.9gr.webp",
        alt: "Veldion Silver — Perak fisik Reguler 9.9gr dari Silverium, kemurnian 999.9"
    },
    "Coin ABA 1 Dirham": {
        image: "assets/images/products/silverium-coin-aba-1-dirham.webp",
        alt: "Veldion Silver — Perak fisik Coin ABA 1 Dirham dari Silverium, kemurnian 999.9"
    },
    "Medalion 10gr": {
        image: "assets/images/products/jsg-medalion-10gr.webp",
        alt: "Veldion Silver — Perak fisik Medalion 10gr dari JSG, kemurnian 999.5"
    }
};

// 5. FALLBACK DATA (jika Google Sheets gagal dimuat)
// Data ini akan ditimpa oleh data dari sheet jika berhasil di-fetch

const MARKET_OPEN = true;

const MARKET = {
    xagUsd: "$68.07",
    xagIdr: "~Rp54.231",
    date: "27 Agustus 2026"
};

const PRODUCTS = [
    // Data dari sheet akan menggantikan ini
];

const BUYBACK_RATES = [
    // Data dari sheet akan menggantikan ini
];
