function criarCardTarefa(tarefa) {
  console.log(tarefa);
  return `
    <div class="card-tarefa">
      <h2>${tarefa.titulo}</h2>
      <p>${tarefa.descricao}</p>
      <p><strong>Status:</strong> ${tarefa.progresso}%</p>
      <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
      <p><strong>Deadline:</strong> ${tarefa.data_formatada || tarefa.deadline}</p>
    </div>
  `;
}

fetch('/tarefas')
  .then(res => {
    if (!res.ok) throw new Error('Erro ao carregar tarefas');
    return res.json();
  })
  .then(tarefas => {
    const lista = document.getElementById('listaTarefas');

    if (tarefas.length === 0) {
      lista.innerHTML = '<p>Nenhuma tarefa encontrada.</p>';
      return;
    }

    const cards = tarefas.map(criarCardTarefa);
    lista.innerHTML = cards.join('');
  })
  .catch(error => {
    console.error(error);
    document.getElementById('listaTarefas').innerHTML = '<p>Erro ao carregar tarefas.</p>';
  });
