import{b as x,a as h}from"./vendor-wG9nbpZs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&document.body.classList.add("dark-theme")});const F={menuToggleClass:".menu-toggle",mobileMenuId:"mobileMenu",mobileOverlayId:"mobileOverlay"},{menuToggleClass:U,mobileMenuId:J,mobileOverlayId:B}=F,_=document.querySelector(U),v=document.getElementById(J),k=document.getElementById(B);_.addEventListener("click",()=>{v.classList.toggle("open"),k.classList.toggle("active")});const D=document.getElementById("theme-switcher"),I=document.body;D.addEventListener("click",()=>{I.classList.toggle("dark-theme");const e=I.classList.contains("dark-theme");localStorage.setItem("theme",e?"dark":"light")});document.addEventListener("click",e=>{const t=v.contains(e.target),s=_.contains(e.target);!t&&!s&&(v.classList.remove("open"),k.classList.remove("active"))});const W=e=>{const t=x.create(`
            <form id="movie-form">
            <p class="close">&#10006;</p>
              <img src="https://image.tmdb.org/t/p/w500/${e.poster_path}" width="375" height="478" alt="${e.title}">
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
                            <td>${e.genres.map(n=>n.name).join(" ")}</td>
                        </tr>
                    </tbody>
                </table>
              <h3>ABOUT</h3>
              <p>${e.overview}</p>
              <button class="movie-submit" type="submit">Add to my library</button>
              </div>
            </form>
          `);t.show(),document.querySelector(".close").addEventListener("click",()=>{t.close()}),document.addEventListener("keyup",function(n){n.code==="Escape"&&t.close()});const o=document.getElementById("movie-form"),a=document.querySelector(".movie-submit");let r=y();r.some(n=>n.id===e.id)?a.textContent="Remove from my library":a.textContent="Add to my library",o.addEventListener("submit",n=>{if(n.preventDefault(),r=y(),a.textContent==="Remove from my library"){const C=y().filter(j=>j.id!==e.id);localStorage.setItem("movies",JSON.stringify(C)),a.textContent="Add to my library";return}const d={id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(u=>u.name).join(",")};r.push(d),localStorage.setItem("movies",JSON.stringify(r)),a.textContent="Remove from my library"})};function y(){let e;return localStorage.getItem("movies")===null?e=[]:e=JSON.parse(localStorage.getItem("movies")),e}const f="4e64f2e0a197aa7c5d1170773553320c",b=document.querySelector(".list"),$=document.querySelector(".pagination ul");let S={input:"",year:"",isSearch:!1};const i=`<svg class="icon" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,g=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,c=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;let m=1,p=1;const q=async e=>{const t={method:"GET",url:"https://api.themoviedb.org/3/genre/movie/list?language=en",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWRkMzEzNDEyYzUzMjQyYTU2Nzc5ZjVjMWIwNWJlNSIsIm5iZiI6MTc1MzY5OTE4OS4xOTcsInN1YiI6IjY4ODc1Mzc1MGU0ODE4YTk5OTUyYjQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H565ZjOCGF6NhGwiaRj-BAZ12tadYHWeWDarSsxXtc4"}};try{const o=(await h.request(t)).data.genres;return e.map(r=>{var n;return((n=o.find(d=>r===d.id))==null?void 0:n.name)||"undefined"}).join(" ")}catch{return!1}},z=async(e=1)=>{const t=`https://api.themoviedb.org/3/trending/movie/week?api_key=${f}&language=en-US&page=${e}`;try{const s=await h.get(t);return{filteredData:await Promise.all(s.data.results.map(async a=>({title:a.title||a.name,rating:Math.round(a.vote_average),genreId:await q(a.genre_ids),year:a.release_date||a.first_air_date,id:a.id,image:a.poster_path}))),total_pages:s.data.total_pages}}catch{return!1}},H=async(e,t=null,s)=>{const o=t!==null?`https://api.themoviedb.org/3/search/movie?api_key=${f}&query=${e}&include_adult=false&language=en-US&page=${s}&primary_release_year=${t}`:`https://api.themoviedb.org/3/search/movie?api_key=${f}&query=${e}&include_adult=false&language=en-US&page=${s}`;try{const a=await h.get(o);return{filteredFilms:a.data.results.map(n=>({title:n.title||n.name,rating:Math.round(n.vote_average),genreId:n.genre_ids,year:n.release_date||n.first_air_date,id:n.id,image:n.poster_path})),total_pages:a.data.total_pages}}catch(a){return a.data}},w=e=>{b.innerHTML="";const t=e.map(({id:s,title:o,image:a,year:r,rating:n})=>{const d=r.split("-")[0],u=P(n);return a&&`<li id="${s}" style="background-image: url(https://image.tmdb.org/t/p/w500/${a});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${o.toUpperCase()} | ${d}</p>
              ${u}
          </div>
      </li>`}).join("");b.insertAdjacentHTML("beforeend",t)},M=(e,t)=>{$.innerHTML="";let s="";t>1&&(s+=`<li data-page="${t-1}" class="prev"><</li>`);let o=Math.max(1,t-2),a=Math.min(e,t+2);for(let r=o;r<=a;r++)s+=`<li data-page="${r}" class="${r===t?"active":""}">${r}</li>`;t<e&&(s+=`<li data-page="${t+1}" class="next">></li>`),$.innerHTML=s},O=async(e=1)=>{try{const{filteredData:t,total_pages:s}=await z(e);p=s,m=e,w(t),M(p,m),S={input:"",year:"",isSearch:!1}}catch(t){console.log(t)}},E=async(e,t,s=1)=>{try{const{filteredFilms:o,total_pages:a}=await H(e,t,s);if(p=a,m=s,o.length===0){b.innerHTML='<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>',$.innerHTML="";return}return w(o),M(p,m),S={input:e,year:t,isSearch:!0},S}catch(o){console.log(o)}},P=e=>{let t="";switch(e){case 0:t=`${i.repeat(5)}`;break;case 1:t=`${g}${i.repeat(4)}`;break;case 2:t=`${c}${i.repeat(4)}`;break;case 3:t=`${c}${g}${i.repeat(3)}`;break;case 4:t=`${c.repeat(2)}${i.repeat(3)}`;break;case 5:t=`${c.repeat(2)}${g}${i.repeat(2)}`;break;case 6:t=`${c.repeat(3)}${i.repeat(2)}`;break;case 7:t=`${c.repeat(3)}${g}${i}`;break;case 8:t=`${c.repeat(4)}${i}`;break;case 9:t=`${c.repeat(4)}${g}`;break;case 10:t=`${c.repeat(5)}`;break;default:throw new Error("Invalid rating")}return`<div>${t}</div>`},L=document.getElementById("catolog-form"),T=document.querySelector(".list"),N=document.querySelector(".pagination ul"),A="4e64f2e0a197aa7c5d1170773553320c";let l={input:"",year:"",isSearch:!1};L.addEventListener("submit",async e=>{e.preventDefault();const t=e.target.elements.input.value,s=e.target.elements.choose.value;if(t===""){T.innerHTML='<li class="not-found">Please enter a search term.</li>',N.innerHTML="",l={input:"",year:"",isSearch:!1};return}const o=await E(t,s,1);l.isSearch=o.isSearch,l.input=o.input,l.year=o.year,L.reset()});N.addEventListener("click",async e=>{if(e.target.tagName==="LI"&&e.target.dataset.page){const t=Number(e.target.dataset.page);l.isSearch?await E(l.input,l.year,t):await O(t)}});T.addEventListener("click",async e=>{if(e.target.nodeName==="LI"){const t=e.target.id;try{const s=await h.get(`https://api.themoviedb.org/3/movie/${t}?api_key=${A}&language=en-US`);W(s.data)}catch(s){console.log(s)}}});O();
//# sourceMappingURL=main-Aqd33Pey.js.map
