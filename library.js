import{r as L}from"./assets/footer-modal-C2qfpMKf.js";import{a as E,b as $}from"./assets/vendor-wG9nbpZs.js";const c=document.querySelector(".library-list"),l=document.querySelector(".load-more"),k=document.getElementById("category"),S="4e64f2e0a197aa7c5d1170773553320c";let r=0;const d=9;let p=[];function u(){return JSON.parse(localStorage.getItem("movies"))||[]}function v(e,t=!1){t&&(c.innerHTML="");const n=e.map(({id:o,title:i,poster_path:s,year:g,vote_average:a,genres:m})=>{const f=g.split("-")[0],b=L(Math.floor(a));return s&&`<li id="${o}" style="background-image: url(https://image.tmdb.org/t/p/w500/${s});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${i.toUpperCase()} <span style="color:#B7B7B7">${m} | ${f}</span></p>
              ${b}
          </div>
      </li>`}).join("");c.insertAdjacentHTML("beforeend",n)}function h(){r+d>=p.length?l.style.display="none":l.style.display="block"}function y(e=u()){if(p=e,r=0,e.length===0){c.innerHTML='<li class="empty-library">OOPS... We are very sorry! You don’t have any movies at your library.. <a href="./catolog.html" class="started">Get Started</a></li>',l.style.display="none";return}const t=e.slice(r,d);v(t,!0),h()}l.addEventListener("click",()=>{r+=d;const e=p.slice(r,r+d);v(e),h()});k.onchange=function(e){const t=u(),n=e.target.value,o=t.filter(i=>i.genres.split(",").includes(n));y(o)};c.addEventListener("click",async e=>{const t=e.target.closest("li[id]");if(!t)return;const n=t.id;try{const o=await E.get(`https://api.themoviedb.org/3/movie/${n}?api_key=${S}&language=en-US`);w(o.data)}catch(o){console.log(o)}});function w(e){const t=$.create(`
    <form id="movie-form">
      <p class="close">&#10006;</p>
      <img src="https://image.tmdb.org/t/p/w500/${e.poster_path}" alt="${e.title}">
      <div>
        <h2>${e.title.toUpperCase()}</h2>
        <table>
          <thead>
            <tr>
              <th>Vote/Votes</th>
              <td><span class="vote">${Math.round(e.vote_average)}</span> / <span class="vote">${e.vote_count}</span></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Popularity</th>
              <td>${e.popularity}</td>
            </tr>
            <tr>
              <th>Genre</th>
              <td>${e.genres.map(s=>s.name).join(" ")}</td>
            </tr>
          </tbody>
        </table>
        <h3>ABOUT</h3>
        <p class="modal-info">${e.overview}</p>
        <button class="movie-submit" type="submit">Remove From My Library</button>
      </div>
    </form>
  `);t.show(),document.querySelector(".close").addEventListener("click",()=>{t.close(),document.removeEventListener("keyup",o)});function o(s){s.code==="Escape"&&(t.close(),document.removeEventListener("keyup",o))}document.addEventListener("keyup",o),document.getElementById("movie-form").addEventListener("submit",s=>{s.preventDefault();const a=u().filter(m=>m.id!==e.id);localStorage.setItem("movies",JSON.stringify(a)),y(a),t.close(),document.removeEventListener("keyup",o)})}document.addEventListener("DOMContentLoaded",()=>{const e=window.location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".nav-link").forEach(n=>{const o=n.getAttribute("href").split("/").pop();e===o?n.classList.add("active"):n.classList.remove("active")})});y();
//# sourceMappingURL=library.js.map
