import{m as k}from"./assets/scroll-kdiTV0iN.js";import"./assets/header-DLs29yVk.js";import{a as g,d as S}from"./assets/vendor-DogxyxdA.js";const h="31537460e1a179eb456191c366c87865",f="https://api.themoviedb.org/3",$="https://image.tmdb.org/t/p/",v=document.getElementById("weekly-trends"),x=`<svg class="icon" id="stars-empty" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,I=`<svg class="icon" id="stars-half" fill="#F87719"  width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,M=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;function L(e){const i=e/2,t=Math.floor(i),s=i%1>=.5;let n="";n+=M.repeat(t),s&&(n+=I);const r=5-t-(s?1:0);return n+=x.repeat(r),`<div class="movie-rating">${n}</div>`}async function T(){try{const[e,i]=await Promise.all([g.get(`${f}/trending/movie/week?api_key=${h}`),g.get(`${f}/genre/movie/list?api_key=${h}&language=en-US`)]),t=new Map(i.data.genres.map(s=>[s.id,s.name]));E(e.data.results.slice(0,3),t)}catch(e){console.error("Veri alınırken hata:",e),v.innerHTML="<p>Filmler yüklenirken hata oluştu. Lütfen tekrar deneyin.</p>"}}function E(e,i){v.innerHTML=e.map(t=>{const s=t.genre_ids.map(d=>i.get(d)).filter(Boolean).slice(0,2).join(", "),n=t.release_date?t.release_date.substring(0,4):"Tarih Yok",r=s?`${s} || ${n}`:n,l=L(t.vote_average);return`
    <div class="movie-card" data-id="${t.id}">
      <img class="movie-poster" 
           src="${t.poster_path?$+"w500"+t.poster_path:"https://via.placeholder.com/300x450?text=Poster+Yok"}" 
           alt="${t.title}"
           onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Hatası'">
      <div class="movie-info">
       <div class="title-date">
       <h3 class="movie-title">${t.title}</h3>
       <p class="movie-date">${r}</p>
       </div>
       ${l}
      </div>
    </div>
    `}).join(""),A()}function A(){const e=v,i=document.querySelectorAll(".movie-card");if(!i.length)return;e.classList.add("responsive-slider");let t=0,s;const n=i.length,r=i[0].offsetWidth,l=parseInt(window.getComputedStyle(i[0]).marginRight)||0,d=r+l;function m(o){t=(o+n)%n,e.scrollTo({left:t*d,behavior:"smooth"})}function p(){window.innerWidth<=768&&(clearInterval(s),s=setInterval(()=>{m(t+1)},5e3))}p(),window.addEventListener("resize",p);let a=0,c=0;e.addEventListener("touchstart",o=>{clearInterval(s),a=o.changedTouches[0].screenX},{passive:!0}),e.addEventListener("touchend",o=>{c=o.changedTouches[0].screenX,u(),p()},{passive:!0});function u(){c<a-50&&m(t+1),c>a+50&&m(t-1)}}const N=`
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
`;document.head.insertAdjacentHTML("beforeend",N);document.addEventListener("DOMContentLoaded",T);const R=document.querySelector(".movie-grid");R.addEventListener("click",async e=>{if(e.target.nodeName==="IMG"){const i=e.target.parentElement.dataset.id;try{const t=await g.get(`https://api.themoviedb.org/3/movie/${Number(i)}?api_key=${h}&language=en-US`);k(t.data)}catch(t){console.log(t)}}});const U="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODU0Y2RkODdhYTkwNTNjYTAwMjI5ZmVhNzNlNTkyNSIsInN1YiI6IjYxODZmYWFkZmU2MzE4MDA2NDgzZTdkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vm-UaTyMPJ2HhXiSRvz-VpPqqqKEF-3PBdhfYlg5v3g",z="myLibraryFilms";function J(e){return e[Math.floor(Math.random()*e.length)]}function Y(e){return Math.floor(e*10)/10}function O(e,i){const t=JSON.parse(localStorage.getItem(e));return(t==null?void 0:t.find(s=>s.id===Number(i)))||null}function P(e,i){return i?e.map(s=>{const n=i.find(r=>r.id===s);return n?n.name:"Unknown"}).join(", "):"Genre information not available"}const H=g.create({baseURL:"https://api.themoviedb.org/3/movie/upcoming",headers:{Authorization:`Bearer ${U}`}});async function W(){return(await H.get()).data.results}function j(e){const{backdrop_path:i,poster_path:t,title:s,release_date:n,popularity:r,vote_count:l,vote_average:d,genre_ids:m,overview:p,id:a}=e,c=O(z,a),u=c?"remove":"add",o=c?"Remove from my library":"Add to my library",y=window.screen.width<768?t:i,w=n.replaceAll("-","."),_=Y(r),b=P(m,JSON.parse(localStorage.getItem("genres")));return`
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
        <p class="upcoming-card__text">${p}</p>
      <button class="btn" type="button" data-id=${a} data-${u}>${o}</button>
    </div>`}function B({poster_path:e,backdrop_path:i,title:t}){const s=document.querySelector(".upcoming-card__img");if(!s)return console.log("no upcoming section");const n=`https://image.tmdb.org/t/p/original${e}`,r=`https://image.tmdb.org/t/p/original${i}`;if(window.screen.width<768&&s.src!==n)return s.src=n;if(window.screen.width>=768&&s.src!==r)return s.src=r}const D=document.querySelector(".upcoming-card");window.addEventListener("DOMContentLoaded",G);async function G(){try{const e=await W(),i=J(e),t=j(i);q(t);const s=S(()=>B(i),200);window.addEventListener("resize",s)}catch(e){console.error("error:",e)}}function q(e=""){D.innerHTML=e}
//# sourceMappingURL=index.js.map
