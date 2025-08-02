import{b as y}from"./vendor-DOPN71bB.js";document.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&document.body.classList.add("dark-theme")});const h={menuToggleClass:".menu-toggle",mobileMenuId:"mobileMenu",mobileOverlayId:"mobileOverlay"},{menuToggleClass:b,mobileMenuId:f,mobileOverlayId:L}=h,d=document.querySelector(b),r=document.getElementById(f),m=document.getElementById(L);d.addEventListener("click",()=>{r.classList.toggle("open"),m.classList.toggle("active")});const I=document.getElementById("theme-switcher"),c=document.body;I.addEventListener("click",()=>{c.classList.toggle("dark-theme");const t=c.classList.contains("dark-theme");localStorage.setItem("theme",t?"dark":"light")});document.addEventListener("click",t=>{const o=r.contains(t.target),i=d.contains(t.target);!o&&!i&&(r.classList.remove("open"),m.classList.remove("active"))});const k=t=>{const o=y.create(`
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
                            <td>${t.genres.map(e=>e.name).join(" ")}</td>
                        </tr>
                    </tbody>
                </table>
              <h3>ABOUT</h3>
              <p class="modal-info">${t.overview}</p>
              <button class="movie-submit" type="submit">Add to my library</button>
              </div>
            </form>
          `);o.show(),document.querySelector(".close").addEventListener("click",()=>{o.close()}),document.addEventListener("keyup",function(e){e.code==="Escape"&&o.close()});const u=document.getElementById("movie-form"),s=document.querySelector(".movie-submit");let n=a();n.some(e=>e.id===t.id)?s.textContent="Remove from my library":s.textContent="Add to my library",u.addEventListener("submit",e=>{if(e.preventDefault(),n=a(),s.textContent==="Remove from my library"){const p=a().filter(v=>v.id!==t.id);localStorage.setItem("movies",JSON.stringify(p)),s.textContent="Add to my library";return}const g={id:t.id,title:t.title,poster_path:t.poster_path,overview:t.overview,vote_average:t.vote_average,vote_count:t.vote_count,popularity:t.popularity,genres:t.genres.map(l=>l.name).join(",")};n.push(g),localStorage.setItem("movies",JSON.stringify(n)),s.textContent="Remove from my library"})};function a(){let t;return localStorage.getItem("movies")===null?t=[]:t=JSON.parse(localStorage.getItem("movies")),t}export{k as m};
//# sourceMappingURL=modal-B6ENpYm-.js.map
