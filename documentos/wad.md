# 1. INTRODUÇÃO

# 2. DIAGRAMA DO BANCO DE DADOS

## 2.1 Modelo conceitual
![image](https://github.com/user-attachments/assets/05eb50db-59e4-4a72-833a-85e951338c4c)

## 2.2 Modelo lógico/relacional

![image](https://github.com/user-attachments/assets/464e0b12-f738-4073-b109-c9ae7fae8dd9)


## 2.3 Modelo físico
```
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
  deadline DATE,
  progresso TEXT NOT NULL,
  prioridade TEXT NOT NULL,
  usuario_id INT REFERENCES usuario(id_usuario) ON DELETE CASCADE,
);
```
