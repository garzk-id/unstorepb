// Update fungsi showDetailModal
function showDetailModal(name, code, price = 0) {
const modal = document.getElementById('detailModal');
document.getElementById('detailProductName').textContent = name;
document.getElementById('detailProductCode').textContent = code;

// Set data produk berdasarkan nama
if (name.includes('Elite')) {
    document.getElementById('detailLevel').textContent = '85 (Colonel)';
    document.getElementById('detailGP').textContent = '500K+';
    document.getElementById('detailItems').textContent = '50+';
} else if (name.includes('Veteran')) {
    document.getElementById('detailLevel').textContent = '75 (Major)';
    document.getElementById('detailGP').textContent = '300K+';
    document.getElementById('detailItems').textContent = '30+';
} else if (name.includes('Medium')) {
    document.getElementById('detailLevel').textContent = '50 (Captain)';
    document.getElementById('detailGP').textContent = '150K+';
    document.getElementById('detailItems').textContent = '15+';
}

// Set tombol beli
const buyBtn = document.getElementById('buyFromDetailBtn');
buyBtn.onclick = function() {
    closeDetailModal();
    showPaymentModal(name, price, code);
};

modal.classList.remove('hidden');

// Reset tab ke pertama
openTab('tab1');

// Animate in
gsap.fromTo('.modal-enter', 
    { opacity: 0, y: 20, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out" }
);
}

// Fungsi untuk tab system
function openTab(tabId) {
// Sembunyikan semua tab content
const tabContents = document.querySelectorAll('.tab-content');
tabContents.forEach(content => {
    content.classList.add('hidden');
});

// Tampilkan tab yang dipilih
document.getElementById(tabId).classList.remove('hidden');

// Update style tab button
const tabButtons = document.querySelectorAll('.tab-button');
tabButtons.forEach(button => {
    button.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
    button.classList.add('text-gray-500');
});

// Aktifkan tab yang dipilih
event.currentTarget.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
event.currentTarget.classList.remove('text-gray-500');
}

// Update form submission untuk kirim invoice ke WhatsApp
// Update form submission untuk kirim invoice ke WhatsApp
document.getElementById('paymentForm').addEventListener('submit', function(e) {
e.preventDefault();

const productName = document.getElementById('productName').textContent;
const productCode = document.getElementById('productCode').textContent;
const totalPrice = document.getElementById('totalPrice').textContent;
const customerName = document.getElementById('customerName').value;
const whatsappNumber = document.getElementById('whatsappNumber').value;
const paymentMethod = document.getElementById('paymentMethod').value;

// Format nomor WhatsApp (hapus +62 atau 0 di depan)
let formattedNumber = whatsappNumber.replace(/^\+62/, '').replace(/^0/, '');
if (!formattedNumber.startsWith('62') && !formattedNumber.startsWith('0')) {
    formattedNumber = '62' + formattedNumber;
}
formattedNumber = formattedNumber.replace(/\D/g, '');

// Buat pesan invoice
const invoiceMessage = `Halo UNSTOREPB,\n\nSaya ingin membeli produk berikut:\n\n` +
                    `*Nama Produk:* ${productName}\n` +
                    `*Kode Char:* ${productCode}\n` +
                    `*Total Pembayaran:* ${totalPrice}\n` +
                    `*Metode Pembayaran:* ${document.getElementById('paymentMethod').options[document.getElementById('paymentMethod').selectedIndex].text}\n\n` +
                    `*Data Pembeli:*\n` +
                    `Nama: ${customerName}\n` +
                    `WhatsApp: ${whatsappNumber}\n\n` +
                    `Mohon kirimkan detail pembayaran dan nomor rekening untuk proses selanjutnya.`;

// Encode message untuk URL
const encodedMessage = encodeURIComponent(invoiceMessage);

// Redirect ke WhatsApp dengan pesan invoice
window.open(`https://wa.me/6285117631802?text=${encodedMessage}`, '_blank');

// Tutup modal
closeModal();
});

// Update fungsi showPaymentModal untuk menerima harga
function showPaymentModal(name, price, code) {
const modal = document.getElementById('paymentModal');
document.getElementById('productName').textContent = name;
document.getElementById('productCode').textContent = code;
document.getElementById('productPrice').textContent = 'Rp ' + price.toLocaleString('id-ID');
document.getElementById('totalPrice').textContent = 'Rp ' + (price + 2500).toLocaleString('id-ID');
modal.classList.remove('hidden');

// Animate in
gsap.fromTo('.modal-enter', 
    { opacity: 0, y: 20, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out" }
);
}

// Update panggilan showDetailModal di tombol produk untuk menyertakan harga
// Contoh untuk produk Elite:
onclick="showDetailModal('Char PB Elite', '#M1UF45', 250000)"
// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-quart'
});

// Smooth scrolling with Lenis
const lenis = new Lenis({
    lerp: 0.1,
    smooth: true
});

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuBtn.innerHTML = mobileMenu.classList.contains('hidden') ? 
        '<i class="bi bi-list"></i>' : '<i class="bi bi-x-lg"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.innerHTML = '<i class="bi bi-list"></i>';
    });
});

// Modal Functions
function showPaymentModal(name, price, code) {
    const modal = document.getElementById('paymentModal');
    document.getElementById('productName').textContent = name;
    document.getElementById('productCode').textContent = code;
    document.getElementById('productPrice').textContent = 'Rp ' + price.toLocaleString('id-ID');
    document.getElementById('totalPrice').textContent = 'Rp ' + (price + 2500).toLocaleString('id-ID');
    modal.classList.remove('hidden');
    
    // Animate in
    gsap.fromTo('.modal-enter', 
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out" }
    );
}

function showDetailModal(name, code) {
    const modal = document.getElementById('detailModal');
    document.getElementById('detailProductName').textContent = name;
    document.getElementById('detailProductCode').textContent = code;
    modal.classList.remove('hidden');
    
    // Animate in
    gsap.fromTo('.modal-enter', 
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out" }
    );
}

function showGBModal(service) {
    const modal = document.getElementById('gbModal');
    document.getElementById('gbServiceName').textContent = service;
    // Set WhatsApp link with pre-filled message
    const whatsappLink = document.getElementById('gbWhatsAppLink');
    const message = `Halo, saya ingin pesan jasa ${encodeURIComponent(service)}. Mohon info ketersediaan dan detailnya.`;
    whatsappLink.href = `https://wa.me/6285117631802?text=${message}`;
    modal.classList.remove('hidden');
    
    // Animate in
    gsap.fromTo('.modal-enter', 
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out" }
    );
}

function closeModal() {
    const modal = document.getElementById('paymentModal');
    // Animate out
    gsap.to('.modal-enter', {
        opacity: 0, y: 20, scale: 0.95, duration: 0.2, ease: "power1.in",
        onComplete: () => modal.classList.add('hidden')
    });
}

function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    // Animate out
    gsap.to('.modal-enter', {
        opacity: 0, y: 20, scale: 0.95, duration: 0.2, ease: "power1.in",
        onComplete: () => modal.classList.add('hidden')
    });
}

function closeGBModal() {
    const modal = document.getElementById('gbModal');
    // Animate out
    gsap.to('.modal-enter', {
        opacity: 0, y: 20, scale: 0.95, duration: 0.2, ease: "power1.in",
        onComplete: () => modal.classList.add('hidden')
    });
}

// Close modals when clicking outside
window.onclick = function(event) {
    const paymentModal = document.getElementById('paymentModal');
    const detailModal = document.getElementById('detailModal');
    const gbModal = document.getElementById('gbModal');
    
    if (event.target == paymentModal) {
        closeModal();
    }
    if (event.target == detailModal) {
        closeDetailModal();
    }
    if (event.target == gbModal) {
        closeGBModal();
    }
}

// Form submission
document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert('Invoice telah dikirim ke WhatsApp Anda. Silahkan lakukan pembayaran dan kirim bukti transfer.');
    closeModal();
});

// FAQ Toggle
function toggleFAQ(num) {
    const content = document.getElementById(`faqContent${num}`);
    const icon = document.getElementById(`faqIcon${num}`);
    
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        icon.classList.remove('rotate-180');
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.add('rotate-180');
    }
}

// Particles.js configuration
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#3b82f6"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#3b82f6",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
    
    // Loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 1500);
    
    // Create floating particles manually
    createFloatingParticles();
});

// Create floating particles manually
function createFloatingParticles() {
    const container = document.body;
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 3;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const color = `rgba(59, 130, 246, ${Math.random() * 0.4 + 0.1})`;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';
        
        // Add to DOM
        container.appendChild(particle);
        
        // Animate
        animateParticle(particle);
    }
}

// Animate particles
function animateParticle(element) {
    const startX = parseInt(element.style.left);
    const startY = parseInt(element.style.top);
    const duration = Math.random() * 20 + 20;
    const distance = Math.random() * 100 + 50;
    
    gsap.to(element, {
        x: `+=${Math.random() > 0.5 ? distance : -distance}`,
        y: `+=${Math.random() > 0.5 ? distance : -distance}`,
        duration: duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
}

// Typewriter effect
document.addEventListener('DOMContentLoaded', function() {
    const heroText = document.querySelector('.hero-bg p');
    if (heroText) {
        heroText.classList.add('typewriter');
        
        // Reset animation after it completes
        setTimeout(() => {
            heroText.classList.remove('typewriter');
            void heroText.offsetWidth; // Trigger reflow
            heroText.classList.add('typewriter');
        }, 3500);
    }
});