// Čekáme, až se načte celá struktura stránky (DOM)
document.addEventListener("DOMContentLoaded", function() {

    /* =========================================
       LOGIKA PRO DETAIL MODELU (detail.html)
       ========================================= */
    
    // Najdeme prohlížeč modelu v HTML
    const viewer = document.getElementById('fullscreen-model');

    // Podmínka: Kód uvnitř se spustí JEN tehdy, když jsme na stránce detail.html
    // (tzn. když existuje element s id="fullscreen-model")
    if (viewer) {
        
        // 1. Získání názvu modelu z URL adresy (to za otazníkem ?model=...)
        const params = new URLSearchParams(window.location.search);
        const modelSrc = params.get('model');

        // 2. Nastavení zdroje modelu
        if (modelSrc) {
            viewer.src = modelSrc;
            console.log("Načítám model:", modelSrc);
        } else {
            console.error("Chyba: V URL nebyl specifikován žádný model.");
            // Volitelné: Přesměrování zpět, pokud chybí model
            // window.location.href = 'modely.html';
        }

        // 3. Obsluha Loading Baru (Načítání)
        const progressBar = document.querySelector('.progress-bar-fill');
        const loadingText = document.querySelector('.loading-overlay div:nth-child(2)'); // Ten text "NAČÍTÁM..."

        if (progressBar) {
            // Posloucháme událost 'progress', kterou vysílá model-viewer při stahování
            viewer.addEventListener('progress', (event) => {
                // Přepočet na procenta (0 až 100)
                const percent = event.detail.totalProgress * 100;
                
                // Roztahování zlatého proužku
                progressBar.style.width = `${percent}%`;

                // Volitelné: Pokud chceš vidět i čísla (např. "NAČÍTÁM MODEL... 45%")
                if (loadingText) {
                    loadingText.innerText = `NAČÍTÁM MODEL... ${Math.round(percent)}%`;
                }
            });
        }
        // ... (kód pro progress bar) ...

        // POJISTKA: Až se model kompletně načte, natvrdo skryjeme loading
        viewer.addEventListener('load', () => {
            const overlay = document.querySelector('.loading-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
            console.log("Model načten, skrývám loading.");
        });
    }

    /* =========================================
       ZDE MŮŽEŠ PŘIDAT DALŠÍ FUNKCE DO BUDOUCNA
       (např. ovládání menu na mobilu atd.)
       ========================================= */

});