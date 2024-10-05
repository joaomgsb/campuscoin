// script.js
import { fetchAllData } from './acoes.js';

const carouselContainer = document.querySelector('.carrossel-container');
const playPauseBtn = document.getElementById('playPauseBtn');
const dataButtons = document.querySelectorAll('.data-btn');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu-carrossel');

let isPlaying = true;
let start;
let previousTime = 0;
const speed = 0.1; // Ajuste a velocidade conforme necessário

let arrays = []; // Inicializa arrays como vazio

const updateCarousel = (data) => {
    carouselContainer.innerHTML = '';
    data.forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carrossel-item');
        
        // Formatando o valor com prefixo "R$" e duas casas decimais
        const formattedValue = `R$${parseFloat(item.value).toFixed(2).replace(".", ",")}`;
        
        const abbreviation = document.createElement('div');
        abbreviation.classList.add('abbreviation');
        abbreviation.textContent = item.abbreviation;

        const value = document.createElement('div');
        value.classList.add('value');
        value.textContent = formattedValue;

        const percentage = document.createElement('div');
        percentage.classList.add('percentage');
        percentage.textContent = item.percentage.toFixed(2) + '%';
        if (item.percentage >= 0) {
            percentage.classList.add('positive');
        } else {
            percentage.classList.add('negative');
        }

        carouselItem.appendChild(abbreviation);
        carouselItem.appendChild(value);
        carouselItem.appendChild(percentage);
        carouselContainer.appendChild(carouselItem);
    });

    // Inicia o carrossel após carregar os dados
    if (!start) {
        start = performance.now(); // Marca o início do carrossel
        window.requestAnimationFrame(step); // Inicia a animação do carrossel
    }
};

const step = (timestamp) => {
    const elapsed = timestamp - start + previousTime;
    const firstItem = carouselContainer.firstElementChild;
    const firstItemWidth = firstItem.getBoundingClientRect().width;

    carouselContainer.style.transform = `translateX(-${(elapsed * speed) % firstItemWidth}px)`;

    if (elapsed * speed >= firstItemWidth) {
        start = timestamp;
        previousTime = 0; // Reset previous time
        carouselContainer.style.transform = 'none';
        carouselContainer.appendChild(firstItem);
        carouselContainer.style.transform = `translateX(0)`;
        window.requestAnimationFrame(step);
        return;
    }

    if (isPlaying) {
        window.requestAnimationFrame(step);
    } else {
        previousTime = elapsed; // Save elapsed time when paused
    }
};

const togglePlayPause = () => {
    if (isPlaying) {
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        start = performance.now(); // Reinicia a animação
        window.requestAnimationFrame(step);
    }
};

playPauseBtn.addEventListener('click', togglePlayPause);

dataButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const arrayIndex = e.target.getAttribute('data-array');
        updateCarousel(arrays[arrayIndex]);
        updateButtonColors(arrayIndex); // Adiciona a nova funcionalidade aqui
    });
});

const updateButtonColors = (selectedIndex) => {
    dataButtons.forEach((button, index) => {
        if (index == selectedIndex) {
            button.style.backgroundColor = 'blue';
            button.style.color = 'white';
        } else {
            button.style.backgroundColor = '';
            button.style.color = '';
        }
    });
};

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Inicializa o carrossel com os valores padrão
updateCarousel([
    { abbreviation: 'BBSE3', value: 33.32, percentage: 0.21 },
    { abbreviation: 'RDOR3', value: 28.65, percentage: 0.21 },
    { abbreviation: 'B3SA3', value: 10.73, percentage: 1.04 },
    { abbreviation: 'SBSP3', value: 85.10, percentage: 0.98 },
    { abbreviation: 'RENT3', value: 45.25, percentage: 1.87 },
    { abbreviation: 'RADL3', value: 25.14, percentage: -0.20 },
    { abbreviation: 'BBSE3', value: 33.32, percentage: 0.21 },
    { abbreviation: 'RDOR3', value: 28.65, percentage: 0.21 },
    { abbreviation: 'B3SA3', value: 10.73, percentage: 1.04 },
    { abbreviation: 'SBSP3', value: 85.10, percentage: 0.98 },
    { abbreviation: 'RENT3', value: 45.25, percentage: 1.87 },
    { abbreviation: 'RADL3', value: 25.14, percentage: -0.20 },
]);

// Função para buscar dados reais e atualizar o carrossel
const updateCarouselWithData = async () => {
    const dados = await fetchAllData();

    // Atualiza arrays com os dados reais
    arrays = dados;

    // Atualiza o carrossel com os dados reais
    updateCarousel(arrays[0]); // Aqui você pode escolher qual array inicializar primeiro
    updateButtonColors(0); // Define o primeiro botão como azul
};

// Chama a função para buscar dados reais e atualizar o carrossel
updateCarouselWithData();
