import{a as m,b as k}from"./vendor-oKrFQJru.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();const S="4e64f2e0a197aa7c5d1170773553320c",_=document.querySelector(".list"),E=document.querySelector(".pagination ul");let g={input:"",year:"",isSearch:!1};const d=`<svg class="icon" id="stars-empty" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,p=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,u=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;let f=1,b=1;const B=async e=>{const t={method:"GET",url:"https://api.themoviedb.org/3/genre/movie/list?language=en",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWRkMzEzNDEyYzUzMjQyYTU2Nzc5ZjVjMWIwNWJlNSIsIm5iZiI6MTc1MzY5OTE4OS4xOTcsInN1YiI6IjY4ODc1Mzc1MGU0ODE4YTk5OTUyYjQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H565ZjOCGF6NhGwiaRj-BAZ12tadYHWeWDarSsxXtc4"}};try{const n=(await m.request(t)).data.genres;return e.map(s=>{var o;return((o=n.find(l=>s===l.id))==null?void 0:o.name)||"undefined"}).join(" ")}catch{return!1}},x=async(e=1)=>{const t=`https://api.themoviedb.org/3/trending/movie/week?api_key=${S}&language=en-US&page=${e}`;try{const r=await m.get(t);return{filteredData:await Promise.all(r.data.results.map(async a=>({title:a.title||a.name,rating:Math.round(a.vote_average),genreId:await B(a.genre_ids),year:a.release_date||a.first_air_date,id:a.id,image:a.poster_path}))),total_pages:r.data.total_pages}}catch{return!1}},j=async(e,t=null,r)=>{const n=t!==null?`https://api.themoviedb.org/3/search/movie?api_key=${S}&query=${e}&include_adult=false&language=en-US&page=${r}&primary_release_year=${t}`:`https://api.themoviedb.org/3/search/movie?api_key=${S}&query=${e}&include_adult=false&language=en-US&page=${r}`;try{const a=await m.get(n);return{filteredFilms:a.data.results.map(o=>({title:o.title||o.name,rating:Math.round(o.vote_average),genreId:o.genre_ids,year:o.release_date||o.first_air_date,id:o.id,image:o.poster_path})),total_pages:a.data.total_pages}}catch(a){return a.data}},I=e=>{_.innerHTML="";const t=e.map(({id:r,title:n,image:a,year:s,rating:o,genreId:l})=>{const i=s.split("-")[0],h=O(o);return a&&`<li id="${r}" style="background-image: url(https://image.tmdb.org/t/p/w500/${a});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${n.toUpperCase()} <span style="color:#B7B7B7">${l} | ${i}</span></p>
              ${h}
          </div>
      </li>`}).join("");_.insertAdjacentHTML("beforeend",t)},M=(e,t)=>{E.innerHTML="";let r="";t>1&&(r+=`<li data-page="${t-1}" class="prev"><</li>`);let n=Math.max(1,t-2),a=Math.min(e,t+2);for(let s=n;s<=a;s++)r+=`<li data-page="${s}" class="${s===t?"active":""}">${s}</li>`;t<e&&(r+=`<li data-page="${t+1}" class="next">></li>`),E.innerHTML=r},W=async(e=1)=>{try{const{filteredData:t,total_pages:r}=await x(e);b=r,f=e,I(t),M(b,f),g={input:"",year:"",isSearch:!1}}catch(t){console.log(t)}},C=async(e,t,r=1)=>{try{const{filteredFilms:n,total_pages:a}=await j(e,t,r);return b=a,f=r,n.length===0?(_.innerHTML='<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>',E.innerHTML="",g={input:"",year:"",isSearch:!1},g):(I(n),M(b,f),g={input:e,year:t,isSearch:!0},g)}catch(n){console.log(n)}},O=e=>{let t="";switch(e){case 0:t=`${d.repeat(5)}`;break;case 1:t=`${p}${d.repeat(4)}`;break;case 2:t=`${u}${d.repeat(4)}`;break;case 3:t=`${u}${p}${d.repeat(3)}`;break;case 4:t=`${u.repeat(2)}${d.repeat(3)}`;break;case 5:t=`${u.repeat(2)}${p}${d.repeat(2)}`;break;case 6:t=`${u.repeat(3)}${d.repeat(2)}`;break;case 7:t=`${u.repeat(3)}${p}${d}`;break;case 8:t=`${u.repeat(4)}${d}`;break;case 9:t=`${u.repeat(4)}${p}`;break;case 10:t=`${u.repeat(5)}`;break;default:throw new Error("Invalid rating")}return`<div>${t}</div>`},N=e=>{const t=k.create(`
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
              <button class="movie-submit" type="submit">Add to my library</button>
              </div>
            </form>
          `);t.show(),document.querySelector(".close").addEventListener("click",()=>{t.close()}),document.addEventListener("keyup",function(o){o.code==="Escape"&&t.close()});const n=document.getElementById("movie-form"),a=document.querySelector(".movie-submit");let s=w();s.some(o=>o.id===e.id)?a.textContent="Remove from my library":a.textContent="Add to my library",n.addEventListener("submit",o=>{if(o.preventDefault(),s=w(),a.textContent==="Remove from my library"){const h=w().filter(y=>y.id!==e.id);localStorage.setItem("movies",JSON.stringify(h)),a.textContent="Add to my library";return}const l={id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(i=>i.name).join(","),year:e.release_date.split("-")[0]};s.push(l),localStorage.setItem("movies",JSON.stringify(s)),a.textContent="Remove from my library"})};function w(){let e;return localStorage.getItem("movies")===null?e=[]:e=JSON.parse(localStorage.getItem("movies")),e}const L="4e64f2e0a197aa7c5d1170773553320c",v=document.querySelector(".hero-section"),q=async()=>{try{const e=await m.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${L}`),{results:t}=e.data;if(t.length===0)v.style.backgroundImage="url(../img/noresult.jpg)",v.innerHTML=`
      <div class="container position-container">
        <h1>Let’s Make Your Own Cinema</h1>
        <p>Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
        <a href="./catolog.html" class="link-trailer">Get Started</a>
      `;else{const r=Math.floor(Math.random()*t.length),n=t[r];v.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${n.backdrop_path})`,v.innerHTML=`
      <div class="container position-container">
        <h1>${n.title}</h1>
        <div class= rating-svg>
          ${O(Math.round(n.vote_average))}
        </div>
        <p>${n.overview}</p>
        <button data-id=${n.id} class="trailer">Watch trailer</button>
        <button data-id=${n.id} id="details" class="details">More details</button>
      </div>
    `,document.getElementById("details").addEventListener("click",async o=>{if(o.target.nodeName==="BUTTON"){const l=o.target.dataset.id;try{const i=await m.get(`https://api.themoviedb.org/3/movie/${l}?api_key=${L}&language=en-US`);N(i.data)}catch(i){console.log(i)}}});const s=document.querySelector(".trailer");s.addEventListener("click",async o=>{const l=s.dataset.id;if(o.target.nodeName==="BUTTON")try{const y=(await m.get(`https://api.themoviedb.org/3/movie/${l}/videos?api_key=${L}&language=en-US`)).data.results.find(c=>c.type==="Trailer"&&c.site==="YouTube");if(y){const c=k.create(`
              <div class="modal-trailer" style="width:700px; height: 400px;">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${y.key}" frameborder="0" allowfullscreen></iframe>
                <p class="close">&#10006;</p>
              </div>
               
            `);c.show(),document.querySelector(".close").addEventListener("click",()=>{c.close()}),document.addEventListener("keyup",function($){$.code==="Escape"&&c.close()})}else{const c=k.create(`
              <div class="no-trailer">
                
                <p>OOPS... We are very sorry! But we couldn’t find the trailer.</p>
                <img src="../img/sorry.jpg" width="363" height="318" alt="Sorry image">
                <p class="close">&#10006;</p>
              </div>
              
            `);c.show(),document.querySelector(".close").addEventListener("click",()=>{c.close()}),document.addEventListener("keyup",function($){$.code==="Escape"&&c.close()})}}catch(i){console.log(i)}})}}catch(e){console.log(e)}};q();document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("scrollToTopBtn");window.addEventListener("scroll",()=>{window.pageYOffset>300?e.classList.add("visible"):e.classList.remove("visible")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});function U(){document.onreadystatechange=function(){if(document.readyState==="complete"){document.querySelector("body").style.visibility="visible";const e=document.querySelector("#loader");e&&e.classList.remove("show-loader")}else setTimeout(function(){document.querySelector("body").style.visibility="visible";const e=document.querySelector("#loader");e&&e.classList.remove("show-loader")},3e3)}}U();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".menu-toggle"),t=document.getElementById("mobileMenu"),r=document.getElementById("mobileOverlay"),n=document.getElementById("theme-switcher");if(!e||!t||!r||!n){console.error("Elementler bulunamadı");return}const a=()=>{t.classList.toggle("open"),r.classList.toggle("active"),document.body.classList.toggle("no-scroll"),e.setAttribute("aria-expanded",t.classList.contains("open"))};e.addEventListener("click",o=>{o.stopPropagation(),a()}),r.addEventListener("click",a),n.addEventListener("click",()=>{document.body.classList.toggle("dark-theme"),localStorage.setItem("theme",document.body.classList.contains("dark-theme")?"dark":"light")}),localStorage.getItem("theme")==="dark"&&document.body.classList.add("dark-theme"),document.addEventListener("keydown",o=>{o.key==="Escape"&&t.classList.contains("open")&&a()})});export{W as a,B as g,C as l,N as m,O as r};
//# sourceMappingURL=header-CtRZEgVZ.js.map
