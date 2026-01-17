<script>
    // --- 1. Yazılıp Silinen Sekme Başlığı Animasyonu ---
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

    // --- 2. GLOBAL Görüntülenme Sayacı (Herkes Aynı Sayıyı Görür) ---
    // Not: "bluskyre-p" yazan yer senin anahtarındır. Bunu değiştirirsen sayaç sıfırlanır.
    async function updateCounter() {
        try {
            const namespace = "bluskyre-official-page"; // Burayı kendine göre eşsiz yapabilirsin
            const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/visits`);
            const data = await response.json();
            document.getElementById('view-count').innerText = data.value;
        } catch (error) {
            // Eğer API geçici olarak çalışmazsa LocalStorage'a geri döner (hata vermez)
            let fallbackCount = localStorage.getItem('fallback_views') || 0;
            fallbackCount++;
            localStorage.setItem('fallback_views', fallbackCount);
            document.getElementById('view-count').innerText = fallbackCount;
            console.log("Global sayaç şu an yüklenemedi.");
        }
    }
    updateCounter();

    // --- 3. Tema Değiştirme ---
    function toggleTheme() {
        const body = document.body;
        const icon = document.getElementById('theme-icon');
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
</script>