/* CSS Variables for easy theme management */
:root {
    --primary-color: #ff6347; /* Tomato */
    --primary-color-darker: #e5533d;
    
    /* Light Mode Palette */
    --secondary-color: #333333;
    --background-color: #f8f9fa;
    --text-color: #555555;
    --text-color-light: #777777;
    --card-bg: #ffffff;
    --border-color: #eeeeee;
    --footer-bg: #222222;
    --footer-bottom-bg: #1a1a1a;

    --font-family: 'Poppins', sans-serif;
    --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    --border-radius: 15px;
}

body.dark-mode {
    /* Dark Mode Palette */
    --secondary-color: #f0f0f0;
    --background-color: #1a1a1a;
    --text-color: #b0b0b0;
    --text-color-light: #888888;
    --card-bg: #2a2a2a;
    --border-color: #444444;
    --footer-bg: #222222;
    --footer-bottom-bg: #1a1a1a;
    
    --shadow: 0 4px 25px rgba(0, 0, 0, 0.2);
}


/* General Styling */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
}

/* Header and Navbar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5%;
    background-color: var(--card-bg);
    box-shadow: var(--shadow);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.logo {
    font-size: 1.7rem;
    font-weight: 700;
    color: var(--primary-color);
    text-decoration: none;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-item a {
    color: var(--secondary-color);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    position: relative;
    padding-bottom: 5px;
}

.nav-item a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
}

.nav-item a:hover::after {
    width: 100%;
}

.nav-icons {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.theme-switcher {
    cursor: pointer;
    font-size: 1.5rem;
    color: var(--secondary-color);
    transition: color 0.3s ease;
}

.cart-icon-container {
    position: relative;
    cursor: pointer;
}

.cart-icon-container i {
    font-size: 1.5rem;
    color: var(--secondary-color);
    transition: color 0.3s ease;
}

.cart-count {
    position: absolute;
    top: -8px;
    right: -12px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.75rem;
    font-weight: bold;
    border: 2px solid var(--card-bg);
    transition: border-color 0.3s ease;
}

.hamburger {
    display: none;
    cursor: pointer;
}

.bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    background-color: var(--secondary-color);
    transition: all 0.3s ease-in-out;
}

/* =================================== */
/* ======= CAROUSEL HERO STYLES ====== */
/* =================================== */
.hero-carousel {
    width: 100%;
    height: 90vh;
    max-height: 700px;
    position: relative;
    overflow: hidden;
}

.carousel-container {
    width: 100%;
    height: 100%;
    position: relative;
}

.carousel-slides {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease-in-out;
}

.carousel-slide {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
}

.carousel-slide::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 1;
}

.carousel-slide .hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
}

.carousel-slide h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    margin-bottom: 1rem;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.7);
}

.carousel-slide p {
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    margin-bottom: 2rem;
}

.carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
}

.carousel-btn:hover {
    background-color: rgba(255, 255, 255, 0.4);
}

.carousel-btn.prev { left: 20px; }
.carousel-btn.next { right: 20px; }

.carousel-dots {
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: 10px;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.dot.active { background-color: white; }

/* Buttons */
.btn-primary {
    background-color: var(--primary-color);
    color: white;
    padding: 0.8rem 2.5rem;
    border: none;
    border-radius: 50px;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
}
.btn-primary:hover {
    background-color: var(--primary-color-darker);
    transform: translateY(-3px);
}

/* Products Section */
.products {
    padding: 6rem 5%;
}

.section-title {
    text-align: center;
    font-size: 2.8rem;
    color: var(--secondary-color);
    margin-bottom: 3.5rem;
    position: relative;
    transition: color 0.3s ease;
}

.section-title::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: var(--primary-color);
    margin: 10px auto 0;
    border-radius: 2px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.product-card {
    background-color: var(--card-bg);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.product-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

body.dark-mode .product-card:hover {
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}

.product-image img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
}

.product-info {
    padding: 1.5rem;
    text-align: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.product-info h3 {
    margin-bottom: 0.5rem;
    color: var(--secondary-color);
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.price {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.btn-add-to-cart {
    background-color: var(--secondary-color);
    color: var(--background-color);
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease, color 0.3s ease;
    width: 100%;
}

.btn-add-to-cart i {
    margin-right: 8px;
}

.btn-add-to-cart:hover {
    background-color: #555;
}

body.dark-mode .btn-add-to-cart:hover {
    background-color: #f5f5f5;
    color: #333;
}


/* Promo Section */
.promo-section {
    padding: 4rem 5%;
    background-color: var(--card-bg);
    transition: background-color 0.3s ease;
}

.promo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
}

.promo-card {
    background: var(--background-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.promo-card:hover {
    transform: scale(1.03);
}

.promo-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.promo-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.promo-content h3 {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.promo-content p {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    flex-grow: 1;
}

.promo-price {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.new-price {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--secondary-color);
    transition: color 0.3s ease;
}

.old-price {
    font-size: 1.1rem;
    color: var(--text-color-light);
    text-decoration: line-through;
    transition: color 0.3s ease;
}

.btn-promo {
    background-color: var(--primary-color);
    color: white;
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
    align-self: flex-start;
    transition: background-color 0.3s ease;
}

.btn-promo:hover {
    background-color: var(--primary-color-darker);
}

/* Footer */
footer {
    background-color: var(--footer-bg);
    color: #ccc;
    padding-top: 3rem;
}

.footer-content {
    text-align: center;
    padding: 0 5%;
}

.footer-content h3 {
    font-size: 2rem;
    font-weight: 500;
    color: white;
    margin-bottom: 1rem;
}

.footer-content p {
    max-width: 500px;
    margin: 0 auto 1.5rem auto;
    line-height: 1.8;
}

.socials {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.socials a {
    text-decoration: none;
    color: white;
    border: 1px solid #555;
    padding: 0.5rem;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.socials a:hover {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.footer-bottom {
    background-color: var(--footer-bottom-bg);
    padding: 1rem 0;
    text-align: center;
    font-size: 0.9rem;
}

/* Modals General Styling */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s, opacity 0.3s;
    backdrop-filter: blur(5px);
}

.modal-overlay.show {
    visibility: visible;
    opacity: 1;
}

.modal-base {
    background-color: var(--card-bg);
    transition: background-color 0.3s, transform 0.3s ease;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    transition: border-color 0.3s ease;
}

.modal-header h2 {
    font-size: 1.5rem;
    color: var(--secondary-color);
    transition: color 0.3s ease;
}

.close-btn {
    background: none;
    border: none;
    font-size: 2.5rem;
    cursor: pointer;
    color: #aaa;
    line-height: 1;
    transition: color 0.3s ease;
}
.close-btn:hover { color: var(--primary-color); }


/* Cart Modal */
.cart-modal-overlay {
    z-index: 1001;
    justify-content: flex-end;
}

.cart-modal {
    width: 100%;
    max-width: 450px;
    height: 100%;
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
}

.cart-modal-overlay.show .cart-modal {
    transform: translateX(0);
}

.cart-body {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem;
}

.cart-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
    transition: border-color 0.3s ease;
}

.cart-item-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
}

.cart-item-info h4 {
    font-size: 1rem;
    color: var(--secondary-color);
    margin-bottom: 5px;
    transition: color 0.3s ease;
}

.cart-item-price {
    font-size: 0.9rem;
    color: var(--text-color);
}

.cart-item-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.quantity-btn {
    background: var(--border-color);
    border: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
    font-weight: bold;
    color: var(--secondary-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}

.remove-item-btn {
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    margin-left: auto;
    font-size: 1.2rem;
}

.cart-empty-msg {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--text-color-light);
}

.cart-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--border-color);
    transition: border-color 0.3s ease;
}

.cart-total {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--secondary-color);
}

.btn-checkout {
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 50px;
    background-color: var(--primary-color);
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-checkout:hover {
    background-color: var(--primary-color-darker);
}

/* Checkout & Terms Modals */
.checkout-modal-overlay, .terms-modal-overlay {
    z-index: 1002;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.checkout-modal, .terms-modal {
    width: 100%;
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    box-shadow: var(--shadow);
    transform: scale(0.9);
}
.checkout-modal { max-width: 600px; }
.terms-modal { max-width: 550px; }


.checkout-modal-overlay.show .checkout-modal,
.terms-modal-overlay.show .terms-modal {
    transform: scale(1);
}

.checkout-body, .terms-body {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1.5rem;
}

.order-summary h3, .customer-details h3, .terms-body h3 {
    font-size: 1.2rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 0.5rem;
    display: inline-block;
    transition: color 0.3s ease;
}

.summary-total {
    border-top: 1px solid var(--border-color);
    transition: border-color 0.3s ease;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--secondary-color);
    transition: color 0.3s ease;
}

.form-group input, .form-group textarea, .form-group select {
    width: 100%;
    padding: 0.7rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.checkout-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--border-color);
    transition: border-color 0.3s ease;
}

.btn-place-order {
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 50px;
    background-color: var(--primary-color);
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-place-order:hover {
    background-color: var(--primary-color-darker);
}

.terms-body { line-height: 1.7; }
.terms-body h3 { color: var(--primary-color); }
.terms-body ul { margin-left: 20px; margin-bottom: 1rem; }
.terms-body ul li { margin-bottom: 0.5rem; }

/* Responsive Design */
@media (max-width: 768px) {
    .hero-carousel { height: 80vh; }
    .carousel-slide h1 { font-size: 2.5rem; }
    .carousel-slide p { font-size: 1rem; }
    .carousel-btn { width: 40px; height: 40px; font-size: 1rem; }

    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px; /* Adjust to navbar height */
        flex-direction: column;
        background-color: var(--card-bg);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        gap: 0;
    }

    .nav-menu.active { left: 0; }
    .nav-item { width: 100%; }
    .nav-item a { display: block; padding: 1.5rem 0; border-bottom: 1px solid var(--border-color); }
    .nav-item a:hover::after { width: 0; }
    .hamburger { display: block; }
    .hamburger.active .bar:nth-child(2) { opacity: 0; }
    .hamburger.active .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .hamburger.active .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
    .checkout-modal, .terms-modal { max-width: 95%; }
}

@media (max-width: 480px) {
    .promo-grid { grid-template-columns: 1fr; }
    .cart-modal { max-width: 95%; }
}