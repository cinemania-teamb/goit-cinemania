  /*Formu Butonun İçine Hapsetmek İçin Kullanılan Js Kodu*/
        document.addEventListener("DOMContentLoaded", function () {
     const  modalwindow = document.querySelector(".modal-window");
     const openModalBtn = document.querySelector(".footer-btn");
     const closeModalBtn = document.querySelector(".modal-btn");
 
     modalwindow.style.display = "none";
     openModalBtn.addEventListener("click", function () {
         modalwindow.style.display = "block";
     });
     closeModalBtn.addEventListener("click", function () {
         modalwindow.style.display = "none";
     });
     window.addEventListener("click", function (event) {
         if (event.target === modalwindow) {
              modalwindow.style.display = "none";
         }
     });
 });