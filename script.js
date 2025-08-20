document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen DOM ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    const cartCountElement = document.querySelector('.cart-count');
    const cartIcon = document.querySelector('.cart-icon-container');
    const navbar = document.querySelector('.navbar'); 
    
    // Elemen Keranjang
    const cartModalOverlay = document.querySelector('.cart-modal-overlay');
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const cartBody = document.querySelector('.cart-body');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const checkoutBtn = document.querySelector('.btn-checkout');

    // Elemen Checkout
    const checkoutModalOverlay = document.querySelector('.checkout-modal-overlay');
    const closeCheckoutBtn = document.querySelector('.close-checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const summaryItemsContainer = document.getElementById('summary-items-container');
    const summaryTotalPriceEl = document.getElementById('summary-total-price');

    // --- Nomor WhatsApp ---
    // GANTI NOMOR DI BAWAH INI dengan nomor WhatsApp Anda (diawali dengan 62)
    const WHATSAPP_NUMBER = '6285775594663'; 


    // --- Data Keranjang ---
    let cart = JSON.parse(localStorage.getItem('lezatbites_cart')) || [];

    // --- Efek UI ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Fungsi ---

    const saveCart = () => {
        localStorage.setItem('lezatbites_cart', JSON.stringify(cart));
    };

    const renderCartItems = () => {
        cartBody.innerHTML = ''; 
        if (cart.length === 0) {
            cartBody.innerHTML = '<p class="cart-empty-msg">Keranjang Anda kosong.</p>';
            return;
        }

        cart.forEach(item => {
            const cartItemHTML = `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                        <div class="cart-item-controls">
                            <button class="quantity-btn decrease-qty">-</button>
                            <span class="item-quantity">${item.quantity}</span>
                            <button class="quantity-btn increase-qty">+</button>
                        </div>
                    </div>
                    <button class="remove-item-btn"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            cartBody.insertAdjacentHTML('beforeend', cartItemHTML);
        });
    };

    const updateCartTotals = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        cartCountElement.textContent = totalItems;
        cartTotalPriceEl.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    };

    const updateCart = () => {
        renderCartItems();
        updateCartTotals();
        saveCart();
    };

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    };
    
    const handleQuantityChange = (productId, change) => {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(cartItem => cartItem.id !== productId);
            }
            updateCart();
        }
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    };

    // --- Fungsi Modal ---
    const toggleCartModal = () => cartModalOverlay.classList.toggle('show');
    
    const openCheckoutModal = () => {
        summaryItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const summaryItemHTML = `
                <div class="summary-item">
                    <span class="summary-item-name">${item.name} (x${item.quantity})</span>
                    <span class="summary-item-price">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
            `;
            summaryItemsContainer.insertAdjacentHTML('beforeend', summaryItemHTML);
        });

        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        summaryTotalPriceEl.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;

        checkoutModalOverlay.classList.add('show');
    };
    
    const closeCheckoutModal = () => checkoutModalOverlay.classList.remove('show');


    // --- Event Listeners ---

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productData = e.target.closest('.btn-add-to-cart').dataset;
            const productImage = productCard.querySelector('.product-image img').src;

            const product = {
                id: productData.id,
                name: productData.name,
                price: parseInt(productData.price),
                image: productImage
            };
            addToCart(product);

            button.innerHTML = '<i class="fas fa-check"></i> Ditambahkan';
            button.classList.add('added'); 
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-cart-plus"></i> Tambah';
                button.classList.remove('added');
            }, 1500);
        });
    });

    cartIcon.addEventListener('click', toggleCartModal);
    closeCartBtn.addEventListener('click', toggleCartModal);
    cartModalOverlay.addEventListener('click', (e) => {
        if (e.target === cartModalOverlay) {
            toggleCartModal();
        }
    });

    cartBody.addEventListener('click', (e) => {
        const target = e.target;
        const cartItem = target.closest('.cart-item');
        if (!cartItem) return;

        const productId = cartItem.dataset.id;
        
        if (target.closest('.increase-qty')) {
            handleQuantityChange(productId, 1);
        }
        if (target.closest('.decrease-qty')) {
            handleQuantityChange(productId, -1);
        }
        if (target.closest('.remove-item-btn')) {
            removeFromCart(productId);
        }
    });
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            toggleCartModal();
            openCheckoutModal();
        } else {
            alert('Keranjang Anda kosong. Silakan tambahkan item terlebih dahulu.');
        }
    });

    closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    checkoutModalOverlay.addEventListener('click', (e) => {
        if (e.target === checkoutModalOverlay) {
            closeCheckoutModal();
        }
    });

    // =====================================================================
    // PROSES FORM CHECKOUT (BAGIAN YANG DIMODIFIKASI)
    // =====================================================================
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const customerName = document.getElementById('customer-name').value;
        const customerAddress = document.getElementById('customer-address').value;
        const paymentMethodEl = document.getElementById('payment-method');
        const paymentMethod = paymentMethodEl.options[paymentMethodEl.selectedIndex].text;

        if (customerName.trim() === '' || customerAddress.trim() === '') {
            alert('Mohon isi Nama dan Alamat Lengkap.');
            return;
        }

        // Format rincian pesanan untuk pesan WhatsApp
        const orderDetails = cart.map(item => {
            return `- ${item.name} (x${item.quantity}) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`;
        }).join('\n');

        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Buat template pesan
        const message = `
Halo LezatBites, saya ingin memesan:

*Nama:* ${customerName}
*Alamat Pengiriman:* ${customerAddress}
*Metode Pembayaran:* ${paymentMethod}

*Pesanan Saya:*
${orderDetails}

*TOTAL PESANAN: Rp ${totalPrice.toLocaleString('id-ID')}*

Terima kasih! Mohon segera diproses.
        `;

        // Encode pesan untuk URL dan buat link WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        // Buka WhatsApp di tab baru
        window.open(whatsappURL, '_blank');

        // Kosongkan keranjang setelah pesanan "dikirim"
        cart = []; 
        updateCart();

        // Tutup modal dan reset form
        closeCheckoutModal();
        checkoutForm.reset();
    });

    // --- Inisialisasi ---
    updateCart();
});