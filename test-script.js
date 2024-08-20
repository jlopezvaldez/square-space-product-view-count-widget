(function() {
    // Function to generate a random number between 75 and 500
    function getRandomNumber() {
        return Math.floor(Math.random() * (500 - 75 + 1)) + 75;
    }

    // Function to get or set view count for a product
    function getViewCount(productId) {
        let viewCounts = JSON.parse(localStorage.getItem('productViewCounts')) || {};
        if (!viewCounts[productId]) {
            viewCounts[productId] = getRandomNumber();
            localStorage.setItem('productViewCounts', JSON.stringify(viewCounts));
        }
        return viewCounts[productId];
    }

    // Function to create and insert the views element
    function insertViews() {
        const priceElement = document.querySelector('.ProductItem-product-price');
        const productItemElement = document.querySelector('.ProductItem-additional');

        // Get the id from the product item element
        const productId = productItemElement.firstElementChild.id;

        const viewCount = getViewCount(productId);
        const viewsElement = document.createElement('span');
        viewsElement.innerHTML = '<span class="glowing-dot"></span>Views: ' + viewCount;
        viewsElement.className = 'views-count';
        
        // Insert the views element after the price element
        priceElement.appendChild(viewsElement);

    }

    // Create a style element and add it to the head
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
            from {
                box-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
            }
            to {
                box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
            }
        }
    `;
    document.head.appendChild(style);

    // Run the insertion function when the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertViews);
    } else {
        insertViews();
    }
})();
