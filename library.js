import"./assets/header-BYFhdvTp.js";/* empty css                     */import{b}from"./assets/vendor-DOPN71bB.js";const g=new EventTarget,$=e=>{typeof e.genres=="string"&&(e.genres=e.genres.split(",").map(a=>({name:a.trim()})));const r=b.create(`
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
              <td>${e.genres.map(a=>a.name).join(", ")}</td>
            </tr>
          </tbody>
        </table>
        <h3>ABOUT</h3>
        <p>${e.overview}</p>
        <button class="movie-submit" type="submit">Add to my library</button>
      </div>
    </form>
  `);r.show(),document.querySelector(".close").addEventListener("click",()=>{r.close()});const t=a=>{a.key==="Escape"&&(r.close(),document.removeEventListener("keyup",t))};document.addEventListener("keyup",t);const l=document.getElementById("movie-form"),o=document.querySelector(".movie-submit");let i=u();i.some(a=>a.id===e.id)?o.textContent="Remove from my library":o.textContent="Add to my library",l.addEventListener("submit",a=>{if(a.preventDefault(),i=u(),o.textContent==="Remove from my library"){const p=i.filter(h=>String(h.id)!==String(e.id));localStorage.setItem("movies",JSON.stringify(p)),g.dispatchEvent(new CustomEvent("libraryUpdated")),r.close();return}i.push({id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(p=>p.name).join(",")}),localStorage.setItem("movies",JSON.stringify(i)),o.textContent="Remove from my library",g.dispatchEvent(new CustomEvent("libraryUpdated"))})};function u(){return JSON.parse(localStorage.getItem("movies"))||[]}const d=document.querySelector(".library__gallery"),m=document.getElementById("empty-state"),y=document.querySelectorAll(".tab"),s=`<svg class="icon" width="18" height="18">
  <use href="./icons.svg#icon-star-outline"></use>
</svg>`,c=`<svg class="icon" fill="#F87719" width="18" height="18">
  <use href="./icons.svg#icon-star-half"></use>
</svg>`,n=`<svg class="icon" fill="#F87719" width="18" height="18">
  <use href="./icons.svg#icon-star"></use>
</svg>`;function f(){return JSON.parse(localStorage.getItem("movies"))||[]}function E(e){const r=Math.round(e);let t="";switch(r){case 0:t=`${s.repeat(5)}`;break;case 1:t=`${c}${s.repeat(4)}`;break;case 2:t=`${n}${s.repeat(4)}`;break;case 3:t=`${n}${c}${s.repeat(3)}`;break;case 4:t=`${n.repeat(2)}${s.repeat(3)}`;break;case 5:t=`${n.repeat(2)}${c}${s.repeat(2)}`;break;case 6:t=`${n.repeat(3)}${s.repeat(2)}`;break;case 7:t=`${n.repeat(3)}${c}${s}`;break;case 8:t=`${n.repeat(4)}${s}`;break;case 9:t=`${n.repeat(4)}${c}`;break;case 10:t=`${n.repeat(5)}`;break;default:t=`${s.repeat(5)}`}return`<div class="rating-stars">${t}</div>`}function v(){const e=f();if(d.innerHTML="",e.length===0){d.style.display="none",m.style.display="block";return}d.style.display="flex",m.style.display="none",e.forEach(r=>{const t=document.createElement("li");t.className="film-card",t.style.cursor="pointer",t.setAttribute("data-id",r.id);const l=E(r.vote_average);t.innerHTML=`
      <img src="https://image.tmdb.org/t/p/w500/${r.poster_path}" alt="${r.title} poster" />
      <div class="info">
        <div class="title">${r.title}</div>
        <div class="meta">${r.genres}</div>
        <div class="desc">${r.overview}</div>
        <div class="meta">IMDB: ${r.vote_average} (${r.vote_count} oy)</div>
        ${l}
      </div>
    `,t.addEventListener("click",()=>{typeof r.genres=="string"&&(r.genres=r.genres.split(",").map(o=>({name:o.trim()}))),$(r)}),d.appendChild(t)})}y.forEach(e=>{e.addEventListener("click",()=>{y.forEach(r=>r.classList.remove("active")),e.classList.add("active"),v()})});v();g.addEventListener("libraryUpdated",()=>{console.log("libraryUpdated event received — rendering films again"),v()});
//# sourceMappingURL=library.js.map
