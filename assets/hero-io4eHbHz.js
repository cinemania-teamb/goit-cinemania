import{a as u,b as S}from"./vendor-DOPN71bB.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const k="4e64f2e0a197aa7c5d1170773553320c",M=document.querySelector(".list"),I=document.querySelector(".pagination ul");let m={input:"",year:"",isSearch:!1};const d=`<svg class="icon" id="stars-empty" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,g=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,p=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;let f=1,$=1;const B=async t=>{const e={method:"GET",url:"https://api.themoviedb.org/3/genre/movie/list?language=en",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWRkMzEzNDEyYzUzMjQyYTU2Nzc5ZjVjMWIwNWJlNSIsIm5iZiI6MTc1MzY5OTE4OS4xOTcsInN1YiI6IjY4ODc1Mzc1MGU0ODE4YTk5OTUyYjQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H565ZjOCGF6NhGwiaRj-BAZ12tadYHWeWDarSsxXtc4"}};try{const o=(await u.request(e)).data.genres;return t.map(s=>{var r;return((r=o.find(l=>s===l.id))==null?void 0:r.name)||"undefined"}).join(" ")}catch{return!1}},x=async(t=1)=>{const e=`https://api.themoviedb.org/3/trending/movie/week?api_key=${k}&language=en-US&page=${t}`;try{const n=await u.get(e);return{filteredData:await Promise.all(n.data.results.map(async a=>({title:a.title||a.name,rating:Math.round(a.vote_average),genreId:await B(a.genre_ids),year:a.release_date||a.first_air_date,id:a.id,image:a.poster_path}))),total_pages:n.data.total_pages}}catch{return!1}},j=async(t,e=null,n)=>{const o=e!==null?`https://api.themoviedb.org/3/search/movie?api_key=${k}&query=${t}&include_adult=false&language=en-US&page=${n}&primary_release_year=${e}`:`https://api.themoviedb.org/3/search/movie?api_key=${k}&query=${t}&include_adult=false&language=en-US&page=${n}`;try{const a=await u.get(o);return{filteredFilms:a.data.results.map(r=>({title:r.title||r.name,rating:Math.round(r.vote_average),genreId:r.genre_ids,year:r.release_date||r.first_air_date,id:r.id,image:r.poster_path})),total_pages:a.data.total_pages}}catch(a){return a.data}},L=t=>{M.innerHTML="";const e=t.map(({id:n,title:o,image:a,year:s,rating:r,genreId:l})=>{const i=s.split("-")[0],h=T(r);return a&&`<li id="${n}" style="background-image: url(https://image.tmdb.org/t/p/w500/${a});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${o.toUpperCase()} <span style="color:#B7B7B7">${l} | ${i}</span></p>
              ${h}
          </div>
      </li>`}).join("");M.insertAdjacentHTML("beforeend",e)},O=(t,e)=>{I.innerHTML="";let n="";e>1&&(n+=`<li data-page="${e-1}" class="prev"><</li>`);let o=Math.max(1,e-2),a=Math.min(t,e+2);for(let s=o;s<=a;s++)n+=`<li data-page="${s}" class="${s===e?"active":""}">${s}</li>`;e<t&&(n+=`<li data-page="${e+1}" class="next">></li>`),I.innerHTML=n},W=async(t=1)=>{try{const{filteredData:e,total_pages:n}=await x(t);$=n,f=t,L(e),O($,f),m={input:"",year:"",isSearch:!1}}catch(e){console.log(e)}},J=async(t,e,n=1)=>{try{const{filteredFilms:o,total_pages:a}=await j(t,e,n);return $=a,f=n,o.length===0?(M.innerHTML='<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>',I.innerHTML="",m={input:"",year:"",isSearch:!1},m):(L(o),O($,f),m={input:t,year:e,isSearch:!0},m)}catch(o){console.log(o)}},T=t=>{let e="";switch(t){case 0:e=`${d.repeat(5)}`;break;case 1:e=`${g}${d.repeat(4)}`;break;case 2:e=`${p}${d.repeat(4)}`;break;case 3:e=`${p}${g}${d.repeat(3)}`;break;case 4:e=`${p.repeat(2)}${d.repeat(3)}`;break;case 5:e=`${p.repeat(2)}${g}${d.repeat(2)}`;break;case 6:e=`${p.repeat(3)}${d.repeat(2)}`;break;case 7:e=`${p.repeat(3)}${g}${d}`;break;case 8:e=`${p.repeat(4)}${d}`;break;case 9:e=`${p.repeat(4)}${g}`;break;case 10:e=`${p.repeat(5)}`;break;default:throw new Error("Invalid rating")}return`<div>${e}</div>`},N=t=>{const e=S.create(`
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
                            <td>${t.genres.map(r=>r.name).join(" ")}</td>
                        </tr>
                    </tbody>
                </table>
              <h3>ABOUT</h3>
              <p class="modal-info">${t.overview}</p>
              <button class="movie-submit" type="submit">Add to my library</button>
              </div>
            </form>
          `);e.show(),document.querySelector(".close").addEventListener("click",()=>{e.close()}),document.addEventListener("keyup",function(r){r.code==="Escape"&&e.close()});const o=document.getElementById("movie-form"),a=document.querySelector(".movie-submit");let s=_();s.some(r=>r.id===t.id)?a.textContent="Remove from my library":a.textContent="Add to my library",o.addEventListener("submit",r=>{if(r.preventDefault(),s=_(),a.textContent==="Remove from my library"){const h=_().filter(y=>y.id!==t.id);localStorage.setItem("movies",JSON.stringify(h)),a.textContent="Add to my library";return}const l={id:t.id,title:t.title,poster_path:t.poster_path,overview:t.overview,vote_average:t.vote_average,vote_count:t.vote_count,popularity:t.popularity,genres:t.genres.map(i=>i.name).join(",")};s.push(l),localStorage.setItem("movies",JSON.stringify(s)),a.textContent="Remove from my library"})};function _(){let t;return localStorage.getItem("movies")===null?t=[]:t=JSON.parse(localStorage.getItem("movies")),t}const w="4e64f2e0a197aa7c5d1170773553320c",v=document.querySelector(".hero-section"),U=async()=>{try{const t=await u.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${w}`),{results:e}=t.data;if(e.length===0)v.style.backgroundImage="url(../img/noresult.jpg)",v.innerHTML=`
      <div class="container position-container">
        <h1>Let’s Make Your Own Cinema</h1>
        <p>Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
        <a href="./catolog.html" class="link-trailer">Get Started</a>
      `;else{const n=Math.floor(Math.random()*e.length),o=e[n];v.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${o.backdrop_path})`,v.innerHTML=`
      <div class="container position-container">
        <h1>${o.title}</h1>
        <div class= rating-svg>
          ${T(Math.round(o.vote_average))}
        </div>
        <p>${o.overview}</p>
        <button data-id=${o.id} class="trailer">Watch trailer</button>
        <button data-id=${o.id} id="details" class="details">More details</button>
      </div>
    `,document.getElementById("details").addEventListener("click",async r=>{if(r.target.nodeName==="BUTTON"){const l=r.target.dataset.id;try{const i=await u.get(`https://api.themoviedb.org/3/movie/${l}?api_key=${w}&language=en-US`);N(i.data)}catch(i){console.log(i)}}});const s=document.querySelector(".trailer");s.addEventListener("click",async r=>{const l=s.dataset.id;if(r.target.nodeName==="BUTTON")try{const y=(await u.get(`https://api.themoviedb.org/3/movie/${l}/videos?api_key=${w}&language=en-US`)).data.results.find(c=>c.type==="Trailer"&&c.site==="YouTube");if(y){const c=S.create(`
              <div class="modal-trailer" style="width:700px; height: 400px;">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${y.key}" frameborder="0" allowfullscreen></iframe>
                <p class="close">&#10006;</p>
              </div>
               
            `);c.show(),document.querySelector(".close").addEventListener("click",()=>{c.close()}),document.addEventListener("keyup",function(b){b.code==="Escape"&&c.close()})}else{const c=S.create(`
              <div class="no-trailer">
                
                <p>OOPS... We are very sorry! But we couldn’t find the trailer.</p>
                <img src="../img/sorry.jpg" width="363" height="318" alt="Sorry image">
                <p class="close">&#10006;</p>
              </div>
              
            `);c.show(),document.querySelector(".close").addEventListener("click",()=>{c.close()}),document.addEventListener("keyup",function(b){b.code==="Escape"&&c.close()})}}catch(i){console.log(i)}})}}catch(t){console.log(t)}};U();export{W as a,J as l,N as m};
//# sourceMappingURL=hero-io4eHbHz.js.map
