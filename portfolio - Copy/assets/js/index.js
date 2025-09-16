window.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("siteData"));
  if(savedData){
    if(savedData.job && document.querySelector(".user-job"))
      document.querySelector(".user-job").textContent = savedData.job;

    if(savedData.desc && document.querySelector(".user-description"))
      document.querySelector(".user-description").textContent = savedData.desc;

    if(savedData.about && document.querySelector(".about-content"))
      document.querySelector(".about-content").textContent = savedData.about;

    if(savedData.exp && document.querySelectorAll(".statistics-count")[0])
      document.querySelectorAll(".statistics-count")[0].textContent = savedData.exp;

    if(savedData.projects && document.querySelectorAll(".statistics-count")[1])
      document.querySelectorAll(".statistics-count")[1].textContent = savedData.projects;

    if(savedData.companies && document.querySelectorAll(".statistics-count")[2])
      document.querySelectorAll(".statistics-count")[2].textContent = savedData.companies;
  }

  const eduData = JSON.parse(localStorage.getItem("eduData"));
  if(eduData && document.querySelector(".edu-swiper .swiper-wrapper")){
    const wrapper = document.querySelector(".edu-swiper .swiper-wrapper");
    wrapper.innerHTML = "";

    eduData.forEach(c => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <div class="edu-card">
          <h4 class="edu-card-title">${c.title}</h4>
          <div class="edu-card-body">
            <h4 class="edu-uni">${c.uni}</h4>
            <p class="edu-time">
              <i class="fa-solid fa-calendar"></i>
              <span>${c.year}</span>
            </p>
          </div>
        </div>
      `;
      wrapper.appendChild(slide);
    });

    if (typeof Swiper !== "undefined") {
      new Swiper('.edu-swiper', {
        slidesPerView: 1,
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });
    }
  }
});
