
# CampusCoin

**CampusCoin** é uma plataforma educacional voltada para educação financeira, focada em ações, investimentos, e ferramentas de aprendizado. A plataforma permite que usuários acompanhem preços de ações em tempo real, visualizem gráficos interativos, tenham acesso a funcionalidades de login e cadastro com reconhecimento facial usando o **FaceAPI**, e oferece uma seção dedicada à **Newsletter** com notícias sobre o mercado financeiro.

## Sumário

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Instalação e Configuração](#instalação-e-configuração)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Dependências](#dependências)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## Visão Geral do Projeto

O CampusCoin foi criado para ajudar os usuários a entender melhor o mundo dos investimentos através de uma experiência interativa. A plataforma oferece ferramentas para visualizar preços de ações e inclui um sistema de reconhecimento facial para cadastro e login, proporcionando uma experiência de autenticação moderna e segura.

A versão atual utiliza **PHP** e **MySQL** com o servidor **XAMPP** para gerenciamento de banco de dados e back-end. O sistema de **Jornadas** ainda não está implementado nesta versão. Há uma página dedicada à **Newsletter**, que fornece notícias atualizadas sobre o mercado financeiro.

## Funcionalidades

### 1. Acompanhamento de Ações
- Exibe ações em tempo real utilizando uma API conectada ao mercado de ações brasileiro.
- O usuário pode organizar a exibição das ações em um carrossel.

### 2. Cadastro e Login com Reconhecimento Facial
- Implementado usando o **FaceAPI**, o sistema permite que os usuários se cadastrem e façam login através do reconhecimento facial.
- A integração com o banco de dados MySQL armazena as informações dos usuários de forma segura.

### 3. Content Hub
- Adição de vídeos educacionais diretamente no Content Hub.
- Sistema de comentários e likes integrados.
- Todos os dados, incluindo comentários e likes, são persistidos no banco de dados MySQL.

### 4. TradingView e Calculadora
- Visualização de gráficos de ações interativos.
- Ferramenta de calculadora para auxiliar os usuários em simulações financeiras.

### 5. Newsletter
- Página dedicada a **notícias sobre o mercado financeiro**, ajudando os usuários a se manterem informados sobre eventos e tendências do mercado.

## Instalação e Configuração

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [XAMPP](https://www.apachefriends.org/index.html) (PHP, MySQL e Apache)
- [FaceAPI](https://github.com/justadudewhohacks/face-api.js) (para reconhecimento facial)

### Passos para Instalação

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/seu-usuario/CampusCoin.git
   ```

2. **Configuração do XAMPP**

   - Inicie o servidor Apache e MySQL no painel de controle do XAMPP.
   - Coloque os arquivos do projeto na pasta `htdocs` do XAMPP.

3. **Configuração do Banco de Dados**

   Configure o MySQL com um banco de dados adequado e importe o arquivo `campus_coin.sql`:

   ```bash
   mysql -u seu-usuario -p nome-do-banco < /caminho/para/campus_coin.sql
   ```

4. **Variáveis de Ambiente**

   Configure o arquivo de conexão com o banco de dados dentro do projeto para conectar com o MySQL local, caso necessário.

5. **Executar o Projeto**

   No navegador, acesse `http://localhost/campuscoin`.

## Estrutura de Arquivos

Abaixo está uma visão geral da estrutura dos arquivos principais do projeto:

```bash
CampusCoin/
│
├── api/                   # Lógica para chamadas de API
├── node_modules/           # Módulos do Node.js (caso utilize npm para dependências externas)
├── public/                 # Arquivos públicos acessíveis via navegador
│   ├── assets/             # Arquivos estáticos
│   │   ├── css/            # Arquivos de estilos CSS
│   │   ├── img/            # Imagens usadas no site
│   │   ├── lib/            # Bibliotecas externas
│   │   └── script/         # Scripts JavaScript
│   └── html_files          # Arquivos HTML principais do projeto
│       ├── bolsa-valores.html
│       ├── cadastro.html
│       ├── calc.html
│       ├── ContentHub.html
│       ├── editprofile.html
│       ├── index.html
│       ├── login.html
│       ├── newsletter.html
│       ├── paginicial.html
│       ├── quiz.html
│       ├── register-new-videos.html
│       ├── TradingView.html
│       └── userprofile.html
├── .gitignore              # Arquivo Git para ignorar certos arquivos/pastas
├── campus_coin.sql         # Arquivo de configuração do banco de dados
├── db.json                 # Configuração do banco de dados (ou arquivos de dados)
├── index.js                # Ponto de entrada JavaScript (se necessário)
├── package-lock.json       # Arquivo de lock para dependências
├── package.json            # Gerenciador de dependências do projeto (caso npm seja usado)
└── README.md               # Documentação do projeto
```

## Dependências

Este projeto utiliza várias bibliotecas externas. As principais dependências incluem:

- **PHP** - Usado para a lógica de back-end e conexão com o banco de dados.
- **MySQL** - Banco de dados para armazenar informações dos usuários, vídeos, comentários e likes.
- **FaceAPI.js** - Biblioteca JavaScript para reconhecimento facial e autenticação do usuário.
- **Brapi API** - API para obter preços e dados das ações.

## Tecnologias Utilizadas

- **PHP**: Back-end e integração com o banco de dados.
- **MySQL**: Banco de dados para persistir dados de usuários, vídeos, comentários e likes.
- **HTML/CSS/JavaScript**: Estrutura e estilização do site.
- **FaceAPI.js**: Reconhecimento facial para cadastro e login.
- **XAMPP**: Plataforma local que inclui Apache, MySQL e PHP.

## Contribuindo

Se você deseja contribuir para este projeto, siga os seguintes passos:

1. Fork este repositório.
2. Crie uma nova branch (`git checkout -b feature-sua-feature`).
3. Faça o commit de suas alterações (`git commit -m 'Adicionei uma nova feature'`).
4. Faça o push para a branch (`git push origin feature-sua-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
