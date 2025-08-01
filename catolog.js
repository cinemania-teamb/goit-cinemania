import"./assets/header-3fit8tjM.js";import{b as j,a as h}from"./assets/vendor-wG9nbpZs.js";const x=e=>{const t=j.create(`
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
                            <td>${e.genres.map(r=>r.name).join(" ")}</td>
                        </tr>
                    </tbody>
                </table>
              <h3>ABOUT</h3>
              <p>${e.overview}</p>
              <button class="movie-submit" type="submit">Add to my library</button>
              </div>
            </form>
          `);t.show(),document.querySelector(".close").addEventListener("click",()=>{t.close()}),document.addEventListener("keyup",function(r){r.code==="Escape"&&t.close()});const n=document.getElementById("movie-form"),a=document.querySelector(".movie-submit");let i=y();i.some(r=>r.id===e.id)?a.textContent="Remove from my library":a.textContent="Add to my library",n.addEventListener("submit",r=>{if(r.preventDefault(),i=y(),a.textContent==="Remove from my library"){const E=y().filter(T=>T.id!==e.id);localStorage.setItem("movies",JSON.stringify(E)),a.textContent="Add to my library";return}const d={id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(g=>g.name).join(",")};i.push(d),localStorage.setItem("movies",JSON.stringify(i)),a.textContent="Remove from my library"})};function y(){let e;return localStorage.getItem("movies")===null?e=[]:e=JSON.parse(localStorage.getItem("movies")),e}const v="4e64f2e0a197aa7c5d1170773553320c",$=document.querySelector(".list"),f=document.querySelector(".pagination ul");let b={input:"",year:"",isSearch:!1};const o=`<svg class="icon" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,p=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,c=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;let u=1,m=1;const O=async e=>{const t={method:"GET",url:"https://api.themoviedb.org/3/genre/movie/list?language=en",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWRkMzEzNDEyYzUzMjQyYTU2Nzc5ZjVjMWIwNWJlNSIsIm5iZiI6MTc1MzY5OTE4OS4xOTcsInN1YiI6IjY4ODc1Mzc1MGU0ODE4YTk5OTUyYjQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H565ZjOCGF6NhGwiaRj-BAZ12tadYHWeWDarSsxXtc4"}};try{const n=(await h.request(t)).data.genres;return e.map(i=>{var r;return((r=n.find(d=>i===d.id))==null?void 0:r.name)||"undefined"}).join(" ")}catch{return!1}},N=async(e=1)=>{const t=`https://api.themoviedb.org/3/trending/movie/week?api_key=${v}&language=en-US&page=${e}`;try{const s=await h.get(t);return{filteredData:await Promise.all(s.data.results.map(async a=>({title:a.title||a.name,rating:Math.round(a.vote_average),genreId:await O(a.genre_ids),year:a.release_date||a.first_air_date,id:a.id,image:a.poster_path}))),total_pages:s.data.total_pages}}catch{return!1}},U=async(e,t=null,s)=>{const n=t!==null?`https://api.themoviedb.org/3/search/movie?api_key=${v}&query=${e}&include_adult=false&language=en-US&page=${s}&primary_release_year=${t}`:`https://api.themoviedb.org/3/search/movie?api_key=${v}&query=${e}&include_adult=false&language=en-US&page=${s}`;try{const a=await h.get(n);return{filteredFilms:a.data.results.map(r=>({title:r.title||r.name,rating:Math.round(r.vote_average),genreId:r.genre_ids,year:r.release_date||r.first_air_date,id:r.id,image:r.poster_path})),total_pages:a.data.total_pages}}catch(a){return a.data}},_=e=>{$.innerHTML="";const t=e.map(({id:s,title:n,image:a,year:i,rating:r})=>{const d=i.split("-")[0],g=F(r);return a&&`<li id="${s}" style="background-image: url(https://image.tmdb.org/t/p/w500/${a});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${n.toUpperCase()} | ${d}</p>
              ${g}
          </div>
      </li>`}).join("");$.insertAdjacentHTML("beforeend",t)},w=(e,t)=>{f.innerHTML="";let s="";t>1&&(s+=`<li data-page="${t-1}" class="prev"><</li>`);let n=Math.max(1,t-2),a=Math.min(e,t+2);for(let i=n;i<=a;i++)s+=`<li data-page="${i}" class="${i===t?"active":""}">${i}</li>`;t<e&&(s+=`<li data-page="${t+1}" class="next">></li>`),f.innerHTML=s},k=async(e=1)=>{try{const{filteredData:t,total_pages:s}=await N(e);m=s,u=e,_(t),w(m,u),b={input:"",year:"",isSearch:!1}}catch(t){console.log(t)}},I=async(e,t,s=1)=>{try{const{filteredFilms:n,total_pages:a}=await U(e,t,s);if(m=a,u=s,n.length===0){$.innerHTML='<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>',f.innerHTML="";return}return _(n),w(m,u),b={input:e,year:t,isSearch:!0},b}catch(n){console.log(n)}},F=e=>{let t="";switch(e){case 0:t=`${o.repeat(5)}`;break;case 1:t=`${p}${o.repeat(4)}`;break;case 2:t=`${c}${o.repeat(4)}`;break;case 3:t=`${c}${p}${o.repeat(3)}`;break;case 4:t=`${c.repeat(2)}${o.repeat(3)}`;break;case 5:t=`${c.repeat(2)}${p}${o.repeat(2)}`;break;case 6:t=`${c.repeat(3)}${o.repeat(2)}`;break;case 7:t=`${c.repeat(3)}${p}${o}`;break;case 8:t=`${c.repeat(4)}${o}`;break;case 9:t=`${c.repeat(4)}${p}`;break;case 10:t=`${c.repeat(5)}`;break;default:throw new Error("Invalid rating")}return`<div>${t}</div>`},S=document.getElementById("catolog-form"),M=document.querySelector(".list"),L=document.querySelector(".pagination ul"),J="4e64f2e0a197aa7c5d1170773553320c";let l={input:"",year:"",isSearch:!1};S.addEventListener("submit",async e=>{e.preventDefault();const t=e.target.elements.input.value,s=e.target.elements.choose.value;if(t===""){M.innerHTML='<li class="not-found">Please enter a search term.</li>',L.innerHTML="",l={input:"",year:"",isSearch:!1};return}const n=await I(t,s,1);l.isSearch=n.isSearch,l.input=n.input,l.year=n.year,S.reset()});L.addEventListener("click",async e=>{if(e.target.tagName==="LI"&&e.target.dataset.page){const t=Number(e.target.dataset.page);l.isSearch?await I(l.input,l.year,t):await k(t)}});M.addEventListener("click",async e=>{if(e.target.nodeName==="LI"){const t=e.target.id;try{const s=await h.get(`https://api.themoviedb.org/3/movie/${t}?api_key=${J}&language=en-US`);x(s.data)}catch(s){console.log(s)}}});k();
//# sourceMappingURL=catolog.js.map
