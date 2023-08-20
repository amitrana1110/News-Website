const API_KEY = "f45a308292b4443ca2dbf9aab1bb796f";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("India"))

function reload() {
    window.location.reload();
}


async function fetchNews (query){
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    
    bindData(data.articles);
  
}


function bindData(articles){
    const cardsContaoner = document.getElementById('cards-container');
    const newsCardsTemplate = document.getElementById('template-news-card');


    cardsContaoner.innerHTML= '';

    articles.forEach(article =>{
        if(!article.urlToImage) return;
        const cardClone = newsCardsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContaoner.appendChild(cardClone);
    })

}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDescription = cardClone.querySelector('#news-discription');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescription.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}


let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});