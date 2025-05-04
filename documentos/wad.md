# 1. INTRODUÇÃO
&nbsp; &nbsp; &nbsp; &nbsp;A gestão de tarefas é um processo fundamental para uma maior produtividade, seja em uma empresa ou até mesmo para atividades individuais e do dia a dia (PONTOTEL, 2024). Desse modo, foi criado o vigente projeto de gerenciamento de tarefas, que tem como premissa ser simples e objetivo. Em linhas gerais, ele tem como foco permitir que usuários cadastrados criem, visualizem, editem e excluam tarefas pessoais, organizando-as por prioridade, progresso e prazo (deadline). Em se tratando de aspectos mais técnicos, tal sistema tem sido desenvolvido seguindo o padrão MVC (Model-View-Controller), que facilita a distribuição de funções do software supracitado.

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

# REFERÊNCIAS BIBLIOGRÁFICAS
PONTOTEL. Gestão de tarefas: entenda como esse processo pode ser vantajoso para sua empresa e colaboradores!. [S. l.], 22 nov. 2024. Disponível em: https://www.pontotel.com.br/gestao-de-tarefas/. Acesso em: 4 maio 2025.