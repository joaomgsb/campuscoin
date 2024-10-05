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