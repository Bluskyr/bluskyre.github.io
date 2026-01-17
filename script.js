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

// 2. GLOBAL SAYAÇ (CounterAPI.dev - Daha Stabil)
async function updateViews() {
    const countEl = document.getElementById('view-count');
    // Benzersiz bir anahtar oluşturduk: bluskyre_official_2026
    const namespace = "bluskyre_site_2026"; 
    const key = "visits";

    try {
        // 'cache: no-store' ekleyerek GitHub'ın eski sayıyı göstermesini engelliyoruz
        const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/hit`, {
            cache: "no-store"
        });
        
        if (!response.ok) throw new Error();

        const data = await response.json();
        countEl.innerText = data.count + " Görüntülenme";
    } catch (err) {
        // API o an çalışmazsa kullanıcıya çirkin bir görüntü vermemek için:
        countEl.innerText = "Bağlanıyor..."; 
        console.log("Sayaç servisi şu an meşgul.");
        
        // 3 saniye sonra tekrar dene (Otomatik tazeleme)
        setTimeout(updateViews, 3000);
    }
}

// Sayfa yüklenince çalıştır
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
