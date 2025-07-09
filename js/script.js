function openTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.add('hidden');
    });

    document.getElementById(tabId).classList.remove('hidden');

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
        button.classList.add('text-gray-500');
    });

    event.currentTarget.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
    event.currentTarget.classList.remove('text-gray-500');
}

function showPaymentModal(name, price, code) {
    const modal = document.getElementById('paymentModal');
    document.getElementById('productName').textContent = name;
    document.getElementById('productCode').textContent = code;
    document.getElementById('productPrice').textContent = 'Rp ' + price.toLocaleString('id-ID');
    document.getElementById('totalPrice').textContent = 'Rp ' + price.toLocaleString('id-ID');
    modal.classList.remove('hidden');
}

function showDetailModal(name, code, price = 0, driveLink = '') {
    const modal = document.getElementById('detailModal');
    document.getElementById('detailProductName').textContent = name;
    document.getElementById('detailProductCode').textContent = code;
    
    // Set data produk berdasarkan nama
    if (name.includes('M1UF45')) {
        document.getElementById('detailRank').textContent = 'Major 1';
        document.getElementById('detailItems').textContent = '440+';
    } else if (name.includes('M1UF55')) {
        document.getElementById('detailRank').textContent = 'Major 1';
        document.getElementById('detailItems').textContent = '450+';
    } else if (name.includes('B1UF160')) {
        document.getElementById('detailRank').textContent = 'Bintang 1';
        document.getElementById('detailItems').textContent = '630+';
    } else if (name.includes('M1UF190')) {
        document.getElementById('detailRank').textContent = 'Major 1';
        document.getElementById('detailItems').textContent = '550+';
    } else if (name.includes('M1UF220')) {
        document.getElementById('detailRank').textContent = 'Major 1';
        document.getElementById('detailItems').textContent = '620+';
    } else if (name.includes('M1UF65')) {
        document.getElementById('detailRank').textContent = 'Major 1';
        document.getElementById('detailItems').textContent = '550+';
    }
    
    // Update link Google Drive
    const driveLinkElement = document.getElementById('driveLink');
    if (driveLink) {
        driveLinkElement.href = driveLink;
        driveLinkElement.style.display = 'block';
        document.querySelector('#tab3 p').style.display = 'block';
    } else {
        driveLinkElement.style.display = 'none';
        document.querySelector('#tab3 p').style.display = 'none';
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
}

function showGBModal(service) {
    const modal = document.getElementById('gbModal');
    document.getElementById('gbServiceName').textContent = service;

    const whatsappLink = document.getElementById('gbWhatsAppLink');
    const message = `Halo, saya ingin pesan jasa ${encodeURIComponent(service)}. Mohon info list harga lengkap dan detailnya.`;
    whatsappLink.href = `https://wa.me/6285117631802?text=${message}`;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('paymentModal').classList.add('hidden');
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.add('hidden');
}

function closeGBModal() {
    document.getElementById('gbModal').classList.add('hidden');
}

// Show more products
function showMoreProducts() {
    const moreProducts = document.getElementById('moreProducts');
    const button = event.currentTarget;
    
    if (moreProducts.classList.contains('hidden')) {
        moreProducts.classList.remove('hidden');
        button.innerHTML = '<i class="bi bi-arrow-up-circle mr-2"></i> Sembunyikan';
    } else {
        moreProducts.classList.add('hidden');
        button.innerHTML = '<i class="bi bi-arrow-down-circle mr-2"></i> Lihat Lebih Banyak Akun';
    }
}

// Show more testimonials
function showMoreTestimonials() {
    const moreTestimonials = document.getElementById('moreTestimonials');
    const button = event.currentTarget;
    
    if (moreTestimonials.classList.contains('hidden')) {
        moreTestimonials.classList.remove('hidden');
        button.innerHTML = '<i class="bi bi-arrow-up-circle mr-2"></i> Sembunyikan';
    } else {
        moreTestimonials.classList.add('hidden');
        button.innerHTML = '<i class="bi bi-arrow-down-circle mr-2"></i> Lihat Lebih Banyak Testimoni';
    }
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

// Hide loading screen when page is loaded
window.addEventListener('load', function() {
    document.getElementById('loadingScreen').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    function setupSubmenuToggle(buttonId, menuId, iconId) {
        const button = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);
        const icon = document.getElementById(iconId);
        
        if (button && menu && icon) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                menu.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
            });
        }
    }

    setupSubmenuToggle('gbSubmenuButton', 'gbSubmenu', 'gbChevron');

    document.querySelectorAll('[onclick^="toggleSubMenu"]').forEach(element => {
        element.removeAttribute('onclick');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            if (!event.target.closest('#navbar') && !event.target.closest('#mobileMenu')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Payment Modal Functions
let paymentTimer;
let secondsLeft = 300; // 5 minutes in seconds

function showPaymentModal(productName, price, productCode) {
    document.getElementById('productName').textContent = productName;
    document.getElementById('productCode').textContent = productCode;
    document.getElementById('productPrice').textContent = formatPrice(price);
    document.getElementById('totalPrice').textContent = formatPrice(price);
    document.getElementById('qrisTotalPrice').textContent = formatPrice(price);

    document.getElementById('paymentFormStep').classList.remove('hidden');
    document.getElementById('qrisPaymentStep').classList.add('hidden');
    document.getElementById('paymentExpiredStep').classList.add('hidden');

    document.getElementById('paymentForm').reset();

    document.getElementById('paymentModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    clearInterval(paymentTimer);
    document.getElementById('paymentModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function formatPrice(price) {
    return 'Rp ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function startPaymentTimer() {
    clearInterval(paymentTimer);
    secondsLeft = 300; // Reset to 5 minutes
    
    paymentTimer = setInterval(function() {
        secondsLeft--;
        
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        
        document.getElementById('paymentCountdown').textContent = 
            (minutes < 10 ? '0' : '') + minutes + ':' + 
            (seconds < 10 ? '0' : '') + seconds;
            
        if (secondsLeft <= 0) {
            clearInterval(paymentTimer);
            document.getElementById('qrisPaymentStep').classList.add('hidden');
            document.getElementById('paymentExpiredStep').classList.remove('hidden');
        }
    }, 1000);
}

function backToPaymentForm() {
    clearInterval(paymentTimer);
    document.getElementById('paymentFormStep').classList.remove('hidden');
    document.getElementById('qrisPaymentStep').classList.add('hidden');
}

function restartPayment() {
    document.getElementById('paymentExpiredStep').classList.add('hidden');
    document.getElementById('paymentFormStep').classList.remove('hidden');
}

function checkPaymentStatus() {
    alert('Pembayaran berhasil! Kami akan segera memproses pesanan Anda.');
    closeModal();
}

// Handle form submission
document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    if (paymentMethod === 'qris') {
        document.getElementById('paymentFormStep').classList.add('hidden');
        document.getElementById('qrisPaymentStep').classList.remove('hidden');

        startPaymentTimer();
    } else {
        // Semua pembayaran sementara dialihkan ke QRIS karna lebih mudah
        document.getElementById('paymentFormStep').classList.add('hidden');
        document.getElementById('qrisPaymentStep').classList.remove('hidden');

        startPaymentTimer();

        // For other payment methods, proceed as before
        // const productName = document.getElementById('productName').textContent;
        // const productCode = document.getElementById('productCode').textContent;
        // const totalPrice = document.getElementById('totalPrice').textContent;
        // const customerName = document.getElementById('customerName').value;
        // const whatsappNumber = document.getElementById('whatsappNumber').value;
        
        // Construct WhatsApp message
        // let message = `Halo UNSTOREPB, saya ingin membeli:\n\n`;
        // message += `Produk: ${productName}\n`;
        // message += `Kode: ${productCode}\n`;
        // message += `Total: ${totalPrice}\n`;
        // message += `Metode Pembayaran: ${document.getElementById('paymentMethod').options[document.getElementById('paymentMethod').selectedIndex].text}\n\n`;
        // message += `Nama: ${customerName}\n`;
        // message += `WhatsApp: ${whatsappNumber}\n\n`;
        // message += `Saya sudah melakukan pembayaran.`;
        
        // Encode message for URL
        // const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp
        // window.open(`https://wa.me/6281318260993?text=${encodedMessage}`, '_blank');
        
        // closeModal();
    }
});

function checkPaymentStatus() {

    document.getElementById('qrisPaymentStep').classList.add('hidden');
    document.getElementById('paymentSuccessStep').classList.remove('hidden');

    clearInterval(paymentTimer);

    const whatsappNumber = document.getElementById('whatsappNumber').value;
    const productName = document.getElementById('productName').textContent;
    const productCode = document.getElementById('productCode').textContent;
    
    console.log('Payment successful for:', {
        whatsappNumber,
        productName,
        productCode
    });
}

function restartPayment() {
    document.getElementById('paymentExpiredStep').classList.add('hidden');
    document.getElementById('paymentSuccessStep').classList.add('hidden');
    document.getElementById('paymentFormStep').classList.remove('hidden');
}

function showPaymentModal(productName, price, productCode) {
    document.getElementById('productName').textContent = productName;
    document.getElementById('productCode').textContent = productCode;
    document.getElementById('productPrice').textContent = formatPrice(price);
    document.getElementById('totalPrice').textContent = formatPrice(price);
    document.getElementById('qrisTotalPrice').textContent = formatPrice(price);
    
    document.getElementById('paymentFormStep').classList.remove('hidden');
    document.getElementById('qrisPaymentStep').classList.add('hidden');
    document.getElementById('paymentExpiredStep').classList.add('hidden');
    document.getElementById('paymentSuccessStep').classList.add('hidden');
    
    document.getElementById('paymentForm').reset();

    document.getElementById('paymentModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}