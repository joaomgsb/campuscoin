const apiKey = '3162ddc4fd2d442bab241f8878462851';
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
    const response = await fetch(`https://newsapi.org/v2/everything?q=finance&apiKey=${apiKey}`);
    const data = await response.json();
    displayNews(data.articles);
}

// Formatar data para o padrão dd-mm-yyyy
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsArticle = document.createElement('div');
        newsArticle.classList.add('news-article');
        
        newsArticle.innerHTML = `<div class="news-card"><div class="title"><div class="icon"><img src="assets/img/News.png" alt=""></div><div class="text-title"><h3>${article.title}</h3></div></div><div class="description"><p>${article.description}</p></div><div class="publication"><div class="portal"><p>${article.author ? article.author + ', ' : ''}${article.source.name}</p></div><div class="date"><p>${formatDate(article.publishedAt)}</p></div></div><div class="action"><a href="${article.url}" target="_blank"><button>Ler mais <img src="assets/img/Arrow.png"></button></a></div></div>`;
        newsContainer.appendChild(newsArticle);
    });
}

fetchNews();