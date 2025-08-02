import"./assets/header-3fit8tjM.js";const l="4e64f2e0a197aa7c5d1170773553320c",o=document.getElementById("carousel"),i=document.getElementById("prev-btn"),c=document.getElementById("next-btn"),r=document.getElementById("details-modal"),s=document.getElementById("trailer-modal");document.getElementById("details-container");document.getElementById("trailer-container");const m=document.getElementById("close-details"),h=document.getElementById("close-trailer");async function u(){try{const a=await(await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${l}`)).json();if(!a.results||a.results.length===0){d();return}a.results.forEach(t=>{const n=document.createElement("div");n.className="hero-slide",n.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${t.backdrop_path})`,n.innerHTML=`
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>${t.title}</h1>
          <p>${t.overview.slice(0,200)}...</p>
          <p>IMDb: ${t.vote_average}</p>
          <button onclick='openDetailsModal(${JSON.stringify(t).replace(/'/g,"\\'")})'>More Details</button>
          <button onclick='openTrailerModal(${t.id})'>Watch Trailer</button>
        </div>
      `,o.appendChild(n)})}catch(e){console.error("Hata:",e),d()}}function d(){const e=document.createElement("div");e.className="hero-slide",e.style.backgroundImage="url('default-hero.jpg')",e.innerHTML=`
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>Welcome to Cinemania</h1>
      <p>Explore timeless stories and epic moments from world cinema.</p>
      <button onclick="window.location.href='catalog.html'">Get Started</button>
    </div>
  `,o.appendChild(e)}i.addEventListener("click",()=>{o.scrollBy({left:-window.innerWidth,behavior:"smooth"})});c.addEventListener("click",()=>{o.scrollBy({left:window.innerWidth,behavior:"smooth"})});m.onclick=()=>r.classList.add("hidden");h.onclick=()=>s.classList.add("hidden");document.addEventListener("DOMContentLoaded",u);
//# sourceMappingURL=index.js.map
