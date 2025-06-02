const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const Tarefa = require('../models/tarefa');

// Cadastrar usuário
exports.cadastrarUsuario = async (req, res) => {
  const { nome_usuario, email, senha } = req.body;

  const usuarioExistente = await Usuario.encontrarPeloEmail(email);
  if (usuarioExistente) {
    return res.status(409).json({ error: 'Email já cadastrado.' });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.criar(nome_usuario, email, senhaHash);

    console.log('Usuário cadastrado com sucesso:', novoUsuario);
    res.status(201).json(novoUsuario);
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Login do usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.encontrarPeloEmail(email);

    if (!usuario) {
      return res.status(401).json({ error: 'Email ou senha incorretos.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Email ou senha incorretos.' });
    }

    req.session.usuario_id = usuario.id_usuario; 
    return res.status(200).json({ mensagem: 'Login realizado com sucesso' });

  } catch (err) {
    console.error('Erro no login:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Logout do usuário
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erro no logout:', err);
      return res.status(500).json({ error: 'Erro ao realizar logout' });
    }
    console.log('Logout realizado com sucesso');
    res.status(200).json({ mensagem: 'Logout realizado com sucesso' });
  });
};

//Mostrando a home com os dados do usuário.
exports.mostrarHome = async (req, res) => {
  if (!req.session.usuario_id) {
    return res.redirect('/login');
  }

  try {
    const usuario = await Usuario.encontrarPeloId(req.session.usuario_id);
    if (!usuario) {
      return res.redirect('/login');
    }

    const tarefas = await Tarefa.encontrarTarefasDoUsuario(req.session.usuario_id);
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.status === 'concluída').length;
    const aFazer = total - concluidas;

    res.render('Home/index', {
      nomeUsuario: usuario.nome_usuario,
      totalTarefas: total,
      tarefasConcluidas: concluidas,
      tarefasAFazer: aFazer
    });
  } catch (err) {
    console.error('Erro ao carregar home:', err);
    res.status(500).send('Erro no servidor');
  }
};
