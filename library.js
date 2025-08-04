import{r as v}from"./assets/header-Cs04khq2.js";import{a as w,b as x}from"./assets/vendor-oKrFQJru.js";const d=document.querySelector(".library-list");let s=document.querySelector(".load-more");const E="4e64f2e0a197aa7c5d1170773553320c";function y(){return JSON.parse(localStorage.getItem("movies"))||[]}let r=0;const g=9;document.getElementById("category").onchange=function(e){d.innerHTML="";const t=y(),n=e.target.value,i=[];if(t.forEach(o=>{o.genres.split(",").includes(n)&&i.push(o)}),i.length<=9)s.style.display="none",l(i);else{r=0;const o=i.slice(r,g);l(o);const p=s.cloneNode(!0);s.parentNode.replaceChild(p,s),s=document.querySelector(".load-more"),s.style.display="block",s.addEventListener("click",()=>{r+=9;const a=i.slice(r,r+g);if(a.length===0){s.style.display="none";return}l(a),r+g>=i.length&&(s.style.display="none")})}};function M(){const e=y();if(e.length===0){d.innerHTML='<li class="empty-library">OOPS... We are very sorry! You don’t have any movies at your library..</li>';return}if(e.length<=9)s.style.display="none",l(e);else{let t=0;const n=9,i=e.slice(t,n);l(i),s.style.display="block",s.addEventListener("click",()=>{t+=9;const o=e.slice(t,t+n);if(o.length===0){s.style.display="none";return}l(o),t+n>=e.length&&(s.style.display="none")})}}document.addEventListener("DOMContentLoaded",()=>{const e=window.location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".nav-link").forEach(n=>{const i=n.getAttribute("href").split("/").pop();e===i?n.classList.add("active"):n.classList.remove("active")})});const l=e=>{const t=e.map(({id:n,title:i,poster_path:o,year:p,vote_average:a,genres:m})=>{const c=p.split("-")[0],u=v(Math.floor(a));return o&&`<li id="${n}" style="background-image: url(https://image.tmdb.org/t/p/w500/${o});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${i.toUpperCase()} <span style="color:#B7B7B7">${m} | ${c}</span></p>
              ${u}
          </div>
      </li>`}).join("");d.insertAdjacentHTML("beforeend",t)};d.addEventListener("click",async e=>{if(e.target.nodeName==="LI"){const t=e.target.id;try{const n=await w.get(`https://api.themoviedb.org/3/movie/${t}?api_key=${E}&language=en-US`);S(n.data)}catch(n){console.log(n)}}});M();const S=e=>{const t=x.create(`
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
                            <td>${e.genres.map(o=>o.name).join(" ")}</td>
                        </tr>
                    </tbody>
                </table>
              <h3>ABOUT</h3>
              <p class="modal-info">${e.overview}</p>
              <button class="movie-submit" type="submit">Remove From My Library</button>
              </div>
            </form>
          `);t.show(),document.querySelector(".close").addEventListener("click",()=>{t.close()}),document.addEventListener("keyup",function(o){o.code==="Escape"&&t.close()}),document.getElementById("movie-form").addEventListener("submit",o=>{o.preventDefault();const a=y().filter(c=>c.id!==e.id);localStorage.setItem("movies",JSON.stringify(a));const m=a.map(({id:c,title:u,poster_path:h,year:f,vote_average:b,genres:L})=>{const $=f.split("-")[0],k=v(Math.floor(b));return h&&`<li id="${c}" style="background-image: url(https://image.tmdb.org/t/p/w500/${h});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${u.toUpperCase()} <span style="color:#B7B7B7">${L} | ${$}</span></p>
              ${k}
          </div>
      </li>`}).join("");d.innerHTML=m,t.close()})};
//# sourceMappingURL=library.js.map
