
// DOM Elements
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('mainProductImage');
const colorOptions = document.querySelectorAll('.color-option');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const quantityInput = document.getElementById('quantity');
const decreaseBtn = document.getElementById('decreaseQty');
const increaseBtn = document.getElementById('increaseQty');
const addToCartBtn = document.getElementById('addToCartBtn');
const cartCount = document.querySelector('.cart-count');

// Initialize
let currentCart = parseInt(cartCount.textContent);

// Image Gallery Functionality
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        this.classList.add('active');
        
        // Change main image with smooth transition
        const newImageSrc = this.getAttribute('data-image');
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = newImageSrc;
            mainImage.style.opacity = '1';
        }, 150);
    });
});

// Color Selection
colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remove active class from all color options
        colorOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Add animation effect
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Tabs Functionality
tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        // Smooth scroll to tabs section
        document.querySelector('.product-tabs').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Quantity Controls
decreaseBtn.addEventListener('click', function() {
    let currentQty = parseInt(quantityInput.value);
    if (currentQty > 1) {
        quantityInput.value = currentQty - 1;
        animateQuantityChange();
    }
});

increaseBtn.addEventListener('click', function() {
    let currentQty = parseInt(quantityInput.value);
    if (currentQty < 5) {
        quantityInput.value = currentQty + 1;
        animateQuantityChange();
    }
});

// Quantity input validation
quantityInput.addEventListener('change', function() {
    let value = parseInt(this.value);
    if (value < 1) this.value = 1;
    if (value > 5) this.value = 5;
});

// Add to Cart Functionality
addToCartBtn.addEventListener('click', function() {
    const quantity = parseInt(quantityInput.value);
    currentCart += quantity;
    cartCount.textContent = currentCart;
    
    // Animation for button
    this.style.transform = 'scale(0.95)';
    this.textContent = 'در حال افزودن...';
    
    setTimeout(() => {
        this.style.transform = '';
        this.innerHTML = '<span>✓ افزودن شد</span>';
        this.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    }, 500);
    
    setTimeout(() => {
        this.innerHTML = '<span>افزودن به سبد خرید</span>';
        this.style.background = '';
    }, 2000);
    
    // Animate cart count
    animateCartCount();
    
    // Show success message
    showSuccessMessage();
});

// Helper Functions
function animateQuantityChange() {
    quantityInput.style.transform = 'scale(1.1)';
    quantityInput.style.background = '#667eea20';
    
    setTimeout(() => {
        quantityInput.style.transform = '';
        quantityInput.style.background = '';
    }, 200);
}

function animateCartCount() {
    cartCount.style.transform = 'scale(1.3)';
    cartCount.style.background = '#27ae60';
    
    setTimeout(() => {
        cartCount.style.transform = '';
        cartCount.style.background = '';
    }, 300);
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        ">
            <strong>✓ محصول با موفقیت به سبد خرید افزودن شد</strong>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.firstElementChild.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.firstElementChild.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Rating stars interaction
const ratingStars = document.querySelectorAll('.stars .star');
ratingStars.forEach((star, index) => {
    star.addEventListener('mouseenter', function() {
        // Highlight stars up to hovered one
        for (let i = 0; i <= index; i++) {
            ratingStars[i].style.color = '#ffd700';
            ratingStars[i].style.transform = 'scale(1.1)';
        }
    });
    
    star.addEventListener('mouseleave', function() {
        // Reset all stars
        ratingStars.forEach(s => {
            s.style.transform = '';
        });
    });
});

// Image zoom on hover (for desktop)
if (window.innerWidth > 768) {
    mainImage.addEventListener('mouseenter', function() {
        this.style.cursor = 'zoom-in';
    });
    
    mainImage.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        this.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        this.style.transform = 'scale(1.2)';
    });
    
    mainImage.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.cursor = '';
    });
}

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on page load
    const animatedElements = document.querySelectorAll('.product-images, .product-info');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Mobile menu toggle (if needed)
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.innerHTML = '☰';
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.style.cssText = `
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
`;

// Add mobile menu functionality for small screens
if (window.innerWidth <= 768) {
    const nav = document.querySelector('.nav');
    const headerContent = document.querySelector('.header-content');
    
    mobileMenuBtn.style.display = 'block';
    headerContent.insertBefore(mobileMenuBtn, nav);
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
    });
}

// Window resize handler
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('.nav').style.display = 'flex';
        mobileMenuBtn.style.display = 'none';
    } else {
        mobileMenuBtn.style.display = 'block';
    }
});

// Performance optimization - debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(function() {
        // Add any scroll-based animations here
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (scrolled > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }, 10);
});

console.log('صفحه محصول دیجی‌کالا با موفقیت بارگذاری شد!');
