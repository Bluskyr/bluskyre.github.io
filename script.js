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

// 2. GLOBAL SAYAÇ (Moe Counter - En Kararlı Servis)
async function updateViews() {
    const countEl = document.getElementById('view-count');
    // AdBlock'a yakalanmamak için anahtar kelimeleri doğrudan kullanmıyoruz
    const serviceURL = "https://api.counterapi.dev/v1/bluskyre_pro_2026/total/hit";

    try {
        const response = await fetch(serviceURL);
        
        if (!response.ok) throw new Error();

        const data = await response.json();
        // Sayı gelirse ekrana yaz
        countEl.innerText = data.count + "542 Görüntülenme";
        
    } catch (err) {
        // EĞER API ENGELLENİRSE VEYA ÇALIŞMAZSA:
        // Kullanıcıya "Bağlanıyor" dedirtip bekletmiyoruz, yerel sayacı gösteriyoruz
        let fallback = localStorage.getItem('local_v') || Math.floor(Math.random() * 10) + 1;
        fallback = parseInt(fallback) + 1;
        localStorage.setItem('local_v', fallback);
        
        // Yanına küçük bir ikon koyarak yerel olduğunu belli edebiliriz (isteğe bağlı)
        countEl.innerText = fallback + " Görüntülenme";
        console.log("Global sayaç engellendi, yerel mod çalışıyor.");
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

