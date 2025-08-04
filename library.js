import{r as h}from"./assets/header-BKLDdgVw.js";import{a as w,b as x}from"./assets/vendor-oKrFQJru.js";const l=document.querySelector(".library-list"),i=document.querySelector(".load-more"),B="4e64f2e0a197aa7c5d1170773553320c";function v(){return JSON.parse(localStorage.getItem("movies"))||[]}let r=0;const p=9;function M(){const t=v();if(t.length===0){l.innerHTML='<li class="empty-library">OOPS... We are very sorry! You don’t have any movies at your library..</li>';return}if(t.length<=9)i.style.display="none",m(t);else{const e=t.slice(r,p);m(e),i.style.display="block",i.addEventListener("click",()=>{r+=9;const o=t.slice(r,r+p);if(o.length===0){i.style.display="none";return}m(o),r+p>=t.length&&(i.style.display="none")})}}const m=t=>{const e=t.map(({id:o,title:g,poster_path:n,year:u,vote_average:a,genres:c})=>{const s=u.split("-")[0],d=h(Math.floor(a));return n&&`<li id="${o}" style="background-image: url(https://image.tmdb.org/t/p/w500/${n});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${g.toUpperCase()} <span style="color:#B7B7B7">${c} | ${s}</span></p>
              ${d}
          </div>
      </li>`}).join("");l.insertAdjacentHTML("beforeend",e)};l.addEventListener("click",async t=>{if(t.target.nodeName==="LI"){const e=t.target.id;try{const o=await w.get(`https://api.themoviedb.org/3/movie/${e}?api_key=${B}&language=en-US`);S(o.data)}catch(o){console.log(o)}}});M();const S=t=>{const e=x.create(`
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
          `);e.show(),document.querySelector(".close").addEventListener("click",()=>{e.close()}),document.addEventListener("keyup",function(n){n.code==="Escape"&&e.close()}),document.getElementById("movie-form").addEventListener("submit",n=>{n.preventDefault();const a=v().filter(s=>s.id!==t.id);localStorage.setItem("movies",JSON.stringify(a));const c=a.map(({id:s,title:d,poster_path:y,year:b,vote_average:f,genres:$})=>{const L=b.split("-")[0],k=h(Math.floor(f));return y&&`<li id="${s}" style="background-image: url(https://image.tmdb.org/t/p/w500/${y});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${d.toUpperCase()} <span style="color:#B7B7B7">${$} | ${L}</span></p>
              ${k}
          </div>
      </li>`}).join("");l.innerHTML=c,e.close()})};new EventTarget;
//# sourceMappingURL=library.js.map
