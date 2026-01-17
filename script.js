async function updateViews() {
    const countEl = document.getElementById('view-count');
    try {
        // GitHub Pages ile en uyumlu ve hızlı çalışan servis
        const response = await fetch('https://api.countapi.xyz/hit/bluskyre-unique-page/visits');
        const data = await response.json();
        countEl.innerText = data.value + " Görüntülenme";
    } catch (err) {
        // Hata durumunda (AdBlock vb.) yerel sayacı çalıştır
        let localV = localStorage.getItem('v_count') || 0;
        localV++;
        localStorage.setItem('v_count', localV);
        countEl.innerText = localV + " Görüntülenme";
    }
}
updateViews()
