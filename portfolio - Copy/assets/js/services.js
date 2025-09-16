document.addEventListener('DOMContentLoaded', () => {
  const originalCards = [
    { title: "Assess Responsive Web Design", desc: "Saytların bütün cihazlarda düzgün və funksional görünməsini təmin edirəm.", icon: "fas fa-mobile-alt", color: "bg-blue" },
    { title: "App Dev Experience", desc: "Frontend əsaslı mobil və web tətbiqlərin hazırlanması üzrə təcrübə.", icon: "fas fa-code", color: "bg-green" },
    { title: "Verify Frontend Competency", desc: "Kod keyfiyyəti, semantik HTML və komponent əsaslı strukturları yoxlayıram.", icon: "fas fa-check-circle", color: "bg-orange" },
    { title: "Security and PM Inspection", desc: "Frontend təhlükəsizlik boşluqlarını və performans məsələlərini analiz edirəm.", icon: "fas fa-shield-alt", color: "bg-red" },
    { title: "UX Commitment and Integration", desc: "İstifadəçi təcrübəsinə önəm verərək UI elementlərini UX prinsipləri ilə uyğunlaşdırıram.", icon: "fas fa-user-check", color: "bg-purple" }
  ];

  const swiper = new Swiper('.services-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: false,
    keyboard: { enabled: true, onlyInViewport: true },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: { 
      640: { slidesPerView: 1 }, 
      768: { slidesPerView: 2 }, 
      1024: { slidesPerView: 3 } 
    },
  });

  const servicesContent = JSON.parse(localStorage.getItem('servicesContent'));
  if (servicesContent) {
    const headEl = document.querySelector('.services-head-content');
    const descEl = document.querySelector('.services-content');
    if (headEl) headEl.textContent = servicesContent.head;
    if (descEl) descEl.textContent = servicesContent.desc;
  }

  let cards = JSON.parse(localStorage.getItem('servicesCards'));
  if (!cards || cards.length === 0) {
    cards = originalCards;
    localStorage.setItem('servicesCards', JSON.stringify(cards));
  }

  const swiperWrapper = document.querySelector('.services-swiper .swiper-wrapper');
  if (swiperWrapper) {
    swiperWrapper.innerHTML = '';
    cards.forEach(card => {
      const slide = document.createElement('div');
      slide.className = `swiper-slide service-card ${card.color}`;
      slide.innerHTML = `
        <div class="icon"><i class="${card.icon}"></i></div>
        <h3>${card.title}</h3>
        <p>${card.desc}</p>
      `;
      swiperWrapper.appendChild(slide);
    });
    swiper.update();
  }
});
