CREATE TABLE USUARIO(
  id_usuario SERIAL PRIMARY KEY,
  nome_usuario TEXT NOT NULL,
  email TEXT NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE TAREFA (
  id_tarefa SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  deadline DATE NOT NULL,
  progresso TEXT NOT NULL,
  prioridade TEXT NOT NULL,
  usuario_id INT REFERENCES usuario(id_usuario) ON DELETE CASCADE
);