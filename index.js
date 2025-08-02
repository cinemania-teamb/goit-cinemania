import{m as p}from"./assets/hero-BNAtimJG.js";import"./assets/header-DLs29yVk.js";import{a as o}from"./assets/vendor-DOPN71bB.js";const r="31537460e1a179eb456191c366c87865",l="https://api.themoviedb.org/3",g="https://image.tmdb.org/t/p/",c=document.getElementById("weekly-trends"),m=`<svg class="icon" id="stars-empty"width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,v=`<svg class="icon" id="stars-half" fill="#F87719" width="18" height="18">
        <defs>
        <clipPath id="half-clip">
          <rect x="0" y="0" width="12" height="24"/>
        </clipPath>
      </defs>
      <use href="#icon-star-half"/>
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,f=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;function u(t){const s=t/2,e=Math.floor(s),a=s%1>=.5;let n="";n+=f.repeat(e),a&&(n+=v);const i=5-e-(a?1:0);return n+=m.repeat(i),`<div class="movie-rating">${n}</div>`}async function y(){try{const[t,s]=await Promise.all([o.get(`${l}/trending/movie/week?api_key=${r}`),o.get(`${l}/genre/movie/list?api_key=${r}&language=en-US`)]),e=new Map(s.data.genres.map(a=>[a.id,a.name]));w(t.data.results.slice(0,3),e)}catch(t){console.error("Veri alınırken hata:",t),c.innerHTML="<p>Filmler yüklenirken hata oluştu. Lütfen tekrar deneyin.</p>"}}function w(t,s){c.innerHTML=t.map(e=>{const a=e.genre_ids.map(h=>s.get(h)).filter(Boolean).slice(0,2).join(", "),n=e.release_date?e.release_date.substring(0,4):"Tarih Yok",i=a?`${a} || ${n}`:n,d=u(e.vote_average);return`
    <div class="movie-card" data-id="${e.id}">
      <img class="movie-poster" 
           src="${e.poster_path?g+"w500"+e.poster_path:"https://via.placeholder.com/300x450?text=Poster+Yok"}" 
           alt="${e.title}"
           onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Hatası'">
      <div class="movie-info">
       <div class="title-date">
       <h3 class="movie-title">${e.title}</h3>
       <p class="movie-date">${i}</p>
       </div>
       ${d}
      </div>
    </div>
    `}).join("")}document.addEventListener("DOMContentLoaded",y);const k=document.querySelector(".movie-grid");k.addEventListener("click",async t=>{if(t.target.nodeName==="IMG"){const s=t.target.parentElement.dataset.id;try{const e=await o.get(`https://api.themoviedb.org/3/movie/${Number(s)}?api_key=${r}&language=en-US`);p(e.data)}catch(e){console.log(e)}}});document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("scrollToTopBtn");window.addEventListener("scroll",()=>{window.pageYOffset>300?t.classList.add("visible"):t.classList.remove("visible")}),t.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});
//# sourceMappingURL=index.js.map
