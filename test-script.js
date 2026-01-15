(function() {
    // Only run on product pages
    if (!window.location.pathname.includes('/shop/p/')) return;

    function getRandomNumber() {
        return Math.floor(Math.random() * (500 - 75 + 1)) + 75;
    }

    function getViewCount(productId) {
        let viewCounts = JSON.parse(localStorage.getItem('productViewCounts')) || {};
        if (!viewCounts[productId]) {
            viewCounts[productId] = getRandomNumber();
            localStorage.setItem('productViewCounts', JSON.stringify(viewCounts));
        }
        return viewCounts[productId];
    }

    function insertViews() {
        // Don't inject twice
        if (document.querySelector('.views-count')) return;

        // Try multiple possible selectors for Squarespace price elements
        const priceElement = document.querySelector('.product-price') 
                          || document.querySelector('.ProductItem-product-price')
                          || document.querySelector('[data-product-price]')
                          || document.querySelector('.sqs-money-native');

        if (!priceElement) {
            // Retry if not found yet
            setTimeout(insertViews, 500);
            return;
        }

        // Get product ID from URL as fallback
        const productId = window.location.pathname.split('/').pop() || 'default';

        const viewCount = getViewCount(productId);
        const viewsElement = document.createElement('span');
        viewsElement.innerHTML = '<span class="glowing-dot"></span>Views: ' + viewCount;
        viewsElement.className = 'views-count';
        
        // Insert after the price element (as sibling, not child)
        priceElement.parentNode.insertBefore(viewsElement, priceElement.nextSibling);
    }

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .views-count {
            display: inline-flex;
            align-items: center;
            margin-left: 10px;
            font-size: 0.9em;
            color: #666;
            opacity: 0;
            transform: translateY(10px);
            animation: fadeInUp 0.5s ease forwards;
        }
        .glowing-dot {
            width: 8px;
            height: 8px;
            background-color: #00ff00;
            border-radius: 50%;
            margin-right: 5px;
            box-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
            animation: glow 1.5s ease-in-out infinite alternate;
        }
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes glow {
            from { box-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00; }
            to { box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00; }
        }
    `;
    document.head.appendChild(style);

    // Run with retry logic
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertViews);
    } else {
        insertViews();
    }

    // Handle Squarespace AJAX navigation
    window.addEventListener('mercury:load', insertViews);
})();
