const Tarefa = require('../models/tarefa');
const { format } = require('date-fns');
const { ptBR } = require('date-fns/locale');

// Salva nova tarefa no banco de dados
exports.salvarTarefa = async (req, res) => {
  try {
    if (!req.session.usuario_id) return res.status(401).json({ erro: 'Usuário não autenticado' });

    const dadosTarefa = {
      ...req.body,
      usuario_id: req.session.usuario_id,
    };

    const novaTarefa = await Tarefa.criar(dadosTarefa);
    console.log('Tarefa criada com sucesso:', novaTarefa);
    res.status(201).json(novaTarefa);
  } catch (erro) {
    console.error('Erro ao salvar tarefa:', erro);
    res.status(500).json({ erro: 'Erro ao salvar tarefa' });
  }
};

// Lista tarefas do usuário logado, formatando data antes
exports.listarTarefas = async (req, res) => {
  try {
    if (!req.session.usuario_id) return res.status(401).json({ erro: 'Usuário não autenticado' });

    const usuario_id = req.session.usuario_id;
    const tarefas = await Tarefa.encontrarTarefasDoUsuario(usuario_id);

    // Formata a data deadline em dd/MM/yyyy
    const tarefasFormatadas = tarefas.map(t => ({
      ...t,
      data_formatada: t.deadline ? format(new Date(t.deadline), 'dd/MM/yyyy', { locale: ptBR }) : null,
    }));

    console.log('Tarefas do usuário:', tarefasFormatadas);
    res.json(tarefasFormatadas);
  } catch (erro) {
    console.error('Erro ao listar tarefas:', erro);
    res.status(500).json({ erro: 'Erro ao listar tarefas' });
  }
};

// Mostra tarefa específica, validando usuário
exports.mostrarTarefa = async (req, res) => {
  try {
    if (!req.session.usuario_id) return res.status(401).json({ erro: 'Usuário não autenticado' });

    const tarefa = await Tarefa.encontrarTarefaPeloId(req.params.tarefa_id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

    if (tarefa.usuario_id !== req.session.usuario_id) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    res.json(tarefa);
  } catch (erro) {
    console.error('Erro ao buscar tarefa:', erro);
    res.status(500).json({ erro: 'Erro ao buscar tarefa' });
  }
};

// Atualiza tarefa, validando usuário
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

// Exclui tarefa, validando usuário
exports.excluirTarefa = async (req, res) => {
  try {
    if (!req.session.usuario_id) return res.status(401).json({ erro: 'Usuário não autenticado' });

    const tarefa = await Tarefa.encontrarTarefaPeloId(req.params.tarefa_id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

    if (tarefa.usuario_id !== req.session.usuario_id) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    await Tarefa.excluirTarefa(req.params.tarefa_id);
    console.log('Tarefa excluída com sucesso');
    res.json({ mensagem: 'Tarefa excluída com sucesso' });
  } catch (erro) {
    console.error('Erro ao excluir tarefa:', erro);
    res.status(500).json({ erro: 'Erro ao excluir tarefa' });
  }
};
