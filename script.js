// 1. BAŞLIK ANİMASYONU
const titleText = "BLUSKYRE";
let charIndex = 0;
let isDeleting = false;

function animateTitle() {
    const currentTitle = titleText.substring(0, charIndex);
    document.title = currentTitle || "|";

    if (!isDeleting && charIndex < titleText.length) {
        charIndex++;
        setTimeout(animateTitle, 300);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(animateTitle, 150);
    } else {
        isDeleting = !isDeleting;
        setTimeout(animateTitle, 2000);
    }
}
animateTitle();

// 2. GLOBAL GÖRÜNTÜLENME SAYACI
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
updateViews();

// 3. TEMA DEĞİŞTİRME
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-icon');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}
