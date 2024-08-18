const API_KEY = "35a4179a4fd342e5b6bd8bf82a226dad";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("india"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
     bindData(data.articles);
}

     function bindData(articles){
          const cardcontainer= document.getElementById('card-container');
          const newscardtemplate=document.getElementById('templatecontainer');
          cardcontainer.innerHTML='';

          articles.forEach(article => {
               if(!article.urlToImage)return;
               const cardclone=newscardtemplate.content.cloneNode(true);
               filldataincard(cardclone,article);
               cardcontainer.appendChild(cardclone);
               
          });

     }


     function filldataincard(cardclone,article){
          const newsImg=cardclone.querySelector('#news-img');
          const newsTitle=cardclone.querySelector('#news-title');
          const newsSource=cardclone.querySelector('#news-source');
          const newsDesc=cardclone.querySelector('#news-desc');


          newsImg.src=article.urlToImage;
          newsTitle.innerHTML=article.title;
          newsDesc.innerHTML=article.description;
          const date=new Date(article.publishedAt).toLocaleString("en-us",{
               timeZone:"Asia/jakarta"
          })
          newsSource.innerHTML=`${article.source.name}.${date}`;

          cardclone.firstElementChild.addEventListener("click", () => {
               window.open(article.url, "_blank");
           });
           

     }

     let curselectnav=null;
    function onNaviteamclick(id){
               fetchNews(id);
               const navitem=document.getElementById(id);
               curselectnav?.classList.remove('active');
               curselectnav=navitem;
               curselectnav.classList.add('active');
    }

    const searchButton=document.getElementById("btn");
    const searchtext=document.getElementById("inputbar");

    searchButton.addEventListener("click",()=>{
     const query=inputbar.value;
     if(!query)return;
     fetchNews(query);
     
    })