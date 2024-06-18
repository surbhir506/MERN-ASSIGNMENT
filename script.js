document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const cardsContainer = document.getElementById('cards-container');

    // Fetch and display random initial data
    fetchData('');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        fetchData(query);
    });

    function fetchData(query) {
        const apiUrl = query ? `https://dummyjson.com/products/search?q=${query}` : 'https://dummyjson.com/products';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const products = query ? data.products : data.products.slice(0, 20);
                displayCards(products);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function displayCards(products) {
        cardsContainer.innerHTML = ''; // Clear previous cards
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';

            const cardImage = document.createElement('img');
            cardImage.src = product.thumbnail;
            card.appendChild(cardImage);

            const cardTitle = document.createElement('h2');
            cardTitle.textContent = product.title;
            card.appendChild(cardTitle);

            const cardDescription = document.createElement('p');
            cardDescription.textContent = product.description;
            card.appendChild(cardDescription);

            const cardPrice = document.createElement('p');
            cardPrice.textContent = `Price: $${product.price}`;
            card.appendChild(cardPrice);

            cardsContainer.appendChild(card);
        });
    }
});
