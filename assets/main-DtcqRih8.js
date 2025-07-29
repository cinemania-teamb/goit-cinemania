import{b as y,a as p}from"./vendor-wG9nbpZs.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(o){if(o.ep)return;o.ep=!0;const t=n(o);fetch(o.href,t)}})();const f=e=>{console.log(e);const r=y.create(`
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
          `);r.show(),document.querySelector(".close").addEventListener("click",()=>{r.close()}),document.addEventListener("keyup",function(s){s.code==="Escape"&&r.close()});const a=document.getElementById("movie-form"),o=document.querySelector(".movie-submit");let t=u();t.some(s=>s.id===e.id)?o.textContent="Remove from my library":o.textContent="Add to my library",a.addEventListener("submit",s=>{if(s.preventDefault(),t=u(),o.textContent==="Remove from my library"){const m=u().filter(d=>d.id!==e.id);localStorage.setItem("movies",JSON.stringify(m)),o.textContent="Add to my library";return}const c={id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(i=>i.name).join(",")};t.push(c),localStorage.setItem("movies",JSON.stringify(t)),o.textContent="Remove from my library"})};function u(){let e;return localStorage.getItem("movies")===null?e=[]:e=JSON.parse(localStorage.getItem("movies")),e}const h="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWRkMzEzNDEyYzUzMjQyYTU2Nzc5ZjVjMWIwNWJlNSIsIm5iZiI6MTc1MzY5OTE4OS4xOTcsInN1YiI6IjY4ODc1Mzc1MGU0ODE4YTk5OTUyYjQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H565ZjOCGF6NhGwiaRj-BAZ12tadYHWeWDarSsxXtc4",v=async(e=h,r=1)=>{const n={method:"GET",url:`https://api.themoviedb.org/3/trending/all/week?language=en-US&page=${r}`,headers:{accept:"application/json",Authorization:`Bearer ${e}`}};try{return(await p.request(n)).data.results.map(t=>({title:t.title||t.name,rating:t.vote_average,genreId:t.genre_ids,year:t.release_date||t.first_air_date,id:t.id,image:t.poster_path}))}catch{return!1}},b=async(e,r=null,n=h,a=1)=>{const t={method:"GET",url:r!==null?`https://api.themoviedb.org/3/search/movie?query=${e}&include_adult=false&language=en-US&page=${a}&primary_release_year=${r}`:`https://api.themoviedb.org/3/search/movie?query=${e}&include_adult=false&language=en-US&page=${a}`,headers:{accept:"application/json",Authorization:`Bearer ${n}`}};try{return(await p.request(t)).data.results.map(i=>({title:i.title||i.name,rating:i.vote_average,genreId:i.genre_ids,year:i.release_date||i.first_air_date,id:i.id,image:i.poster_path}))}catch(s){return s.data}},g=document.getElementById("catolog-form"),l=document.querySelector(".list"),_="4e64f2e0a197aa7c5d1170773553320c",$=async()=>{try{const e=await v(),r=e.map(({id:n,title:a,image:o,year:t,rating:s})=>{const c=t.split("-")[0];return o?`<li id="${n}"  style="background-image: url(https://image.tmdb.org/t/p/w500/${o});background-size: cover;
    background-position: center;
    width: 395px;
    height: 574px;">
            <div class="info">
                <p>${a.toUpperCase()} | ${c}</p>
            </div>
        </li>`:""}).join("");l.insertAdjacentHTML("beforeend",r),console.log(e)}catch(e){console.log(e)}};$();g.addEventListener("submit",async e=>{e.preventDefault(),l.innerHTML="";const r=e.target.elements.input.value,n=e.target.elements.choose.value;try{const a=await b(r,n);if(console.log(a),a.length===0){l.innerHTML='<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>';return}const o=a.map(({id:t,title:s,image:c,year:i,rating:m})=>{const d=i.split("-")[0];return c?`<li id="${t}"  style="background-image: url(https://image.tmdb.org/t/p/w500/${c});background-size: cover;
    background-position: center;
    width: 395px;
    height: 574px;">
            <div class="info">
                <p>${s.toUpperCase()} | ${d}</p>
            </div>
        </li>`:""}).join("");l.insertAdjacentHTML("beforeend",o)}catch(a){console.log(a)}g.reset()});l.addEventListener("click",async e=>{if(e.target.nodeName==="LI"){const r=e.target.id;try{const n=await p.get(`https://api.themoviedb.org/3/movie/${r}?api_key=${_}&language=en-US`);console.log(n.data),f(n.data)}catch(n){console.log(n)}}});
//# sourceMappingURL=main-DtcqRih8.js.map
