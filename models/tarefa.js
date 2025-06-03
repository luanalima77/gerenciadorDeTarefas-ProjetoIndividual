const pool = require('../config/database');

const tarefa = {
  async criar({ titulo, descricao, deadline, progresso, prioridade, usuario_id }) {
    const resultado = await pool.query(
      `INSERT INTO TAREFA (titulo, descricao, deadline, progresso, prioridade, usuario_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [titulo, descricao, deadline, progresso, prioridade, usuario_id]
    );
    return resultado.rows[0];
  },

  async encontrarTarefasDoUsuario(usuario_id) {
    const resultado = await pool.query('SELECT * FROM TAREFA WHERE usuario_id = $1', [usuario_id]);
    return resultado.rows;
  },

  async encontrarTarefaPeloId(id) {
    const resultado = await pool.query('SELECT * FROM TAREFA WHERE id_tarefa = $1', [id]);
    return resultado.rows[0];
  },

  async atualizarTarefa(id, dados) {
    const { titulo, descricao, deadline, progresso, prioridade } = dados;
    await pool.query(
      `UPDATE TAREFA SET titulo=$1, descricao=$2, deadline=$3, progresso=$4, prioridade=$5 WHERE id_tarefa=$6`,
      [titulo, descricao, deadline, progresso, prioridade, id]
    );
  },

  async excluirTarefa(id) {
    const resultado = await pool.query(
      'DELETE FROM TAREFA WHERE id_tarefa = $1 RETURNING *',
      [id]
    );
    return resultado.rows[0];
  },

  async excluirPorUsuario(usuarioId) {
    const query = "DELETE FROM TAREFA WHERE usuario_id = $1";
    await pool.query(query, [usuarioId]);
  },
};

module.exports = tarefa;
