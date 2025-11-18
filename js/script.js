/**
 * Prende o foco do teclado dentro de um elemento (para Modais).
 * @param {HTMLElement} element - O elemento que deve conter o foco.
 */
function trapFocus(element) {
    const focusableEls = element.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="email"]:not([disabled]), input[type="tel"]:not([disabled]), input[type="date"]:not([disabled]), input[type="submit"]:not([disabled]), select:not([disabled])'
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    const KEYCODE_TAB = 9;

    element.addEventListener('keydown', function(e) {
        const isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }
    });
    
    // Foca no primeiro elemento ao abrir
    if(firstFocusableEl) {
        firstFocusableEl.focus();
    }
}

// --- 4. Componentes (Menu Hambúrguer) ---
function initMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    if (!hamburgerBtn || !navLinks) return;
    
    const firstFocusableEl = navLinks.querySelector('a');

    function closeMenu() {
        navLinks.classList.remove('active');
        hamburgerBtn.innerHTML = '&#9776;';
        hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
        hamburgerBtn.setAttribute('aria-expanded', 'false'); // WCAG
        hamburgerBtn.focus(); // Devolve o foco ao botão
    }

    hamburgerBtn.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        if (isActive) {
            hamburgerBtn.innerHTML = '&times;';
            hamburgerBtn.setAttribute('aria-label', 'Fechar menu');
            hamburgerBtn.setAttribute('aria-expanded', 'true'); // WCAG
            trapFocus(navLinks); // Prende o foco no menu
            if(firstFocusableEl) firstFocusableEl.focus();
        } else {
            closeMenu();
        }
    });
    
    // Fecha o menu com a tecla Esc (Acessibilidade)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
}

// --- 3. Verificação de Consistência (Validação WCAG) ---
function validateField(input) {
    const formGroup = input.parentElement;
    const errorSpan = formGroup.querySelector('.error-message');

    if (input.checkValidity()) {
        formGroup.classList.remove('invalid');
        formGroup.classList.add('valid');
        if (errorSpan) errorSpan.style.display = 'none';
        input.setAttribute('aria-invalid', 'false'); // WCAG
    } else {
        formGroup.classList.remove('valid');
        formGroup.classList.add('invalid');
        if (errorSpan) errorSpan.style.display = 'block';
        input.setAttribute('aria-invalid', 'true'); // WCAG
    }
}

// --- 2. Manipulação do DOM (Funções de Inicialização por Página) ---

// Inicializa os scripts da página de Início
function initInicioPage() {
    const cepForm = document.getElementById('cepForm');
    const modalOverlay = document.getElementById('resultado-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const cepInput = document.getElementById('cep-index');
    if(!cepForm || !modalOverlay || !modalCloseBtn || !cepInput) return;

    // Máscara
    applyMask(cepInput, maskCEP);
    cepInput.addEventListener('input', () => validateField(cepInput));
    cepInput.addEventListener('blur', () => validateField(cepInput));
    
    function closeModal() {
        modalOverlay.classList.remove('active');
        cepForm.querySelector('button').focus(); // Devolve o foco ao botão
    }
    
    // Modal
    cepForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateField(cepInput);
        if (cepInput.checkValidity()) {
            modalOverlay.classList.add('active');
            trapFocus(modalOverlay); // Prende o foco no modal
        }
    });
    
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Fecha o modal com a tecla Esc (Acessibilidade)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

// Inicializa os scripts da página de Cadastro
function initCadastroPage() {
    const cadastroForm = document.getElementById('cadastro-form');
    if(!cadastroForm) return;
    
    const successToast = document.getElementById('success-toast');
    const inputs = cadastroForm.querySelectorAll('input[required], select[required]');

    inputs.forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    // Aplicando as máscaras
    applyMask(document.getElementById('cpf'), maskCPF);
    applyMask(document.getElementById('telefone'), maskTelefone);
    applyMask(document.getElementById('cep'), maskCEP);

    // Validação no Envio (Submit)
    cadastroForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        let isFormValid = true;
        inputs.forEach(input => {
            validateField(input);
            if (!input.checkValidity()) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            if (successToast) {
                successToast.classList.add('show');
                setTimeout(() => successToast.classList.remove('show'), 3000);
            }
            cadastroForm.reset();
            inputs.forEach(input => {
                input.parentElement.classList.remove('valid', 'invalid');
                input.setAttribute('aria-invalid', 'false');
            });
        } else {
            console.log("Formulário inválido.");
        }
    });
}

// --- Funções de Máscara (Componentes) ---
function applyMask(input, maskFunction) {
    if (input) {
        input.addEventListener('input', (e) => {
            e.target.value = maskFunction(e.target.value);
        });
    }
}
const maskCPF = (value) => value.replace(/\D/g, '').slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
const maskTelefone = (value) => value.replace(/\D/g, '').slice(0, 11).replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
const maskCEP = (value) => value.replace(/\D/g, '').slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2');


// --- 1. Roteador e Carregamento de Conteúdo (SPA) ---
const router = () => {
    const routes = {
        '#inicio': 'inicio',
        '#projetos': 'projetos',
        '#cadastro': 'cadastro'
    };
    
    let hash = window.location.hash || '#inicio';
    if (!routes[hash]) {
        hash = '#inicio';
    }
    
    const pageName = routes[hash];
    loadContent(pageName);
    
    // Atualiza o link "active" no menu
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });
};

// Função para carregar o conteúdo da página via fetch
async function loadContent(pageName) {
    const contentContainer = document.getElementById('app-content');
    if (!contentContainer) return;

    try {
        const response = await fetch(`pages/${pageName}.html`);
        if (!response.ok) throw new Error('Página não encontrada');
        
        const html = await response.text();
        contentContainer.innerHTML = html;
        
        // Foca no título da página para leitores de tela (WCAG)
        const pageTitle = contentContainer.querySelector('h1, h2');
        if(pageTitle) {
            pageTitle.setAttribute('tabindex', '-1');
            pageTitle.focus();
        }

        // Inicializa os scripts específicos daquela página
        if (pageName === 'inicio') {
            initInicioPage();
        } else if (pageName === 'cadastro') {
            initCadastroPage();
        }
        
    } catch (error) {
        console.error('Erro ao carregar a página:', error);
        contentContainer.innerHTML = `<div class="container" style="padding: 4rem 0;"><h2 class="text-center">Erro 404</h2><p class="text-center section-subtitle">A página <strong>${pageName}</strong> não foi encontrada.</p></div>`;
    }
}

// --- Ponto de Entrada Principal ---
document.addEventListener('DOMContentLoaded', () => {
    initMenu(); // Inicializa o menu
    window.addEventListener('hashchange', router); // Ouve por mudanças no hash
    router(); // Carrega o conteúdo inicial
});