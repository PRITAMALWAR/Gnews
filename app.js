const API_KEY = '669b03f7c8d82047ee519be4ada22824aa';

window.addEventListener('load', () => fetchNews('https://gnews.io/api/v4/search?q=India&lang=en&country=us&max=9&apikey=' + API_KEY));

async function fetchNews(url) {
    const loader = document.getElementById('news-preloader');
    loader.style.display = 'flex';

    try {
        const res = await fetch(url);
        const data = await res.json();
        loader.style.display = 'none';
        bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        loader.style.display = 'none';
    }
}

function showLoader() {
    document.getElementById('news-preloader').style.display = 'flex';
}

function hideLoader() {
    document.getElementById('news-preloader').style.display = 'none';
}


function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        const card = document.getElementById('template-news-card').content.cloneNode(true);
        card.querySelector('#news-img').src = article.image;
        card.querySelector('#news-title').textContent = article.title;
        card.querySelector('#news-desc').textContent = article.description;
        card.querySelector('#news-source').textContent = article.source.name;
        
        card.querySelector('.news-card').addEventListener('click', () => window.open(article.url, '_blank'));

        cardsContainer.appendChild(card);
    });
}

const searchButton = document.getElementById('search-btn');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => performSearch());
searchText.addEventListener('keydown', event => {
    if (event.key === 'Enter') performSearch();
});

function performSearch() {
    const query = searchText.value;
    if (query) {
        fetchNews('https://gnews.io/api/v4/search?q=' + query + '&lang=en&country=us&max=9&apikey=' + API_KEY);
    }
}

function onNavItemClick(category) {
    fetchNews('https://gnews.io/api/v4/search?q=' + category + '&lang=en&country=us&max=9&apikey=' + API_KEY);
}
