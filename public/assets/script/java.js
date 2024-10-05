// Dados dos produtos
const produtos = [
    {
        "id": 1,
        "titulo": "Content Hub",
        "descricao": "Videos com conteudos educativos sobre finanças.",
        "imagem": "assets/img/contenthubprint.png",
        "detalheAdicional": "Clique aqui",
        "link": "./ContentHub.html"
    },
    {
        "id": 2,
        "titulo": "Calculadora",
        "descricao": "Uma calculadora que tambem calcula impostos.",
        "imagem": "assets/img/calculadoraprint.png",
        "detalheAdicional": "Clique aqui",
        "link": "./calc.html"
    },
    {
        "id": 3,
        "titulo": "Newsletter",
        "descricao": "Noticias sobre o mundo do investimento e afim.",
        "imagem": "assets/img/newsletter.png",
        "detalheAdicional": "Clique aqui",
        "link": "./newsletter.html"
    },
    {
        "id": 4,
        "titulo": "Trading View",
        "descricao": "Gráficos para fazerem análises de seus investimentos",
        "imagem": "assets/img/tradingview.png",
        "detalheAdicional": "Clique aqui",
        "link": "./TradingView.html"
    },
    {
        "id": 4,
        "titulo": "Bolsa de valores",
        "descricao": "Acesse as cotações das ações brasileiras",
        "imagem": "assets/img/bolsa-valores.png",
        "detalheAdicional": "Clique aqui",
        "link": "./bolsa-valores.html"
    }
    
];

// Função para criar um card
function createCard(item) {
    return `
        <div class="container-cards-pg-inicial">
            <div class="thumb-cards-pg-inicial"><img src="${item.imagem}" alt="${item.titulo}"></div>
            <div class="title-cards-pg-inicial"><h4>${item.titulo}</h4></div>
            <div class="description-cards-pg-inicial"><p>${item.descricao}</p></div>
            <div class="call-to-action-cards-pg-inicial"><p>Venha conhecer mais -></p></div>
            <div class="button-cards-pg-inicial"><button onclick="window.location='${item.link}'"><img src="assets/img/Click.png" alt=""></button></div>
        </div> 
    `;
}

// Função para exibir os dados na página
function displayData() {
    const container = document.getElementById('data-container');
    produtos.forEach(item => {
        container.innerHTML += createCard(item);
    });
}

// Chamar a função para exibir os dados ao carregar a página
window.onload = displayData;


