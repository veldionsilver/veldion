// ============================================================
// Veldion Silver — App Logic
// ============================================================

// ====== KONFIGURASI SHEET ======
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1FqjCgrHRO9lXohk_ZasEANdSmJ_xBCjKmAq4mYxid5E/gviz/tq?tqx=out:csv&sheet=main_data';

// ====== DOMContentLoaded ======
document.addEventListener("DOMContentLoaded", function() {
    if (typeof lucide !== "undefined") lucide.createIcons();
    fetchMainData();
});

// ====== FETCH DATA DARI SHEET ======
function fetchMainData() {
    fetch(SHEET_URL)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.text();
        })
        .then(csv => {
            const data = parseCSV(csv);
            if (!data || data.length === 0) {
                throw new Error('Data kosong dari Google Sheets');
            }
            processData(data);
        })
        .catch(err => {
            console.error('Gagal fetch data:', err);
            showErrorMessage('Gagal memuat data dari server. Silakan refresh halaman.');
        });
}

// ====== PARSE CSV ======
function parseCSV(csv) {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    // Parse header
    let headers = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < lines[0].length; j++) {
        const char = lines[0][j];
        if (char === '"') { 
            inQuotes = !inQuotes; 
            continue; 
        }
        if (char === ',' && !inQuotes) {
            headers.push(current.trim());
            current = '';
            continue;
        }
        current += char;
    }
    headers.push(current.trim());

    // Parse data
    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const values = [];
        current = '';
        inQuotes = false;
        const line = lines[i];
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') { 
                inQuotes = !inQuotes; 
                continue; 
            }
            if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
                continue;
            }
            current += char;
        }
        values.push(current.trim());

        const row = {};
        headers.forEach((h, idx) => {
            row[h] = values[idx] || '';
        });
        result.push(row);
    }

    return result;
}

// ====== PROSES DATA ======
function processData(data) {
    // ===== MARKET (Kolom A-D) =====
    // Ambil dari baris pertama (index 0)
    const firstRow = data[0];
    if (firstRow.marketOpen && firstRow.marketOpen !== '') {
        MARKET_OPEN = (firstRow.marketOpen === 'TRUE' || firstRow.marketOpen === 'true' || firstRow.marketOpen === true);
        MARKET.xagUsd = firstRow.xagUsd || MARKET.xagUsd;
        MARKET.xagIdr = firstRow.xagIdr || MARKET.xagIdr;
        MARKET.date = firstRow.date || MARKET.date;
    }

    // ===== PRODUCTS (Kolom E-J) =====
    // Ambil dari baris 1-8 (index 1-8) — kolom name, category, supplier, weight, purity, price
    const productRows = data.slice(1, 9); // 8 produk
    if (productRows.length > 0) {
        const newProducts = productRows.map(row => {
            const imgData = PRODUCT_IMAGES[row.name] || {};
            return {
                name: row.name || '',
                category: row.category || 'Umum',
                supplier: row.supplier || '-',
                weight: row.weight || '-',
                purity: row.purity || '-',
                price: row.price || 'Rp -',
                image: imgData.image || null,
                alt: imgData.alt || row.name || '',
                initial: (row.name || 'P').charAt(0).toUpperCase()
            };
        });
        PRODUCTS.length = 0;
        PRODUCTS.push(...newProducts);
    }

    // ===== BUYBACK (Kolom K-L) =====
    // Ambil dari baris 9-12 (index 9-12) — kolom name, price
    const buybackRows = data.slice(9, 13); // 4 buyback
    if (buybackRows.length > 0) {
        const newBuyback = buybackRows.map(row => ({
            name: row.name || '-',
            price: row.price || 'Rp -'
        }));
        BUYBACK_RATES.length = 0;
        BUYBACK_RATES.push(...newBuyback);
    }

    // Tampilkan indikator Live Data
    showDataSource('sheet');

    // Panggil init
    init();
}

// ====== TAMPILKAN PESAN ERROR ======
function showErrorMessage(message) {
    var grid = document.getElementById("productGrid");
    if (grid) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-red-400 text-4xl mb-4">⚠️</div>
                <p class="text-white font-medium mb-2">${message}</p>
                <p class="text-steel text-sm">Data tidak dapat dimuat. Silakan refresh halaman atau coba lagi nanti.</p>
            </div>
        `;
    }
}

// ====== INDIKATOR DATA SOURCE ======
function showDataSource(source) {
    var oldIndicator = document.getElementById('dataSourceIndicator');
    if (oldIndicator) oldIndicator.remove();

    var badge = document.createElement('div');
    badge.id = 'dataSourceIndicator';
    badge.style.cssText = [
        'position:fixed',
        'bottom:80px',
        'right:16px',
        'z-index:999',
        'padding:4px 12px',
        'border-radius:20px',
        'font-size:9px',
        'font-weight:600',
        'letter-spacing:0.05em',
        'text-transform:uppercase',
        'backdrop-filter:blur(12px)',
        'border:1px solid rgba(255,255,255,0.06)',
        'box-shadow:0 4px 12px rgba(0,0,0,0.3)',
        'transition:all 0.3s ease'
    ].join(';');

    if (source === 'sheet') {
        badge.textContent = '● Live Data';
        badge.style.background = 'rgba(74,222,128,0.12)';
        badge.style.color = '#4ADE80';
        badge.style.borderColor = 'rgba(74,222,128,0.2)';
    }

    document.body.appendChild(badge);

    // Auto hilang setelah 6 detik
    setTimeout(function() {
        if (badge) {
            badge.style.opacity = '0';
            setTimeout(function() {
                if (badge) badge.remove();
            }, 500);
        }
    }, 6000);
}

// ====== INIT ======
function init() {
    setMarket(MARKET_OPEN);
    setText("xagUsd", MARKET.xagUsd);
    setText("xagIdr", MARKET.xagIdr);
    setText("xagUsdMobile", MARKET.xagUsd);
    setText("xagIdrMobile", MARKET.xagIdr);
    setText("statTransactions", STATS.transactions);
    setText("buybackDate", MARKET.date);
    renderProducts();
    renderBuyback();
    setupReveal();
    setupEvents();
    setupPWA();
    setTimeout(function() {
        if (typeof lucide !== "undefined") lucide.createIcons();
    }, 200);
}

function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
}

// ====== MARKET STATUS ======
function setMarket(open) {
    var dot = document.getElementById("marketDot");
    var txt = document.getElementById("marketText");
    var dotM = document.getElementById("marketDotMobile");
    var txtM = document.getElementById("marketTextMobile");

    if (open) {
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

// ====== RENDER PRODUCTS ======
function renderProducts() {
    var grid = document.getElementById("productGrid");
    if (!grid) return;

    grid.innerHTML = "";

    if (!PRODUCTS || PRODUCTS.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center text-steel py-8">Belum ada produk tersedia.</div>';
        return;
    }

    for (var i = 0; i < PRODUCTS.length; i++) {
        (function(idx) {
            var p = PRODUCTS[idx];
            var imgHtml = p.image
                ? '<img src="' + p.image + '" alt="' + (p.alt || p.name) + '" class="w-full h-full object-cover rounded-xl" loading="lazy">'
                : '<span class="text-2xl md:text-3xl font-display font-bold text-silver-gradient">' + p.initial + '</span>';

            var card = document.createElement("div");
            card.className = "product-card glass-card-hover p-4 md:p-5 rounded-xl";
            card.setAttribute("data-idx", idx);
            card.innerHTML =
                '<span class="product-badge">' + p.category + '</span>' +
                '<div class="flex flex-col items-center text-center">' +
                    '<div class="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-silver/10 to-white/5 rounded-xl flex items-center justify-center border border-silver/10 mb-4 overflow-hidden">' +
                        imgHtml +
                    '</div>' +
                    '<h4 class="font-semibold text-white text-sm truncate w-full">' + p.name + '</h4>' +
                    '<p class="text-[10px] text-steel mt-1 mb-2">' + p.supplier + ' • ' + p.purity + '</p>' +
                    '<div class="text-sm md:text-base font-display font-bold text-silver-gradient">' + p.price + '</div>' +
                '</div>';

            card.addEventListener("click", function() {
                openProduct(parseInt(this.dataset.idx));
            });

            grid.appendChild(card);
        })(i);
    }
}

// ====== RENDER BUYBACK ======
function renderBuyback() {
    var el = document.getElementById("buybackRates");
    if (!el) return;

    if (!BUYBACK_RATES || BUYBACK_RATES.length === 0) {
        el.innerHTML = '<div class="text-center text-steel py-4">Data buyback belum tersedia.</div>';
        return;
    }

    var html = '<div class="flex justify-between py-3 border-b border-white/10 text-xs font-bold text-steel uppercase"><span>Supplier</span><span>Harga</span></div>';

    for (var i = 0; i < BUYBACK_RATES.length; i++) {
        var r = BUYBACK_RATES[i];
        html +=
            '<div class="flex justify-between items-center py-3 border-b border-white/5 hover:bg-silver/5 transition px-2">' +
                '<div class="flex items-center gap-2">' +
                    '<span class="w-1.5 h-1.5 bg-silver rounded-full pulse-silver"></span>' +
                    '<span class="text-white font-medium">' + r.name + '</span>' +
                '</div>' +
                '<span class="font-bold text-white">' + r.price + '</span>' +
            '</div>';
    }

    el.innerHTML = html;
}

// ====== PRODUCT MODAL ======
function openProduct(idx) {
    var p = PRODUCTS[idx];
    if (!p) return;
    
    var imgHtml = p.image
        ? '<img src="' + p.image + '" alt="' + (p.alt || p.name) + '" class="w-full h-full object-cover rounded-xl">'
        : '<span class="text-3xl font-display font-bold text-silver-gradient">' + p.initial + '</span>';

    document.getElementById("modalInitial").innerHTML = imgHtml;
    document.getElementById("modalName").textContent = p.name;
    document.getElementById("modalCategory").textContent = p.category;
    document.getElementById("modalSupplier").textContent = p.supplier;
    document.getElementById("modalWeight").textContent = p.weight;
    document.getElementById("modalPurity").textContent = p.purity;
    document.getElementById("modalPrice").textContent = p.price;
    document.getElementById("modalLink").href = "https://wa.me/" + CONTACT.whatsapp + "?text=" + encodeURIComponent("Halo Veldion, saya mau tanya stok " + p.name);

    document.getElementById("productModal").classList.add("active");
    document.body.classList.add("no-scroll");
}

// ====== SEARCH ======
function defaultSearch() {
    var catsHtml = "";
    for (var i = 0; i < CATEGORIES.length; i++) {
        var c = CATEGORIES[i];
        catsHtml +=
            '<a href="#produk" onclick="closeSearchM()" class="search-item flex items-center gap-2 p-2 rounded-lg border border-white/5">' +
                '<div class="w-6 h-6 rounded bg-silver/10 flex items-center justify-center text-xs font-bold text-silver-light">' + c.icon + '</div>' +
                '<div><div class="text-xs text-white">' + c.name + '</div></div>' +
            '</a>';
    }

    return '<div class="p-4">' +
        '<div class="mb-4">' +
            '<div class="flex items-center gap-2 mb-2">' +
                '<i data-lucide="layers" class="w-4 h-4 text-steel"></i>' +
                '<span class="text-xs font-semibold text-white uppercase">Kategori</span>' +
            '</div>' +
            '<div class="grid grid-cols-2 gap-2">' + catsHtml + '</div>' +
        '</div>' +
        '<a href="#produk" onclick="closeSearchM()" class="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">' +
            '<span class="w-2 h-2 bg-silver rounded-full animate-pulse"></span>' +
            '<span class="text-sm font-semibold text-white">Lihat Semua Produk</span>' +
        '</a>' +
    '</div>';
}

function closeSearchM() {
    var modal = document.getElementById("searchModal");
    if (modal) modal.classList.remove("active");
    document.body.classList.remove("no-scroll");
    var input = document.getElementById("searchInput");
    if (input) input.value = "";
}
window.closeSearchM = closeSearchM;

// ====== REVEAL ANIMATIONS ======
function setupReveal() {
    var observer = new IntersectionObserver(function(entries) {
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

// ====== EVENT LISTENERS ======
function setupEvents() {
    var searchInput = document.getElementById("searchInput");
    var searchResults = document.getElementById("searchResults");

    if (searchInput) {
        searchInput.addEventListener("input", function(e) {
            var q = e.target.value.toLowerCase().trim();
            if (!q) {
                if (searchResults) searchResults.innerHTML = defaultSearch();
                return;
            }
            if (q.length < 2) {
                if (searchResults) searchResults.innerHTML = '<div class="p-4 text-center text-steel-dark">Min 2 karakter...</div>';
                return;
            }

            var filtered = PRODUCTS.filter(function(p) {
                return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
            });

            if (!filtered.length) {
                if (searchResults) searchResults.innerHTML = '<div class="p-4 text-center text-steel">Tidak ditemukan.</div>';
                return;
            }

            var resultsHtml = "";
            for (var i = 0; i < filtered.length; i++) {
                var p = filtered[i];
                resultsHtml +=
                    '<a href="https://wa.me/' + CONTACT.whatsapp + "?text=" + encodeURIComponent("Halo Veldion, saya mau tanya stok " + p.name) + '" target="_blank" class="search-item flex justify-between p-2 rounded-lg border-b border-white/5">' +
                        '<div>' +
                            '<div class="text-white text-sm">' + p.name + '</div>' +
                            '<div class="text-[10px] text-steel">' + p.category + ' • ' + p.supplier + '</div>' +
                        '</div>' +
                        '<i data-lucide="external-link" class="w-4 h-4 text-steel"></i>' +
                    '</a>';
            }

            if (searchResults) searchResults.innerHTML = '<div class="p-4 space-y-2">' + resultsHtml + '</div>';
        });
    }

    // Modal click outside
    ["productModal", "searchModal"].forEach(function(id) {
        var modal = document.getElementById(id);
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
    var closeProduct = document.getElementById("closeProductModal");
    if (closeProduct) {
        closeProduct.addEventListener("click", function() {
            document.getElementById("productModal").classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    }

    var closeSearchBtn = document.getElementById("closeSearch");
    if (closeSearchBtn) closeSearchBtn.addEventListener("click", closeSearchM);

    // Search button
    var searchBtn = document.getElementById("searchBtn");
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
                var m = document.getElementById(id);
                if (m) m.classList.remove("active");
            });
            document.body.classList.remove("no-scroll");
        }
    });

    // FAQ toggle
    document.querySelectorAll(".faq-toggle").forEach(function(toggle) {
        toggle.addEventListener("click", function() {
            var faqItem = this.closest(".faq-item");
            var content = faqItem.querySelector(".faq-content");
            var isOpen = faqItem.classList.contains("open");

            document.querySelectorAll(".faq-item").forEach(function(item) {
                item.classList.remove("open");
                var c = item.querySelector(".faq-content");
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
            var href = this.getAttribute("href");
            if (href === "#") return;
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                var offset = window.innerWidth < 768 ? 70 : 100;
                window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });

                document.querySelectorAll(".mobile-nav-item").forEach(function(item) {
                    item.classList.remove("active");
                    if (item.dataset.section === href.replace("#", "")) item.classList.add("active");
                });
            }
        });
    });

    // Back to top
    var toTop = document.getElementById("toTopBtn");
    if (toTop) {
        window.addEventListener("scroll", function() {
            toTop.classList.toggle("visible", window.scrollY > 500);
        });
        toTop.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Active nav on scroll
    var mobileNavItems = document.querySelectorAll(".mobile-nav-item");
    var sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
        var scrollY = window.scrollY;
        var offset = 150;

        sections.forEach(function(section) {
            var top = section.offsetTop - offset;
            var bottom = top + section.offsetHeight;
            var id = section.getAttribute("id");

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

// ====== PWA ======
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

    var deferredPrompt;
    window.addEventListener("beforeinstallprompt", function(e) {
        e.preventDefault();
        deferredPrompt = e;
        var installBtn = document.getElementById("installPWA");
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
