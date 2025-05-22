# Descrição do projeto
&nbsp; &nbsp; &nbsp; &nbsp;Em linhas gerais, este sistema consiste em um gerenciador de tarefas, no qual os usuários terão opções de cadastro e login, ou seja, poderão criar contas próprias, a fim de registrar suas atividades. Estas poderão ser editadas, alteradas, adicionadas e excluídas, tendo informações de id, título, descrição, deadline, progresso, classificação (rótulo da tarefa) e prioridade. A partir de tais aspectos, objetiva-se que os utilizadores do sistema possam deter um maior controle sobre suas tasks e, consequentemente, um melhor planejamento.

# Estrutura de pastas
&nbsp; &nbsp; &nbsp; &nbsp;Logo abaixo está descrita a estrutura de pastas do projeto.
```
gerenciadorDeTarefas-ProjetoIndividual/
│
├── assets/                     # Arquivos públicos como imagens e fontes
|   └── bodyRaw.png
|   └── cadastroBancoDeDados.png
|   └── cadastroSupabase.png
|   └── connect.png
|   └── criarProjetoSupabase.png
|   └── dadosConexao.png
|   └── Diagrama MVC.png
|   └── downloadPostman.png
|   └── homeSupabase.png
|   └── httpPostman.png
|   └── interfaceSupabase.png
|   └── modelo-conceitual-banco.png 
|   └── modelo-logico-banco.png  
|   └── modelo-fisico-banco.png
|   └── newPostman.png
|   └── organizacaoSupabase.png
|   └── requisicaoAtualizarTarefa.png
|   └── requisicaoCadastro.png
|   └── requisicaoCriarTarefa.png
|   └── requisicaoListarTarefas.png
|   └── requisicaoLogin.png
|   └── requisicaoLogout.png
|   └── requisicoesPostman.png
|   └── respostaAtualizarTarefa.png
|   └── respostaCadastro.png
|   └── respostaCriarTarefa.png
|   └── respostaListarTarefas.png
|   └── respostaLogin.png
|   └── respostaLogout.png
|   └── sessionPooler.png
|   └── tarefaAtualizadaBancoDeDados.png  
|   └── tarefaBancoDeDados.png      
|       
├── config/                     # Arquivos de configuração (ex: conexão com banco)
│   └── database.js
|
├── controllers/                # Lógica de controle das requisições
│   └── tarefaController.js     # Controller da tarefa
|   └── usuarioController.js    # Controller do usuário
|   
├── documents/                  # Documentação do projeto (WAD)
|   └── WAD.md
|
├── models/                     # Definição de modelos de dados (estrutura do banco)
│   └── tarefa.js               # Model da tarefa
|   └── usuario.js              # Model do usuário
|
├── node_modules/               # Pacotes do node (tem muitas pastas dentro dele)
|
├── routes/                 # Definição das rotas do sistema (rotas de usuário e tarefa)
│   └── index.js
|
├── scripts                     # Arquivos de JavaScript públicos
|
├── services/                   # Serviços auxiliares do sistema
│   └── userService.js             
|               
├── styles/                     # Arquivos CSS públicos
|
├── tests/                      # Arquivos de testes unitários
│   └── example.test.js
|
├── views/                      # Templates e componentes visuais da aplicação
|   └── AtualizarTarefa/
|       └── index.ejs
|   └── Cadastro/
|       └── index.ejs
|   └── CriarTarefa/
|       └── index.ejs
|   └── Home/
|       └── index.ejs
|   └── Login/
|       └── index.ejs
|
├── .gitignore                  # Arquivo para ignorar arquivos no Git
|
├── .env                        # Arquivo para variáveis de ambiente (banco de dados)
|
├── jest.config.js              # Arquivo de configuração do Jest
|
├── package-lock.json           # Gerenciador de dependências do Node.js
|
├── package.json                # Gerenciador de dependências do Node.js
|
├── README.md                   # Descrição do projeto e de como instalá-lo
|
├── server.js                   # Arquivo principal que inicializa o servidor
|
└── rest.http                   # Teste de endpoints (opcional)
```

# Como executar o projeto localmente?
&nbsp; &nbsp; &nbsp; &nbsp;Para criar estes passos, usou-se como referência o seguinte link: https://github.com/afonsobrandaointeli/mvc-boilerplate , o qual foi disponibilizado na explicação da atividade.

&nbsp; &nbsp; &nbsp; &nbsp;Primeiramente, certifique-se de atender aos seguintes pré-requisitos:
Node.js (v18+)
PostgreSQL (v15+)
Git

&nbsp; &nbsp; &nbsp; &nbsp;Após tal averiguação, siga os passos subsequentes:

## Parte 1: instalação

1) Clone o projeto
```
git clone https://github.com/luanalima77/gerenciadorDeTarefas-ProjetoIndividual.git
```
<br>

2) Instale as dependências

&nbsp; &nbsp; &nbsp; &nbsp;**Instale todas as dependências, se não o projeto pode não rodar conforme o esperado.** <br>

&nbsp; &nbsp; &nbsp; &nbsp;Dependências do Node:

```
npm install
```
<br>

&nbsp; &nbsp; &nbsp; &nbsp;Dependências do PostgreSQL:
```
npm install pg
```
<br>

&nbsp; &nbsp; &nbsp; &nbsp;Dependências do .env:
```
npm install dotenv
```
<br>

&nbsp; &nbsp; &nbsp; &nbsp;Dependências do CORS (para permitir requisições entre diferentes origens):
```
npm install cors
```
<br>

&nbsp; &nbsp; &nbsp; &nbsp;Dependências do express-session (para gerenciar sessões de usuário, como em logins):
```
npm install express-session
```
<br>

&nbsp; &nbsp; &nbsp; &nbsp;Dependências do ejs (que são os arquivos das views do projeto):
```
npm install ejs
```
<br>

&nbsp; &nbsp; &nbsp; &nbsp;Dependências do method-override (para permitir métodos PUT e DELETE via formulários HTML):
```
npm install method-override
```
<br>


&nbsp; &nbsp; &nbsp; &nbsp;Dependências do bcrypt, que permite deixar a senha do usuário criptografada no banco de dados:

```
npm install bcrypt
```
<br>

&nbsp; &nbsp; &nbsp; &nbsp;Dependências do date-fns (para manipulação e formatação de datas):
```
npm install date-fns
```

<br><br>

## Parte 2: configuração do banco de dados
1) Faça a configuração das variáveis de ambiente necessárias, a exemplo das configurações do banco de dados PostgreSQL. No caso deste projeto, usou-se o Supabase para armazenar os dados. Dessa forma, insira isso no arquivo .env: 

```
DB_USER=
DB_HOST=
DB_DATABASE=
DB_PASSWORD=
DB_PORT=
DB_SSL=
PORT=
```

&nbsp; &nbsp; &nbsp; &nbsp;Detalhe importante: a porta (PORT) que está sendo usada neste projeto é a 3000. As outras configurações podem ser conferidas dentro do próprio site do Supabase. <br>
&nbsp; &nbsp; &nbsp; &nbsp;Para isso, procure pelo botão "Connect" ao entrar no Supabase: 

<img src = "./assets/connect.png">
<br> <br>

&nbsp; &nbsp; &nbsp; &nbsp;Depois, procure por "Session pooler" e clique em "View parameters". Lá, vão estar todos os dados necessários para colocar no .env e, assim, conectar o seu banco de dados ao projeto:
<img src = "./assets/sessionPooler.png">
<br>

2) Depois, execute o script SQL de inicialização no terminal:
```
npm run init-db
```

3) Depois de seguir esses passos, execute o seguinte comando no terminal:
```
node server.js
```

## Observações
&nbsp; &nbsp; &nbsp; &nbsp; Sempre que você precisar iniciar o servidor, rode o seguinte comando no terminal:

```
node server.js
```
