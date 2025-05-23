const express = require('express');
const router = express.Router();

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

//Rotas de ações de usuário.
router.post("/login", usuarioController.login);
router.post("/cadastro", usuarioController.cadastrarUsuario);
router.get("/logout", usuarioController.logout);

//Rotas de tarefas.
router.get("/tarefas", tarefaController.listarTarefas);
router.post("/tarefas", tarefaController.salvarTarefa);
router.get("/tarefas/:tarefa_id", tarefaController.mostrarTarefa);
router.put("/tarefas/:tarefa_id", tarefaController.atualizarTarefa);
router.delete("/tarefas/:tarefa_id", tarefaController.excluirTarefa);

//Exportando as rotas.
module.exports = router;
