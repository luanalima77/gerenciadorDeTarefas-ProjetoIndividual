 //Adicionando evento de submit no formulário de criar tarefa.
 document.getElementById('form-criar-tarefa').addEventListener('submit', async (e) => {
    e.preventDefault();

    //Armazenando os dados.
    const dados = {
      titulo: e.target.titulo.value,
      descricao: e.target.descricao.value,
      deadline: e.target.deadline.value,
      progresso: e.target.progresso.value,
      prioridade: e.target.prioridade.value,
    };

    //Usando fetch API para mandar os dados das tarefas criadas ao banco por meio da rota /tarefas.
    try {
      const resposta = await fetch('/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      //Retornando ao usuário se a tarefa foi criada com sucesso ou não.
      if (resposta.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Tarefa criada!',
          text: 'Sua tarefa foi registrada com sucesso.',
          confirmButtonColor: '#0038B0'
        });
        e.target.reset();
      } else {
        const erro = await resposta.text();
        Swal.fire({
          icon: 'error',
          title: 'Erro ao criar tarefa',
          text: erro,
          confirmButtonColor: '#c0392b'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erro no servidor',
        text: 'Tente novamente mais tarde.',
        confirmButtonColor: '#c0392b'
      });
    }
});