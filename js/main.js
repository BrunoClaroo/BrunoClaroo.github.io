// Aguarda o carregamento do DOM para garantir que todos os elementos existam
document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- LÓGICA DO BOTÃO VOLTAR AO TOPO ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- LÓGICA DO MODAL DA GALERIA ---
    const modal = document.getElementById('imageModal');
    // Verifica se o modal existe na página atual antes de adicionar listeners
    if (modal) {
        const modalImg = document.getElementById('modalImage');
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const closeBtn = document.querySelector('.close-btn');

        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                modal.style.display = 'flex'; // Usar flex para centralizar
                modalImg.src = this.dataset.full; // Pega o caminho da imagem full
            });
        });

        // Fecha o modal ao clicar no 'X'
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Fecha o modal ao clicar fora da imagem
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // --- LÓGICA DE VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
    const contactForm = document.getElementById('contactForm');
    // Verifica se o formulário existe na página atual
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o envio automático

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;
            let errorMessage = '';

            // 1. Validação de campos vazios
            if (name === '' || email === '' || message === '') {
                isValid = false;
                errorMessage = 'Por favor, preencha todos os campos.';
            }

            // 2. Validação do formato do e-mail usando Regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (isValid && !emailRegex.test(email)) {
                isValid = false;
                errorMessage = 'Por favor, insira um endereço de e-mail válido.';
            }
            
            // 3. Exibição do resultado
            if (isValid) {
                alert('Obrigado pelo seu contato! Mensagem enviada com sucesso.');
                contactForm.reset(); // Limpa o formulário
                // Em um projeto real, aqui você faria uma chamada para um backend (API)
                // para processar os dados do formulário, como por exemplo:
                // fetch('/api/contact', { method: 'POST', body: new FormData(contactForm) });
            } else {
                alert(errorMessage);
            }
        });
    }
});