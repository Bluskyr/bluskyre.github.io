async function getViews() {
            const countElement = document.getElementById('view-count');
            try {
                // Daha kararlı bir API olan CountAPI.xyz'in alternatifini kullanıyoruz
                // 'bluskyre-github' senin sitene özel anahtardır
                const response = await fetch('https://api.countapi.xyz/hit/bluskyre-github-2024/visits');
                
                if (!response.ok) throw new Error('API Hatası');
                
                const data = await response.json();
                countElement.innerText = data.value;
            } catch (err) {
                console.error("Sayaç yüklenemedi:", err);
                // Eğer internette sorun varsa yerel sayacı devreye al
                let localCount = localStorage.getItem('local_v') || 0;
                localCount++;
                localStorage.setItem('local_v', localCount);
                countElement.innerText = localCount;
            }
        }
        getViews();
