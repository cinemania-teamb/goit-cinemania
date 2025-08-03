import{m as $,g as M}from"./assets/loader-bIkT6TQI.js";import"./assets/header-DLs29yVk.js";import{a as u,d as T}from"./assets/vendor-oKrFQJru.js";const y="31537460e1a179eb456191c366c87865",b="https://api.themoviedb.org/3",L="https://image.tmdb.org/t/p/",w=document.getElementById("weekly-trends"),E=`<svg class="icon" id="stars-empty" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,A=`<svg class="icon" id="stars-half" fill="#F87719"  width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,N=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;function R(t){const i=t/2,e=Math.floor(i),s=i%1>=.5;let n="";n+=N.repeat(e),s&&(n+=A);const r=5-e-(s?1:0);return n+=E.repeat(r),`<div class="movie-rating">${n}</div>`}async function J(){try{const[t,i]=await Promise.all([u.get(`${b}/trending/movie/week?api_key=${y}`),u.get(`${b}/genre/movie/list?api_key=${y}&language=en-US`)]),e=new Map(i.data.genres.map(s=>[s.id,s.name]));U(t.data.results.slice(0,3),e)}catch(t){console.error("Veri alınırken hata:",t),w.innerHTML="<p>Filmler yüklenirken hata oluştu. Lütfen tekrar deneyin.</p>"}}function U(t,i){w.innerHTML=t.map(e=>{const s=e.genre_ids.map(c=>i.get(c)).filter(Boolean).slice(0,2).join(", "),n=e.release_date?e.release_date.substring(0,4):"Tarih Yok",r=s?`${s} || ${n}`:n,d=R(e.vote_average);return`
    <div class="movie-card" data-id="${e.id}">
      <img class="movie-poster" 
           src="${e.poster_path?L+"w500"+e.poster_path:"https://via.placeholder.com/300x450?text=Poster+Yok"}" 
           alt="${e.title}"
           onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Hatası'">
      <div class="movie-info">
       <div class="title-date">
       <h3 class="movie-title">${e.title}</h3>
       <p class="movie-date">${r}</p>
       </div>
       ${d}
      </div>
    </div>
    `}).join(""),z()}function z(){const t=w,i=document.querySelectorAll(".movie-card");if(!i.length)return;t.classList.add("responsive-slider");let e=0,s;const n=i.length,r=i[0].offsetWidth,d=parseInt(window.getComputedStyle(i[0]).marginRight)||0,c=r+d;function m(a){e=(a+n)%n,t.scrollTo({left:e*c,behavior:"smooth"})}function p(){window.innerWidth<=768&&(clearInterval(s),s=setInterval(()=>{m(e+1)},5e3))}p(),window.addEventListener("resize",p);let o=0,g=0;t.addEventListener("touchstart",a=>{clearInterval(s),o=a.changedTouches[0].screenX},{passive:!0}),t.addEventListener("touchend",a=>{g=a.changedTouches[0].screenX,h(),p()},{passive:!0});function h(){g<o-50&&m(e+1),g>o+50&&m(e-1)}}const O=`
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
`;document.head.insertAdjacentHTML("beforeend",O);document.addEventListener("DOMContentLoaded",J);const Y=document.querySelector(".movie-grid");Y.addEventListener("click",async t=>{if(t.target.nodeName==="IMG"){const i=t.target.parentElement.dataset.id;try{const e=await u.get(`https://api.themoviedb.org/3/movie/${Number(i)}?api_key=${y}&language=en-US`);$(e.data)}catch(e){console.log(e)}}});const P="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODU0Y2RkODdhYTkwNTNjYTAwMjI5ZmVhNzNlNTkyNSIsInN1YiI6IjYxODZmYWFkZmU2MzE4MDA2NDgzZTdkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vm-UaTyMPJ2HhXiSRvz-VpPqqqKEF-3PBdhfYlg5v3g",l="movies";function B(t){return t[Math.floor(Math.random()*t.length)]}function H(t){return Math.floor(t*10)/10}function k(t,i){const e=JSON.parse(localStorage.getItem(t));return(e==null?void 0:e.find(s=>s.id===Number(i)))||null}const W=u.create({baseURL:"https://api.themoviedb.org/3/movie/upcoming",headers:{Authorization:`Bearer ${P}`}});async function j(){return(await W.get()).data.results}async function q(t){const{backdrop_path:i,poster_path:e,title:s,release_date:n,popularity:r,vote_count:d,vote_average:c,genre_ids:m,overview:p,id:o}=t,h=k(l,o)?"remove":"add",a=window.screen.width<768?e:i,I=n.replaceAll("-","."),x=H(r),_=await M(m);D.innerHTML=`
    <div class='upcoming-card__figure'>
      <div class='upcoming-card__layout'></div>
        <img
          src="https://image.tmdb.org/t/p/original${a}"
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
            <p class="metrics-text metrics-text--date">${I}</p>
          </li>
          <li class="metrics-list__item">
            <p class="metrics-text">Vote / Votes</p>
            <p class="metrics-text metrics-text--vote">
              <span class="vote-wrapper">${c}</span>
              /
              <span class="vote-wrapper">${d}</span>
            </p>
          </li>
          <li class="metrics-list__item">
            <p class="metrics-text">Popularity</p>
            <p class="metrics-text">${x}</p>
          </li>
          <li class="metrics-list__item">
            <p class="metrics-text">Genre</p>
            <p class="metrics-text">${_}</p>
          </li>
        </ul>
      </div>
      <h4 class="upcoming-card__subtitle metrics-text">ABOUT</h4>
        <p class="upcoming-card__text">${p}</p>
      <button class="btn" type="button" data-id=${o} data-${h}>Add to my library</button>
    </div>`;const v=document.querySelector(".btn");v.addEventListener("click",()=>{if(k(l,o))v.textContent="Add to my library",localStorage.setItem(l,JSON.stringify(JSON.parse(localStorage.getItem(l)).filter(f=>f.id!==o)));else{v.textContent="Remove from my library";const f={id:o,title:s,poster_path:e,year:n.split("-")[0],genres:_,vote_average:c},S=JSON.parse(localStorage.getItem(l))||[];S.push(f),localStorage.setItem(l,JSON.stringify(S))}})}function C({poster_path:t,backdrop_path:i,title:e}){const s=document.querySelector(".upcoming-card__img");if(!s)return console.log("no upcoming section");const n=`https://image.tmdb.org/t/p/original${t}`,r=`https://image.tmdb.org/t/p/original${i}`;if(window.screen.width<768&&s.src!==n)return s.src=n;if(window.screen.width>=768&&s.src!==r)return s.src=r}const D=document.querySelector(".upcoming-card");async function F(){try{const t=await j(),i=B(t),e=q(i),s=T(()=>C(i),200);window.addEventListener("resize",s)}catch(t){console.error("error:",t)}}F();
//# sourceMappingURL=index.js.map
