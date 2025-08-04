import{r as v}from"./assets/header-BKLDdgVw.js";import{a as w,b as x}from"./assets/vendor-oKrFQJru.js";const l=document.querySelector(".library-list"),i=document.querySelector(".load-more"),E="4e64f2e0a197aa7c5d1170773553320c";function h(){return JSON.parse(localStorage.getItem("movies"))||[]}let a=0;const m=9;function M(){const t=h();if(t.length===0){l.innerHTML='<li class="empty-library">OOPS... We are very sorry! You don’t have any movies at your library..</li>';return}if(t.length<=9)i.style.display="none",u(t);else{const o=t.slice(a,m);u(o),i.style.display="block",i.addEventListener("click",()=>{a+=9;const e=t.slice(a,a+m);if(e.length===0){i.style.display="none";return}u(e),a+m>=t.length&&(i.style.display="none")})}}document.addEventListener("DOMContentLoaded",()=>{const t=window.location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".nav-link").forEach(e=>{const r=e.getAttribute("href").split("/").pop();t===r?e.classList.add("active"):e.classList.remove("active")})});const u=t=>{const o=t.map(({id:e,title:r,poster_path:n,year:g,vote_average:c,genres:d})=>{const s=g.split("-")[0],p=v(Math.floor(c));return n&&`<li id="${e}" style="background-image: url(https://image.tmdb.org/t/p/w500/${n});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${r.toUpperCase()} <span style="color:#B7B7B7">${d} | ${s}</span></p>
              ${p}
          </div>
      </li>`}).join("");l.insertAdjacentHTML("beforeend",o)};l.addEventListener("click",async t=>{if(t.target.nodeName==="LI"){const o=t.target.id;try{const e=await w.get(`https://api.themoviedb.org/3/movie/${o}?api_key=${E}&language=en-US`);S(e.data)}catch(e){console.log(e)}}});M();const S=t=>{const o=x.create(`
            <form id="movie-form">
            <p class="close">&#10006;</p>
              <img src="https://image.tmdb.org/t/p/w500/${t.poster_path}" alt="${t.title}">
              <div>
                <h2>${t.title.toUpperCase()}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Vote/Votes</th>
                            <td><span class="vote">${Math.round(t.vote_average)}</span> / <span class="vote">${t.vote_count}</span></td>
                        </tr>
                        
                    </thead>
                    <tbody>
                        <tr>
                            <th>Popularity</th>
                            <td>${t.popularity}</td>
                        </tr>
                        <tr>
                            <th>Genre</th>
                            <td>${t.genres.map(n=>n.name).join(" ")}</td>
                        </tr>
                    </tbody>
                </table>
              <h3>ABOUT</h3>
              <p class="modal-info">${t.overview}</p>
              <button class="movie-submit" type="submit">Remove From My Library</button>
              </div>
            </form>
          `);o.show(),document.querySelector(".close").addEventListener("click",()=>{o.close()}),document.addEventListener("keyup",function(n){n.code==="Escape"&&o.close()}),document.getElementById("movie-form").addEventListener("submit",n=>{n.preventDefault();const c=h().filter(s=>s.id!==t.id);localStorage.setItem("movies",JSON.stringify(c));const d=c.map(({id:s,title:p,poster_path:y,year:b,vote_average:f,genres:$})=>{const L=b.split("-")[0],k=v(Math.floor(f));return y&&`<li id="${s}" style="background-image: url(https://image.tmdb.org/t/p/w500/${y});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${p.toUpperCase()} <span style="color:#B7B7B7">${$} | ${L}</span></p>
              ${k}
          </div>
      </li>`}).join("");l.innerHTML=d,o.close()})};new EventTarget;
//# sourceMappingURL=library.js.map
