const express = require('express');
const session = require('express-session');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const tarefaController = require('../controllers/tarefaController');

//Rotas do usuário.
router.post('/cadastro', usuarioController.cadastrarUsuario);
router.post('/login', usuarioController.login);
router.post('/logout', usuarioController.logout);

//Rotas da tarefa.
router.post('/tarefas', tarefaController.salvarTarefa);
router.get('/tarefas', tarefaController.listarTarefas);
router.get('/tarefas/:tarefa_id', tarefaController.mostrarTarefa);
router.put('/tarefas/:tarefa_id', tarefaController.atualizarTarefa);
router.delete('/tarefas/:tarefa_id', tarefaController.excluirTarefa);

//Exportando as rotas.
module.exports = router;
