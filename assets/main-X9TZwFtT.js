import{b as L,a as g}from"./vendor-wG9nbpZs.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const w=e=>{const a=L.create(`
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
          `);a.show(),document.querySelector(".close").addEventListener("click",()=>{a.close()}),document.addEventListener("keyup",function(s){s.code==="Escape"&&a.close()});const n=document.getElementById("movie-form"),t=document.querySelector(".movie-submit");let r=c();r.some(s=>s.id===e.id)?t.textContent="Remove from my library":t.textContent="Add to my library",n.addEventListener("submit",s=>{if(s.preventDefault(),r=c(),t.textContent==="Remove from my library"){const $=c().filter(S=>S.id!==e.id);localStorage.setItem("movies",JSON.stringify($)),t.textContent="Add to my library";return}const b={id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(m=>m.name).join(",")};r.push(b),localStorage.setItem("movies",JSON.stringify(r)),t.textContent="Remove from my library"})};function c(){let e;return localStorage.getItem("movies")===null?e=[]:e=JSON.parse(localStorage.getItem("movies")),e}const d="4e64f2e0a197aa7c5d1170773553320c",p=document.querySelector(".list"),u=document.querySelector(".pagination ul");let h={input:"",year:"",isSearch:!1},i=1,l=1;const x=async(e=1)=>{const a=`https://api.themoviedb.org/3/trending/movie/week?api_key=${d}&language=en-US&page=${e}`;try{const o=await g.get(a);return console.log(o.data),{filteredData:o.data.results.map(t=>({title:t.title||t.name,rating:t.vote_average,genreId:t.genre_ids,year:t.release_date||t.first_air_date,id:t.id,image:t.poster_path})),total_pages:o.data.total_pages}}catch{return!1}},I=async(e,a=null,o=1)=>{const n=a!==null?`https://api.themoviedb.org/3/search/movie?api_key=${d}&query=${e}&include_adult=false&language=en-US&page=${o}&primary_release_year=${a}`:`https://api.themoviedb.org/3/search/movie?api_key=${d}&query=${e}&include_adult=false&language=en-US&page=${o}`;try{const t=await g.get(n);return{filteredFilms:t.data.results.map(s=>({title:s.title||s.name,rating:s.vote_average,genreId:s.genre_ids,year:s.release_date||s.first_air_date,id:s.id,image:s.poster_path})),total_pages:t.data.total_pages}}catch(t){return t.data}},f=e=>{p.innerHTML="";const a=e.map(({id:o,title:n,image:t,year:r})=>{const s=r.split("-")[0];return t?`<li id="${o}" style="background-image: url(https://image.tmdb.org/t/p/w500/${t});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${n.toUpperCase()} | ${s}</p>
          </div>
      </li>`:""}).join("");p.insertAdjacentHTML("beforeend",a)},v=(e,a)=>{u.innerHTML="";let o="";a>1&&(o+=`<li data-page="${a-1}" class="prev"><</li>`);let n=Math.max(1,a-2),t=Math.min(e,a+2);for(let r=n;r<=t;r++)o+=`<li data-page="${r}" class="${r===a?"active":""}">${r}</li>`;a<e&&(o+=`<li data-page="${a+1}" class="next">></li>`),u.innerHTML=o},_=async(e=1)=>{try{const{filteredData:a,total_pages:o}=await x(e);l=o,i=e,f(a),v(l,i),h={input:"",year:"",isSearch:!1}}catch(a){console.log(a)}},O=async(e,a,o=1)=>{try{const{filteredFilms:n,total_pages:t}=await I(e,a,o);if(l=t,i=o,n.length===0){p.innerHTML='<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>',u.innerHTML="";return}f(n),v(l,i),h={input:e,year:a,isSearch:!0}}catch(n){console.log(n)}},y=document.getElementById("catolog-form"),k=document.querySelector(".list"),E=document.querySelector(".pagination ul"),F="4e64f2e0a197aa7c5d1170773553320c";y.addEventListener("submit",async e=>{e.preventDefault();const a=e.target.elements.input.value,o=e.target.elements.choose.value;await O(a,o,1),y.reset()});E.addEventListener("click",async e=>{if(e.target.tagName==="LI"&&e.target.dataset.page){const a=Number(e.target.dataset.page);await _(a)}});k.addEventListener("click",async e=>{if(e.target.nodeName==="LI"){const a=e.target.id;try{const o=await g.get(`https://api.themoviedb.org/3/movie/${a}?api_key=${F}&language=en-US`);w(o.data)}catch(o){console.log(o)}}});_();
//# sourceMappingURL=main-X9TZwFtT.js.map
