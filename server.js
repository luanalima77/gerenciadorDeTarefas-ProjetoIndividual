const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const PORT = 3000;

//Middleware para processar JSON e URL encoded (para receber dados de formulários).
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuração do session middleware.
app.use(session({
  secret: 'sessaoGerenciadorDeTarefas', 
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }  //No caso deste projeto, a sessão do usuário tem 1 hora de validade.
}));

//Configurando EJS.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware para arquivos estáticos.
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));


//Rotas.
const routes = require('./routes/index');
app.use('/', routes);

//Inicializando o servidor, mostrando em que porta ele está rodando.
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
