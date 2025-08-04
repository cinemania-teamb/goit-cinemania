import{a as p,b as L}from"./vendor-wG9nbpZs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const _="4e64f2e0a197aa7c5d1170773553320c",I=document.querySelector(".list"),M=document.querySelector(".pagination ul");let y={input:"",year:"",isSearch:!1};const u=`<svg class="icon" id="stars-empty" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,h=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,m=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;let f=1,b=1;const B=async e=>{const t={method:"GET",url:"https://api.themoviedb.org/3/genre/movie/list?language=en",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWRkMzEzNDEyYzUzMjQyYTU2Nzc5ZjVjMWIwNWJlNSIsIm5iZiI6MTc1MzY5OTE4OS4xOTcsInN1YiI6IjY4ODc1Mzc1MGU0ODE4YTk5OTUyYjQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H565ZjOCGF6NhGwiaRj-BAZ12tadYHWeWDarSsxXtc4"}};try{const r=(await p.request(t)).data.genres;return e.map(o=>{var s;return((s=r.find(c=>o===c.id))==null?void 0:s.name)||"undefined"}).join(" ")}catch{return!1}},x=async(e=1)=>{const t=`https://api.themoviedb.org/3/trending/movie/week?api_key=${_}&language=en-US&page=${e}`;try{const n=await p.get(t);return{filteredData:await Promise.all(n.data.results.map(async a=>({title:a.title||a.name,rating:Math.round(a.vote_average),genreId:await B(a.genre_ids),year:a.release_date||a.first_air_date,id:a.id,image:a.poster_path}))),total_pages:n.data.total_pages}}catch{return!1}},j=async(e,t=null,n)=>{const r=t!==null?`https://api.themoviedb.org/3/search/movie?api_key=${_}&query=${e}&include_adult=false&language=en-US&page=${n}&primary_release_year=${t}`:`https://api.themoviedb.org/3/search/movie?api_key=${_}&query=${e}&include_adult=false&language=en-US&page=${n}`;try{const a=await p.get(r);return{filteredFilms:a.data.results.map(s=>({title:s.title||s.name,rating:Math.round(s.vote_average),genreId:s.genre_ids,year:s.release_date||s.first_air_date,id:s.id,image:s.poster_path})),total_pages:a.data.total_pages}}catch(a){return a.data}},E=e=>{I.innerHTML="";const t=e.map(({id:n,title:r,image:a,year:o,rating:s,genreId:c})=>{const i=o.split("-")[0],g=O(s);return a&&`<li id="${n}" style="background-image: url(https://image.tmdb.org/t/p/w500/${a});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${r.toUpperCase()} <span style="color:#B7B7B7">${c} | ${i}</span></p>
              ${g}
          </div>
      </li>`}).join("");I.insertAdjacentHTML("beforeend",t)},T=(e,t)=>{M.innerHTML="";let n="";t>1&&(n+=`<li data-page="${t-1}" class="prev"><</li>`);let r=Math.max(1,t-2),a=Math.min(e,t+2);for(let o=r;o<=a;o++)n+=`<li data-page="${o}" class="${o===t?"active":""}">${o}</li>`;t<e&&(n+=`<li data-page="${t+1}" class="next">></li>`),M.innerHTML=n},W=async(e=1)=>{try{const{filteredData:t,total_pages:n}=await x(e);b=n,f=e,E(t),T(b,f),y={input:"",year:"",isSearch:!1}}catch(t){console.log(t)}},J=async(e,t,n=1)=>{try{const{filteredFilms:r,total_pages:a}=await j(e,t,n);return b=a,f=n,r.length===0?(I.innerHTML='<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>',M.innerHTML="",y={input:"",year:"",isSearch:!1},y):(E(r),T(b,f),y={input:e,year:t,isSearch:!0},y)}catch(r){console.log(r)}},O=e=>{let t="";switch(e){case 0:t=`${u.repeat(5)}`;break;case 1:t=`${h}${u.repeat(4)}`;break;case 2:t=`${m}${u.repeat(4)}`;break;case 3:t=`${m}${h}${u.repeat(3)}`;break;case 4:t=`${m.repeat(2)}${u.repeat(3)}`;break;case 5:t=`${m.repeat(2)}${h}${u.repeat(2)}`;break;case 6:t=`${m.repeat(3)}${u.repeat(2)}`;break;case 7:t=`${m.repeat(3)}${h}${u}`;break;case 8:t=`${m.repeat(4)}${u}`;break;case 9:t=`${m.repeat(4)}${h}`;break;case 10:t=`${m.repeat(5)}`;break;default:throw new Error("Invalid rating")}return`<div>${t}</div>`},N=e=>{const t=L.create(`
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
          `);t.show(),document.querySelector(".close").addEventListener("click",()=>{t.close()}),document.addEventListener("keyup",function(s){s.code==="Escape"&&t.close()});const r=document.getElementById("movie-form"),a=document.querySelector(".movie-submit");let o=w();o.some(s=>s.id===e.id)?a.textContent="Remove from my library":a.textContent="Add to my library",r.addEventListener("submit",s=>{if(s.preventDefault(),o=w(),a.textContent==="Remove from my library"){const g=w().filter(d=>d.id!==e.id);localStorage.setItem("movies",JSON.stringify(g)),a.textContent="Add to my library";return}const c={id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(i=>i.name).join(","),year:e.release_date.split("-")[0]};o.push(c),localStorage.setItem("movies",JSON.stringify(o)),a.textContent="Remove from my library"})};function w(){let e;return localStorage.getItem("movies")===null?e=[]:e=JSON.parse(localStorage.getItem("movies")),e}const S="4e64f2e0a197aa7c5d1170773553320c",v=document.querySelector(".hero-section"),q=async()=>{try{const e=await p.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${S}`),{results:t}=e.data;if(t.length===0)v.style.backgroundImage="url(../img/noresult.jpg)",v.innerHTML=`
      <div class="container position-container">
        <h1>Let’s Make Your Own Cinema</h1>
        <p>Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
        <a href="./catolog.html" class="link-trailer">Get Started</a>
      `;else{const n=Math.floor(Math.random()*t.length),r=t[n];v.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${r.backdrop_path})`,v.innerHTML=`
      <div class="container position-container">
        <h1>${r.title}</h1>
        <div class= rating-svg>
          ${O(Math.round(r.vote_average))}
        </div>
        <p>${r.overview}</p>
        <button data-id=${r.id} class="trailer">Watch trailer</button>
        <button data-id=${r.id} id="details" class="details">More details</button>
      </div>
    `,document.getElementById("details").addEventListener("click",async s=>{if(s.target.nodeName==="BUTTON"){const c=s.target.dataset.id;try{const i=await p.get(`https://api.themoviedb.org/3/movie/${c}?api_key=${S}&language=en-US`);N(i.data)}catch(i){console.log(i)}}});const o=document.querySelector(".trailer");o.addEventListener("click",async s=>{const c=o.dataset.id;if(s.target.nodeName==="BUTTON")try{const d=(await p.get(`https://api.themoviedb.org/3/movie/${c}/videos?api_key=${S}&language=en-US`)).data.results.find(l=>l.type==="Trailer"&&l.site==="YouTube");if(d){const l=L.create(`
              <div class="modal-trailer" style="width:700px; height: 400px;">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${d.key}" frameborder="0" allowfullscreen></iframe>
                <p class="close">&#10006;</p>
              </div>
               
            `);l.show(),document.querySelector(".close").addEventListener("click",()=>{l.close()}),document.addEventListener("keyup",function(k){k.code==="Escape"&&l.close()})}else{const l=L.create(`
              <div class="no-trailer">
                
                <p>OOPS... We are very sorry! But we couldn’t find the trailer.</p>
                <img src="../img/sorry.jpg" width="363" height="318" alt="Sorry image">
                <p class="close">&#10006;</p>
              </div>
              
            `);l.show(),document.querySelector(".close").addEventListener("click",()=>{l.close()}),document.addEventListener("keyup",function(k){k.code==="Escape"&&l.close()})}}catch(i){console.log(i)}})}}catch(e){console.log(e)}};q();document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("scrollToTopBtn");window.addEventListener("scroll",()=>{window.pageYOffset>300?e.classList.add("visible"):e.classList.remove("visible")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});function C(){document.onreadystatechange=function(){if(document.readyState==="complete"){document.querySelector("body").style.visibility="visible";const e=document.querySelector("#loader");e&&e.classList.remove("show-loader")}else setTimeout(function(){document.querySelector("body").style.visibility="visible";const e=document.querySelector("#loader");e&&e.classList.remove("show-loader")},3e3)}}C();function U(){localStorage.getItem("theme")==="dark"&&document.body.classList.add("dark-theme");const t={menuToggleClass:".menu-toggle",mobileMenuId:"mobileMenu",mobileOverlayId:"mobileOverlay"},{menuToggleClass:n,mobileMenuId:r,mobileOverlayId:a}=t,o=document.querySelector(n),s=document.getElementById(r),c=document.getElementById(a);o.addEventListener("click",()=>{s.classList.toggle("open"),c.classList.toggle("active")});const i=document.getElementById("theme-switcher"),g=document.body;i.addEventListener("click",()=>{g.classList.toggle("dark-theme");const d=g.classList.contains("dark-theme");localStorage.setItem("theme",d?"dark":"light")}),document.addEventListener("click",d=>{const l=s.contains(d.target),$=o.contains(d.target);!l&&!$&&(s.classList.remove("open"),c.classList.remove("active"))})}U();export{W as a,B as g,J as l,N as m,O as r};
//# sourceMappingURL=header-B6uRz9BL.js.map
