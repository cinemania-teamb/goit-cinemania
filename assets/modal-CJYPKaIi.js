import{b as y}from"./vendor-DOPN71bB.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();document.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&document.body.classList.add("dark-theme")});const v={menuToggleClass:".menu-toggle",mobileMenuId:"mobileMenu",mobileOverlayId:"mobileOverlay"},{menuToggleClass:h,mobileMenuId:b,mobileOverlayId:L}=v,m=document.querySelector(h),c=document.getElementById(b),u=document.getElementById(L);m.addEventListener("click",()=>{c.classList.toggle("open"),u.classList.toggle("active")});const I=document.getElementById("theme-switcher"),d=document.body;I.addEventListener("click",()=>{d.classList.toggle("dark-theme");const e=d.classList.contains("dark-theme");localStorage.setItem("theme",e?"dark":"light")});document.addEventListener("click",e=>{const r=c.contains(e.target),n=m.contains(e.target);!r&&!n&&(c.classList.remove("open"),u.classList.remove("active"))});const S=e=>{const r=y.create(`
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
              <button class="movie-submit" type="submit">Add to my library</button>
              </div>
            </form>
          `);r.show(),document.querySelector(".close").addEventListener("click",()=>{r.close()}),document.addEventListener("keyup",function(s){s.code==="Escape"&&r.close()});const i=document.getElementById("movie-form"),t=document.querySelector(".movie-submit");let o=a();o.some(s=>s.id===e.id)?t.textContent="Remove from my library":t.textContent="Add to my library",i.addEventListener("submit",s=>{if(s.preventDefault(),o=a(),t.textContent==="Remove from my library"){const g=a().filter(f=>f.id!==e.id);localStorage.setItem("movies",JSON.stringify(g)),t.textContent="Add to my library";return}const p={id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(l=>l.name).join(",")};o.push(p),localStorage.setItem("movies",JSON.stringify(o)),t.textContent="Remove from my library"})};function a(){let e;return localStorage.getItem("movies")===null?e=[]:e=JSON.parse(localStorage.getItem("movies")),e}export{S as m};
//# sourceMappingURL=modal-CJYPKaIi.js.map
