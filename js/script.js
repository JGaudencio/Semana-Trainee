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

    // 2. INICIALIZAÇÃO DO CARROSSEL DE PLANOS
    const swiperPricing = new Swiper('.pricing-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        pagination: {
            el: '.pricing-pagination',
            clickable: true,
        },
        breakpoints: {
            320: { slidesPerView: 1.1, spaceBetween: 15, enabled: true },
            600: { slidesPerView: 1.5, spaceBetween: 20, enabled: true },
            1025: { enabled: false, slidesPerView: 3, spaceBetween: 30, centeredSlides: false }
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

    // 4. CONFIGURAÇÃO DO FORMULÁRIO DE CONTATO
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            enviarParaServidor(this);
        });
    }

    // Bloquear scroll inicial se o quiz estiver ativo
    if (document.body.classList.contains('quiz-active')) {
        document.body.style.overflow = 'hidden';
    }
});

// --- LÓGICA DO QUIZ E PERSISTÊNCIA ---

// Recupera dados salvos ou inicia novo objeto
let collectedData = {
    quiz: JSON.parse(localStorage.getItem('vitadata_temp_quiz')) || {},
    contato: {}
};

function nextStep(step) {
    // Captura a resposta da pergunta atual antes de mudar
    const currentStepDiv = document.querySelector('.quiz-step.active');
    if (currentStepDiv) {
        const question = currentStepDiv.querySelector('h2').innerText;
        const answer = event.target.innerText;
        
        collectedData.quiz[question] = answer;
        // Salva temporariamente para não perder se a página atualizar
        localStorage.setItem('vitadata_temp_quiz', JSON.stringify(collectedData.quiz));
    }

    // Muda de tela
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`quiz-step-${step}`).classList.add('active');
}

function finishQuiz() {
    // Captura a última resposta
    const currentStepDiv = document.querySelector('.quiz-step.active');
    const question = currentStepDiv.querySelector('h2').innerText;
    const answer = event.target.innerText;
    
    collectedData.quiz[question] = answer;
    localStorage.setItem('vitadata_temp_quiz', JSON.stringify(collectedData.quiz));

    // Efeito visual de fechamento
    const overlay = document.getElementById('quiz-overlay');
    overlay.style.opacity = '0';
    
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.classList.remove('quiz-active');
        document.body.style.overflow = 'auto'; // Libera o scroll
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
}

// --- COMUNICAÇÃO COM O SERVIDOR ---

function enviarParaServidor(formElement) {
    const formData = new FormData(formElement);
    
    // Organiza os dados do contato
    collectedData.contato = {
        nome: formData.get('nome') || formElement.querySelectorAll('input')[0].value,
        email: formData.get('email') || formElement.querySelectorAll('input')[1].value,
        telefone: formData.get('telefone') || formElement.querySelectorAll('input')[2].value,
        faturamento: formData.get('faturamento') || formElement.querySelectorAll('input')[3].value,
        plano: formElement.querySelector('select').value,
        data_envio: new Date().toLocaleString('pt-BR')
    };

    // Envia o pacote completo (Quiz + Contato) para o seu server.js
    fetch('http://localhost:3000/save-lead', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(collectedData)
    })
    .then(response => {
        if(response.ok) {
            alert("Perfeito! Um de nossos especialistas entrará em contato com você em breve.");
            
            // Limpa tudo após o sucesso
            localStorage.removeItem('vitadata_temp_quiz');
            collectedData.quiz = {}; 
            formElement.reset();
        } else {
            throw new Error("Falha no servidor");
        }
    })
    .catch(error => {
        console.error('Erro ao salvar:', error);
        alert("Ops! Verifique se o seu servidor Node.js está rodando no terminal.");
    });
}