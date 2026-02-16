document.addEventListener('DOMContentLoaded', () => {

    // 1. INICIALIZAÇÃO DO CARROSSEL DE DEPOIMENTOS
    const swiperTestimonials = new Swiper('.testimonial-slider', {
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
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    // 2. INICIALIZAÇÃO DO CARROSSEL DE PLANOS (Apenas Mobile/Tablet)
    const swiperPricing = new Swiper('.pricing-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        pagination: {
            el: '.pricing-pagination',
            clickable: true,
        },
        breakpoints: {
            // Celulares pequenos
            320: {
                slidesPerView: 1.1,
                spaceBetween: 15,
                enabled: true
            },
            // Celulares médios/Tablets
            600: {
                slidesPerView: 1.5,
                spaceBetween: 20,
                enabled: true
            },
            // Desktop (Acima de 1025px o Swiper é desativado para o grid assumir)
            1025: {
                enabled: false,
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false
            }
        }
    });

    // 3. SCROLL SUAVE PARA LINKS INTERNOS
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