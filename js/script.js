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
                        `*Kode Akun:* ${productCode}\n` +
                        `*Total Pembayaran:* ${totalPrice}\n` +
                        `*Metode Pembayaran:* ${document.getElementById('paymentMethod').options[document.getElementById('paymentMethod').selectedIndex].text}\n\n` +
                        `*Data Pembeli:*\n` +
                        `Nama: ${customerName}\n` +
                        `WhatsApp: ${whatsappNumber}\n\n` +
                        `Mohon kirimkan detail pembayaran dan nomor rekening untuk saya trasfer.`;
    
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
    document.getElementById('totalPrice').textContent = 'Rp ' + price.toLocaleString('id-ID');
    modal.classList.remove('hidden');
}

// Update fungsi showDetailModal
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
        document.querySelector('#tab1 p').style.display = 'block';
    } else {
        driveLinkElement.style.display = 'none';
        document.querySelector('#tab1 p').style.display = 'none';
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
    // Set WhatsApp link with pre-filled message
    const whatsappLink = document.getElementById('gbWhatsAppLink');
    const message = `Halo UNSTOREPB\n\n, saya ingin pesan jasa ${encodeURIComponent(service)}.\n\nMohon info syarat & ketentuan gb dan daftar harganya.`;
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

// Hide loading screen when page is loaded
window.addEventListener('load', function() {
    document.getElementById('loadingScreen').style.display = 'none';
});

// Show WhatsApp popup after 5 seconds
setTimeout(function() {
        // Check if user has already seen the popup today
        if (!localStorage.getItem('whatsappPopupShown') || 
            localStorage.getItem('whatsappPopupShown') !== new Date().toDateString()) {
            
            document.getElementById('whatsappPopup').style.display = 'block';
            localStorage.setItem('whatsappPopupShown', new Date().toDateString());
        }
    }, 5000);

    // Close WhatsApp popup
    function closeWhatsappPopup() {
        document.getElementById('whatsappPopup').style.display = 'none';
    }

// Set calculator type (account or clan)
function setCalculatorType(type) {
    if (type === 'account') {
        document.getElementById('calcTypeAccount').classList.add('bg-blue-600', 'text-white');
        document.getElementById('calcTypeAccount').classList.remove('bg-gray-200', 'text-gray-800');
        document.getElementById('calcTypeClan').classList.add('bg-gray-200', 'text-gray-800');
        document.getElementById('calcTypeClan').classList.remove('bg-blue-600', 'text-white');
        document.getElementById('accountCalculator').classList.remove('hidden');
        document.getElementById('clanCalculator').classList.add('hidden');
    } else {
        document.getElementById('calcTypeClan').classList.add('bg-blue-600', 'text-white');
        document.getElementById('calcTypeClan').classList.remove('bg-gray-200', 'text-gray-800');
        document.getElementById('calcTypeAccount').classList.add('bg-gray-200', 'text-gray-800');
        document.getElementById('calcTypeAccount').classList.remove('bg-blue-600', 'text-white');
        document.getElementById('clanCalculator').classList.remove('hidden');
        document.getElementById('accountCalculator').classList.add('hidden');
    }
    document.getElementById('result').classList.add('hidden');
}

// Calculate EXP needed
function calculateExp() {
    const isAccountCalc = !document.getElementById('accountCalculator').classList.contains('hidden');
    
    if (isAccountCalc) {
        const currentRank = parseInt(document.getElementById('currentRank').value);
        const targetRank = parseInt(document.getElementById('targetRank').value);
        const currentExp = parseInt(document.getElementById('currentExp').value) || currentRank;
        
        if (targetRank <= currentRank) {
            alert('Target pangkat harus lebih tinggi dari pangkat saat ini');
            return;
        }
        
        const expNeeded = targetRank - currentExp;
        const expPercentage = Math.round((currentExp / targetRank) * 100);
        const expPoints = Math.round(expNeeded * 0.1); // Assuming 0.1 point per EXP
        
        // Estimate price (15,000 IDR per 1JT EXP)
        const priceEstimate = Math.ceil(expNeeded / 1000000 * 15000);
        
        document.getElementById('expNeeded').textContent = formatNumber(expNeeded) + ' EXP';
        document.getElementById('expPercentage').textContent = expPercentage + '%';
        document.getElementById('expPoints').textContent = formatNumber(expPoints) + ' Point';
        document.getElementById('priceEstimate').textContent = 'Rp ' + formatNumber(priceEstimate);
    } else {
        const currentRank = parseInt(document.getElementById('currentClanRank').value);
        const targetRank = parseInt(document.getElementById('targetClanRank').value);
        const currentExp = parseInt(document.getElementById('currentClanExp').value) || currentRank;
        
        if (targetRank <= currentRank) {
            alert('Target pangkat clan harus lebih tinggi dari pangkat clan saat ini');
            return;
        }
        
        const expNeeded = targetRank - currentExp;
        const expPercentage = Math.round((currentExp / targetRank) * 100);
        // const expPoints = Math.round(expNeeded * 0.05); // Assuming 0.05 point per EXP for clan
        
        // Estimate price (60,000 IDR per 5JT EXP for clan)
        const priceEstimate = Math.ceil(expNeeded / 5000000 * 60000);
        
        document.getElementById('expNeeded').textContent = formatNumber(expNeeded) + ' EXP';
        document.getElementById('expPercentage').textContent = expPercentage + '%';
        // document.getElementById('expPoints').textContent = formatNumber(expPoints) + ' Point';
        document.getElementById('priceEstimate').textContent = 'Rp ' + formatNumber(priceEstimate);
    }
    
    document.getElementById('result').classList.remove('hidden');
}

// Reset calculator
function resetCalculator() {
    document.getElementById('result').classList.add('hidden');
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}