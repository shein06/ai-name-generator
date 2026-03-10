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
