const pool = require('../config/database');

const usuario = {
  async criar(nome_usuario, email, senhaHash) {
    const resultado = await pool.query(
      'INSERT INTO USUARIO (nome_usuario, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome_usuario, email, senhaHash] 
    );
    return resultado.rows[0];
  },

  async encontrarPeloEmail(email) {
    const resultado = await pool.query(
      'SELECT * FROM USUARIO WHERE email = $1',
      [email]
    );
    return resultado.rows[0]; 
  },

  async encontrarPeloId(id) {
    const resultado = await pool.query(
      'SELECT * FROM USUARIO WHERE id_usuario = $1',
      [id]
    );
    return resultado.rows[0];
  }
};

module.exports = usuario;
