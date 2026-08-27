// ============================================================
// Veldion Silver — App Logic (Dengan Google Sheets)
// ============================================================

document.addEventListener("DOMContentLoaded", function() {
    if (typeof lucide !== "undefined") lucide.createIcons();
    init();
});

// ============================================================
// KONFIGURASI GOOGLE SHEETS
// ============================================================
const SHEET_ID = "1FqjCgrHRO9lXohk_ZasEANdSmJ_xBCjKmAq4mYxid5E";

// URL untuk fetch CSV per tab
function getSheetUrl(tabName) {
    return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
}

// ============================================================
// DATA STATIS (tetap di sini)
// ============================================================
// CATEGORIES, CONTACT, STATS tetap dari data.js
// Tapi kita ambil dari window agar kompatibel
const CATEGORIES = window.CATEGORIES || [];
const CONTACT = window.CONTACT || { whatsapp: "628137271517", email: "veldionsilver@gmail.com" };
const STATS = window.STATS || { transactions: "110+", deliveryDays: "1-5" };

// ============================================================
// STATE
// ============================================================
let marketStatus = true;
let marketData = { xagUsd: "$68.07", xagIdr: "~Rp54.231", date: "27 Agustus 2026" };
let products = [];
let buybackRates = [];

// ============================================================
// FETCH SEMUA DATA DARI GOOGLE SHEETS
// ============================================================
async function fetchAllData() {
    try {
        // Fetch semua tab paralel
        const [statusCsv, marketCsv, productsCsv, buybackCsv] = await Promise.all([
            fetch(getSheetUrl("MarketStatus")).then(r => r.text()),
            fetch(getSheetUrl("MarketPrice")).then(r => r.text()),
            fetch(getSheetUrl("Products")).then(r => r.text()),
            fetch(getSheetUrl("Buyback")).then(r => r.text())
        ]);

        // Parse masing-masing
        marketStatus = parseMarketStatus(statusCsv);
        marketData = parseMarketData(marketCsv);
        products = parseProducts(productsCsv);
        buybackRates = parseBuyback(buybackCsv);

        console.log("✅ Data loaded from Google Sheets:", {
            marketStatus,
            marketData,
            products: products.length,
            buybackRates: buybackRates.length
        });

        return true;
    } catch (err) {
        console.error("❌ Failed to fetch data:", err);
        return false;
    }
}

// ============================================================
// PARSER FUNCTIONS
// ============================================================

// Parse MarketStatus
function parseMarketStatus(csv) {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return true;
    
    const values = lines[1].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const status = values[0] || 'TRUE';
    return status.toUpperCase() === 'TRUE';
}

// Parse MarketPrice
function parseMarketData(csv) {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return { xagUsd: "$68.07", xagIdr: "~Rp54.231", date: "27 Agustus 2026" };
    
    const values = lines[1].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    return {
        xagUsd: values[0] || "$68.07",
        xagIdr: values[1] || "~Rp54.231",
        date: values[2] || "27 Agustus 2026"
    };
}

// Parse Products
function parseProducts(csv) {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return [];
    
    // Header
    const header = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
    
    const products = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        
        const obj = {};
        header.forEach((key, idx) => {
            obj[key] = values[idx] || '';
        });
        
        // Validasi minimal ada name
        if (obj.name) {
            products.push(obj);
        }
    }
    
    return products;
}

// Parse Buyback
function parseBuyback(csv) {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return [];
    
    const products = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        if (values[0] && values[1]) {
            products.push({
                name: values[0],
                price: values[1]
            });
        }
    }
    
    return products;
}

// ============================================================
// RENDER FUNCTIONS
// ============================================================

function renderMarketStatus() {
    const dot = document.getElementById("marketDot");
    const txt = document.getElementById("marketText");
    const dotM = document.getElementById("marketDotMobile");
    const txtM = document.getElementById("marketTextMobile");

    if (marketStatus) {
        if (dot) dot.className = "w-1.5 h-1.5 rounded-full bg-silver pulse-silver";
        if (txt) { txt.textContent = "Market Open"; txt.className = "font-semibold tracking-wider text-[10px] uppercase text-silver-light"; }
        if (dotM) dotM.className = "w-1.5 h-1.5 rounded-full bg-silver pulse-silver";
        if (txtM) { txtM.textContent = "Market Open"; txtM.className = "font-semibold tracking-wider text-[10px] uppercase text-silver-light"; }
    } else {
        if (dot) dot.className = "w-1.5 h-1.5 rounded-full bg-red-500";
        if (txt) { txt.textContent = "Market Closed"; txt.className = "font-semibold tracking-wider text-[10px] uppercase text-red-400"; }
        if (dotM) dotM.className = "w-1.5 h-1.5 rounded-full bg-red-500";
        if (txtM) { txtM.textContent = "Market Closed"; txtM.className = "font-semibold tracking-wider text-[10px] uppercase text-red-400"; }
    }
}

function renderMarketPrices() {
    setText("xagUsd", marketData.xagUsd);
    setText("xagIdr", marketData.xagIdr);
    setText("xagUsdMobile", marketData.xagUsd);
    setText("xagIdrMobile", marketData.xagIdr);
    setText("buybackDate", marketData.date);
}

function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

function renderProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    grid.innerHTML = "";

    if (!products || products.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center text-steel py-8">Tidak ada produk saat ini.</div>';
        return;
    }

    products.forEach((p, idx) => {
        const imgHtml = p.image
            ? `<img src="assets/images/products/${p.image}" alt="${p.alt || p.name}" class="w-full h-full object-cover rounded-xl" loading="lazy">`
            : `<span class="text-2xl md:text-3xl font-display font-bold text-silver-gradient">${p.initial || p.name.charAt(0).toUpperCase()}</span>`;

        const card = document.createElement("div");
        card.className = "product-card glass-card-hover p-4 md:p-5 rounded-xl";
        card.setAttribute("data-idx", idx);
        card.innerHTML = `
            <span class="product-badge">${p.category || ''}</span>
            <div class="flex flex-col items-center text-center">
                <div class="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-silver/10 to-white/5 rounded-xl flex items-center justify-center border border-silver/10 mb-4 overflow-hidden">
                    ${imgHtml}
                </div>
                <h4 class="font-semibold text-white text-sm truncate w-full">${p.name}</h4>
                <p class="text-[10px] text-steel mt-1 mb-2">${p.supplier || ''} ${p.purity ? '• ' + p.purity : ''}</p>
                <div class="text-sm md:text-base font-display font-bold text-silver-gradient">${p.price || 'Rp -'}</div>
            </div>
        `;

        card.addEventListener("click", function() {
            openProduct(parseInt(this.dataset.idx));
        });

        grid.appendChild(card);
    });
}

function renderBuyback() {
    const el = document.getElementById("buybackRates");
    if (!el) return;

    let html = '<div class="flex justify-between py-3 border-b border-white/10 text-xs font-bold text-steel uppercase"><span>Supplier</span><span>Harga</span></div>';

    if (!buybackRates || buybackRates.length === 0) {
        html += '<div class="py-4 text-center text-steel">Belum ada data buyback.</div>';
        el.innerHTML = html;
        return;
    }

    buybackRates.forEach(r => {
        html += `
            <div class="flex justify-between items-center py-3 border-b border-white/5 hover:bg-silver/5 transition px-2">
                <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-silver rounded-full pulse-silver"></span>
                    <span class="text-white font-medium">${r.name}</span>
                </div>
                <span class="font-bold text-white">${r.price}</span>
            </div>
        `;
    });

    el.innerHTML = html;
}

// ============================================================
// PRODUCT MODAL
// ============================================================
function openProduct(idx) {
    const p = products[idx];
    if (!p) return;

    const imgHtml = p.image
        ? `<img src="assets/images/products/${p.image}" alt="${p.alt || p.name}" class="w-full h-full object-cover rounded-xl">`
        : `<span class="text-3xl font-display font-bold text-silver-gradient">${p.initial || p.name.charAt(0).toUpperCase()}</span>`;

    document.getElementById("modalInitial").innerHTML = imgHtml;
    document.getElementById("modalName").textContent = p.name;
    document.getElementById("modalCategory").textContent = p.category || '-';
    document.getElementById("modalSupplier").textContent = p.supplier || '-';
    document.getElementById("modalWeight").textContent = p.weight || '-';
    document.getElementById("modalPurity").textContent = p.purity || '-';
    document.getElementById("modalPrice").textContent = p.price || 'Rp -';
    
    const waMsg = `Halo%20Veldion%2C%20saya%20mau%20tanya%20stok%20${encodeURIComponent(p.name)}`;
    document.getElementById("modalLink").href = `https://wa.me/${CONTACT.whatsapp}?text=${waMsg}`;

    document.getElementById("productModal").classList.add("active");
    document.body.classList.add("no-scroll");
}

// ============================================================
// SEARCH
// ============================================================
function defaultSearch() {
    let catsHtml = "";
    CATEGORIES.forEach(c => {
        catsHtml += `
            <a href="#produk" onclick="closeSearchM()" class="search-item flex items-center gap-2 p-2 rounded-lg border border-white/5">
                <div class="w-6 h-6 rounded bg-silver/10 flex items-center justify-center text-xs font-bold text-silver-light">${c.icon}</div>
                <div><div class="text-xs text-white">${c.name}</div></div>
            </a>
        `;
    });

    return `<div class="p-4">
        <div class="mb-4">
            <div class="flex items-center gap-2 mb-2">
                <i data-lucide="layers" class="w-4 h-4 text-steel"></i>
                <span class="text-xs font-semibold text-white uppercase">Kategori</span>
            </div>
            <div class="grid grid-cols-2 gap-2">${catsHtml}</div>
        </div>
        <a href="#produk" onclick="closeSearchM()" class="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
            <span class="w-2 h-2 bg-silver rounded-full animate-pulse"></span>
            <span class="text-sm font-semibold text-white">Lihat Semua Produk</span>
        </a>
    </div>`;
}

function closeSearchM() {
    const modal = document.getElementById("searchModal");
    if (modal) modal.classList.remove("active");
    document.body.classList.remove("no-scroll");
    const input = document.getElementById("searchInput");
    if (input) input.value = "";
}
window.closeSearchM = closeSearchM;

// ============================================================
// REVEAL ANIMATIONS
// ============================================================
function setupReveal() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) entry.target.classList.add("active");
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".reveal").forEach(function(el) {
        observer.observe(el);
    });
}

// ============================================================
// EVENT LISTENERS
// ============================================================
function setupEvents() {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    if (searchInput) {
        searchInput.addEventListener("input", function(e) {
            const q = e.target.value.toLowerCase().trim();
            if (!q) {
                if (searchResults) searchResults.innerHTML = defaultSearch();
                return;
            }
            if (q.length < 2) {
                if (searchResults) searchResults.innerHTML = '<div class="p-4 text-center text-steel-dark">Min 2 karakter...</div>';
                return;
            }

            const filtered = products.filter(function(p) {
                return p.name.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q));
            });

            if (!filtered.length) {
                if (searchResults) searchResults.innerHTML = '<div class="p-4 text-center text-steel">Tidak ditemukan.</div>';
                return;
            }

            let resultsHtml = "";
            filtered.forEach(p => {
                resultsHtml += `
                    <a href="https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Halo Veldion, saya mau tanya stok " + p.name)}" target="_blank" class="search-item flex justify-between p-2 rounded-lg border-b border-white/5">
                        <div>
                            <div class="text-white text-sm">${p.name}</div>
                            <div class="text-[10px] text-steel">${p.category || ''} ${p.supplier ? '• ' + p.supplier : ''}</div>
                        </div>
                        <i data-lucide="external-link" class="w-4 h-4 text-steel"></i>
                    </a>
                `;
            });

            if (searchResults) searchResults.innerHTML = '<div class="p-4 space-y-2">' + resultsHtml + '</div>';
        });
    }

    // Modal click outside
    ["productModal", "searchModal"].forEach(function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.addEventListener("click", function(e) {
                if (e.target.id === id) {
                    modal.classList.remove("active");
                    document.body.classList.remove("no-scroll");
                }
            });
        }
    });

    // Close buttons
    const closeProduct = document.getElementById("closeProductModal");
    if (closeProduct) {
        closeProduct.addEventListener("click", function() {
            document.getElementById("productModal").classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    }

    const closeSearchBtn = document.getElementById("closeSearch");
    if (closeSearchBtn) closeSearchBtn.addEventListener("click", closeSearchM);

    // Search button
    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn) {
        searchBtn.addEventListener("click", function() {
            document.getElementById("searchModal").classList.add("active");
            if (searchInput) searchInput.focus();
            if (searchResults) searchResults.innerHTML = defaultSearch();
            document.body.classList.add("no-scroll");
        });
    }

    // Escape key
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            ["productModal", "searchModal"].forEach(function(id) {
                const m = document.getElementById(id);
                if (m) m.classList.remove("active");
            });
            document.body.classList.remove("no-scroll");
        }
    });

    // FAQ toggle
    document.querySelectorAll(".faq-toggle").forEach(function(toggle) {
        toggle.addEventListener("click", function() {
            const faqItem = this.closest(".faq-item");
            const content = faqItem.querySelector(".faq-content");
            const isOpen = faqItem.classList.contains("open");

            document.querySelectorAll(".faq-item").forEach(function(item) {
                item.classList.remove("open");
                const c = item.querySelector(".faq-content");
                if (c) c.style.maxHeight = null;
            });

            if (!isOpen) {
                faqItem.classList.add("open");
                if (content) content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href === "#") return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = window.innerWidth < 768 ? 70 : 100;
                window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });

                document.querySelectorAll(".mobile-nav-item").forEach(function(item) {
                    item.classList.remove("active");
                    if (item.dataset.section === href.replace("#", "")) item.classList.add("active");
                });
            }
        });
    });

    // Back to top
    const toTop = document.getElementById("toTopBtn");
    if (toTop) {
        window.addEventListener("scroll", function() {
            toTop.classList.toggle("visible", window.scrollY > 500);
        });
        toTop.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Active nav on scroll
    const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
        const scrollY = window.scrollY;
        const offset = 150;

        sections.forEach(function(section) {
            const top = section.offsetTop - offset;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollY >= top && scrollY < bottom) {
                mobileNavItems.forEach(function(item) {
                    item.classList.remove("active");
                    if (item.dataset.section === id) item.classList.add("active");
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);
    setTimeout(updateActiveNav, 100);
}

// ============================================================
// PWA
// ============================================================
function setupPWA() {
    if (window.location.protocol === "file:") {
        console.log("PWA: file:// detected, skipping SW registration.");
        return;
    }

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js")
            .then(function(reg) { console.log("SW registered:", reg.scope); })
            .catch(function(err) { console.log("SW registration failed:", err); });
    }

    let deferredPrompt;
    window.addEventListener("beforeinstallprompt", function(e) {
        e.preventDefault();
        deferredPrompt = e;
        const installBtn = document.getElementById("installPWA");
        if (installBtn) {
            installBtn.style.display = "block";
            installBtn.addEventListener("click", function() {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(function(choice) {
                    if (choice.outcome === "accepted") {
                        console.log("PWA installed");
                    } else {
                        console.log("PWA dismissed");
                    }
                    deferredPrompt = null;
                });
            });
        }
    });
}

// ============================================================
// INIT
// ============================================================
async function init() {
    // Tampilkan loading
    const loading = document.getElementById("loadingIndicator");
    if (loading) loading.style.display = "flex";

    // Fetch data dari Google Sheets
    const success = await fetchAllData();

    if (loading) loading.style.display = "none";

    if (!success) {
        // Tampilkan error
        const error = document.getElementById("errorMessage");
        if (error) error.classList.remove("hidden");
        console.error("Gagal memuat data dari Google Sheets");
        return;
    }

    // Render semua
    renderMarketStatus();
    renderMarketPrices();
    renderProducts();
    renderBuyback();
    setupReveal();
    setupEvents();
    setupPWA();

    // Re-init Lucide icons
    setTimeout(function() {
        if (typeof lucide !== "undefined") lucide.createIcons();
    }, 200);

    console.log("✅ Veldion Silver initialized with Google Sheets data");
}

// Fallback jika DOM sudah ready
if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
}
