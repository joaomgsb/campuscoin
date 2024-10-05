// script_api.js

// Arrays vazios para armazenar os dados das ações
const array1 = [];
const array2 = [];
const array3 = [];
const array4 = [];
const array5 = [];
const array6 = [];

// Array contendo os tickers das ações
const tickers = [
    ["PETR4", "ITUB4", "VALE3", "WEGE3", "ABEV3", "BBAS3", "BPAC11", "BBDC3", "ITSA4", "SANB11", "ELET3", "VIVT3", "JBSS3", "SUZB3", "BBSE3", "RDOR3", "B3SA3", "SBSP3", "RENT3", "RADL3"],
    ["ALLD3","LEVE3","VULC3","CSMG3","PETR4","BRAP4","AURE3","EVEN3","MTRE3","EKTR3","GOAU4","GOAU4","CMIG4","CEEB3","BMGB4","AGRO3","REDE3","CSNA3","VALE3","PGMN3"],
    ["PETR4","JBSS3","ITUB4","BBAS3","BBDC3","RAIZ4","VALE3","VBBR3","MRFG3","SANB11","UGPA3","CRFB3","ABEV3","BRKM5","ASAI3","GOAU4","GGBR3","BPAC11","BRFS3","VIVT3"],
    ["PETR4","VALE3","ITUB4","BBAS3","ABEV3","ITSA4","BBDC3","BPAC11","SANB11","SUZB3","BBSE3","GOAU4","GGBR3","WEGE3","CPFE3","CSAN3","CMIG4","VBBR3","VIVT3","PRIO3"],
    ["BEEF3","CGAS3","LEVE3","BBSE3","MOAR3","CURY3","REDE3","EQPA3","PLPL3","CEGR3","ENMT4","EGIE3","HBTS5","SOJA3","CSRN3","ODPV3","VBBR3","WEGE3","PRIO3","WIZC3"],
    ["STBP3","NTCO3","POSI3","MOAR3","SOJA3","FRAS3","ARML3","GOLL4","DEXP3","SRNA3","PRIO3","PFRM3","UGPA3","KEPL3","ENGI11","EUCA3","BEEF3","VLID3","GOAU4","GGBR3"]
];

const token = 'gUbYCm9ZQFhVciwi3NVXdc';

// Função para fazer a requisição e obter os dados da API para um ticker específico
const fetchData = async (ticker) => {
    const url = `https://brapi.dev/api/quote/${ticker}?token=${token}`;
    let dados;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados para ${ticker}: ${response.status}`);
        }
        let data = await response.json();
        dados = { abbreviation: data['results'][0]['symbol'], value: data['results'][0]['regularMarketPrice'], percentage: data['results'][0]['regularMarketChangePercent'] };

        return dados; // Retorna os dados da API
    } catch (error) {
        console.error(`Erro ao buscar dados para ${ticker}: ${error.message}`);
        return null; // Retorna null em caso de erro
    }
};

// Função para buscar dados para todos os tickers e armazenar nos arrays correspondentes
export const fetchAllData = async () => {
    const arrays = [array1, array2, array3, array4, array5, array6];

    // Função para carregar dados em um array específico
    const loadArray = async (index, arrays) => {
        for (let j = 0; j < tickers[index].length; j++) {
            const ticker = tickers[index][j];
            const newData = await fetchData(ticker);

            if (newData?.abbreviation == null || newData?.value == null || newData?.percentage == null) {
                continue;
            }

            arrays[index].push(newData);
        }
    };

    // Carrega o primeiro array e inicia o carrossel
    await loadArray(0, arrays);
    updateCarousel(arrays[0]); // Atualiza o carrossel com o primeiro array

    // Carrega os demais arrays em segundo plano
    const promises = [];
    for (let i = 1; i < tickers.length; i++) {
        promises.push(loadArray(i, arrays));
    }

    // Aguarda o carregamento dos demais arrays
    await Promise.all(promises);

    return arrays;
};

// Função para verificar se o ticker já existe em um array específico
const findInArray = (arr, ticker) => {
    return arr.find(item => item?.symbol === ticker);
};

// Atualiza o carrossel com dados (você precisará definir esta função em seu script principal)
const updateCarousel = (data) => {
    console.log("Dados do carrossel atualizado", data);
    // Implementação da atualização do carrossel
};
