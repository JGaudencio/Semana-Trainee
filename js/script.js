/* VITADATA - Scripts de Comportamento
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. INICIALIZAÇÃO DO CARROSSEL (SWIPER)
    const swiper = new Swiper('.testimonial-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // Telas Tablets
            768: { 
                slidesPerView: 2 
            },
            // Telas Desktops
            1024: { 
                slidesPerView: 3 
            }
        }
    });

    // 2. SCROLL SUAVE PARA LINKS INTERNOS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});