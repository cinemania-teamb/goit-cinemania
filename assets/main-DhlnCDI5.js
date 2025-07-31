import{b as x,a as b}from"./vendor-wG9nbpZs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();const O=e=>{const t=x.create(`
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
                            <td>${e.genres.map(o=>o.name).join(" ")}</td>
                        </tr>
                    </tbody>
                </table>
              <h3>ABOUT</h3>
              <p>${e.overview}</p>
              <button class="movie-submit" type="submit">Add to my library</button>
              </div>
            </form>
          `);t.show(),document.querySelector(".close").addEventListener("click",()=>{t.close()}),document.addEventListener("keyup",function(o){o.code==="Escape"&&t.close()});const n=document.getElementById("movie-form"),a=document.querySelector(".movie-submit");let s=h();s.some(o=>o.id===e.id)?a.textContent="Remove from my library":a.textContent="Add to my library",n.addEventListener("submit",o=>{if(o.preventDefault(),s=h(),a.textContent==="Remove from my library"){const F=h().filter(I=>I.id!==e.id);localStorage.setItem("movies",JSON.stringify(F)),a.textContent="Add to my library";return}const m={id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(p=>p.name).join(",")};s.push(m),localStorage.setItem("movies",JSON.stringify(s)),a.textContent="Remove from my library"})};function h(){let e;return localStorage.getItem("movies")===null?e=[]:e=JSON.parse(localStorage.getItem("movies")),e}const y="4e64f2e0a197aa7c5d1170773553320c",f=document.querySelector(".list"),v=document.querySelector(".pagination ul");let $={input:"",year:"",isSearch:!1};const i=`<svg class="icon" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,d=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,c=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;let u=1,g=1;const P=async(e=1)=>{const t=`https://api.themoviedb.org/3/trending/movie/week?api_key=${y}&language=en-US&page=${e}`;try{const r=await b.get(t);return{filteredData:r.data.results.map(a=>({title:a.title||a.name,rating:Math.round(a.vote_average),genreId:a.genre_ids,year:a.release_date||a.first_air_date,id:a.id,image:a.poster_path})),total_pages:r.data.total_pages}}catch{return!1}},q=async(e,t=null,r)=>{const n=t!==null?`https://api.themoviedb.org/3/search/movie?api_key=${y}&query=${e}&include_adult=false&language=en-US&page=${r}&primary_release_year=${t}`:`https://api.themoviedb.org/3/search/movie?api_key=${y}&query=${e}&include_adult=false&language=en-US&page=${r}`;try{const a=await b.get(n);return{filteredFilms:a.data.results.map(o=>({title:o.title||o.name,rating:Math.round(o.vote_average),genreId:o.genre_ids,year:o.release_date||o.first_air_date,id:o.id,image:o.poster_path})),total_pages:a.data.total_pages}}catch(a){return a.data}},S=e=>{f.innerHTML="";const t=e.map(({id:r,title:n,image:a,year:s,rating:o})=>{const m=s.split("-")[0],p=H(o);return a&&`<li id="${r}" style="background-image: url(https://image.tmdb.org/t/p/w500/${a});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${n.toUpperCase()} | ${m}</p>
              ${p}
          </div>
      </li>`}).join("");f.insertAdjacentHTML("beforeend",t)},w=(e,t)=>{v.innerHTML="";let r="";t>1&&(r+=`<li data-page="${t-1}" class="prev"><</li>`);let n=Math.max(1,t-2),a=Math.min(e,t+2);for(let s=n;s<=a;s++)r+=`<li data-page="${s}" class="${s===t?"active":""}">${s}</li>`;t<e&&(r+=`<li data-page="${t+1}" class="next">></li>`),v.innerHTML=r},L=async(e=1)=>{try{const{filteredData:t,total_pages:r}=await P(e);g=r,u=e,S(t),w(g,u),$={input:"",year:"",isSearch:!1}}catch(t){console.log(t)}},k=async(e,t,r=1)=>{try{const{filteredFilms:n,total_pages:a}=await q(e,t,r);if(g=a,u=r,n.length===0){f.innerHTML='<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>',v.innerHTML="";return}return S(n),w(g,u),$={input:e,year:t,isSearch:!0},$}catch(n){console.log(n)}},H=e=>{let t="";switch(e){case 0:t=`${i.repeat(5)}`;break;case 1:t=`${d}${i.repeat(4)}`;break;case 2:t=`${c}${i.repeat(4)}`;break;case 3:t=`${c}${d}${i.repeat(3)}`;break;case 4:t=`${c.repeat(2)}${i.repeat(3)}`;break;case 5:t=`${c.repeat(2)}${d}${i.repeat(2)}`;break;case 6:t=`${c.repeat(3)}${i.repeat(2)}`;break;case 7:t=`${c.repeat(3)}${d}${i}`;break;case 8:t=`${c.repeat(4)}${i}`;break;case 9:t=`${c.repeat(4)}${d}`;break;case 10:t=`${c.repeat(5)}`;break;default:throw new Error("Invalid rating")}return`<div>${t}</div>`},_=document.getElementById("catolog-form"),M=document.querySelector(".list"),E=document.querySelector(".pagination ul"),N="4e64f2e0a197aa7c5d1170773553320c";let l={input:"",year:"",isSearch:!1};_.addEventListener("submit",async e=>{e.preventDefault();const t=e.target.elements.input.value,r=e.target.elements.choose.value;if(t===""){M.innerHTML='<li class="not-found">Please enter a search term.</li>',E.innerHTML="",l={input:"",year:"",isSearch:!1};return}const n=await k(t,r,1);l.isSearch=n.isSearch,l.input=n.input,l.year=n.year,_.reset()});E.addEventListener("click",async e=>{if(e.target.tagName==="LI"&&e.target.dataset.page){const t=Number(e.target.dataset.page);l.isSearch?await k(l.input,l.year,t):await L(t)}});M.addEventListener("click",async e=>{if(e.target.nodeName==="LI"){const t=e.target.id;try{const r=await b.get(`https://api.themoviedb.org/3/movie/${t}?api_key=${N}&language=en-US`);O(r.data)}catch(r){console.log(r)}}});L();
//# sourceMappingURL=main-DhlnCDI5.js.map
