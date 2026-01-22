import{a as u,S as m,i as n}from"./assets/vendor-B3IAfeER.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const f="https://pixabay.com/api/",d="54180070-46282e1a529b434bb638d8dc5";function g(o){return u.get(f,{params:{key:d,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40}}).then(r=>r.data).catch(r=>{throw console.error("Error fetching images:",r),r})}const p=document.querySelector(".gallery"),y=new m(".gallery a",{captionsData:"alt",captionDelay:250});function h(o){const r=o.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
      </a>
      <div class="info">
      <p class="info-item-text">Likes <span class="info-item-text-span">${e.likes}</span></p>
      <p class="info-item-text">Views <span class="info-item-text-span">${e.views}</span></p>
      <p class="info-item-text">Comments <span class="info-item-text-span">${e.comments}</span></p>
      <p class="info-item-text">Downloads <span class="info-item-text-span">${e.downloads}</span></p>
        </div>
    </li>
  `).join("");p.innerHTML=r,y.refresh()}function L(){p.innerHTML=""}function v(){const o=document.getElementById("page-loader");o&&o.classList.add("active")}function l(){const o=document.getElementById("page-loader");o&&o.classList.remove("active")}const x=document.querySelector(".form"),i=document.getElementById("text");x.addEventListener("submit",o=>{o.preventDefault();const r=i.value.trim();if(i.value="",r)i.classList.remove("error");else{n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3}),i.classList.add("error"),i.focus();return}L(),v(),g(r).then(e=>{if(l(),!e.hits||e.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3});return}h(e.hits),i.focus()}).catch(e=>{l(),n.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight",timeout:4e3}),console.error("Fetch error:",e)})});
//# sourceMappingURL=index.js.map
