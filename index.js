import"./assets/header-XPaL0Jmi.js";import{m as w}from"./assets/modal-B6ENpYm-.js";import{a as h}from"./assets/vendor-DOPN71bB.js";const p="31537460e1a179eb456191c366c87865",g="https://api.themoviedb.org/3",L="https://image.tmdb.org/t/p/",b=document.getElementById("weekly-trends"),E=`<svg class="icon" id="stars-empty"width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,$=`<svg class="icon" id="stars-half" fill="#F87719" width="18" height="18">
        <defs>
        <clipPath id="half-clip">
          <rect x="0" y="0" width="12" height="24"/>
        </clipPath>
      </defs>
      <use href="#icon-star-half"/>
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,M=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;function _(t){const o=t/2,e=Math.floor(o),a=o%1>=.5;let n="";n+=M.repeat(e),a&&(n+=$);const i=5-e-(a?1:0);return n+=E.repeat(i),`<div class="movie-rating">${n}</div>`}async function T(){try{const[t,o]=await Promise.all([h.get(`${g}/trending/movie/week?api_key=${p}`),h.get(`${g}/genre/movie/list?api_key=${p}&language=en-US`)]),e=new Map(o.data.genres.map(a=>[a.id,a.name]));S(t.data.results.slice(0,3),e)}catch(t){console.error("Veri alınırken hata:",t),b.innerHTML="<p>Filmler yüklenirken hata oluştu. Lütfen tekrar deneyin.</p>"}}function S(t,o){b.innerHTML=t.map(e=>{const a=e.genre_ids.map(r=>o.get(r)).filter(Boolean).slice(0,2).join(", "),n=e.release_date?e.release_date.substring(0,4):"Tarih Yok",i=a?`${a} || ${n}`:n,l=_(e.vote_average);return`
    <div class="movie-card" data-id="${e.id}">
      <img class="movie-poster" 
           src="${e.poster_path?L+"w500"+e.poster_path:"https://via.placeholder.com/300x450?text=Poster+Yok"}" 
           alt="${e.title}"
           onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Hatası'">
      <div class="movie-info">
       <div class="title-date">
       <h3 class="movie-title">${e.title}</h3>
       <p class="movie-date">${i}</p>
       </div>
       ${l}
      </div>
    </div>
    `}).join("")}document.addEventListener("DOMContentLoaded",T);const B=document.querySelector(".movie-grid");B.addEventListener("click",async t=>{if(t.target.nodeName==="IMG"){const o=t.target.parentElement.dataset.id;try{const e=await h.get(`https://api.themoviedb.org/3/movie/${Number(o)}?api_key=${p}&language=en-US`);w(e.data)}catch(e){console.log(e)}}});let d=0;const v=document.querySelectorAll(".movie-card"),I=document.querySelector(".weekly-trends");function D(){d=(d+1)%v.length,I.scrollTo({left:v[d].offsetLeft,behavior:"smooth"})}setInterval(D,500);document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("scrollToTopBtn");window.addEventListener("scroll",()=>{window.pageYOffset>300?t.classList.add("visible"):t.classList.remove("visible")}),t.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});const y="4e64f2e0a197aa7c5d1170773553320c";async function x(t){try{const e=await(await fetch(`https://api.themoviedb.org/3/movie/${t}?api_key=${y}&language=en-US`)).json(),i=(await(await fetch(`https://api.themoviedb.org/3/movie/${t}/credits?api_key=${y}`)).json()).crew.find(s=>s.job==="Director"),l=i?i.name:"Unknown";e.director=l,e.release_year=e.release_date?e.release_date.slice(0,4):"N/A",e.runtime=e.runtime?`${e.runtime} min`:"N/A",e.language=e.original_language.toUpperCase(),w(e),setTimeout(()=>{const s=document.querySelector(".movie-submit");s&&s.remove()},100),setTimeout(()=>{const s=document.querySelector(".basicLightbox__placeholder > *");s&&s.classList.add("custom-herocard")},50);const r=document.querySelector(".basicLightbox");r.addEventListener("click",s=>{s.target.classList.contains("basicLightbox")&&r.remove()})}catch(o){console.error("Detaylar alınırken hata:",o),alert("Film detayları yüklenemedi.")}}const k="4e64f2e0a197aa7c5d1170773553320c",c=document.getElementById("carousel"),H=document.getElementById("prev-btn"),C=document.getElementById("next-btn"),j=document.getElementById("details-modal"),u=document.getElementById("trailer-modal");document.getElementById("details-container");const m=document.getElementById("trailer-container"),A=document.getElementById("close-details"),U=document.getElementById("close-trailer");async function P(){try{const o=await(await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${k}`)).json();if(!o.results||o.results.length===0){f();return}o.results.forEach(e=>{const a=document.createElement("div");a.className="hero-slide",a.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${e.backdrop_path})`,a.innerHTML=`
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>${e.title}</h1>
          <p>${e.overview.slice(0,200)}...</p>
          <p>IMDb: ${e.vote_average}</p>
          <button onclick='openDetailsModal(${JSON.stringify(e).replace(/'/g,"\\'")})'>More Details</button>
          <button onclick='openTrailerModal(${e.id})'>Watch Trailer</button>
        </div>
      `,c.appendChild(a)})}catch(t){console.error("Hata:",t),f()}}function f(){const t=document.createElement("div");t.className="hero-slide",t.style.backgroundImage="url('default-hero.jpg')",t.innerHTML=`
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>Welcome to Cinemania</h1>
      <p>Explore timeless stories and epic moments from world cinema.</p>
      <button onclick="window.location.href='catalog.html'">Get Started</button>
    </div>
  `,c.appendChild(t)}H.addEventListener("click",()=>{c.scrollBy({left:-window.innerWidth,behavior:"smooth"})});C.addEventListener("click",()=>{c.scrollBy({left:window.innerWidth,behavior:"smooth"})});function R(t){x(t.id)}async function Y(t){try{const a=(await(await fetch(`https://api.themoviedb.org/3/movie/${t}/videos?api_key=${k}&language=en-US`)).json()).results.find(n=>n.type==="Trailer"&&n.site==="YouTube");a?m.innerHTML=`
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/${a.key}" frameborder="0" allowfullscreen></iframe>
      `:m.innerHTML="<p>Sorry, no trailer available.</p>",u.classList.remove("hidden")}catch{m.innerHTML="<p>Error loading trailer.</p>",u.classList.remove("hidden")}}A.onclick=()=>j.classList.add("hidden");U.onclick=()=>u.classList.add("hidden");document.addEventListener("DOMContentLoaded",P);window.openDetailsModal=R;window.openTrailerModal=Y;
//# sourceMappingURL=index.js.map
