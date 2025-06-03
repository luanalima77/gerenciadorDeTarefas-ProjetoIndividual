const botaoMenu = document.querySelector(".header__home__menu__button");
const conteudoMenu = document.querySelector(".header__home__menu__button__content");
const overlay = document.querySelector('.overlay');

botaoMenu.addEventListener('click', () => {
    const aberto = conteudoMenu.classList.toggle('open');
    overlay.classList.toggle('active');
    botaoMenu.innerHTML = aberto ? '&times;' : '&#9776;';
});

overlay.addEventListener('click', () => {
    conteudoMenu.classList.remove('open');
    overlay.classList.remove('active');
    botaoMenu.innerHTML = '&#9776;';
});

document.addEventListener('click', (event) => {
    const clicado = conteudoMenu.contains(event.target) || botaoMenu.contains(event.target);
    if (!clicado && conteudoMenu.classList.contains('open')) {
        conteudoMenu.classList.remove('open');
        overlay.classList.remove('active');
        botaoMenu.innerHTML = '&#9776;';
    }
});