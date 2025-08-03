import{m as y}from"./assets/scroll-Dmsiuntb.js";import"./assets/header-DLs29yVk.js";import{a as g}from"./assets/vendor-DOPN71bB.js";const v="31537460e1a179eb456191c366c87865",u="https://api.themoviedb.org/3",w="https://image.tmdb.org/t/p/",m=document.getElementById("weekly-trends"),k=`<svg class="icon" id="stars-empty" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,S=`<svg class="icon" id="stars-half" fill="#F87719"  width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,L=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;function $(t){const s=t/2,e=Math.floor(s),n=s%1>=.5;let i="";i+=L.repeat(e),n&&(i+=S);const r=5-e-(n?1:0);return i+=k.repeat(r),`<div class="movie-rating">${i}</div>`}async function b(){try{const[t,s]=await Promise.all([g.get(`${u}/trending/movie/week?api_key=${v}`),g.get(`${u}/genre/movie/list?api_key=${v}&language=en-US`)]),e=new Map(s.data.genres.map(n=>[n.id,n.name]));x(t.data.results.slice(0,3),e)}catch(t){console.error("Veri alınırken hata:",t),m.innerHTML="<p>Filmler yüklenirken hata oluştu. Lütfen tekrar deneyin.</p>"}}function x(t,s){m.innerHTML=t.map(e=>{const n=e.genre_ids.map(l=>s.get(l)).filter(Boolean).slice(0,2).join(", "),i=e.release_date?e.release_date.substring(0,4):"Tarih Yok",r=n?`${n} || ${i}`:i,o=$(e.vote_average);return`
    <div class="movie-card" data-id="${e.id}">
      <img class="movie-poster" 
           src="${e.poster_path?w+"w500"+e.poster_path:"https://via.placeholder.com/300x450?text=Poster+Yok"}" 
           alt="${e.title}"
           onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Hatası'">
      <div class="movie-info">
       <div class="title-date">
       <h3 class="movie-title">${e.title}</h3>
       <p class="movie-date">${r}</p>
       </div>
       ${o}
      </div>
    </div>
    `}).join(""),M()}function M(){const t=m,s=document.querySelectorAll(".movie-card");if(!s.length)return;t.classList.add("responsive-slider");let e=0,n;const i=s.length,r=s[0].offsetWidth,o=parseInt(window.getComputedStyle(s[0]).marginRight)||0,l=r+o;function d(a){e=(a+i)%i,t.scrollTo({left:e*l,behavior:"smooth"})}function c(){window.innerWidth<=768&&(clearInterval(n),n=setInterval(()=>{d(e+1)},5e3))}c(),window.addEventListener("resize",c);let h=0,p=0;t.addEventListener("touchstart",a=>{clearInterval(n),h=a.changedTouches[0].screenX},{passive:!0}),t.addEventListener("touchend",a=>{p=a.changedTouches[0].screenX,f(),c()},{passive:!0});function f(){p<h-50&&d(e+1),p>h+50&&d(e-1)}}const _=`
  <style>
    /* Mevcut stillerinizi bozmadan sadece slider için ekstra stiller */
    .weekly-trends.responsive-slider {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .weekly-trends.responsive-slider::-webkit-scrollbar {
      display: none;
    }
    .weekly-trends.responsive-slider .movie-card {
      flex: 0 0 auto;
      scroll-snap-align: start;
    }
    
    /* Mobil için özel stil (768px ve altı) */
    @media (max-width: 768px) {
      .weekly-trends.responsive-slider .movie-card {
        width: 85%;
        margin-right: 16px;
      }
    }
  </style>
`;document.head.insertAdjacentHTML("beforeend",_);document.addEventListener("DOMContentLoaded",b);const E=document.querySelector(".movie-grid");E.addEventListener("click",async t=>{if(t.target.nodeName==="IMG"){const s=t.target.parentElement.dataset.id;try{const e=await g.get(`https://api.themoviedb.org/3/movie/${Number(s)}?api_key=${v}&language=en-US`);y(e.data)}catch(e){console.log(e)}}});
//# sourceMappingURL=index.js.map
