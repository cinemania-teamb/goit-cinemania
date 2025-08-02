import"./assets/header-XPaL0Jmi.js";import{m as y}from"./assets/modal-B6ENpYm-.js";import{a as m}from"./assets/vendor-DOPN71bB.js";const h="31537460e1a179eb456191c366c87865",g="https://api.themoviedb.org/3",b="https://image.tmdb.org/t/p/",f=document.getElementById("weekly-trends"),k=`<svg class="icon" id="stars-empty"width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,L=`<svg class="icon" id="stars-half" fill="#F87719" width="18" height="18">
        <defs>
        <clipPath id="half-clip">
          <rect x="0" y="0" width="12" height="24"/>
        </clipPath>
      </defs>
      <use href="#icon-star-half"/>
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,E=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;function $(t){const a=t/2,e=Math.floor(a),o=a%1>=.5;let n="";n+=E.repeat(e),o&&(n+=L);const i=5-e-(o?1:0);return n+=k.repeat(i),`<div class="movie-rating">${n}</div>`}async function M(){try{const[t,a]=await Promise.all([m.get(`${g}/trending/movie/week?api_key=${h}`),m.get(`${g}/genre/movie/list?api_key=${h}&language=en-US`)]),e=new Map(a.data.genres.map(o=>[o.id,o.name]));_(t.data.results.slice(0,3),e)}catch(t){console.error("Veri alınırken hata:",t),f.innerHTML="<p>Filmler yüklenirken hata oluştu. Lütfen tekrar deneyin.</p>"}}function _(t,a){f.innerHTML=t.map(e=>{const o=e.genre_ids.map(r=>a.get(r)).filter(Boolean).slice(0,2).join(", "),n=e.release_date?e.release_date.substring(0,4):"Tarih Yok",i=o?`${o} || ${n}`:n,l=$(e.vote_average);return`
    <div class="movie-card" data-id="${e.id}">
      <img class="movie-poster" 
           src="${e.poster_path?b+"w500"+e.poster_path:"https://via.placeholder.com/300x450?text=Poster+Yok"}" 
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
    `}).join("")}document.addEventListener("DOMContentLoaded",M);const T=document.querySelector(".movie-grid");T.addEventListener("click",async t=>{if(t.target.nodeName==="IMG"){const a=t.target.parentElement.dataset.id;try{const e=await m.get(`https://api.themoviedb.org/3/movie/${Number(a)}?api_key=${h}&language=en-US`);y(e.data)}catch(e){console.log(e)}}});document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("scrollToTopBtn");window.addEventListener("scroll",()=>{window.pageYOffset>300?t.classList.add("visible"):t.classList.remove("visible")}),t.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});const u="4e64f2e0a197aa7c5d1170773553320c";async function B(t){try{const e=await(await fetch(`https://api.themoviedb.org/3/movie/${t}?api_key=${u}&language=en-US`)).json(),i=(await(await fetch(`https://api.themoviedb.org/3/movie/${t}/credits?api_key=${u}`)).json()).crew.find(s=>s.job==="Director"),l=i?i.name:"Unknown";e.director=l,e.release_year=e.release_date?e.release_date.slice(0,4):"N/A",e.runtime=e.runtime?`${e.runtime} min`:"N/A",e.language=e.original_language.toUpperCase(),y(e),setTimeout(()=>{const s=document.querySelector(".movie-submit");s&&s.remove()},100),setTimeout(()=>{const s=document.querySelector(".basicLightbox__placeholder > *");s&&s.classList.add("custom-herocard")},50);const r=document.querySelector(".basicLightbox");r.addEventListener("click",s=>{s.target.classList.contains("basicLightbox")&&r.remove()})}catch(a){console.error("Detaylar alınırken hata:",a),alert("Film detayları yüklenemedi.")}}const w="4e64f2e0a197aa7c5d1170773553320c",c=document.getElementById("carousel"),S=document.getElementById("prev-btn"),I=document.getElementById("next-btn"),D=document.getElementById("details-modal"),p=document.getElementById("trailer-modal");document.getElementById("details-container");const d=document.getElementById("trailer-container"),H=document.getElementById("close-details"),x=document.getElementById("close-trailer");async function C(){try{const a=await(await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${w}`)).json();if(!a.results||a.results.length===0){v();return}a.results.forEach(e=>{const o=document.createElement("div");o.className="hero-slide",o.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${e.backdrop_path})`,o.innerHTML=`
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>${e.title}</h1>
          <p>${e.overview.slice(0,200)}...</p>
          <p>IMDb: ${e.vote_average}</p>
          <button onclick='openDetailsModal(${JSON.stringify(e).replace(/'/g,"\\'")})'>More Details</button>
          <button onclick='openTrailerModal(${e.id})'>Watch Trailer</button>
        </div>
      `,c.appendChild(o)})}catch(t){console.error("Hata:",t),v()}}function v(){const t=document.createElement("div");t.className="hero-slide",t.style.backgroundImage="url('default-hero.jpg')",t.innerHTML=`
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>Welcome to Cinemania</h1>
      <p>Explore timeless stories and epic moments from world cinema.</p>
      <button onclick="window.location.href='catalog.html'">Get Started</button>
    </div>
  `,c.appendChild(t)}S.addEventListener("click",()=>{c.scrollBy({left:-window.innerWidth,behavior:"smooth"})});I.addEventListener("click",()=>{c.scrollBy({left:window.innerWidth,behavior:"smooth"})});function j(t){B(t.id)}async function U(t){try{const o=(await(await fetch(`https://api.themoviedb.org/3/movie/${t}/videos?api_key=${w}&language=en-US`)).json()).results.find(n=>n.type==="Trailer"&&n.site==="YouTube");o?d.innerHTML=`
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/${o.key}" frameborder="0" allowfullscreen></iframe>
      `:d.innerHTML="<p>Sorry, no trailer available.</p>",p.classList.remove("hidden")}catch{d.innerHTML="<p>Error loading trailer.</p>",p.classList.remove("hidden")}}H.onclick=()=>D.classList.add("hidden");x.onclick=()=>p.classList.add("hidden");document.addEventListener("DOMContentLoaded",C);window.openDetailsModal=j;window.openTrailerModal=U;
//# sourceMappingURL=index.js.map
