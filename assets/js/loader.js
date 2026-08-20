// ============================================================
// Veldion Silver — Loading Screen (Standalone)
// ============================================================

(function() {
    // Cegah double loader
    if (document.getElementById('veldion-loader')) return;

    // Buat elemen loading screen dengan styling inline
    var loader = document.createElement('div');
    loader.id = 'veldion-loader';
    loader.style.cssText = [
        'position:fixed',
        'inset:0',
        'z-index:99999',
        'background:#080A0F',
        'display:flex',
        'align-items:center',
        'justify-content:center',
        'flex-direction:column',
        'gap:12px',
        'transition:opacity 0.8s ease, transform 0.8s ease'
    ].join(';');

    loader.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:40px;">
            <img src="assets/images/logo.webp" alt="Veldion Silver" style="width:64px;height:64px;object-fit:contain;border-radius:50%;background:#080A0F;padding:8px;animation:loaderPulse 2.5s ease-in-out infinite;">
            <div style="font-family:'Sora',sans-serif;font-size:22px;font-weight:800;background:linear-gradient(135deg,#E2E8F0 0%,#C0C5CE 30%,#94A3B8 60%,#CBD5E1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:0.08em;">Veldion Silver</div>
            <div style="font-size:10px;color:#64748B;letter-spacing:0.25em;text-transform:uppercase;font-weight:500;">Perak Fisik Premium</div>
            <div style="width:180px;height:2px;background:rgba(192,197,206,0.06);border-radius:2px;overflow:hidden;margin-top:4px;">
                <div id="loaderProgressBar" style="width:0%;height:100%;background:linear-gradient(135deg,#E2E8F0 0%,#C0C5CE 30%,#94A3B8 60%,#CBD5E1 100%);transition:width 0.3s ease;"></div>
            </div>
            <div style="font-size:11px;color:#64748B;letter-spacing:0.15em;text-transform:uppercase;font-weight:500;margin-top:4px;">Memuat</div>
        </div>
        <style>
            @keyframes loaderPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.04); }
            }
        </style>
    `;

    document.body.prepend(loader);

    var isHidden = false;
    var progressBar = document.getElementById('loaderProgressBar');
    var startTime = Date.now();
    var minDuration = 2000;

    function updateProgress() {
        if (isHidden) return;
        var elapsed = Date.now() - startTime;
        var targetProgress = Math.min((elapsed / minDuration) * 100, 95);
        if (progressBar) {
            progressBar.style.width = targetProgress + '%';
        }
        if (elapsed < minDuration) {
            requestAnimationFrame(updateProgress);
        }
    }

    requestAnimationFrame(updateProgress);

    function hideLoader() {
        if (isHidden) return;
        isHidden = true;

        if (progressBar) {
            progressBar.style.width = '100%';
        }

        var el = document.getElementById('veldion-loader');
        if (!el) return;

        el.style.opacity = '0';
        el.style.transform = 'scale(1.05)';
        el.style.pointerEvents = 'none';

        setTimeout(function() {
            el.remove();
        }, 800);
    }

    function checkReady() {
        if (document.readyState === 'complete') {
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

    setTimeout(function() {
        if (!isHidden) hideLoader();
    }, 5000);

    checkReady();
})();
