const main = document.querySelector('main');

window.addEventListener('load', e =>{
    updateNews();

    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('SW registered successfully');
        } catch (error) {
            console.log("SW registration failed", error)
        }
    }
});

const updateNews = () =>{
    let newsArticle;
    var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=0d47ed5f1f194971bece566e8a901b94';
    fetch(url)
    .then(res => res.json())
    .then(res => {
        console.log(res.articles)
        newsArticle = res;
        main.innerHTML = newsArticle.articles.map(createArticle)
    })
    .catch(err => console.log(err));
}

const createArticle = (article) =>{
    if(article.title != null && article.urlToImage != null && article.description != null){
        return `
        <div class="article" >
            <a href=${article.url}>
            <h2>${article.title}</h2>
            <img src=${article.urlToImage} >
            <p>${article.description}</p>
            <p>${article.content}</p>
            </a>
        </div>
    `
    }
}