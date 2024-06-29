document.addEventListener('DOMContentLoaded', async () => {
    const cardsContainer = document.querySelector('.cards');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        renderCards(posts);
    } catch (error) {
        console.log(error);
    }

    function renderCards(posts) {
        posts.forEach(post => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="../images/js_logo.png" alt="placeholder i mage">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `;
            cardsContainer.appendChild(card);
        });
    }
});

