# 1. INTRODUÇÃO
&nbsp; &nbsp; &nbsp; &nbsp;A gestão de tarefas é um processo fundamental para uma maior produtividade, seja em uma empresa ou até mesmo para atividades individuais e do dia a dia (PONTOTEL, 2024). Desse modo, foi criado o vigente projeto de gerenciamento de tarefas, que tem como premissa ser simples e objetivo. Em linhas gerais, ele tem como foco permitir que usuários cadastrados criem, visualizem, editem e excluam tarefas pessoais, organizando-as por prioridade, progresso e prazo (deadline). Em se tratando de aspectos mais técnicos, tal sistema tem sido desenvolvido seguindo o padrão MVC (Model-View-Controller), que facilita a distribuição de funções do software supracitado.

# 2. DIAGRAMAS DO BANCO DE DADOS
&nbsp; &nbsp; &nbsp; &nbsp;De modo geral, a modelagem de dados é o processo de definição e estruturação de como dados serão armazenados (Neves, 2024). Tal procedimento acarreta uma melhor organização do projeto em questão, minimizando erros. Sob essa perspectiva, há, tradicionalmente, há três etapas fundamentais e mais utilizadas para essa modelagem: conceitual, lógica e física. Dessa forma, elas estão descritas, respectivamente, nas seções 2.1, 2.2 e 2.3 (no escopo no vigente projeto de gerenciamento de tarefas).

## 2.1 Modelo conceitual
&nbsp; &nbsp; &nbsp; &nbsp;Essencialmente, o modelo conceitual identifica aspectos fundamentais e basilares de um sistema, mostrando entidades principais e seus respectivos relacionamentos (França, 2023). Dentre as principais ferramentas para a criação do modelo supracitado, menciona-se o Diagrama Entidade-Relacionamento, que demonstra justamente as entidades com suas relações e atributos (características). Portanto, realizou-se esse processo no que se refere ao projeto de gerenciamento de tarefas escopo deste documento (conforme a figura 1).

<p align = "center"> Figura 1 - Diagrama Entidade-Relacionamento </p>

<img src = "../assets/modelo-conceitual-banco.png" align = "center">

<p align = "center"> Fonte: material produzido pela autora (2025).</p> 
<br>

&nbsp; &nbsp; &nbsp; &nbsp;A partir da figura 1, é possível extrair os seguintes dados, que serão cruciais também para a realização do modelo lógico e do modelo físico:

<h3>ENTIDADE: USUARIO</h3>
<h4>Atributos:</h4>

- id_usuario: identificador do usuário;
- nome_usuario: nome do usuário;
- email: email do usuário;
- senha: senha de acesso do usuário. 

<br>

<h3>ENTIDADE: TAREFA</h3>
<h4>Atributos:</h4>

- id_tarefa: identificador da tarefa;
- título: título ou nome da tarefa;
- descricao: descrição detalhada da tarefa;
- deadline: prazo de conclusão da tarefa;
- progresso: status de progresso da tarefa (ex.: 50%, concluído);
- classificacao: rótulo da tarefa (ex.: UX);
- prioridade: nível de prioridade da tarefa (ex.: alta, média e baixa). 



<br>

<h3>RELACIONAMENTOS</h3>
<h4> USUARIO-TAREFA </h4>

- Cardinalidade: (1,n), que é um-para-muitos;
- Descrição do relacionamento: um usuário pode ter uma ou muitas tarefas.


<h4> TAREFA-USUARIO </h4>

- Cardinalidade: (1,1), que é um-para-um;
- Descrição do relacionamento: uma tarefa se refere a um único usuário.


## 2.2 Modelo lógico/relacional

&nbsp; &nbsp; &nbsp; &nbsp;O modelo lógico consiste na conversão do modelo conceitual em um processo mais próximo do que é, de fato, a implementação de um SGBD (Sistema de Gerenciamento de Banco de Dados). Ademais, seu foco está na definição de tabelas, atributos, tipos de dados, relações, chaves primárias e chaves estrangeiras, aprofundando o que foi feito no conceitual (França, 2023). Dessa forma, foi feito (no software brModelo) o diagrama do modelo lógico no que tange ao vigente projeto, como a figura 2 demonstra. PK indica que um atributo é chave primária e FK indica que um atributo é chave estrangeira. Essa notação foi colocada apenas para facilitar a visualização e no modelo físico elas foram retiradas (ex.: id_usuario (PK) ficou como id_usuario no modelo físico).

<p align = "center"> Figura 2 - Diagrama do modelo lógico</p>

<img src = "../assets/modelo-logico-banco.png" align = "center">

<p align = "center"> Fonte: material produzido pela autora (2025).</p>

<h3>TABELA: USUARIO</h3>
<h4>Atributos (um pouco mais detalhados que no modelo conceitual):</h4>

- id_usuario (PK) - chave primária: identificador único e autoincrementável do usuário;
- nome_usuario: nome do usuário;
- email: email do usuário;
- senha: senha de acesso.

<h3>TABELA: TAREFA</h3>
<h4>Atributos (um pouco mais detalhados que no modelo conceitual):</h4>

- id_tarefa (PK) - chave primária: identificador único e autoincrementável da tarefa;
- titulo: título ou nome da tarefa;
- descricao: descrição detalhada da tarefa;
- deadline: prazo de conclusão da tarefa;
- progresso: status de progresso da tarefa (ex.: 50%, concluído);
- classificacao: rótulo da tarefa (ex.: UX);
- prioridade: nível de prioridade da tarefa (ex.: alta, média e baixa);
- usuario_id (FK): chave estrangeira que referencia USUARIO(id_usuario).


<h3>RELACIONAMENTOS</h3>
&nbsp; &nbsp; &nbsp; &nbsp;Os relacionamentos já foram descritos na seção 2.1. No entanto, achou-se melhor colocá-los aqui novamente para uma melhor leitura.

<h4> USUARIO-TAREFA </h4>

- Cardinalidade: (1,n), que é um-para-muitos;
- Descrição do relacionamento: um usuário pode ter uma ou muitas tarefas.


<h4> TAREFA-USUARIO </h4>

- Cardinalidade: (1,1), que é um-para-um;
- Descrição do relacionamento: uma tarefa se refere a um único usuário.

## 2.3 Modelo físico

&nbsp; &nbsp; &nbsp; &nbsp;Por fim, o modelo físico diz respeito à implementação concreta do banco de dados, com comandos SQL em um SGBD determinado (França, 2023). Desse modo, efetuou-se (usando o Visual Studio Code) o modelo físico referente ao vigente projeto, como é possível ver logo abaixo. Ele será implementado efetivamente nas próximas etapas do projeto individual com o uso do Supabase, plataforma de backend como serviço (BaaS - Backend as a Service) de código aberto baseada em tecnologias PostgreSQL (Oliveira, 2024).	

```sql
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
```

<h3>Descrição um pouco mais aprofundada do modelo físico</h3>

&nbsp; &nbsp; &nbsp; &nbsp;A fim de gerar mais completude ao entendimento do modelo físico, é significativo ressaltar os seguintes aspectos:
- PRIMARY KEY: indica a criação de uma chave primária (identificador);
- NOT NULL: tal especificação impede que um campo seja nulo;
- SERIAL (usado para criação de campos com incremento automático), TEXT (texto), INT (números inteiros) e DATE (data) são os tipos de dados usados nos campos;
- usuario_id INT REFERENCES usuario(id_usuario) ON DELETE CASCADE: tal código define uma chave estrangeira usuario_id, a qual referencia id_usuario (chave primária da tabela USUARIO) e exclui automaticamente os registros relacionados quando o usuário é deletado.

<br>

# 3 ARQUITETURA MVC DO PROJETO
&nbsp; &nbsp; &nbsp; &nbsp; De modo geral a arquitetura MVC é um padrão de construção de software composto por três partes principais (Souza, 2023):
- Model (Modelo): parte que interage com o banco de dados da aplicação, ou seja, é a camada de dados;
- View (Visão): consiste na parte de apresentação visual ao usuário, ou seja, da interface; 
- Controller (Controlador): essa parte atua como uma ponte entre Model e View, sendo responsável por receber as entradas do usuário, processá-las (geralmente com o auxílio do Model) e determinar qual resposta ou visualização (View) deve ser apresentada. Portanto, é ela que coordena o fluxo de dados.

&nbsp; &nbsp; &nbsp; &nbsp;Dessa forma, criou-se a seguinte estrutura MVC para o vigente projeto (conforme a figura 3):
<p align = "center"> Figura 3 - Diagrama MVC</p>
<div align = "center">
<img src = "../assets/Diagrama MVC.png">
</div>
<p align = "center"> Fonte: material produzido pela autora (2025).</p>
<br>

<h3>Explicando o diagrama MVC</h3>
<h4>Cliente</h4>
&nbsp; &nbsp; &nbsp; &nbsp;Em linhas gerais, o segmento de cliente (usuário final) interage com a aplicação por meio de um navegador. A partir disso, as ações feitas pelo usuário são enviadas ao servidor, que processa as requisições e responde com as visualizações adequadas. <br>

<h4>Servidor</h4>
&nbsp; &nbsp; &nbsp; &nbsp;O servidor é a parte da aplicação responsável por receber, processar e responder às solicitações feitas pelos usuários por intermédio do navegador (cliente). Dessa forma, no contexto do vigente projeto, o servidor é composto pelas partes subsequentes: <br> <br>


&nbsp; &nbsp; &nbsp; &nbsp; **Views (Visualizações)** <br>
&nbsp; &nbsp; &nbsp; &nbsp;São as páginas que o usuário vê e interage. **É significativo pontuar que as views só serão implementadas, de fato, na parte 3 deste projeto (mas elas já foram planejadas), conforme as instruções da atividade**. Nesse sentido, cada view corresponde a uma funcionalidade: <br>

&nbsp; &nbsp; &nbsp; &nbsp;- Login: contempla campos de email e senha. Envia os dados para o usuarioController.login;

&nbsp; &nbsp; &nbsp; &nbsp;- Cadastro: possui campos de nome, email e senha. Envia os dados para usuarioController.cadastrarUsuario;

&nbsp; &nbsp; &nbsp; &nbsp; - Home: essa view exibe mensagem de boas-vindas, lista as tarefas do usuário e botões para criar tarefa, atualizar tarefa e logout;

&nbsp; &nbsp; &nbsp; &nbsp; - CriarTarefa: consiste em um formulário com campos título, descrição, deadline, progresso e prioridade. Além disso, envia os dados para tarefaController.salvarTarefa;

&nbsp; &nbsp; &nbsp; &nbsp; - AtualizarTarefa: basicamente, é um formulário semelhante ao de criação de tarefas. No entanto, ele atualiza tarefa via tarefaController.atualizarTarefa. <br> <br>


&nbsp; &nbsp; &nbsp; &nbsp; **Controllers (controladores)** <br>
&nbsp; &nbsp; &nbsp; &nbsp;Como adiantado anteriormente, os controllers recebem as requisições das views e coordenam a interação entre as views e os models. Desse modo, estão listados abaixo os controllers inerentes ao vigente projeto: <br>

&nbsp; &nbsp; &nbsp; &nbsp;**usuarioController**<br>
&nbsp; &nbsp; &nbsp; &nbsp; - cadastrarUsuario: cria um novo usuário;

&nbsp; &nbsp; &nbsp; &nbsp;- login: autentica um usuário existente;

&nbsp; &nbsp; &nbsp; &nbsp; - logout: encerra a sessão do usuário.
<br> <br>

&nbsp; &nbsp; &nbsp; &nbsp;**tarefaController** <br>
&nbsp; &nbsp; &nbsp; &nbsp; - salvarTarefa: salva uma nova tarefa no banco de dados;

&nbsp; &nbsp; &nbsp; &nbsp; - listarTarefas: retorna todas as tarefas do usuário;

&nbsp; &nbsp; &nbsp; &nbsp; - mostrarTarefa: mostra os detalhes de uma tarefa específica;

&nbsp; &nbsp; &nbsp; &nbsp; - atualizarTarefa: atualiza uma tarefa existente;

&nbsp; &nbsp; &nbsp; &nbsp; - excluirTarefa: remove uma tarefa do sistema.
<br><br>


&nbsp; &nbsp; &nbsp; &nbsp; **Models (modelos)** <br>
&nbsp; &nbsp; &nbsp; &nbsp;Os models representam as estruturas de dados e, consequentemente, interagem diretamente com o banco de dados. Assim, os models do vigente projeto são:

&nbsp; &nbsp; &nbsp; &nbsp;**usuario**

&nbsp; &nbsp; &nbsp; &nbsp;- id_usuario: identificador único;

&nbsp; &nbsp; &nbsp; &nbsp; - nome_usuario: nome do usuário;

&nbsp; &nbsp; &nbsp; &nbsp; - email: email cadastrado;

&nbsp; &nbsp; &nbsp; &nbsp; - senha: senha criptografada. <br> <br>

&nbsp; &nbsp; &nbsp; &nbsp;**tarefa**

&nbsp; &nbsp; &nbsp; &nbsp; - id_tarefa: identificador único;

&nbsp; &nbsp; &nbsp; &nbsp; - titulo: título da tarefa;

&nbsp; &nbsp; &nbsp; &nbsp; - progresso: estado atual da tarefa (ex: “em andamento”, “concluído”);

&nbsp; &nbsp; &nbsp; &nbsp; - prioridade: nível de prioridade da tarefa (baixa, média, alta);

&nbsp; &nbsp; &nbsp; &nbsp; - usuario_id: chave estrangeira referenciando o usuário dono da tarefa.
<br> <br>

&nbsp; &nbsp; &nbsp; &nbsp; **Servidor de banco de dados**
<br>
&nbsp; &nbsp; &nbsp; &nbsp;Em linhas gerais, o banco de dados é PostgreSQL. Ele armazena todos os dados dos usuários e tarefas. Por fim, os models do backend interagem diretamente com este banco para realizar operações de CRUD. <br> <br>

# 4. COMO CONFIGURAR O BANCO DE DADOS E RODAR AS MIGRAÇÕES?
## 4.1 O Supabase
&nbsp; &nbsp; &nbsp; &nbsp; Para o vigente projeto de gerenciamento de tarefas, foi escolhido como banco de dados o Supabase. Ele é um banco de dados PostgreSQL de código aberto gerenciado por um servidor em nuvem (AWS) (Becker, 2023). Assim, para facilitar o entendimento deste projeto, segue um passo a passo de como entrar no Supabase: <br>

&nbsp; &nbsp; &nbsp; &nbsp;1) Pesquise no seu navegador por https://supabase.com/ <br>
&nbsp; &nbsp; &nbsp; &nbsp;2) Clique em sign-in (conforme a figura 4):
<p align = "center"> Figura 4 - Home do Supabase</p>

<img src = "../assets/homeSupabase.png" align = "center">

<p align = "center"> Fonte: material retirado do Supabase.</p>
<br><br>

&nbsp; &nbsp; &nbsp; &nbsp;3) Insira seus dados para cadastro (conforme a figura 5):
<p align = "center"> Figura 5 - Home do Supabase</p>

<img src = "../assets/cadastroSupabase.png" align = "center">

<p align = "center"> Fonte: material retirado do Supabase.</p>
<br><br>


&nbsp; &nbsp; &nbsp; &nbsp;4) Crie uma organização no Supabase (conforme a figura 6):
<p align = "center"> Figura 6 - Organização no Supabase</p>

<img src = "../assets/organizacaoSupabase.png" align = "center">

<p align = "center"> Fonte: material retirado do Supabase.</p>
<br><br>


&nbsp; &nbsp; &nbsp; &nbsp;5) Crie uma organização no Supabase (conforme a figura 7):
<p align = "center"> Figura 7 - Criando organização no Supabase</p>

<img src = "../assets/organizacaoSupabase.png" align = "center">

<p align = "center"> Fonte: material retirado do Supabase.</p>
<br><br>

&nbsp; &nbsp; &nbsp; &nbsp;6) Crie um projeto no Supabase (conforme a figura 8). **OBSERVAÇÃO: a seta amarela está apontando para o campo de senha do banco de dados. Defina uma e SALVE ELA, uma vez que ela será importante para a conexão com o banco de dados posteriormente (especificamente na variável ambiente DB_PASSWORD no arquivo .env)**:
<p align = "center"> Figura 8 - Criando projeto no Supabase </p>

<img src = "../assets/criarProjetoSupabase.png" align = "center">

<p align = "center"> Fonte: material retirado do Supabase.</p>
<br><br>

&nbsp; &nbsp; &nbsp; &nbsp;7) Depois disso, a interface do Supabase será aberta (conforme a figura 9).

<p align = "center"> Figura 9 - Interface do Supabase</p>

<img src = "../assets/interfaceSupabase.png" align = "center">

<p align = "center"> Fonte: material retirado do Supabase.</p>

<br><br>

&nbsp; &nbsp; &nbsp; &nbsp; Agora, na seção 4.2, será mostrado como configurar esse banco de dados no Supabase.

## 4.2 Configurando o banco de dados e as migrações
&nbsp; &nbsp; &nbsp; &nbsp; Para configurar o banco de dados, é necessário seguir os seguintes passos:

 &nbsp; &nbsp; &nbsp; &nbsp; **PASSO 1**: configure das variáveis de ambiente necessárias no arquivo .env. Dessa forma, insira isso no arquivo .env: 

```
DB_USER=
DB_HOST=
DB_DATABASE=
DB_PASSWORD=
DB_PORT=
DB_SSL=
PORT=
```
<br>

&nbsp; &nbsp; &nbsp; &nbsp;**Na seção PORT, a porta usada neste projeto é a 3000**. Os outros dados para colocar nas variáveis de ambiente podem ser conferidas dentro do próprio site do Supabase da seguinte forma: <br>
&nbsp; &nbsp; &nbsp; &nbsp; **Procure pelo botão "Connect" ao entrar no Supabase (conforme a figura 10):** 

<p align = "center"> Figura 10 - Botão Connect do Supabase</p>
<img src = "../assets/connect.png" align = "center">
<p align = "center"> Fonte: material retirado do Supabase.</p>
<br> <br>

&nbsp; &nbsp; &nbsp; &nbsp;**PASSO 2: após ter clicado em Connect, role a seção para baixo e procure por "Session pooler" e clique em "View parameters" (conforme a figura 11). Nessa seção, estão todos os dados necessários para colocar no .env e, assim, conectar o banco de dados ao projeto:**

<p align = "center"> Figura 11 - Session Pooler no Supabase</p>
<div align = "center">
<img src = "../assets/sessionPooler.png">
</div>
<p align = "center"> Fonte: material retirado do Supabase.</p>
<br>


&nbsp; &nbsp; &nbsp; &nbsp;**PASSO 3: após ter clicado em View parameters (conforme a figura 12), aparecerão os seguintes dados (eu deixei os da imagem cobertos por questões de segurança):**
<p align = "center"> Figura 12 - Dados para conexão com o banco de dados</p>
<div align = "center">
<img src = "../assets/dadosConexao.png">
</div>
<p align = "center"> Fonte: material retirado do Supabase.</p>
<br>

&nbsp; &nbsp; &nbsp; &nbsp; Faça o seguinte:
- Insira o dado de host na variável de ambiente DB_HOST do arquivo .env;
- Insira o dado de port na variável de ambiente DB_PORT do arquivo .env;
- Insira o dado de database na variável de ambiente DB_DATABASE do arquivo .env;
- Insira o dado de user na variável de ambiente DB_USER do arquivo .env;
- Insira 3000 na variável de ambiente PORT do arquivo .env;
- Insira true na variável de ambiente DB_SSL do arquivo .env;
- Insira a senha definida na criação do projeto na variável de ambiente DB_PASSWORD do arquivo .env (por isso que foi sugerido salvá-la, uma vez que será utilizada aqui, vide figura 8).
 <br> <br>

&nbsp; &nbsp; &nbsp; &nbsp; **PASSO 4 - MIGRAÇÕES**: após seguir os passos anteriores, execute o script de inicialização abaixo pelo terminal. É significativo pontuar que esse processo é responsável por preparar o banco de dados com a estrutura necessária para o funcionamento da aplicação. No que tange a isso, o arquivo init.sql (que está dentro da pasta scripts) contém os comandos SQL responsáveis por criar o banco de dados e suas tabelas iniciais. Nesse sentido, ele define a estrutura do banco — como os nomes das tabelas, colunas, tipos de dados, chaves primárias, relacionamentos, entre outros. Dessa forma, para rodar essa migração inicial e criar o banco no Supabase, utilize o seguinte comando:
```
npm run init-db
```
<br> <br>

&nbsp; &nbsp; &nbsp; &nbsp;**PASSO 5: por fim, execute o seguinte comando no terminal para rodar o servidor:**
```
node server.js
```
<br> <br>

# 5. COMO TESTAR AS APIs?
&nbsp; &nbsp; &nbsp; &nbsp;Para testar as APIs do vigente projeto, recomenda-se o uso do software Postman.

## 5.1 O Postman
&nbsp; &nbsp; &nbsp; &nbsp;De modo geral, o Postman é uma ferramenta que auxilia no teste de APIs. Para instalá-lo, faça o seguinte:<br>

&nbsp; &nbsp; &nbsp; &nbsp; **INSTALAR O POSTMAN: pesquise no seu navegador por https://www.postman.com/downloads/ e instale o Postman, colocando suas respectivas configurações (conforme a figura 13)**:

<p align = "center"> Figura 13 - Instalando o Postman</p>
<div align = "center">
<img src = "../assets/downloadPostman.png">
</div>
<p align = "center"> Fonte: material retirado do site do Postman.</p>
<br>

## 5.2 Testando as APIs

&nbsp; &nbsp; &nbsp; &nbsp; Para testar as APIs no Postman, siga os seguintes passos:

&nbsp; &nbsp; &nbsp; &nbsp; **1)Abra o Postman no seu computador** <br>

&nbsp; &nbsp; &nbsp; &nbsp; **2)Ao abrir o Postman, clique em "New" no canto superior esquerdo (conforme a figura 14)**:
<p align = "center"> Figura 14 - Clicando em "New" no Postman</p>
<div align = "center">
<img src = "../assets/newPostman.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>

&nbsp; &nbsp; &nbsp; &nbsp; **3)Clique em HTTP (conforme a figura 15)**:
<p align = "center"> Figura 15 - Clicando em "HTTP" no Postman</p>
<div align = "center">
<img src = "../assets/httpPostman.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>

&nbsp; &nbsp; &nbsp; &nbsp; **4)Após isso, será aberta a interface para a realização de requisições no Postman (conforme a figura 16)**:
<p align = "center"> Figura 16 - Interface para requisições no Postman</p>
<div align = "center">
<img src = "../assets/requisicoesPostman.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>

&nbsp; &nbsp; &nbsp; &nbsp; **5)Depois, na aba Body, selecione raw e JSON para realizar as requisições(conforme a figura 17);**:
<p align = "center"> Figura 17 - Interface para requisições no Postman</p>
<div align = "center">
<img src = "../assets/bodyRaw.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>

&nbsp; &nbsp; &nbsp; &nbsp;**OBS.: depois de realizar todos os passos anteriores, faça os passos seguintes:**

<h3> REQUISIÇÃO DE CADASTRO DE USUÁRIO</h3>

&nbsp; &nbsp; &nbsp; &nbsp; Método de requisição: POST (mandar dados para o servidor); <br>
&nbsp; &nbsp; &nbsp; &nbsp; URL: http://localhost:3000/cadastro <br> <br>
&nbsp; &nbsp; &nbsp; &nbsp;**Como testar a requisição de cadastro?** <br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 1:** selecione o método POST no drop-down acima de "Params"<br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 2:** insira a URL no campo em que está escrito "Enter URL or paste text" <br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 3:** insira um código como o apresentado abaixo nas linhas de comando que estão logo abaixo da seção de URL (pode substituir os valores de nome_usuario, email e senha pelos de sua preferência). A exemplificação de uma requisição de cadastro está demonstrada na figura 18:<br>

```
{
  "nome_usuario": "insira seu nome aqui",
  "email": "insira seu email aqui",
  "senha": "insira sua senha aqui"
}
```
<br> <br>

<p align = "center"> Figura 18 - Exemplo de requisição de cadastro</p>
<div align = "center">
<img src = "../assets/requisicaoCadastro.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>

&nbsp; &nbsp; &nbsp; &nbsp;**Passo 4:** clique no botão Send. A resposta esperada é a demonstração dos dados cadastrados (figura 19). Depois disso, os dados são armazenados no Supabase (figura 20).<br>

<p align = "center"> Figura 19 - Exemplo de resposta de cadastro</p>
<div align = "center">
<img src = "../assets/respostaCadastro.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>


<p align = "center"> Figura 20 - Usuário cadastrado no banco de dados</p>
<div align = "center">
<img src = "../assets/cadastroBancoDeDados.png">
</div>
<p align = "center"> Fonte: material retirado do site do Supabase.</p>
<br>

<h3> REQUISIÇÃO DE LOGIN DE USUÁRIO</h3>
&nbsp; &nbsp; &nbsp; &nbsp; Método de requisição: POST (mandar dados para o servidor); <br>
&nbsp; &nbsp; &nbsp; &nbsp; URL: http://localhost:3000/login <br> <br>

&nbsp; &nbsp; &nbsp; &nbsp; **Como testar a requisição de login?**<br>

&nbsp; &nbsp; &nbsp; &nbsp;Após ter feito o cadastro, realize o login seguindo os passos subsequentes:<br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 1:** selecione o método POST no drop-down acima de "Params"<br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 2:** insira a URL no campo em que está escrito "Enter URL or paste text" <br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 3:** insira o seu usuário cadastrado (com email e senha) nas linhas de comando que estão logo abaixo da seção de URL **usando o formato apresentado abaixo** . A exemplificação de uma requisição de login está demonstrada na figura 21.<br>

```
{
  "email": "insira seu email cadastrado aqui",
  "senha": "insira sua senha cadastrada aqui"
}
```
<br>
<br>
<p align = "center"> Figura 21 - Exemplo de requisição de login</p>
<div align = "center">
<img src = "../assets/requisicaoLogin.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>

&nbsp; &nbsp; &nbsp; &nbsp;**Passo 4:** clique no botão Send. A resposta esperada é uma mensagem de login realizado com sucesso juntamente com o dados do usuário logado (figura 22).<br>

<p align = "center"> Figura 22 - Exemplo de resposta de login</p>
<div align = "center">
<img src = "../assets/respostaLogin.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>


<h3> REQUISIÇÃO DE CRIAR TAREFAS</h3>
&nbsp; &nbsp; &nbsp; &nbsp; Método de requisição: POST (mandar dados para o servidor); <br>
&nbsp; &nbsp; &nbsp; &nbsp; URL: http://localhost:3000/tarefas <br> <br>

&nbsp; &nbsp; &nbsp; &nbsp; **Como testar a requisição de criar tarefas?**<br>

&nbsp; &nbsp; &nbsp; &nbsp;Após ter feito o login (**SE E SOMENTE SE VOCÊ TIVER FEITO O LOGIN**), crie tarefas seguindo os passos subsequentes:<br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 1:** selecione o método POST no drop-down acima de "Params"<br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 2:** insira a URL no campo em que está escrito "Enter URL or paste text" <br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 3:** insira os dados das tarefas nas linhas de comando que estão logo abaixo da seção de URL **usando o formato apresentado abaixo** . A exemplificação de uma requisição de criação de tarefas está demonstrada na figura 23.<br>

```
{
  "titulo": "Coloque o título da sua tarefa aqui",
  "descricao": "Coloque a descrição da sua tarefa aqui",
  "deadline": "Coloque o prazo da sua tarefa usando este formato: 2025-05-25",
  "progresso": "Coloque aqui se a sua tarefa está pendente, em andamento ou feita",
  "prioridade": "Coloque aqui a prioridade da sua tarefa (alta, média ou baixa)"
}

```
<br> <br>

<p align = "center"> Figura 23 - Exemplo de requisição de criar tarefa</p>
<div align = "center">
<img src = "../assets/requisicaoCriarTarefa.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>

&nbsp; &nbsp; &nbsp; &nbsp;**Passo 4:** clique no botão Send. A resposta esperada é o retorno dos dados da tarefa que foi cadastrada (figura 24). Além disso, a figura 25 mostra a tarefa cadastrada no Supabase.<br>
<p align = "center"> Figura 24 - Exemplo de resposta de criar tarefa</p>
<div align = "center">
<img src = "../assets/respostaCriarTarefa.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>

<p align = "center"> Figura 25 - Tarefa cadastrada no banco de dados</p>
<div align = "center">
<img src = "../assets/tarefaBancoDeDados.png">
</div>
<p align = "center"> Fonte: material retirado do site do Supabase.</p>
<br>


<h3> REQUISIÇÃO DE ATUALIZAR TAREFAS</h3>
&nbsp; &nbsp; &nbsp; &nbsp; Método de requisição: PUT (substituir dados no servidor); <br>
&nbsp; &nbsp; &nbsp; &nbsp; URL: http://localhost:3000/tarefas/1 (pode substituir esse número pelo id da tarefa) <br> <br>

&nbsp; &nbsp; &nbsp; &nbsp; **Como testar a requisição de atualizar tarefas?**<br>

&nbsp; &nbsp; &nbsp; &nbsp;Após ter cadastrado ao menos uma tarefa, atualize tarefas seguindo os passos subsequentes:<br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 1:** selecione o método PUT no drop-down acima de "Params"<br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 2:** insira a URL no campo em que está escrito "Enter URL or paste text", substituindo o número na URL pelo id da tarefa cadastrada (conforme retornado na resposta de login no campo id_tarefa). <br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 3:** insira os dados atualizados da tarefa nas linhas de comando que estão logo abaixo da seção de URL **usando o formato apresentado abaixo** . A exemplificação de uma requisição de atualização de tarefas está demonstrada na figura 26.<br>

```
{
  "titulo": "Coloque o título da sua tarefa aqui",
  "descricao": "Coloque a descrição da sua tarefa aqui",
  "deadline": "Coloque o prazo da sua tarefa usando este formato: 2025-05-25",
  "progresso": "Coloque aqui se a sua tarefa está pendente, em andamento ou feita",
  "prioridade": "Coloque aqui a prioridade da sua tarefa (alta, média ou baixa)"
}

```
<br> <br>

<p align = "center"> Figura 26 - Exemplo de requisição de atualizar tarefa</p>
<div align = "center">
<img src = "../assets/requisicaoAtualizarTarefa.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>

&nbsp; &nbsp; &nbsp; &nbsp;**Passo 4:** clique no botão Send. A resposta esperada é a mensagem "Tarefa atualizada com sucesso" (figura 27). Além disso, a figura 28 mostra a tarefa atualizada no Supabase.<br>

<p align = "center"> Figura 27 - Exemplo de resposta de atualizar tarefa</p>
<div align = "center">
<img src = "../assets/respostaAtualizarTarefa.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>

<p align = "center"> Figura 28 - Tarefa atualizada no banco de dados</p>
<div align = "center">
<img src = "../assets/tarefaAtualizadaBancoDeDados.png">
</div>
<p align = "center"> Fonte: material retirado do site do Supabase.</p>
<br>

<h3> REQUISIÇÃO DE LISTAR TAREFAS (DO USUÁRIO LOGADO)</h3>
&nbsp; &nbsp; &nbsp; &nbsp; Método de requisição: GET (pegar dados do servidor); <br>
&nbsp; &nbsp; &nbsp; &nbsp; URL: http://localhost:3000/tarefas <br> <br>

&nbsp; &nbsp; &nbsp; &nbsp; **Como testar a requisição de listar tarefas DO USUÁRIO QUE ESTÁ LOGADO?**<br>

&nbsp; &nbsp; &nbsp; &nbsp;Após ter cadastrado ao menos uma tarefa, liste tarefas seguindo os passos subsequentes:<br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 1:** selecione o método GET no drop-down acima de "Params"<br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 2:** insira a URL no campo em que está escrito "Enter URL or paste text". <br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 3:** No caso desta requisição, não é necessário inserir nenhum código em formato JSON nas linhas de comando, apenas clique em Send. Nesse sentido, a  exemplificação de uma requisição de listagem de tarefas está demonstrada na figura 29.<br>

<p align = "center"> Figura 29 - Exemplo de requisição de listar tarefas</p>
<div align = "center">
<img src = "../assets/requisicaoListarTarefas.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>

&nbsp; &nbsp; &nbsp; &nbsp;**Passo 4:** clique no botão Send. A resposta esperada é a listagem das tarefas do USUÁRIO LOGADO (figura 30).<br>

<p align = "center"> Figura 30 - Exemplo de resposta de listar tarefas</p>
<div align = "center">
<img src = "../assets/respostaListarTarefas.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>


<h3> REQUISIÇÃO DE LOGOUT DE USUÁRIO</h3>
&nbsp; &nbsp; &nbsp; &nbsp; Método de requisição: GET; <br>
&nbsp; &nbsp; &nbsp; &nbsp; URL: http://localhost:3000/logout <br> <br>

&nbsp; &nbsp; &nbsp; &nbsp; **Como testar a requisição de logout?**<br>

&nbsp; &nbsp; &nbsp; &nbsp;Faça logout seguindo os passos subsequentes:<br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 1:** selecione o método GET no drop-down acima de "Params"<br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 2:** insira a URL no campo em que está escrito "Enter URL or paste text". <br>
&nbsp; &nbsp; &nbsp; &nbsp;**Passo 3:** No caso desta requisição, não é necessário inserir nenhum código em formato JSON nas linhas de comando, apenas clique em Send. Nesse sentido, a  exemplificação de uma requisição de logout está demonstrada na figura 31.<br>

<p align = "center"> Figura 31 - Exemplo de requisição de logout</p>
<div align = "center">
<img src = "../assets/requisicaoLogout.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>

&nbsp; &nbsp; &nbsp; &nbsp;**Passo 4:** clique no botão Send. A resposta esperada é a mensagem "Logout realizado com sucesso" (figura 32).<br>

<p align = "center"> Figura 32 - Exemplo de resposta de logout</p>
<div align = "center">
<img src = "../assets/respostaLogout.png">
</div>
<p align = "center"> Fonte: material retirado do aplicativo do Postman.</p>
<br>


# REFERÊNCIAS BIBLIOGRÁFICAS

BECKER, Sophie. What is Supabase?. [S. l.], 14 dez. 2023. Disponível em: https://blog.boldtech.dev/what-is-supabase-vs-firebase/#supabase-who-are-they. Acesso em: 20 maio 2025.

FRANÇA, Thaís. Modelagem de banco de dados relacional: modelagem lógica. [S. l.], 23 nov. 2023. Disponível em: https://medium.com/@francethais/modelagem-de-banco-de-dados-relacional-modelagem-l%C3%B3gica-e-f%C3%ADsica-32c651f6810b. Acesso em: 4 maio 2025.

NEVES, Cristiane Selem Ferreira. Banco de Dados Descomplicado: Modelagem de Dados. [S. l.], 28 ago. 2024. Disponível em: https://www.estrategiaconcursos.com.br/blog/banco-dados-descomplicado-modelagem-dados/. Acesso em: 4 maio 2025.

OLIVEIRA, Miguel. O que é Supabase? O Guia Definitivo para Esta Alternativa ao Firebase. [S. l.], 29 nov. 2024. Disponível em: https://apidog.com/pt/blog/what-is-supabase/. Acesso em: 4 maio 2025.

PONTOTEL. Gestão de tarefas: entenda como esse processo pode ser vantajoso para sua empresa e colaboradores!. [S. l.], 22 nov. 2024. Disponível em: https://www.pontotel.com.br/gestao-de-tarefas/. Acesso em: 4 maio 2025.

SOUZA, Ângelo. Arquitetura MVC: Entendendo o Modelo-Visão-Controlador. [S. l.], 31 out. 2023. Disponível em: https://www.dio.me/articles/arquitetura-mvc-entendendo-o-modelo-visao-controlador. Acesso em: 20 maio 2025.