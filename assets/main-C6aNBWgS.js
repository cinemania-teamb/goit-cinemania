import{b as M,a as y}from"./vendor-wG9nbpZs.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const O=e=>{const a=M.create(`
            <form id="movie-form">
            <p class="close">&#10006;</p>
              <img src="https://image.tmdb.org/t/p/w500/${e.poster_path}" width="375" height="478" alt="${e.title}">
              <div>
                <h2>${e.title.toUpperCase()}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Vote/Votes</th>
                            <td><span class="vote">${e.vote_average}</span> / <span class="vote">${e.vote_count}</span></td>
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
              <p>${e.overview}</p>
              <button class="movie-submit" type="submit">Add to my library</button>
              </div>
            </form>
          `);a.show(),document.querySelector(".close").addEventListener("click",()=>{a.close()}),document.addEventListener("keyup",function(s){s.code==="Escape"&&a.close()});const n=document.getElementById("movie-form"),t=document.querySelector(".movie-submit");let o=d();o.some(s=>s.id===e.id)?t.textContent="Remove from my library":t.textContent="Add to my library",n.addEventListener("submit",s=>{if(s.preventDefault(),o=d(),t.textContent==="Remove from my library"){const x=d().filter(I=>I.id!==e.id);localStorage.setItem("movies",JSON.stringify(x)),t.textContent="Add to my library";return}const w={id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(h=>h.name).join(",")};o.push(w),localStorage.setItem("movies",JSON.stringify(o)),t.textContent="Remove from my library"})};function d(){let e;return localStorage.getItem("movies")===null?e=[]:e=JSON.parse(localStorage.getItem("movies")),e}const p="4e64f2e0a197aa7c5d1170773553320c",u=document.querySelector(".list"),m=document.querySelector(".pagination ul");let g={input:"",year:"",isSearch:!1},l=1,c=1;const k=async(e=1)=>{const a=`https://api.themoviedb.org/3/trending/movie/week?api_key=${p}&language=en-US&page=${e}`;try{const r=await y.get(a);return{filteredData:r.data.results.map(t=>({title:t.title||t.name,rating:t.vote_average,genreId:t.genre_ids,year:t.release_date||t.first_air_date,id:t.id,image:t.poster_path})),total_pages:r.data.total_pages}}catch{return!1}},E=async(e,a=null,r)=>{const n=a!==null?`https://api.themoviedb.org/3/search/movie?api_key=${p}&query=${e}&include_adult=false&language=en-US&page=${r}&primary_release_year=${a}`:`https://api.themoviedb.org/3/search/movie?api_key=${p}&query=${e}&include_adult=false&language=en-US&page=${r}`;try{const t=await y.get(n);return{filteredFilms:t.data.results.map(s=>({title:s.title||s.name,rating:s.vote_average,genreId:s.genre_ids,year:s.release_date||s.first_air_date,id:s.id,image:s.poster_path})),total_pages:t.data.total_pages}}catch(t){return t.data}},v=e=>{u.innerHTML="";const a=e.map(({id:r,title:n,image:t,year:o})=>{const s=o.split("-")[0];return t&&`<li id="${r}" style="background-image: url(https://image.tmdb.org/t/p/w500/${t});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${n.toUpperCase()} | ${s}</p>
          </div>
      </li>`}).join("");u.insertAdjacentHTML("beforeend",a)},_=(e,a)=>{m.innerHTML="";let r="";a>1&&(r+=`<li data-page="${a-1}" class="prev"><</li>`);let n=Math.max(1,a-2),t=Math.min(e,a+2);for(let o=n;o<=t;o++)r+=`<li data-page="${o}" class="${o===a?"active":""}">${o}</li>`;a<e&&(r+=`<li data-page="${a+1}" class="next">></li>`),m.innerHTML=r},b=async(e=1)=>{try{const{filteredData:a,total_pages:r}=await k(e);c=r,l=e,v(a),_(c,l),g={input:"",year:"",isSearch:!1}}catch(a){console.log(a)}},S=async(e,a,r=1)=>{try{const{filteredFilms:n,total_pages:t}=await E(e,a,r);if(c=t,l=r,n.length===0){u.innerHTML='<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>',m.innerHTML="";return}return v(n),_(c,l),g={input:e,year:a,isSearch:!0},g}catch(n){console.log(n)}},f=document.getElementById("catolog-form"),$=document.querySelector(".list"),L=document.querySelector(".pagination ul"),F="4e64f2e0a197aa7c5d1170773553320c";let i={input:"",year:"",isSearch:!1};f.addEventListener("submit",async e=>{e.preventDefault();const a=e.target.elements.input.value,r=e.target.elements.choose.value;if(a===""){$.innerHTML='<li class="not-found">Please enter a search term.</li>',L.innerHTML="",i={input:"",year:"",isSearch:!1};return}const n=await S(a,r,1);i.isSearch=n.isSearch,i.input=n.input,i.year=n.year,f.reset()});L.addEventListener("click",async e=>{if(e.target.tagName==="LI"&&e.target.dataset.page){const a=Number(e.target.dataset.page);i.isSearch?await S(i.input,i.year,a):await b(a)}});$.addEventListener("click",async e=>{if(e.target.nodeName==="LI"){const a=e.target.id;try{const r=await y.get(`https://api.themoviedb.org/3/movie/${a}?api_key=${F}&language=en-US`);O(r.data)}catch(r){console.log(r)}}});b();
//# sourceMappingURL=main-C6aNBWgS.js.map
