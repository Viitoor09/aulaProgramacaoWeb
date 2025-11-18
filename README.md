Anjos de Sangue ADS (Projeto de Desenvolvimento Front-End Para Web)

Projeto acadêmico de front-end para a disciplina de Desenvolvimento Front-End Para Web . O objetivo foi construir um site para uma ONG fictícia de doação de sangue ("Anjos de Sangue ADS"), evoluindo de um HTML estático para uma Single Page Application (SPA) dinâmica, acessível e profissional.

Link para o Deploy (GitHub Pages): https://github.com/Viitoor09/aulaProgramacaoWeb.git

🚀 Funcionalidades Principais

Single Page Application (SPA): Navegação fluida sem recarregamento de página, utilizando um roteador JavaScript baseado em Hash.

Design Responsivo (Mobile-First): Interface adaptável para desktops, tablets e celulares.

Componentes Reativos:

Menu hambúrguer para navegação mobile.

Modal de feedback para a busca de CEP.

Toast de notificação para sucesso no cadastro.

Validação de Formulário Real-Time: Verificação de consistência de dados (WCAG) que informa o usuário em tempo real sobre erros (.valid/.invalid).

Acessibilidade (WCAG 2.1 Nível AA):

Suporte completo a leitores de tela (ARIA roles, aria-live, aria-invalid).

Navegação total por teclado, incluindo "focus trap" em modais.

Contraste de cores 4.5:1 (mínimo) verificado.

Modo Escuro (Dark Mode): O layout se adapta automaticamente ao tema do sistema operacional do usuário (prefers-color-scheme: dark).

🛠️ Tecnologias Utilizadas

HTML5 Semântico: Estrutura acessível (<header>, <main>, <nav>, <section>).

CSS3 Customizado (Design System):

Variáveis CSS (:root) para cores, fontes e espaçamento.

Layout baseado em CSS Grid (grid de 12 colunas customizado).

Flexbox para alinhamento de componentes.

Breakpoints responsivos (@media).

JavaScript (ES6+):

Manipulação do DOM.

Roteador SPA (Hash router).

fetch API para carregamento de templates.

Validação de formulários e aplicação de máscaras (RegExp).

📁 Estrutura do Projeto

O projeto é organizado na seguinte estrutura de pastas:

anjos-de-sangue-ads/
│
├── index.html          # A "casca" principal da SPA
│
├── css/
│   └── style.css       # O Design System e todos os estilos
│
├── js/
│   └── script.js       # O "cérebro" da SPA (roteador, validação, componentes)
│
├── pages/
│   ├── inicio.html     # Template (conteúdo) da página inicial
│   ├── projetos.html   # Template (conteúdo) da página de projetos
│   └── cadastro.html   # Template (conteúdo) da página de cadastro
│
├── imagem/
│   ├── banner.png
│   ├── doacao.png
│   └── (e todas as outras imagens)
│
└── README.md           # Esta documentação


📜 Processo de Desenvolvimento (Entrega IV)

Esta entrega final seguiu práticas profissionais de desenvolvimento e deploy.

1. Controle de Versão (GitFlow e Commits Semânticos)

Para a gestão do código, foi simulada uma estratégia de GitFlow:

main: Branch de produção. Contém apenas o código estável (Releases/Tags).

develop: Branch de desenvolvimento. Onde as novas features são integradas.

feature/nome-da-feature: Branches criadas a partir do develop para novas funcionalidades (ex: feature/dark-mode, feature/spa-router).

O histórico de commits semânticos foi utilizado para manter a clareza:

feat(spa): Implementa o roteador e carregamento de páginas

fix(css): Corrige bug de layout no formulário de cadastro

refactor(js): Modulariza funções de inicialização

style(css): Adiciona modo escuro (WCAG)

docs(readme): Atualiza documentação final do projeto

2. Otimização para Produção

Para o deploy em produção (GitHub Pages), foram seguidos os seguintes passos de otimização:

Minificação: O CSS (style.css) e o JS (script.js) foram "minificados" (remoção de espaços em branco e comentários) usando uma ferramenta online (ex: Terser ou CSS Minifier) para reduzir o tamanho dos arquivos.

Compressão de Imagens: Todas as imagens PNG na pasta imagem/ foram comprimidas usando uma ferramenta (ex: TinyPNG) para reduzir o tempo de carregamento sem perda de qualidade visível.

🚀 Como Executar Localmente

Clone o repositório:

git clone [https://github.com/Viitoor09/aulaProgramacaoWeb.git](https://github.com/Viitoor09/aulaProgramacaoWeb.git)


Navegue até a pasta do projeto:

cd aulaProgramacaoWeb


Abra o arquivo index.html em seu navegador.
(Observação: Se estiver usando o VS Code, a extensão "Live Server" é recomendada para lidar com as requisições fetch da SPA).