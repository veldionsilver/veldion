// ============================================================
// Veldion Silver — Premium Loading Screen
// ============================================================

(function() {
    // Cegah double loader
    if (document.getElementById('veldion-loader')) return;

    // Buat elemen loading screen
    var loader = document.createElement('div');
    loader.id = 'veldion-loader';
    loader.innerHTML = `
        <div class="loader-overlay">
            <div class="loader-bg-shimmer"></div>
            <div class="loader-container">
                <div class="loader-logo-wrapper">
                    <div class="loader-logo-ring">
                        <div class="loader-logo-ring-inner"></div>
                    </div>
                    <img src="assets/images/logo.webp" alt="Veldion Silver" class="loader-logo" width="80" height="80">
                </div>
                <div class="loader-brand">Veldion Silver</div>
                <div class="loader-subtitle">Perak Fisik Premium</div>
                <div class="loader-progress-wrapper">
                    <div class="loader-progress-bar"></div>
                </div>
            </div>
        </div>
    `;

    // Sisipkan di awal body
    document.body.prepend(loader);

    // Flag
    var isHidden = false;
    var progress = 0;
    var progressBar = document.querySelector('.loader-progress-bar');
    var startTime = Date.now();
    var minDuration = 1500; // 1.5 detik

    // Animasi progress bar
    function updateProgress() {
        if (isHidden) return;
        var elapsed = Date.now() - startTime;
        var targetProgress = Math.min((elapsed / minDuration) * 100, 95);
        progress = Math.max(progress, targetProgress);
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        if (elapsed < minDuration) {
            requestAnimationFrame(updateProgress);
        }
    }

    // Mulai animasi progress
    requestAnimationFrame(updateProgress);

    function hideLoader() {
        if (isHidden) return;
        isHidden = true;

        // Set progress ke 100%
        if (progressBar) {
            progressBar.style.width = '100%';
        }

        var el = document.getElementById('veldion-loader');
        if (!el) return;

        // Tambah class untuk animasi keluar
        el.classList.add('loader-exit');

        // Trigger transisi masuk halaman utama
        document.body.classList.add('page-enter');

        setTimeout(function() {
            el.remove();
            document.body.classList.add('page-visible');
        }, 800);
    }

    // Tunggu semua konten selesai dimuat
    function checkReady() {
        if (document.readyState === 'complete') {
            // Pastikan durasi minimal 1.5 detik
            var elapsed = Date.now() - startTime;
            var remaining = Math.max(0, minDuration - elapsed);
            setTimeout(hideLoader, remaining);
        } else {
            window.addEventListener('load', function() {
                var elapsed = Date.now() - startTime;
                var remaining = Math.max(0, minDuration - elapsed);
                setTimeout(hideLoader, remaining);
            });
        }
    }

    // Fallback: maksimal 4 detik
    setTimeout(function() {
        if (!isHidden) hideLoader();
    }, 4000);

    checkReady();
})();