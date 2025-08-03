import{m as k,g as S}from"./assets/scroll-Or_cMxbN.js";import"./assets/header-DLs29yVk.js";import{a as g,d as $}from"./assets/vendor-DogxyxdA.js";const h="31537460e1a179eb456191c366c87865",f="https://api.themoviedb.org/3",x="https://image.tmdb.org/t/p/",v=document.getElementById("weekly-trends"),I=`<svg class="icon" id="stars-empty" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,M=`<svg class="icon" id="stars-half" fill="#F87719"  width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,T=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;function L(t){const i=t/2,e=Math.floor(i),s=i%1>=.5;let n="";n+=T.repeat(e),s&&(n+=M);const r=5-e-(s?1:0);return n+=I.repeat(r),`<div class="movie-rating">${n}</div>`}async function E(){try{const[t,i]=await Promise.all([g.get(`${f}/trending/movie/week?api_key=${h}`),g.get(`${f}/genre/movie/list?api_key=${h}&language=en-US`)]),e=new Map(i.data.genres.map(s=>[s.id,s.name]));A(t.data.results.slice(0,3),e)}catch(t){console.error("Veri alınırken hata:",t),v.innerHTML="<p>Filmler yüklenirken hata oluştu. Lütfen tekrar deneyin.</p>"}}function A(t,i){v.innerHTML=t.map(e=>{const s=e.genre_ids.map(d=>i.get(d)).filter(Boolean).slice(0,2).join(", "),n=e.release_date?e.release_date.substring(0,4):"Tarih Yok",r=s?`${s} || ${n}`:n,l=L(e.vote_average);return`
    <div class="movie-card" data-id="${e.id}">
      <img class="movie-poster" 
           src="${e.poster_path?x+"w500"+e.poster_path:"https://via.placeholder.com/300x450?text=Poster+Yok"}" 
           alt="${e.title}"
           onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Hatası'">
      <div class="movie-info">
       <div class="title-date">
       <h3 class="movie-title">${e.title}</h3>
       <p class="movie-date">${r}</p>
       </div>
       ${l}
      </div>
    </div>
    `}).join(""),R()}function R(){const t=v,i=document.querySelectorAll(".movie-card");if(!i.length)return;t.classList.add("responsive-slider");let e=0,s;const n=i.length,r=i[0].offsetWidth,l=parseInt(window.getComputedStyle(i[0]).marginRight)||0,d=r+l;function p(o){e=(o+n)%n,t.scrollTo({left:e*d,behavior:"smooth"})}function m(){window.innerWidth<=768&&(clearInterval(s),s=setInterval(()=>{p(e+1)},5e3))}m(),window.addEventListener("resize",m);let a=0,c=0;t.addEventListener("touchstart",o=>{clearInterval(s),a=o.changedTouches[0].screenX},{passive:!0}),t.addEventListener("touchend",o=>{c=o.changedTouches[0].screenX,u(),m()},{passive:!0});function u(){c<a-50&&p(e+1),c>a+50&&p(e-1)}}const U=`
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
`;document.head.insertAdjacentHTML("beforeend",U);document.addEventListener("DOMContentLoaded",E);const z=document.querySelector(".movie-grid");z.addEventListener("click",async t=>{if(t.target.nodeName==="IMG"){const i=t.target.parentElement.dataset.id;try{const e=await g.get(`https://api.themoviedb.org/3/movie/${Number(i)}?api_key=${h}&language=en-US`);k(e.data)}catch(e){console.log(e)}}});const N="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODU0Y2RkODdhYTkwNTNjYTAwMjI5ZmVhNzNlNTkyNSIsInN1YiI6IjYxODZmYWFkZmU2MzE4MDA2NDgzZTdkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vm-UaTyMPJ2HhXiSRvz-VpPqqqKEF-3PBdhfYlg5v3g",Y="myLibraryFilms";function J(t){return t[Math.floor(Math.random()*t.length)]}function P(t){return Math.floor(t*10)/10}function H(t,i){const e=JSON.parse(localStorage.getItem(t));return(e==null?void 0:e.find(s=>s.id===Number(i)))||null}const O=g.create({baseURL:"https://api.themoviedb.org/3/movie/upcoming",headers:{Authorization:`Bearer ${N}`}});async function W(){return(await O.get()).data.results}async function B(t){const{backdrop_path:i,poster_path:e,title:s,release_date:n,popularity:r,vote_count:l,vote_average:d,genre_ids:p,overview:m,id:a}=t,c=H(Y,a),u=c?"remove":"add",o=c?"Remove from my library":"Add to my library",y=window.screen.width<768?e:i,w=n.replaceAll("-","."),_=P(r),b=await S(p);j.innerHTML=`
    <div class='upcoming-card__figure'>
      <div class='upcoming-card__layout'></div>
        <img
          src="https://image.tmdb.org/t/p/original${y}"
          alt="${s}"
          loading='lazy'
          class='upcoming-card__img'
        > 
      </div>
    </div>
    <div class='upcoming-card__body'>
      <h3 class="upcoming-card__title">${s}</h3>
      <div class='metrics-list__main-container'>
        <ul class="list metrics-list">
          <li class="metrics-list__item">
            <p class="metrics-text">Release date</p>
            <p class="metrics-text metrics-text--date">${w}</p>
          </li>
          <li class="metrics-list__item">
            <p class="metrics-text">Vote / Votes</p>
            <p class="metrics-text metrics-text--vote">
              <span class="vote-wrapper">${d}</span>
              /
              <span class="vote-wrapper">${l}</span>
            </p>
          </li>
          <li class="metrics-list__item">
            <p class="metrics-text">Popularity</p>
            <p class="metrics-text">${_}</p>
          </li>
          <li class="metrics-list__item">
            <p class="metrics-text">Genre</p>
            <p class="metrics-text">${b}</p>
          </li>
        </ul>
      </div>
      <h4 class="upcoming-card__subtitle metrics-text">ABOUT</h4>
        <p class="upcoming-card__text">${m}</p>
      <button class="btn" type="button" data-id=${a} data-${u}>${o}</button>
    </div>`}function D({poster_path:t,backdrop_path:i,title:e}){const s=document.querySelector(".upcoming-card__img");if(!s)return console.log("no upcoming section");const n=`https://image.tmdb.org/t/p/original${t}`,r=`https://image.tmdb.org/t/p/original${i}`;if(window.screen.width<768&&s.src!==n)return s.src=n;if(window.screen.width>=768&&s.src!==r)return s.src=r}const j=document.querySelector(".upcoming-card");window.addEventListener("DOMContentLoaded",q);async function q(){try{const t=await W(),i=J(t),e=B(i);updateUpcoming(e);const s=$(()=>D(i),200);window.addEventListener("resize",s)}catch(t){console.error("error:",t)}}
//# sourceMappingURL=index.js.map
