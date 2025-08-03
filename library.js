import"./assets/hero-io4eHbHz.js";/* empty css                       */import{b as _}from"./assets/vendor-DOPN71bB.js";const m=new EventTarget,C=e=>{typeof e.genres=="string"&&(e.genres=e.genres.split(",").map(n=>({name:n.trim()})));const s=_.create(`
    <form id="movie-form">
      <p class="close" style="cursor:pointer;">&#10006;</p>
      <img src="https://image.tmdb.org/t/p/w500/${e.poster_path}" alt="${e.title}" width="375" height="478" />
      <div>
        <h2>${e.title.toUpperCase()}</h2>
        <table>
          <thead>
            <tr>
              <th>Vote/Votes</th>
              <td><span class="vote">${e.vote_average}</span> / <span class="vote">${e.vote_count}</span></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Popularity</th>
              <td>${e.popularity}</td>
            </tr>
            <tr>
              <th>Genre</th>
              <td>${e.genres.map(n=>n.name).join(", ")}</td>
            </tr>
          </tbody>
        </table>
        <h3>ABOUT</h3>
        <p>${e.overview}</p>
        <button class="movie-submit" type="submit">Add to my library</button>
      </div>
    </form>
  `);s.show(),document.querySelector(".close").addEventListener("click",()=>{s.close()});const t=n=>{n.key==="Escape"&&(s.close(),document.removeEventListener("keyup",t))};document.addEventListener("keyup",t);const r=document.getElementById("movie-form"),a=document.querySelector(".movie-submit");let c=h();c.some(n=>n.id===e.id)?a.textContent="Remove from my library":a.textContent="Add to my library",r.addEventListener("submit",n=>{if(n.preventDefault(),c=h(),a.textContent==="Remove from my library"){const v=c.filter(k=>String(k.id)!==String(e.id));localStorage.setItem("movies",JSON.stringify(v)),m.dispatchEvent(new CustomEvent("libraryUpdated")),s.close();return}c.push({id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(v=>v.name).join(",")}),localStorage.setItem("movies",JSON.stringify(c)),a.textContent="Remove from my library",m.dispatchEvent(new CustomEvent("libraryUpdated"))})};function h(){return JSON.parse(localStorage.getItem("movies"))||[]}const p=document.querySelector(".library__gallery"),b=document.getElementById("empty-state"),E=document.querySelector(".filter__select"),u=document.querySelector(".btn--load-more"),f=document.querySelectorAll(".tab"),$=6;let g=1,l=[];const o=`<svg class="icon" width="18" height="18">
  <use href="./icons.svg#icon-star-outline"></use>
</svg>`,d=`<svg class="icon" fill="#F87719" width="18" height="18">
  <use href="./icons.svg#icon-star-half"></use>
</svg>`,i=`<svg class="icon" fill="#F87719" width="18" height="18">
  <use href="./icons.svg#icon-star"></use>
</svg>`;function L(){return JSON.parse(localStorage.getItem("movies"))||[]}function F(e){const s=Math.round(e);let t="";switch(s){case 0:t=`${o.repeat(5)}`;break;case 1:t=`${d}${o.repeat(4)}`;break;case 2:t=`${i}${o.repeat(4)}`;break;case 3:t=`${i}${d}${o.repeat(3)}`;break;case 4:t=`${i.repeat(2)}${o.repeat(3)}`;break;case 5:t=`${i.repeat(2)}${d}${o.repeat(2)}`;break;case 6:t=`${i.repeat(3)}${o.repeat(2)}`;break;case 7:t=`${i.repeat(3)}${d}${o}`;break;case 8:t=`${i.repeat(4)}${o}`;break;case 9:t=`${i.repeat(4)}${d}`;break;case 10:t=`${i.repeat(5)}`;break;default:t=`${o.repeat(5)}`}return`<div class="rating-stars">${t}</div>`}function S(){const e=(g-1)*$,s=e+$;l.slice(e,s).forEach(r=>{const a=document.createElement("li");a.className="film-card",a.style.cursor="pointer",a.setAttribute("data-id",r.id);const c=F(r.vote_average);a.innerHTML=`
      <img src="https://image.tmdb.org/t/p/w500/${r.poster_path}" alt="${r.title} poster" />
      <div class="info">
        <div class="title">${r.title}</div>
        <div class="meta">${r.genres}</div>
        <div class="desc">${r.overview}</div>
        <div class="meta">IMDB: ${r.vote_average} (${r.vote_count} oy)</div>
        ${c}
      </div>
    `,a.addEventListener("click",()=>{typeof r.genres=="string"&&(r.genres=r.genres.split(",").map(n=>({name:n.trim()}))),C(r)}),p.appendChild(a)}),s>=l.length?u.style.display="none":u.style.display="block"}function y(){const e=E.value,s=L();e===""?l=s:l=s.filter(t=>typeof t.genres=="string"?t.genres.toLowerCase().includes(e.toLowerCase()):!1),g=1,p.innerHTML="",l.length===0?(p.style.display="none",b.style.display="block",u.style.display="none"):(p.style.display="flex",b.style.display="none",S())}E.addEventListener("change",y);u.addEventListener("click",()=>{g++,S()});f.forEach(e=>{e.addEventListener("click",()=>{f.forEach(s=>s.classList.remove("active")),e.classList.add("active"),y()})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".nav-link"),s=window.location.pathname.split("/").pop();e.forEach(t=>{t.getAttribute("href").split("/").pop()===s?t.classList.add("active"):t.classList.remove("active")})});function w(){l=L(),g=1,y()}m.addEventListener("libraryUpdated",()=>{console.log("libraryUpdated event received — rendering films again"),w()});w();
//# sourceMappingURL=library.js.map
