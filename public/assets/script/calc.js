// Função para mudar o tamanho do cabeçalho ao rolar a página
function resizeHeaderOnScroll() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    const shrinkOn = 10; // Quantidade de scroll para encolher o cabeçalho
    const headerEl = document.querySelector('.shop-header');

    if (distanceY > shrinkOn) {
        headerEl.classList.add('small-header');
    } else {
        headerEl.classList.remove('small-header');
    }
}

// Adicionar evento de scroll para chamar a função de redimensionamento
window.addEventListener('scroll', resizeHeaderOnScroll);


// JavaScript para a Calculadora Financeira
function calculateTax() {
    const income = document.getElementById('income').value;
    let tax = 0;
    
    // Simples cálculo de imposto (exemplo)
    if (income <= 22847.76) {
        tax = 0;
    } else if (income <= 33919.80) {
        tax = (income - 22847.76) * 0.075;
    } else if (income <= 45012.60) {
        tax = (income - 33919.80) * 0.15 + 828.39;
    } else if (income <= 55976.16) {
        tax = (income - 45012.60) * 0.225 + 2103.58;
    } else {
        tax = (income - 55976.16) * 0.275 + 4621.01;
    }
    
    document.getElementById('taxResult').innerText = `Imposto de Renda: R$ ${tax.toFixed(2)}`;
}

function calculateSavings() {
    const savings = document.getElementById('savings').value;
    const selicRate = 0.1375; // Exemplo de taxa SELIC atual (13.75%)
    const annualYield = savings * selicRate;

    document.getElementById('savingsResult').innerText = `Rendimento Anual: R$ ${annualYield.toFixed(2)}`;
}

// JavaScript para a Calculadora Normal
let displayValue = '';
let operator = '';
let firstValue = null;

function appendNumber(number) {
    displayValue += number;
    document.getElementById('display').value = displayValue;
}

function clearDisplay() {
    displayValue = '';
    operator = '';
    firstValue = null;
    document.getElementById('display').value = displayValue;
    document.getElementById('calcResult').innerText = '';
}

function operate(op) {
    if (firstValue === null) {
        firstValue = parseFloat(displayValue);
        operator = op;
        displayValue = '';
    } else {
        calculate();
        operator = op;
    }
}

function calculate() {
    if (firstValue !== null && operator !== '') {
        const secondValue = parseFloat(displayValue);
        let result = 0;

        switch (operator) {
            case '+':
                result = firstValue + secondValue;
                break;
            case '-':
                result = firstValue - secondValue;
                break;
            case '*':
                result = firstValue * secondValue;
                break;
            case '/':
                result = firstValue / secondValue;
                break;
        }

        displayValue = result.toString();
        document.getElementById('display').value = displayValue;
        document.getElementById('calcResult').innerText = `Resultado: ${result}`;
        firstValue = null;
        operator = '';
    }
}