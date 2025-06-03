const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario'); 
const Tarefa = require('../models/tarefa'); 
const usuarioController = require('../controllers/usuarioController');
const tarefaController = require('../controllers/tarefaController');

//Rota para a Landing Page.
router.get("/", (req, res) => {
    res.render("LandingPage/index");
});


//Rota para a página de login.
router.get("/login", (req, res) => {
    res.render("Login/index");
});

//Rota para a página de cadastro.
router.get("/cadastro", (req, res) => {
    res.render("Cadastro/index");
});

// Rota da Home (página depois do login).
router.get('/home', usuarioController.mostrarHome);

// Rota para a página de criar tarefas.
router.get('/tarefas/criar', (req, res) => {
  res.render('CriarTarefa/index');
});


// Rota para a página de Minhas Tarefas.
router.get('/tarefas/minhasTarefas', (req, res) => {
  res.render('MinhasTarefas/index');
});

//Rotas de ações de usuário.
router.post("/login", usuarioController.login);
router.post("/cadastro", usuarioController.cadastrarUsuario);
router.get("/logout", usuarioController.logout);
router.delete("/excluirConta", usuarioController.excluirConta);

//Rotas de tarefas.
router.get("/tarefas", tarefaController.listarTarefas);
router.post("/tarefas", tarefaController.salvarTarefa);
router.get("/tarefas/:tarefa_id", tarefaController.mostrarTarefa);
router.put("/tarefas/:tarefa_id", tarefaController.atualizarTarefa);
router.delete("/tarefas/:tarefa_id", tarefaController.excluirTarefa);

//Exportando as rotas.
module.exports = router;
