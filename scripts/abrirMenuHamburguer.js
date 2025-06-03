//Chamando os elementos do header.
const botaoMenu = document.querySelector(".header__home__menu__button");
const conteudoMenu = document.querySelector(".header__home__menu__button__content");
const overlay = document.querySelector('.overlay');


//Adicionando evento no botão do menu hambúrguer para alternar entre aberto e fechado.
botaoMenu.addEventListener('click', () => {
    const aberto = conteudoMenu.classList.toggle('open');
    overlay.classList.toggle('active');
    botaoMenu.innerHTML = aberto ? '&times;' : '&#9776;';
});

///Adicionando pequena sombra quando o menu é clicado.
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