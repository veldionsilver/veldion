// ============================================================
// Veldion Silver — Premium Loading Screen (Standalone)
// ============================================================

(function() {
    if (document.getElementById('veldion-loader')) return;

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
        'transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        'will-change:transform,opacity'
    ].join(';');

    loader.innerHTML = `
        <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(192,197,206,0.03) 0%,transparent 60%),radial-gradient(ellipse at 70% 50%,rgba(192,197,206,0.02) 0%,transparent 50%);opacity:0;animation:shimmerFade 2s ease-in-out infinite alternate;"></div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:40px;position:relative;z-index:1;opacity:0;transform:translateY(20px) scale(0.95);animation:loaderEntry 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s forwards;">
            <div style="position:relative;width:100px;height:100px;display:flex;align-items:center;justify-content:center;">
                <div style="position:absolute;inset:-6px;border-radius:50%;">
                    <div style="position:absolute;inset:-2px;border-radius:50%;padding:2px;background:conic-gradient(from 0deg,transparent 0%,#C0C5CE 20%,#E2E8F0 40%,#94A3B8 60%,transparent 80%,transparent 100%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:ringSpin 1.8s cubic-bezier(0.65,0,0.35,1) infinite;"></div>
                    <div style="position:absolute;inset:0;border-radius:50%;border:1px solid rgba(192,197,206,0.06);"></div>
                </div>
                <img src="assets/images/logo.webp" alt="Veldion Silver" style="width:64px;height:64px;object-fit:contain;position:relative;z-index:1;border-radius:50%;background:#080A0F;padding:8px;animation:logoPulse 2.5s ease-in-out infinite;">
            </div>
            <div style="font-family:'Sora',sans-serif;font-size:26px;font-weight:800;background:linear-gradient(135deg,#E2E8F0 0%,#C0C5CE 30%,#94A3B8 60%,#CBD5E1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:0.08em;margin-top:4px;opacity:0;animation:textFade 0.6s ease 0.4s forwards;">Veldion Silver</div>
            <div style="font-size:11px;color:#64748B;letter-spacing:0.25em;text-transform:uppercase;font-weight:500;opacity:0;animation:textFade 0.6s ease 0.6s forwards;">Agregator Perak Fisik</div>
            <div style="width:180px;height:2px;background:rgba(192,197,206,0.06);border-radius:2px;overflow:hidden;margin-top:12px;opacity:0;animation:textFade 0.6s ease 0.8s forwards;">
                <div id="loaderProgressBar" style="width:0%;height:100%;background:linear-gradient(135deg,#E2E8F0 0%,#C0C5CE 30%,#94A3B8 60%,#CBD5E1 100%);transition:width 0.3s cubic-bezier(0.16,1,0.3,1);box-shadow:0 0 20px rgba(192,197,206,0.2);"></div>
            </div>
            <div style="font-size:12px;color:#64748B;letter-spacing:0.15em;text-transform:uppercase;font-weight:500;margin-top:8px;opacity:0;animation:textFade 0.6s ease 1s forwards;">Memuat</div>
        </div>
        <style>
            @keyframes shimmerFade {
                0% { opacity: 0.3; }
                100% { opacity: 0.8; }
            }
            @keyframes loaderEntry {
                0% { opacity: 0; transform: translateY(20px) scale(0.95); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes ringSpin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes logoPulse {
                0%, 100% { transform: scale(1); filter: brightness(1); }
                50% { transform: scale(1.04); filter: brightness(1.1); }
            }
            @keyframes textFade {
                0% { opacity: 0; transform: translateY(6px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            @media (max-width: 768px) {
                #veldion-loader > div:last-of-type > div:first-of-type { width: 80px; height: 80px; }
                #veldion-loader img { width: 50px; height: 50px; padding: 6px; }
                #veldion-loader > div:last-of-type > div:nth-child(2) { font-size: 20px; }
                #veldion-loader > div:last-of-type > div:nth-child(4) { width: 140px; }
                #veldion-loader > div:last-of-type > div:last-child { font-size: 10px; }
            }
            @media (max-width: 400px) {
                #veldion-loader > div:last-of-type > div:first-of-type { width: 64px; height: 64px; }
                #veldion-loader img { width: 40px; height: 40px; padding: 5px; }
                #veldion-loader > div:last-of-type > div:nth-child(2) { font-size: 17px; }
                #veldion-loader > div:last-of-type > div:last-child { font-size: 9px; }
            }
            @media (prefers-reduced-motion: reduce) {
                #veldion-loader * { animation-duration: 0.01ms !important; }
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
