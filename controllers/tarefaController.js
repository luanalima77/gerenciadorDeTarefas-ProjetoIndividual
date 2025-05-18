const Tarefa = require('../models/tarefa');
const { format } = require('date-fns');
const { ptBR } = require('date-fns/locale');

//Salvando nova tarefa no banco de dados.
exports.salvarTarefa = async (req, res) => {
  try {
    if (!req.session.usuario_id) return res.status(401).json({ erro: 'Usuário não autenticado' });

    const dadosTarefa = {
      ...req.body,
      usuario_id: req.session.usuario_id,
    };

    const novaTarefa = await Tarefa.criar(dadosTarefa);
    console.log('Tarefa criada com sucesso:', novaTarefa);
    res.json(novaTarefa);
  } catch (erro) {
    console.error('Erro ao salvar tarefa:', erro);
    res.status(500).json({ erro: 'Erro ao salvar tarefa' });
  }
};

//Listando tarefas do usuário logado.
exports.listarTarefas = async (req, res) => {
  try {
    if (!req.session.usuario_id) return res.status(401).json({ erro: 'Usuário não autenticado' });

    const usuario_id = req.session.usuario_id;
    const tarefas = await Tarefa.encontrarTarefasDoUsuario(usuario_id);

    tarefas.forEach(t => {
      t.data_formatada = format(new Date(t.deadline), 'dd/MM/yyyy', { locale: ptBR });
    });

    console.log('Tarefas do usuário:', tarefas);
    res.json(tarefas);
  } catch (erro) {
    console.error('Erro ao listar tarefas:', erro);
    res.status(500).json({ erro: 'Erro ao listar tarefas' });
  }
};

//Visualizando uma tarefa específica que foi cadastrada no banco.
exports.mostrarTarefa = async (req, res) => {
  try {
    if (!req.session.usuario_id) return res.status(401).json({ erro: 'Usuário não autenticado' });

    const tarefa = await Tarefa.encontrarTarefaPeloId(req.params.tarefa_id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

    if (tarefa.usuario_id !== req.session.usuario_id) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    console.log('Tarefa encontrada:', tarefa);
    res.json(tarefa);
  } catch (erro) {
    console.error('Erro ao buscar tarefa:', erro);
    res.status(500).json({ erro: 'Erro ao buscar tarefa' });
  }
};

//Atualizando alguma tarefa existente.
exports.atualizarTarefa = async (req, res) => {
  try {
    if (!req.session.usuario_id) return res.status(401).json({ erro: 'Usuário não autenticado' });

    const tarefa = await Tarefa.encontrarTarefaPeloId(req.params.tarefa_id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

    if (tarefa.usuario_id !== req.session.usuario_id) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    await Tarefa.atualizarTarefa(req.params.tarefa_id, req.body);
    console.log('Tarefa atualizada com sucesso:', req.body);
    res.json({ mensagem: 'Tarefa atualizada com sucesso' });
  } catch (erro) {
    console.error('Erro ao atualizar tarefa:', erro);
    res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
  }
};

//Excluindo alguma tarefa existente.
exports.excluirTarefa = async (req, res) => {
  try {
    if (!req.session.usuario_id) return res.status(401).json({ erro: 'Usuário não autenticado' });

    const tarefa = await Tarefa.encontrarTarefaPeloId(req.params.tarefa_id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

    if (tarefa.usuario_id !== req.session.usuario_id) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    const deletada = await Tarefa.excluirTarefa(req.params.tarefa_id);
    console.log('Tarefa excluída com sucesso:', deletada);
    res.json({ mensagem: 'Tarefa excluída com sucesso' });
  } catch (erro) {
    console.error('Erro ao excluir tarefa:', erro);
    res.status(500).json({ erro: 'Erro ao excluir tarefa' });
  }
};
