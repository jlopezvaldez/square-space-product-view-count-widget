(function() {
    // Function to generate a random number between 75 and 500
    function getRandomNumber() {
        return Math.floor(Math.random() * (500 - 75 + 1)) + 75;
    }

    // Function to create and insert the random number element
    function insertRandomNumber() {
        const priceElements = document.querySelectorAll('.ProductItem-product-price');
        
        priceElements.forEach(priceElement => {
            const randomNumber = getRandomNumber();
            const randomNumberElement = document.createElement('span');
            randomNumberElement.textContent = randomNumber;
            randomNumberElement.className = 'random-number';
            
            // Insert the random number after the price element
            priceElement.appendChild(randomNumberElement);
        });
    }

    // Create a style element and add it to the head
    const style = document.createElement('style');
    style.textContent = `
        .random-number {
            display: inline-block;
            margin-left: 10px;
            font-size: 0.9em;
            color: #666;
            opacity: 0;
            transform: translateY(10px);
            animation: fadeInUp 0.5s ease forwards;
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Run the insertion function when the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertRandomNumber);
    } else {
        insertRandomNumber();
    }
})();