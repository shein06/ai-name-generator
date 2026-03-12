// GLOBAL AI SMART DATABASE 2026
const AI_DATABASE = {
    modern: ["Zynapse", "Nexalyn", "Aetheris", "Veldora", "Quantix", "Omnith", "Krytos", "Elovate", "Ionix", "Synthetix", "Fluxo", "Zenith", "Apex", "Lyra", "Kinetix"],
    business: ["Capital", "Equity", "Partners", "Holdings", "Ventures", "Synergy", "Global", "Bridge", "Alliance", "Prime", "Elite", "Summit", "Vision", "Legacy", "Core"],
    tech: ["Labs", "Node", "Grid", "Pulse", "Mind", "Flow", "Logic", "Base", "Hub", "System", "Cloud", "Data", "Link", "Byte", "Orbit"],
    creative: ["Studio", "Maison", "Concept", "Muse", "Aura", "Craft", "Design", "Vibe", "Flow", "Story", "Artisan", "Canvas", "Bloom", "Echo", "Spark"],
    aesthetic: ["Luna", "Sora", "Hana", "Mochi", "Aura", "Cloud", "Dear", "Sweet", "Daily", "Pure", "Soft", "Vibe", "Muse", "Ethos", "Nara"]
};

// 1. FUNGSI DARK MODE (DENGAN PENYIMPANAN OTOMATIS)
function toggleDarkMode() {
    const body = document.body;
    const btn = document.getElementById('darkModeToggle');
    
    body.classList.toggle('dark-mode');
    
    // Simpan pilihan user ke localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        if(btn) btn.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem('theme', 'light');
        if(btn) btn.innerText = "🌙 Dark Mode";
    }
}

// 2. FUNGSI LIVE SEARCH (UNTUK HALAMAN INDEX)
function searchTools() {
    let input = document.getElementById('toolSearch').value.toLowerCase();
    let cards = document.querySelectorAll('.card');
    let toolsGrid = document.querySelector('.tools');
    let visibleCount = 0;

    cards.forEach(card => {
        let title = card.querySelector('a').innerText.toLowerCase();
        let desc = card.querySelector('p').innerText.toLowerCase();

        if (title.includes(input) || desc.includes(input)) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    // Cek jika hasil pencarian kosong
    let noResult = document.getElementById('no-result');
    if (visibleCount === 0 && toolsGrid) {
        if (!noResult) {
            noResult = document.createElement('p');
            noResult.id = 'no-result';
            noResult.innerText = 'Oops! No generator found...';
            noResult.style.color = '#666';
            noResult.style.gridColumn = '1 / -1';
            toolsGrid.appendChild(noResult);
        }
    } else {
        if (noResult) noResult.remove();
    }
}

// 3. FUNGSI SCROLL REVEAL (ANIMASI MUNCUL SAAT DI-SCROLL)
function revealElements() {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach((el) => observer.observe(el));
}

// 4. JALANKAN SEMUA SAAT HALAMAN DIMUAT
document.addEventListener("DOMContentLoaded", function() {
    // Jalankan Reveal
    revealElements();

    // Cek Tema yang Tersimpan (Dark Mode Persistence)
    const savedTheme = localStorage.getItem('theme');
    const btn = document.getElementById('darkModeToggle');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if(btn) btn.innerText = "☀️ Light Mode";
    }

    // Otomatis tambahkan 'Try Now' ke semua Card (Project Step 4)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (!card.querySelector('.cta-btn')) {
            const cta = document.createElement('span');
            cta.className = 'cta-btn';
            cta.innerText = 'Try Now →';
            card.appendChild(cta);
        }
        // Biar seluruh kartu bisa diklik
        card.style.cursor = 'pointer';
        card.onclick = function() {
            const link = card.querySelector('a').getAttribute('href');
            window.location.href = link;
        };
    });
});
// Fungsi untuk menampilkan loading sebelum hasil muncul
function showLoading(resultId, callback) {
    const resultDiv = document.getElementById(resultId);
    
    // Tampilkan Spinner
    resultDiv.innerHTML = `
        <div class="loader-container" style="display:block;">
            <div class="spinner"></div>
            <p style="margin-top:10px; color:#666;">Generating ideas...</p>
        </div>
    `;

    // Beri jeda 800ms seolah-olah AI sedang bekerja
    setTimeout(() => {
        callback(); // Jalankan fungsi generate aslinya
    }, 800);
}
// FUNGSI CEK DOMAIN (Ide Gila No. 1)
function checkDomain(name) {
    // Kita bersihkan spasi agar jadi format domain (contoh: "Smart Coffee" jadi "smartcoffee")
    const domainName = name.toLowerCase().replace(/\s+/g, '');
    const url = `https://www.namecheap.com/domains/registration/results/?domain=${domainName}.com`;
    
    // Buka di tab baru agar user tidak meninggalkan website kita (Penting buat AdSense!)
    window.open(url, '_blank');
}
// FUNGSI DOWNLOAD KARTU NAMA (Ide Gila No. 2)
function downloadCard(elementId, fileName) {
    const element = document.getElementById(elementId);
    
    // Beri gaya sementara agar gambar terlihat premium saat di-download
    element.style.padding = "50px";
    element.style.background = document.body.classList.contains('dark-mode') ? "#1f1f1f" : "#ffffff";
    element.style.border = "2px solid #1a73e8";

    html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.download = fileName + '.png';
        link.href = canvas.toDataURL();
        link.click();
        
        // Kembalikan gaya ke semula
        element.style.padding = "25px";
        element.style.border = "none";
    });
}

