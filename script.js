document.addEventListener('DOMContentLoaded', function() {
    // Função para atualizar estatísticas
    function updateStats() {
        // Simulação de dados - substitua com dados reais da sua API
        document.getElementById('server-count').textContent = Math.floor(Math.random() * 1000);
        document.getElementById('user-count').textContent = Math.floor(Math.random() * 50000);
        document.getElementById('trips-count').textContent = Math.floor(Math.random() * 100000);
    }

    // Inicializa e atualiza as estatísticas a cada 5 segundos
    updateStats();
    setInterval(updateStats, 5000);

    // Smooth scroll para navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação da navbar durante o scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        } else {
            nav.style.backgroundColor = 'var(--primary-color)';
        }
    });

    // Animação para cards de comandos
    const commandCards = document.querySelectorAll('.command-card');
    commandCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Botão de voltar ao topo
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Adicione isso ao seu CSS
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--secondary-color);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            display: none;
            font-size: 20px;
            transition: background-color 0.3s;
            z-index: 1000;
        }

        .back-to-top:hover {
            background: var(--primary-color);
        }
    `;
    document.head.appendChild(style);

    // Loading animation
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'none';
        }
    });

    // Mobile menu toggle
    const menuButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuButton && navLinks) {
        menuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    }
});

// Função para validar formulário de contato (se houver)
function validateContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');
        const message = form.querySelector('textarea');

        if (email && message) {
            if (email.value && message.value) {
                // Aqui você pode adicionar o código para enviar o formulário
                alert('Mensagem enviada com sucesso!');
                form.reset();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        }
    });
}

// Animações de entrada para elementos
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializa as animações de scroll
animateOnScroll();

// Função para carregar estatísticas reais do bot (exemplo)
async function loadRealStats() {
    try {
        const response = await fetch('https://sua-api.com/bot-stats');
        const data = await response.json();
        
        if (data) {
            document.getElementById('server-count').textContent = data.servers;
            document.getElementById('user-count').textContent = data.users;
            document.getElementById('trips-count').textContent = data.trips;
        }
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}

// Tema escuro/claro
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('dark-theme', isDark);
    });

    // Verificar preferência salva
    const savedTheme = localStorage.getItem('dark-theme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
}

// Inicializar toggle de tema
initThemeToggle();