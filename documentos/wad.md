# 1. INTRODUÇÃO
&nbsp; &nbsp; &nbsp; &nbsp;A gestão de tarefas é um processo fundamental para uma maior produtividade, seja em uma empresa ou até mesmo para atividades individuais e do dia a dia (PONTOTEL, 2024). Desse modo, foi criado o vigente projeto de gerenciamento de tarefas, que tem como premissa ser simples e objetivo. Em linhas gerais, ele tem como foco permitir que usuários cadastrados criem, visualizem, editem e excluam tarefas pessoais, organizando-as por prioridade, progresso e prazo (deadline). Em se tratando de aspectos mais técnicos, tal sistema tem sido desenvolvido seguindo o padrão MVC (Model-View-Controller), que facilita a distribuição de funções do software supracitado.

# 2. DIAGRAMAS DO BANCO DE DADOS
&nbsp; &nbsp; &nbsp; &nbsp;De modo geral, a modelagem de dados é o processo de definição e estruturação de como dados serão armazenados (Neves, 2024). Tal procedimento acarreta uma melhor organização do projeto em questão, minimizando erros. Sob essa perspectiva, há, tradicionalmente, há três etapas fundamentais e mais utilizadas para essa modelagem: conceitual, lógica e física. Dessa forma, elas estão descritas, respectivamente, nas seções 2.1, 2.2 e 2.3 (no escopo no vigente projeto de gerenciamento de tarefas).

## 2.1 Modelo conceitual
&nbsp; &nbsp; &nbsp; &nbsp;Essencialmente, o modelo conceitual identifica aspectos fundamentais e basilares de um sistema, mostrando entidades principais e seus respectivos relacionamentos (França, 2023). Dentre as principais ferramentas para a criação do modelo supracitado, menciona-se o Diagrama Entidade-Relacionamento, que demonstra justamente as entidades com suas relações e atributos (características). Portanto, realizou-se esse processo no que se refere ao projeto de gerenciamento de tarefas escopo deste documento (conforme a figura 1).

<p align = "center"> Figura 1 - Diagrama Entidade-Relacionamento </p>

![image](https://github.com/user-attachments/assets/05eb50db-59e4-4a72-833a-85e951338c4c)

<p align = "center"> Fonte: material produzido pela autora (2025).</p>

## 2.2 Modelo lógico/relacional

&nbsp; &nbsp; &nbsp; &nbsp;O modelo lógico consiste na conversão do modelo conceitual em um processo mais próximo do que é, de fato, a implementação de um SGBD (Sistema de Gerenciamento de Banco de Dados). Ademais, seu foco está na definição de tabelas, atributos, tipos de dados, relações, chaves primárias e chaves estrangeiras, aprofundando o que foi feito no conceitual (França, 2023). Dessa forma, foi feito (no software brModelo) o diagrama do modelo lógico no que tange ao vigente projeto, como a figura 2 demonstra.

<p align = "center"> Figura 2 - Diagrama do modelo lógico</p>

![image](https://github.com/user-attachments/assets/464e0b12-f738-4073-b109-c9ae7fae8dd9)

<p align = "center"> Fonte: material produzido pela autora (2025).</p>

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

FRANÇA, Thaís. Modelagem de banco de dados relacional: modelagem lógica. [S. l.], 23 nov. 2023. Disponível em: https://medium.com/@francethais/modelagem-de-banco-de-dados-relacional-modelagem-l%C3%B3gica-e-f%C3%ADsica-32c651f6810b. Acesso em: 4 maio 2025.

NEVES, Cristiane Selem Ferreira. Banco de Dados Descomplicado: Modelagem de Dados. [S. l.], 28 ago. 2024. Disponível em: https://www.estrategiaconcursos.com.br/blog/banco-dados-descomplicado-modelagem-dados/. Acesso em: 4 maio 2025.

PONTOTEL. Gestão de tarefas: entenda como esse processo pode ser vantajoso para sua empresa e colaboradores!. [S. l.], 22 nov. 2024. Disponível em: https://www.pontotel.com.br/gestao-de-tarefas/. Acesso em: 4 maio 2025.