import{m as L,g as A}from"./assets/footer-modal-Z_5GnbgC.js";import{a as u}from"./assets/vendor-wG9nbpZs.js";const f="31537460e1a179eb456191c366c87865",k="https://api.themoviedb.org/3",R="https://image.tmdb.org/t/p/",_=document.getElementById("weekly-trends"),N=`<svg class="icon" id="stars-empty" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,J=`<svg class="icon" id="stars-half" fill="#F87719"  width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,U=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;function z(t){const s=t/2,e=Math.floor(s),i=s%1>=.5;let n="";n+=U.repeat(e),i&&(n+=J);const r=5-e-(i?1:0);return n+=N.repeat(r),`<div class="movie-rating">${n}</div>`}async function O(){try{const[t,s]=await Promise.all([u.get(`${k}/trending/movie/week?api_key=${f}`),u.get(`${k}/genre/movie/list?api_key=${f}&language=en-US`)]),e=new Map(s.data.genres.map(i=>[i.id,i.name]));Y(t.data.results.slice(0,3),e)}catch(t){console.error("Veri alınırken hata:",t),_.innerHTML="<p>Filmler yüklenirken hata oluştu. Lütfen tekrar deneyin.</p>"}}function Y(t,s){_.innerHTML=t.map(e=>{const i=e.genre_ids.map(l=>s.get(l)).filter(Boolean).slice(0,2).join(", "),n=e.release_date?e.release_date.substring(0,4):"Tarih Yok",r=i?`${i} || ${n}`:n,c=z(e.vote_average);return`
    <div class="movie-card" data-id="${e.id}">
      <img class="movie-poster" 
           src="${e.poster_path?R+"w500"+e.poster_path:"https://via.placeholder.com/300x450?text=Poster+Yok"}" 
           alt="${e.title}"
           onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Hatası'">
      <div class="movie-info">
       <div class="title-date">
       <h3 class="movie-title">${e.title}</h3>
       <p class="movie-date">${r}</p>
       </div>
       ${c}
      </div>
    </div>
    `}).join(""),C()}function C(){const t=_,s=document.querySelectorAll(".movie-card");if(!s.length)return;t.classList.add("responsive-slider");let e=0,i;const n=s.length,r=s[0].offsetWidth,c=parseInt(window.getComputedStyle(s[0]).marginRight)||0,l=r+c;function d(a){e=(a+n)%n,t.scrollTo({left:e*l,behavior:"smooth"})}function m(){window.innerWidth<=768&&(clearInterval(i),i=setInterval(()=>{d(e+1)},5e3))}m(),window.addEventListener("resize",m);let p=0,g=0;t.addEventListener("touchstart",a=>{clearInterval(i),p=a.changedTouches[0].screenX},{passive:!0}),t.addEventListener("touchend",a=>{g=a.changedTouches[0].screenX,v(),m()},{passive:!0});function v(){g<p-50&&d(e+1),g>p+50&&d(e-1)}}const P=`
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
`;document.head.insertAdjacentHTML("beforeend",P);document.addEventListener("DOMContentLoaded",O);const B=document.querySelector(".movie-grid");B.addEventListener("click",async t=>{if(t.target.nodeName==="IMG"){const s=t.target.parentElement.dataset.id;try{const e=await u.get(`https://api.themoviedb.org/3/movie/${Number(s)}?api_key=${f}&language=en-US`);L(e.data)}catch(e){console.log(e)}}});const W="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODU0Y2RkODdhYTkwNTNjYTAwMjI5ZmVhNzNlNTkyNSIsInN1YiI6IjYxODZmYWFkZmU2MzE4MDA2NDgzZTdkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vm-UaTyMPJ2HhXiSRvz-VpPqqqKEF-3PBdhfYlg5v3g",I="movies",H=document.querySelector(".upcoming-card");function j(t){return t[Math.floor(Math.random()*t.length)]}function D(t){return Math.floor(t*10)/10}function y(){return JSON.parse(localStorage.getItem("movies"))||[]}const F=u.create({baseURL:"https://api.themoviedb.org/3/movie/upcoming",headers:{Authorization:`Bearer ${W}`}});async function q(){return(await F.get()).data.results}async function G(t){const{backdrop_path:s,poster_path:e,title:i,release_date:n,popularity:r,vote_count:c,vote_average:l,genre_ids:d,overview:m,id:p}=t,g=window.screen.width<768?e:s,v=n.replaceAll("-","."),a=D(r),w=await A(d);H.innerHTML=`
    <div class='upcoming-card__figure'>
      <div class='upcoming-card__layout'></div>
        <img
          src="https://image.tmdb.org/t/p/original${g}"
          alt="${i}"
          loading='lazy'
          class='upcoming-card__img'
        > 
      </div>
    </div>
    <div class='upcoming-card__body'>
      <h3 class="upcoming-card__title">${i}</h3>
      <div class='metrics-list__main-container'>
        <ul class="list metrics-list">
          <li class="metrics-list__item">
            <p class="metrics-text">Release date</p>
            <p class="metrics-text metrics-text--date">${v}</p>
          </li>
          <li class="metrics-list__item">
            <p class="metrics-text">Vote / Votes</p>
            <p class="metrics-text metrics-text--vote">
              <span class="vote-wrapper">${l}</span>
              /
              <span class="vote-wrapper">${c}</span>
            </p>
          </li>
          <li class="metrics-list__item">
            <p class="metrics-text">Popularity</p>
            <p class="metrics-text">${a}</p>
          </li>
          <li class="metrics-list__item">
            <p class="metrics-text">Genre</p>
            <p class="metrics-text">${w}</p>
          </li>
        </ul>
      </div>
      <h4 class="upcoming-card__subtitle metrics-text">ABOUT</h4>
        <p class="upcoming-card__text">${m}</p>
      <button class="btn" type="button" data-id=${p}>Add to my library</button>
    </div>`;const o=document.querySelector(".btn"),M=o.dataset.id;let S=y();S.some(h=>h.id===M)?o.textContent="Remove from my library":o.textContent="Add to my library",o.addEventListener("click",h=>{const b=h.target.dataset.id;if(S=y(),o.textContent==="Remove from my library"){const T=y().filter(E=>E.id!==b);localStorage.setItem("movies",JSON.stringify(T)),o.textContent="Add to my library";return}const $={id:b,title:i,poster_path:e,year:n.split("-")[0],genres:w,vote_average:l},x=JSON.parse(localStorage.getItem(I))||[];x.push($),localStorage.setItem(I,JSON.stringify(x)),o.textContent="Remove from my library"})}async function Z(){try{const t=await q(),s=j(t),e=G(s)}catch(t){console.error("error:",t)}}Z();
//# sourceMappingURL=index.js.map
