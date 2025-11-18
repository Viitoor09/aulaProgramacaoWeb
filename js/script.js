/* Anjos de Sangue ADS - Scripts (Entrega II)
   ==========================================
   1. Navegação (Menu Hambúrguer)
   2. Componentes (Modal)
   3. Formulários (Máscaras e Validação com Toast)
*/

// Executa o script quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function() {

    /* --- 1. Navegação (Menu Hambúrguer) --- */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    /* --- 2. Componentes (Modal) --- */
    // Usado no index.html para o resultado do CEP
    const cepForm = document.getElementById('cepForm');
    const modalOverlay = document.getElementById('resultado-modal');
    const modalCloseBtn = document.getElementById('modal-close');

    // Abrir o modal (simulação de busca)
    if (cepForm) {
        cepForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (modalOverlay) {
                modalOverlay.classList.add('active');
            }
        });
    }

    // Fechar o modal
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }
    // Fechar clicando fora
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    /* --- 3. Formulários (Máscaras e Validação com Toast) --- */
    
    // Função universal para aplicar a máscara
    function applyMask(input, maskFunction) {
        if (input) {
            input.addEventListener('input', (e) => {
                e.target.value = maskFunction(e.target.value);
            });
        }
    }

    // Funções de máscara
    const maskCPF = (value) => {
        return value
            .replace(/\D/g, '') // Remove não-dígitos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const maskTelefone = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2');
    };

    const maskCEP = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/^(\d{5})(\d)/, '$1-$2');
    };

    // Aplicando as máscaras nos inputs
    applyMask(document.getElementById('cpf'), maskCPF);
    applyMask(document.getElementById('telefone'), maskTelefone);
    applyMask(document.getElementById('cep'), maskCEP);

    // Validação Visual e Toast (cadastro.html)
    const cadastroForm = document.getElementById('cadastro-form');
    const successToast = document.getElementById('success-toast');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio real

            // Adiciona classe para mostrar erros de validação
            cadastroForm.classList.add('form-was-validated');

            if (cadastroForm.checkValidity()) {
                // Se o formulário for válido, mostra o Toast
                if (successToast) {
                    successToast.classList.add('show');
                    // Esconde o toast após 3 segundos
                    setTimeout(() => {
                        successToast.classList.remove('show');
                    }, 3000);
                }
                // Limpa o formulário e reseta a validação
                cadastroForm.reset();
                cadastroForm.classList.remove('form-was-validated');
                
            } else {
                // O formulário é inválido, o CSS cuidará de mostrar os erros
                console.log("Formulário inválido");
            }
        });
    }

});