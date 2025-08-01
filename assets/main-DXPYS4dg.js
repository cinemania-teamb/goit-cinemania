import{b as q,a as S}from"./vendor-wG9nbpZs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&document.body.classList.add("dark-theme")});const P={menuToggleClass:".menu-toggle",mobileMenuId:"mobileMenu",mobileOverlayId:"mobileOverlay"},{menuToggleClass:B,mobileMenuId:H,mobileOverlayId:N}=P,k=document.querySelector(B),y=document.getElementById(H),w=document.getElementById(N);k.addEventListener("click",()=>{y.classList.toggle("open"),w.classList.toggle("active")});const U=document.getElementById("theme-switcher"),_=document.body;U.addEventListener("click",()=>{_.classList.toggle("dark-theme");const e=_.classList.contains("dark-theme");localStorage.setItem("theme",e?"dark":"light")});document.addEventListener("click",e=>{const t=y.contains(e.target),s=k.contains(e.target);!t&&!s&&(y.classList.remove("open"),w.classList.remove("active"))});const D=e=>{const t=q.create(`
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
          `);t.show(),document.querySelector(".close").addEventListener("click",()=>{t.close()}),document.addEventListener("keyup",function(o){o.code==="Escape"&&t.close()});const n=document.getElementById("movie-form"),a=document.querySelector(".movie-submit");let r=h();r.some(o=>o.id===e.id)?a.textContent="Remove from my library":a.textContent="Add to my library",n.addEventListener("submit",o=>{if(o.preventDefault(),r=h(),a.textContent==="Remove from my library"){const F=h().filter(x=>x.id!==e.id);localStorage.setItem("movies",JSON.stringify(F)),a.textContent="Add to my library";return}const p={id:e.id,title:e.title,poster_path:e.poster_path,overview:e.overview,vote_average:e.vote_average,vote_count:e.vote_count,popularity:e.popularity,genres:e.genres.map(u=>u.name).join(",")};r.push(p),localStorage.setItem("movies",JSON.stringify(r)),a.textContent="Remove from my library"})};function h(){let e;return localStorage.getItem("movies")===null?e=[]:e=JSON.parse(localStorage.getItem("movies")),e}const v="4e64f2e0a197aa7c5d1170773553320c",f=document.querySelector(".list"),b=document.querySelector(".pagination ul");let $={input:"",year:"",isSearch:!1};const i=`<svg class="icon" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`,d=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`,c=`<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;let m=1,g=1;const A=async(e=1)=>{const t=`https://api.themoviedb.org/3/trending/movie/week?api_key=${v}&language=en-US&page=${e}`;try{const s=await S.get(t);return{filteredData:s.data.results.map(a=>({title:a.title||a.name,rating:Math.round(a.vote_average),genreId:a.genre_ids,year:a.release_date||a.first_air_date,id:a.id,image:a.poster_path})),total_pages:s.data.total_pages}}catch{return!1}},R=async(e,t=null,s)=>{const n=t!==null?`https://api.themoviedb.org/3/search/movie?api_key=${v}&query=${e}&include_adult=false&language=en-US&page=${s}&primary_release_year=${t}`:`https://api.themoviedb.org/3/search/movie?api_key=${v}&query=${e}&include_adult=false&language=en-US&page=${s}`;try{const a=await S.get(n);return{filteredFilms:a.data.results.map(o=>({title:o.title||o.name,rating:Math.round(o.vote_average),genreId:o.genre_ids,year:o.release_date||o.first_air_date,id:o.id,image:o.poster_path})),total_pages:a.data.total_pages}}catch(a){return a.data}},I=e=>{f.innerHTML="";const t=e.map(({id:s,title:n,image:a,year:r,rating:o})=>{const p=r.split("-")[0],u=j(o);return a&&`<li id="${s}" style="background-image: url(https://image.tmdb.org/t/p/w500/${a});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${n.toUpperCase()} | ${p}</p>
              ${u}
          </div>
      </li>`}).join("");f.insertAdjacentHTML("beforeend",t)},M=(e,t)=>{b.innerHTML="";let s="";t>1&&(s+=`<li data-page="${t-1}" class="prev"><</li>`);let n=Math.max(1,t-2),a=Math.min(e,t+2);for(let r=n;r<=a;r++)s+=`<li data-page="${r}" class="${r===t?"active":""}">${r}</li>`;t<e&&(s+=`<li data-page="${t+1}" class="next">></li>`),b.innerHTML=s},E=async(e=1)=>{try{const{filteredData:t,total_pages:s}=await A(e);g=s,m=e,I(t),M(g,m),$={input:"",year:"",isSearch:!1}}catch(t){console.log(t)}},O=async(e,t,s=1)=>{try{const{filteredFilms:n,total_pages:a}=await R(e,t,s);if(g=a,m=s,n.length===0){f.innerHTML='<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>',b.innerHTML="";return}return I(n),M(g,m),$={input:e,year:t,isSearch:!0},$}catch(n){console.log(n)}},j=e=>{let t="";switch(e){case 0:t=`${i.repeat(5)}`;break;case 1:t=`${d}${i.repeat(4)}`;break;case 2:t=`${c}${i.repeat(4)}`;break;case 3:t=`${c}${d}${i.repeat(3)}`;break;case 4:t=`${c.repeat(2)}${i.repeat(3)}`;break;case 5:t=`${c.repeat(2)}${d}${i.repeat(2)}`;break;case 6:t=`${c.repeat(3)}${i.repeat(2)}`;break;case 7:t=`${c.repeat(3)}${d}${i}`;break;case 8:t=`${c.repeat(4)}${i}`;break;case 9:t=`${c.repeat(4)}${d}`;break;case 10:t=`${c.repeat(5)}`;break;default:throw new Error("Invalid rating")}return`<div>${t}</div>`},L=document.getElementById("catolog-form"),T=document.querySelector(".list"),C=document.querySelector(".pagination ul"),W="4e64f2e0a197aa7c5d1170773553320c";let l={input:"",year:"",isSearch:!1};L.addEventListener("submit",async e=>{e.preventDefault();const t=e.target.elements.input.value,s=e.target.elements.choose.value;if(t===""){T.innerHTML='<li class="not-found">Please enter a search term.</li>',C.innerHTML="",l={input:"",year:"",isSearch:!1};return}const n=await O(t,s,1);l.isSearch=n.isSearch,l.input=n.input,l.year=n.year,L.reset()});C.addEventListener("click",async e=>{if(e.target.tagName==="LI"&&e.target.dataset.page){const t=Number(e.target.dataset.page);l.isSearch?await O(l.input,l.year,t):await E(t)}});T.addEventListener("click",async e=>{if(e.target.nodeName==="LI"){const t=e.target.id;try{const s=await S.get(`https://api.themoviedb.org/3/movie/${t}?api_key=${W}&language=en-US`);D(s.data)}catch(s){console.log(s)}}});E();
//# sourceMappingURL=main-DXPYS4dg.js.map
