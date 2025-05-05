# Descrição do projeto
&nbsp; &nbsp; &nbsp; &nbsp;Em linhas gerais, este sistema consiste em um gerenciador de tarefas, no qual os usuários terão opções de cadastro e login, ou seja, poderão criar contas próprias, a fim de registrar suas atividades. Estas poderão ser editadas, alteradas, adicionadas e excluídas, tendo informações de id, título, descrição, deadline, progresso, classificação (rótulo da tarefa) e prioridade. A partir de tais aspectos, objetiva-se que os utilizadores do sistema possam deter um maior controle sobre suas tasks e, consequentemente, um melhor planejamento.

# Estrutura de pastas
&nbsp; &nbsp; &nbsp; &nbsp;Logo abaixo está descrita a estrutura de pastas do projeto. No presente momento, algumas pastas ainda não estão aparecendo no repositório porque **ainda** não há arquivos nelas, uma vez que serão complementadas nas próximas semanas.
```
gerenciadorDeTarefas-ProjetoIndividual/
│
├── assets/                # Arquivos públicos como imagens e fontes
|   └── DER.png
|   └── modeloLógicoVersãoFinalizada.png             
├── config/                # Arquivos de configuração (ex: conexão com banco)
│   └── database.js
├── controllers/           # Lógica de controle das requisições
│   └── HomeController.js
├── documents/            # Documentação do projeto (WAD)
|   └── WAD.md
├── models/                # Definição de modelos de dados (estrutura do banco)
│   └── User.js
├── node_modules/          # Pacotes do node (tem muitas pastas dentro dele)
├── routes/                # Definição das rotas do sistema
│   └── index.js
├── scripts                # Arquivos de JavaScript públicos
├── services/              # Serviços auxiliares do sistema
│   └── userService.js                            
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
│   └── example.test.js
├── views/                 # Templates e componentes visuais da aplicação
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .env.example           # Arquivo de exemplo para variáveis de ambiente
├── jest.config.js         # Arquivo de configuração do Jest
├── package-lock.json      # Gerenciador de dependências do Node.js
├── package.json           # Gerenciador de dependências do Node.js
├── README.md              # Documentação do projeto (Markdown)
├── server.js              # Arquivo principal que inicializa o servidor
└── rest.http              # Teste de endpoints (opcional)
```

# Como executar o projeto localmente?
&nbsp; &nbsp; &nbsp; &nbsp;Para criar estes passos, usou-se como referência o seguinte link: https://github.com/afonsobrandaointeli/mvc-boilerplate , o qual foi disponibilizado na explicação da atividade.

&nbsp; &nbsp; &nbsp; &nbsp;Primeiramente, certifique-se de atender aos seguintes pré-requisitos:
Node.js (v18+)
PostgreSQL (v15+)
Git

&nbsp; &nbsp; &nbsp; &nbsp;Após tal averiguação, siga os passos subsequentes:

## Instalação

1) Clone o projeto
```
git clone https://github.com/luanalima77/gerenciadorDeTarefas-ProjetoIndividual.git
```

2) Instale as dependências
```
npm install
```

3) Renomeie o arquivo .env.example para .env e e faça a configuração das variáveis de ambiente necessárias, a exemplo das configurações do banco de dados PostgreSQL

4) Execute o seguinte código para iniciar:
```
npm start
```


## Configuração do banco de dados
1) Crie seu banco de dados PostgreSQL com o nome determinado no seu .env
2) Execute o script SQL de inicialização
```
npm run init-db
```