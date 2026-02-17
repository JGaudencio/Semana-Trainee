🚀 Semana Imersão Trainee da Diretoria de Projetos – RocketJR
Este repositório contém o projeto desenvolvido durante a Imersão da Diretoria de Projetos da RocketJR – Janeiro/2026. O foco do trabalho foi simular o ciclo completo de um projeto real, integrando desenvolvimento frontend, backend e gestão de dados.

📌 Sobre o Projeto
O Vitadata é uma solução de inteligência de dados voltada para gestores de pequenas e médias clínicas. O projeto consiste em uma Landing Page estratégica que utiliza um Funil de Qualificação (Quiz) para identificar as dores do cliente, aliada a um Módulo de Gestão (CRM) backend que armazena e organiza leads para a equipe comercial. A solução transforma dados brutos em clareza estratégica para o setor de saúde.

👥 Equipe
João Gaudêncio – Desenvolvedor Full Stack & Gestão de Dados
Mariane de Alcântara - Product Designer UX/UI
Fernanda Carvalho - Analista de Processos

🎯 Cliente
Cliente: Vitadata | Saúde Inteligente.

Objetivo do projeto: Criar uma presença digital que não apenas apresente o serviço, mas que qualifique o potencial cliente através de dados de faturamento e desafios operacionais, entregando uma base de dados pronta para conversão.

📋 Levantamento de Requisitos
Requisitos Funcionais
RF01: O sistema deve apresentar um Quiz de 3 etapas para diagnóstico da clínica.

RF02: O sistema deve capturar dados de contato (nome, e-mail, telefone, faturamento e plano de interesse).

RF03: O sistema deve salvar os dados consolidados (Quiz + Contato) em um arquivo JSON no servidor.

RF04: Deve existir uma interface administrativa (clientes.html) para visualização e filtragem dos leads capturados.

RF05: O progresso do Quiz deve ser mantido mesmo se o usuário atualizar a página (Persistência local).

Requisitos Não Funcionais
RNF01: O frontend deve ser responsivo para dispositivos móveis e desktop.

RNF02: O tempo de resposta do salvamento de leads deve ser inferior a 2 segundos.

RNF03: Uso de persistência híbrida (LocalStorage para experiência do usuário e JSON para integridade dos dados).

RNF04: Interface seguindo a identidade visual "Saúde Inteligente" (Verde Musgo e Inter Font).

🎨 Prototipação
Ferramenta utilizada: Figma

Link do protótipo: [(https://www.figma.com/design/k0CT9u0yeKC1RYoVljSEkp/VITADATA?node-id=1-551&m=dev)]

Status: Aprovado pelo cliente

🛠️ Tecnologias Utilizadas
Frontend: HTML5, CSS3, JavaScript (ES6+).

Backend: Node.js com Framework Express.js.

Bibliotecas: - Swiper.js (Carrosséis de depoimentos e planos).

CORS (Segurança e integração entre portas).

Banco de Dados: Estrutura de arquivos JSON via módulo FS (File System).

🔧 Organização e Versionamento
Este projeto seguiu as diretrizes da Diretoria de Projetos da RocketJR:

Repositório organizado com separação clara entre lógica de cliente e servidor;

Uso de commits descritivos para cada funcionalidade implementada;

Backend modularizado para facilitar a manutenção da pasta de leads.

🌐 Deploy
Plataforma de deploy: [INSERIR ONDE VOCÊ FEZ O DEPLOY, ex: Vercel/Render]

Link do deploy: [INSERIR LINK AQUI]

📂 Estrutura do Projeto

/
├── leads/              # Armazenamento permanente (Banco de dados JSON)
│   └── leads.json      # Arquivo onde os leads são acumulados
├── assets/             # Imagens, logos e ícones
├── css/                # Estilização e variáveis de design
├── js/                 
│   ├── script.js       # Lógica da Landing Page e integração com API
│   └── script2.js      # Lógica de renderização e filtros do CRM
├── index.html          # Landing Page e Quiz
├── clientes.html       # Painel de Gestão de Clientes (CRM)
├── server.js           # Servidor Node.js (API de persistência)
├── package.json        # Dependências do projeto
└── README.md           # Documentação do projeto


📝 Observações Finais
O projeto destaca-se pela integração real entre o frontend e o backend no ambiente local. A implementação do servidor Node.js permitiu que o arquivo leads.json funcionasse como um banco de dados dinâmico, simulando com precisão o fluxo de dados de uma aplicação comercial em produção.

📎 Referências e Materiais de Apoio

Guia de Projetos RocketJR

Documentação MDN Web Docs

Documentação oficial do Node.js e Express.js