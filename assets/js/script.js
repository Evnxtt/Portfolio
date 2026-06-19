document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if(hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Prevent scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if(navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Skip if href is just "#"
            if(this.getAttribute('href') === '#') return;

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement) {
                // Scroll with 80px offset for the fixed navbar
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '0.5rem 2rem'; // Shrink navbar slightly
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1rem 2rem';
        }
    });

    // 4. Intersection Observer for Fade-In Animations
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                // Stop observing once the animation has triggered
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 5. Highlight Nav Link on Scroll (ScrollSpy)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Angka 100 adalah offset toleransi untuk tinggi navbar agar menu berganti sedikit lebih cepat sebelum menabrak ujung atas
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        // Menghapus class active dari semua link, lalu menambahkannya ke link yang sesuai
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

});

// ==========================================================================
//   LOGIKA INTEGRASI FILTER & PAGINATION PORTFOLIO
// ==========================================================================
const itemsPerPage = 4; // Batas maksimal kartu per halaman
let currentPage = 1;
let currentFilter = 'all';

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const paginationContainer = document.getElementById('pagination-container');

function renderProjects() {
    // 1. Ambil kartu yang lolos seleksi filter kategori saat ini
    const filteredCards = projectCards.filter(card => {
        return currentFilter === 'all' || card.getAttribute('data-category') === currentFilter;
    });

    // 2. Hitung total halaman yang dibutuhkan
    const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

    // Proteksi halaman jika terjadi perpindahan kategori filter yang datanya sedikit
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
    if (totalPages === 0) currentPage = 1;

    // 3. Batasan indeks array untuk pemotongan (slicing) data per halaman
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Sembunyikan semua kartu terlebih dahulu & bersihkan class appear
    projectCards.forEach(card => {
        card.style.display = 'none';
        card.classList.remove('appear');
    });

    // Tampilkan hanya kartu yang berada dalam jangkauan indeks halaman aktif
    filteredCards.slice(startIndex, endIndex).forEach(card => {
        card.style.display = 'block';
        // Memberikan sedikit timeout browser agar animasi fade-in terpicu ulang dengan halus
        setTimeout(() => {
            card.classList.add('appear');
        }, 50);
    });

    // 4. Bangun susunan tombol pagination secara dinamis
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';

    // Jika total halaman hanya 1 atau tidak ada proyek, sembunyikan baris pagination
    if (totalPages <= 1) return;

    // Membuat Tombol Previous (<)
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProjects();
            scrollToProjects();
        }
    });
    paginationContainer.appendChild(prevBtn);

    // Membuat Tombol Angka Halaman Dinamis (1, 2, dst)
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.innerText = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderProjects();
            scrollToProjects();
        });
        paginationContainer.appendChild(pageBtn);
    }

    // Membuat Tombol Next (>)
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProjects();
            scrollToProjects();
        }
    });
    paginationContainer.appendChild(nextBtn);
}

// Fungsi pembantu untuk mengembalikan posisi layar ke atas section portfolio saat berpindah halaman
function scrollToProjects() {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        window.scrollTo({
            top: projectsSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Pasang Event Listener klik ke setiap tombol filter kategori
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentFilter = btn.getAttribute('data-filter');
        currentPage = 1; // Reset halaman kembali ke angka 1 setiap ganti filter
        renderProjects();
    });
});

// Jalankan fungsi inisialisasi pertama kali saat file script di-load browser
renderProjects();