import"./assets/header-BYFhdvTp.js";/* empty css                     */import{b as g}from"./assets/vendor-DOPN71bB.js";const l=new EventTarget,u=t=>{typeof t.genres=="string"&&(t.genres=t.genres.split(",").map(s=>({name:s.trim()})));const e=g.create(`
    <form id="movie-form">
      <p class="close" style="cursor:pointer;">&#10006;</p>
      <img src="https://image.tmdb.org/t/p/w500/${t.poster_path}" alt="${t.title}" width="375" height="478" />
      <div>
        <h2>${t.title.toUpperCase()}</h2>
        <table>
          <thead>
            <tr>
              <th>Vote/Votes</th>
              <td><span class="vote">${t.vote_average}</span> / <span class="vote">${t.vote_count}</span></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Popularity</th>
              <td>${t.popularity}</td>
            </tr>
            <tr>
              <th>Genre</th>
              <td>${t.genres.map(s=>s.name).join(", ")}</td>
            </tr>
          </tbody>
        </table>
        <h3>ABOUT</h3>
        <p>${t.overview}</p>
        <button class="movie-submit" type="submit">Add to my library</button>
      </div>
    </form>
  `);e.show(),document.querySelector(".close").addEventListener("click",()=>{e.close()});const r=s=>{s.key==="Escape"&&(e.close(),document.removeEventListener("keyup",r))};document.addEventListener("keyup",r);const i=document.getElementById("movie-form"),o=document.querySelector(".movie-submit");let n=p();n.some(s=>s.id===t.id)?o.textContent="Remove from my library":o.textContent="Add to my library",i.addEventListener("submit",s=>{if(s.preventDefault(),n=p(),o.textContent==="Remove from my library"){const d=n.filter(v=>String(v.id)!==String(t.id));localStorage.setItem("movies",JSON.stringify(d)),l.dispatchEvent(new CustomEvent("libraryUpdated")),e.close();return}n.push({id:t.id,title:t.title,poster_path:t.poster_path,overview:t.overview,vote_average:t.vote_average,vote_count:t.vote_count,popularity:t.popularity,genres:t.genres.map(d=>d.name).join(",")}),localStorage.setItem("movies",JSON.stringify(n)),o.textContent="Remove from my library",l.dispatchEvent(new CustomEvent("libraryUpdated"))})};function p(){return JSON.parse(localStorage.getItem("movies"))||[]}const a=document.querySelector(".library__gallery"),m=document.getElementById("empty-state"),y=document.querySelectorAll(".tab");function h(){return JSON.parse(localStorage.getItem("movies"))||[]}function c(){const t=h();if(a.innerHTML="",t.length===0){a.style.display="none",m.style.display="block";return}a.style.display="flex",m.style.display="none",t.forEach(e=>{const r=document.createElement("li");r.className="film-card",r.style.cursor="pointer",r.setAttribute("data-id",e.id),r.innerHTML=`
      <img src="https://image.tmdb.org/t/p/w500/${e.poster_path}" alt="${e.title} poster" />
      <div class="info">
        <div class="title">${e.title}</div>
        <div class="meta">${e.genres}</div>
        <div class="desc">${e.overview}</div>
        <div class="meta">IMDB: ${e.vote_average} (${e.vote_count} oy)</div>
      </div>
    `,r.addEventListener("click",()=>{typeof e.genres=="string"&&(e.genres=e.genres.split(",").map(i=>({name:i.trim()}))),u(e)}),a.appendChild(r)})}y.forEach(t=>{t.addEventListener("click",()=>{y.forEach(e=>e.classList.remove("active")),t.classList.add("active"),c()})});c();l.addEventListener("libraryUpdated",()=>{console.log("libraryUpdated event received — rendering films again"),c()});
//# sourceMappingURL=library.js.map
