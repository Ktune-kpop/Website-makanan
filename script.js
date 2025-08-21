document.addEventListener('DOMContentLoaded', () => {
    // --- Carousel Logic ---
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (slidesContainer && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }
        const dots = document.querySelectorAll('.dot');

        function goToSlide(slideIndex) {
            if (slideIndex < 0) {
                slideIndex = totalSlides - 1;
            } else if (slideIndex >= totalSlides) {
                slideIndex = 0;
            }
            slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
            currentIndex = slideIndex;
            updateDots();
        }
        
        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoPlay();
        });

        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        goToSlide(0);
        startAutoPlay();
    }

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

    // Elemen Tombol Promo
    const claimPromoBtn = document.getElementById('claim-promo-btn');
    const viewTermsBtn = document.getElementById('view-terms-btn');
    
    // Elemen Modal Syarat & Ketentuan
    const termsModalOverlay = document.querySelector('.terms-modal-overlay');
    const closeTermsBtn = document.querySelector('.close-terms-btn');
    
    // --- Theme Switcher Elements (BARU) ---
    const themeSwitcher = document.querySelector('.theme-switcher');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const body = document.body;


    // --- Nomor WhatsApp ---
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
        if (cartTotalPriceEl) {
            cartTotalPriceEl.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
        }
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
    
    // --- Fungsi Tema (BARU) ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
        } else {
            body.classList.remove('dark-mode');
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
        }
    };

    const toggleTheme = () => {
        const currentTheme = localStorage.getItem('lezatbites_theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('lezatbites_theme', newTheme);
        applyTheme(newTheme);
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
    
    const openTermsModal = () => termsModalOverlay.classList.add('show');
    const closeTermsModal = () => termsModalOverlay.classList.remove('show');

    // --- Event Listeners ---
    if(themeSwitcher) {
        themeSwitcher.addEventListener('click', toggleTheme);
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const clickedButton = e.currentTarget;
            clickedButton.disabled = true;

            const productCard = clickedButton.closest('.product-card');
            const productData = clickedButton.dataset;
            const productImage = productCard.querySelector('.product-image img').src;

            const product = {
                id: productData.id,
                name: productData.name,
                price: parseInt(productData.price),
                image: productImage
            };
            addToCart(product);

            clickedButton.innerHTML = '<i class="fas fa-check"></i> Ditambahkan';
            clickedButton.classList.add('added');

            setTimeout(() => {
                clickedButton.innerHTML = '<i class="fas fa-cart-plus"></i> Tambah';
                clickedButton.classList.remove('added');
                clickedButton.disabled = false; 
            }, 1500);
        });
    });

    if (cartIcon) cartIcon.addEventListener('click', toggleCartModal);
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCartModal);
    if (cartModalOverlay) cartModalOverlay.addEventListener('click', (e) => {
        if (e.target === cartModalOverlay) {
            toggleCartModal();
        }
    });

    if (cartBody) cartBody.addEventListener('click', (e) => {
        const target = e.target;
        const cartItem = target.closest('.cart-item');
        if (!cartItem) return;

        const productId = cartItem.dataset.id;
        
        if (target.closest('.increase-qty')) handleQuantityChange(productId, 1);
        if (target.closest('.decrease-qty')) handleQuantityChange(productId, -1);
        if (target.closest('.remove-item-btn')) removeFromCart(productId);
    });
    
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            toggleCartModal();
            openCheckoutModal();
        } else {
            alert('Keranjang Anda kosong. Silakan tambahkan item terlebih dahulu.');
        }
    });

    if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    if (checkoutModalOverlay) checkoutModalOverlay.addEventListener('click', (e) => {
        if (e.target === checkoutModalOverlay) {
            closeCheckoutModal();
        }
    });

    if (checkoutForm) checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const customerName = document.getElementById('customer-name').value;
        const customerAddress = document.getElementById('customer-address').value;
        const paymentMethodEl = document.getElementById('payment-method');
        const paymentMethod = paymentMethodEl.options[paymentMethodEl.selectedIndex].text;

        if (customerName.trim() === '' || customerAddress.trim() === '') {
            alert('Mohon isi Nama dan Alamat Lengkap.');
            return;
        }

        const orderDetails = cart.map(item => {
            return `- ${item.name} (x${item.quantity}) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`;
        }).join('\n');

        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');

        cart = []; 
        updateCart();

        closeCheckoutModal();
        checkoutForm.reset();
    });
 
    if (claimPromoBtn) claimPromoBtn.addEventListener('click', () => {
        const promoPackage = {
            id: 'promo-hemat-berdua',
            name: 'Paket Hemat Berdua',
            price: 99000,
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop'
        };
        addToCart(promoPackage);
        claimPromoBtn.textContent = 'Promo Ditambahkan!';
        claimPromoBtn.style.backgroundColor = '#28a745';
        setTimeout(() => {
            claimPromoBtn.textContent = 'Klaim Promo';
            claimPromoBtn.style.backgroundColor = '';
        }, 2000);
    });

    if (viewTermsBtn) viewTermsBtn.addEventListener('click', openTermsModal);
    if (closeTermsBtn) closeTermsBtn.addEventListener('click', closeTermsModal);
    if (termsModalOverlay) termsModalOverlay.addEventListener('click', (e) => {
        if (e.target === termsModalOverlay) {
            closeTermsModal();
        }
    });

    // --- Inisialisasi ---
    const savedTheme = localStorage.getItem('lezatbites_theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
    updateCart();
});