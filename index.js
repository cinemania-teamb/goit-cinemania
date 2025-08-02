import"./assets/header-BYFhdvTp.js";import{m as g}from"./assets/modal-B6ENpYm-.js";import"./assets/vendor-DOPN71bB.js";const m="4e64f2e0a197aa7c5d1170773553320c";async function v(t){try{const e=await(await fetch(`https://api.themoviedb.org/3/movie/${t}?api_key=${m}&language=en-US`)).json(),d=(await(await fetch(`https://api.themoviedb.org/3/movie/${t}/credits?api_key=${m}`)).json()).crew.find(o=>o.job==="Director"),p=d?d.name:"Unknown";e.director=p,e.release_year=e.release_date?e.release_date.slice(0,4):"N/A",e.runtime=e.runtime?`${e.runtime} min`:"N/A",e.language=e.original_language.toUpperCase(),g(e),setTimeout(()=>{const o=document.querySelector(".movie-submit");o&&o.remove()},100),setTimeout(()=>{const o=document.querySelector(".basicLightbox__placeholder > *");o&&o.classList.add("custom-herocard")},50);const l=document.querySelector(".basicLightbox");l.addEventListener("click",o=>{o.target.classList.contains("basicLightbox")&&l.remove()})}catch(a){console.error("Detaylar alınırken hata:",a),alert("Film detayları yüklenemedi.")}}const h="4e64f2e0a197aa7c5d1170773553320c",i=document.getElementById("carousel"),y=document.getElementById("prev-btn"),b=document.getElementById("next-btn"),w=document.getElementById("details-modal"),c=document.getElementById("trailer-modal");document.getElementById("details-container");const s=document.getElementById("trailer-container"),f=document.getElementById("close-details"),k=document.getElementById("close-trailer");async function E(){try{const a=await(await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${h}`)).json();if(!a.results||a.results.length===0){u();return}a.results.forEach(e=>{const n=document.createElement("div");n.className="hero-slide",n.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${e.backdrop_path})`,n.innerHTML=`
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>${e.title}</h1>
          <p>${e.overview.slice(0,200)}...</p>
          <p>IMDb: ${e.vote_average}</p>
          <button onclick='openDetailsModal(${JSON.stringify(e).replace(/'/g,"\\'")})'>More Details</button>
          <button onclick='openTrailerModal(${e.id})'>Watch Trailer</button>
        </div>
      `,i.appendChild(n)})}catch(t){console.error("Hata:",t),u()}}function u(){const t=document.createElement("div");t.className="hero-slide",t.style.backgroundImage="url('default-hero.jpg')",t.innerHTML=`
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>Welcome to Cinemania</h1>
      <p>Explore timeless stories and epic moments from world cinema.</p>
      <button onclick="window.location.href='catalog.html'">Get Started</button>
    </div>
  `,i.appendChild(t)}y.addEventListener("click",()=>{i.scrollBy({left:-window.innerWidth,behavior:"smooth"})});b.addEventListener("click",()=>{i.scrollBy({left:window.innerWidth,behavior:"smooth"})});function L(t){v(t.id)}async function M(t){try{const n=(await(await fetch(`https://api.themoviedb.org/3/movie/${t}/videos?api_key=${h}&language=en-US`)).json()).results.find(r=>r.type==="Trailer"&&r.site==="YouTube");n?s.innerHTML=`
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/${n.key}" frameborder="0" allowfullscreen></iframe>
      `:s.innerHTML="<p>Sorry, no trailer available.</p>",c.classList.remove("hidden")}catch{s.innerHTML="<p>Error loading trailer.</p>",c.classList.remove("hidden")}}f.onclick=()=>w.classList.add("hidden");k.onclick=()=>c.classList.add("hidden");document.addEventListener("DOMContentLoaded",E);window.openDetailsModal=L;window.openTrailerModal=M;
//# sourceMappingURL=index.js.map
