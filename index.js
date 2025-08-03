import{m as w}from"./assets/hero-io4eHbHz.js";import"./assets/header-DLs29yVk.js";import{a as v}from"./assets/vendor-DOPN71bB.js";const g="31537460e1a179eb456191c366c87865",u="https://api.themoviedb.org/3",y="https://image.tmdb.org/t/p/",m=document.getElementById("weekly-trends"),k=`<svg class="icon" id="stars-empty" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,L=`<svg class="icon" id="stars-half" fill="#F87719"  width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,S=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;function b(t){const s=t/2,e=Math.floor(s),n=s%1>=.5;let i="";i+=S.repeat(e),n&&(i+=L);const r=5-e-(n?1:0);return i+=k.repeat(r),`<div class="movie-rating">${i}</div>`}async function E(){try{const[t,s]=await Promise.all([v.get(`${u}/trending/movie/week?api_key=${g}`),v.get(`${u}/genre/movie/list?api_key=${g}&language=en-US`)]),e=new Map(s.data.genres.map(n=>[n.id,n.name]));T(t.data.results.slice(0,3),e)}catch(t){console.error("Veri alınırken hata:",t),m.innerHTML="<p>Filmler yüklenirken hata oluştu. Lütfen tekrar deneyin.</p>"}}function T(t,s){m.innerHTML=t.map(e=>{const n=e.genre_ids.map(l=>s.get(l)).filter(Boolean).slice(0,2).join(", "),i=e.release_date?e.release_date.substring(0,4):"Tarih Yok",r=n?`${n} || ${i}`:i,o=b(e.vote_average);return`
    <div class="movie-card" data-id="${e.id}">
      <img class="movie-poster" 
           src="${e.poster_path?y+"w500"+e.poster_path:"https://via.placeholder.com/300x450?text=Poster+Yok"}" 
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
    `}).join(""),$()}function $(){const t=m,s=document.querySelectorAll(".movie-card");if(!s.length)return;t.classList.add("responsive-slider");let e=0,n;const i=s.length,r=s[0].offsetWidth,o=parseInt(window.getComputedStyle(s[0]).marginRight)||0,l=r+o;function d(a){e=(a+i)%i,t.scrollTo({left:e*l,behavior:"smooth"})}function c(){window.innerWidth<=768&&(clearInterval(n),n=setInterval(()=>{d(e+1)},5e3))}c(),window.addEventListener("resize",c);let h=0,p=0;t.addEventListener("touchstart",a=>{clearInterval(n),h=a.changedTouches[0].screenX},{passive:!0}),t.addEventListener("touchend",a=>{p=a.changedTouches[0].screenX,f(),c()},{passive:!0});function f(){p<h-50&&d(e+1),p>h+50&&d(e-1)}}const x=`
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
`;document.head.insertAdjacentHTML("beforeend",x);document.addEventListener("DOMContentLoaded",E);const M=document.querySelector(".movie-grid");M.addEventListener("click",async t=>{if(t.target.nodeName==="IMG"){const s=t.target.parentElement.dataset.id;try{const e=await v.get(`https://api.themoviedb.org/3/movie/${Number(s)}?api_key=${g}&language=en-US`);w(e.data)}catch(e){console.log(e)}}});document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("scrollToTopBtn");window.addEventListener("scroll",()=>{window.pageYOffset>300?t.classList.add("visible"):t.classList.remove("visible")}),t.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});
//# sourceMappingURL=index.js.map
