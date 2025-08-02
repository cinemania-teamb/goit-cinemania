import{b as B,a as h}from"./vendor-DOPN71bB.js";document.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&document.body.classList.add("dark-theme")});const N={menuToggleClass:".menu-toggle",mobileMenuId:"mobileMenu",mobileOverlayId:"mobileOverlay"},{menuToggleClass:U,mobileMenuId:F,mobileOverlayId:J}=N,L=document.querySelector(U),$=document.getElementById(F),w=document.getElementById(J);L.addEventListener("click",()=>{$.classList.toggle("open"),w.classList.toggle("active")});const D=document.getElementById("theme-switcher"),_=document.body;D.addEventListener("click",()=>{_.classList.toggle("dark-theme");const e=_.classList.contains("dark-theme");localStorage.setItem("theme",e?"dark":"light")});document.addEventListener("click",e=>{const t=$.contains(e.target),a=L.contains(e.target);!t&&!a&&($.classList.remove("open"),w.classList.remove("active"))});const W=e=>{const t=B.create(`
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
                            <td>${e.genres.map(n=>n.name).join(" ")}</td>
                        </tr>
                    </tbody>
                </table>
              <h3>ABOUT</h3>
              <p class="modal-info">${e.overview}</p>
              <button class="movie-submit" type="submit">Add to my library</button>
              </div>
            </form>
          `);t.show(),document.querySelector(".close").addEventListener("click",()=>{t.close()}),document.addEventListener("keyup",function(n){n.code==="Escape"&&t.close()});const r=document.getElementById("movie-form"),s=document.querySelector(".movie-submit");let o=v();o.some(n=>n.id===e.id)?s.textContent="Remove from my library":s.textContent="Add to my library",r.addEventListener("submit",n=>{if(n.preventDefault(),o=v(),s.textContent==="Remove from my library"){const y=v().filter(j=>j.id!==e.id);localStorage.setItem("movies",JSON.stringify(y)),s.textContent="Add to my library";return}const d={id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(m=>m.name).join(",")};o.push(d),localStorage.setItem("movies",JSON.stringify(o)),s.textContent="Remove from my library"})};function v(){let e;return localStorage.getItem("movies")===null?e=[]:e=JSON.parse(localStorage.getItem("movies")),e}const b="4e64f2e0a197aa7c5d1170773553320c",f=document.querySelector(".list"),S=document.querySelector(".pagination ul");let k={input:"",year:"",isSearch:!1};const i=`<svg class="icon" id="stars-empty" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,g=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,c=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;let p=1,u=1;const z=async e=>{const t={method:"GET",url:"https://api.themoviedb.org/3/genre/movie/list?language=en",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWRkMzEzNDEyYzUzMjQyYTU2Nzc5ZjVjMWIwNWJlNSIsIm5iZiI6MTc1MzY5OTE4OS4xOTcsInN1YiI6IjY4ODc1Mzc1MGU0ODE4YTk5OTUyYjQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H565ZjOCGF6NhGwiaRj-BAZ12tadYHWeWDarSsxXtc4"}};try{const r=(await h.request(t)).data.genres;return e.map(o=>{var n;return((n=r.find(d=>o===d.id))==null?void 0:n.name)||"undefined"}).join(" ")}catch{return!1}},H=async(e=1)=>{const t=`https://api.themoviedb.org/3/trending/movie/week?api_key=${b}&language=en-US&page=${e}`;try{const a=await h.get(t);return{filteredData:await Promise.all(a.data.results.map(async s=>({title:s.title||s.name,rating:Math.round(s.vote_average),genreId:await z(s.genre_ids),year:s.release_date||s.first_air_date,id:s.id,image:s.poster_path}))),total_pages:a.data.total_pages}}catch{return!1}},q=async(e,t=null,a)=>{const r=t!==null?`https://api.themoviedb.org/3/search/movie?api_key=${b}&query=${e}&include_adult=false&language=en-US&page=${a}&primary_release_year=${t}`:`https://api.themoviedb.org/3/search/movie?api_key=${b}&query=${e}&include_adult=false&language=en-US&page=${a}`;try{const s=await h.get(r);return{filteredFilms:s.data.results.map(n=>({title:n.title||n.name,rating:Math.round(n.vote_average),genreId:n.genre_ids,year:n.release_date||n.first_air_date,id:n.id,image:n.poster_path})),total_pages:s.data.total_pages}}catch(s){return s.data}},M=e=>{f.innerHTML="";const t=e.map(({id:a,title:r,image:s,year:o,rating:n,genreId:d})=>{console.log(d);const m=o.split("-")[0],y=Y(n);return s&&`<li id="${a}" style="background-image: url(https://image.tmdb.org/t/p/w500/${s});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${r.toUpperCase()} <span style="color:#B7B7B7">${d} | ${m}</span></p>
              ${y}
          </div>
      </li>`}).join("");f.insertAdjacentHTML("beforeend",t)},E=(e,t)=>{S.innerHTML="";let a="";t>1&&(a+=`<li data-page="${t-1}" class="prev"><</li>`);let r=Math.max(1,t-2),s=Math.min(e,t+2);for(let o=r;o<=s;o++)a+=`<li data-page="${o}" class="${o===t?"active":""}">${o}</li>`;t<e&&(a+=`<li data-page="${t+1}" class="next">></li>`),S.innerHTML=a},T=async(e=1)=>{try{const{filteredData:t,total_pages:a}=await H(e);u=a,p=e,M(t),E(u,p),k={input:"",year:"",isSearch:!1}}catch(t){console.log(t)}},O=async(e,t,a=1)=>{try{const{filteredFilms:r,total_pages:s}=await q(e,t,a);if(u=s,p=a,r.length===0){f.innerHTML='<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>',S.innerHTML="";return}return M(r),E(u,p),k={input:e,year:t,isSearch:!0},k}catch(r){console.log(r)}},Y=e=>{let t="";switch(e){case 0:t=`${i.repeat(5)}`;break;case 1:t=`${g}${i.repeat(4)}`;break;case 2:t=`${c}${i.repeat(4)}`;break;case 3:t=`${c}${g}${i.repeat(3)}`;break;case 4:t=`${c.repeat(2)}${i.repeat(3)}`;break;case 5:t=`${c.repeat(2)}${g}${i.repeat(2)}`;break;case 6:t=`${c.repeat(3)}${i.repeat(2)}`;break;case 7:t=`${c.repeat(3)}${g}${i}`;break;case 8:t=`${c.repeat(4)}${i}`;break;case 9:t=`${c.repeat(4)}${g}`;break;case 10:t=`${c.repeat(5)}`;break;default:throw new Error("Invalid rating")}return`<div>${t}</div>`},I=document.getElementById("catolog-form"),x=document.querySelector(".list"),C=document.querySelector(".pagination ul"),A="4e64f2e0a197aa7c5d1170773553320c";let l={input:"",year:"",isSearch:!1};I.addEventListener("submit",async e=>{e.preventDefault();const t=e.target.elements.input.value,a=e.target.elements.choose.value;if(t===""){x.innerHTML='<li class="not-found">Please enter a search term.</li>',C.innerHTML="",l={input:"",year:"",isSearch:!1};return}const r=await O(t,a,1);l.isSearch=r.isSearch,l.input=r.input,l.year=r.year,I.reset()});C.addEventListener("click",async e=>{if(e.target.tagName==="LI"&&e.target.dataset.page){const t=Number(e.target.dataset.page);l.isSearch?await O(l.input,l.year,t):await T(t)}});x.addEventListener("click",async e=>{if(e.target.nodeName==="LI"){const t=e.target.id;try{const a=await h.get(`https://api.themoviedb.org/3/movie/${t}?api_key=${A}&language=en-US`);W(a.data)}catch(a){console.log(a)}}});T();export{W as m};
//# sourceMappingURL=main-BuXyi7k6.js.map
