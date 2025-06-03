//Função para criar o card da tarefa dinamicamente.
function criarCardTarefa(tarefa) {
  const statusFormatado = tarefa.progresso.charAt(0).toLowerCase() + tarefa.progresso.slice(1);
  return `
    <div class="card-tarefa" data-id="${tarefa.id_tarefa}">
      <h2>${tarefa.titulo}</h2>
      <p>${tarefa.descricao}</p>
      <p><strong>Status:</strong> ${statusFormatado}</p>
      <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
      <p><strong>Deadline:</strong> ${tarefa.data_formatada || tarefa.deadline}</p>
      <div class="acoes">
        <button class="btn-editar" data-id="${tarefa.id_tarefa}">Editar</button>
        <button class="btn-excluir" data-id="${tarefa.id_tarefa}">Excluir</button>
      </div>
    </div>
  `;
}

//Função para aplicar eventos às tarefas.
function aplicarEventos(tarefas) {
  const lista = document.getElementById('listaTarefas');
  if (!tarefas.length) {
    lista.innerHTML = '<p>Nenhuma tarefa encontrada.</p>';
    return;
  }

  lista.innerHTML = tarefas.map(criarCardTarefa).join('');

  //Botão excuir tarefas.
  document.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      Swal.fire({
        title: 'Tem certeza?',
        text: 'Você não poderá reverter esta ação!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch(`/tarefas/${id}`, { method: 'DELETE' });
            const json = await res.json();

            if (res.ok) {
              btn.closest('.card-tarefa').remove();
              Swal.fire('Excluído!', json.mensagem || 'A tarefa foi removida.', 'success');
            } else {
              Swal.fire('Erro!', json.erro || 'Erro ao excluir tarefa.', 'error');
            }
          } catch (err) {
            console.error(err);
            Swal.fire('Erro!', 'Erro ao excluir tarefa.', 'error');
          }
        }
      });
    });
  });


  //Botão editar tarefas.
  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      try {
        const res = await fetch(`/tarefas/${id}`);
        const tarefa = await res.json();

        document.getElementById('editar-id').value = tarefa.id_tarefa;
        document.getElementById('editar-titulo').value = tarefa.titulo;
        document.getElementById('editar-descricao').value = tarefa.descricao;
        document.getElementById('editar-progresso').value = tarefa.progresso;
        document.getElementById('editar-prioridade').value = tarefa.prioridade;
        document.getElementById('editar-deadline').value = tarefa.deadline.slice(0, 10);

        document.getElementById('modal-editar').classList.remove('hidden');
      } catch (err) {
        console.error(err);
        alert('Erro ao carregar tarefa para edição');
      }
    });
  });
}

//Carregando as tarefas na view de mostrar tarefas.
function carregarTarefas() {
  fetch('/tarefas')
    .then(res => {
      if (!res.ok) throw new Error('Erro ao carregar tarefas');
      return res.json();
    })
    .then(tarefas => {
      window.todasTarefas = tarefas;
      aplicarEventos(tarefas);
    })
    .catch(error => {
      console.error(error);
      document.getElementById('listaTarefas').innerHTML = '<p>Erro ao carregar tarefas.</p>';
    });
}

//Função para aplicar filtros de busca às tarefas.
function aplicarFiltros() {
    const titulo = document.getElementById('filtro-titulo').value.toLowerCase();
    const prioridade = document.getElementById('filtro-prioridade').value;
    const status = document.getElementById('filtro-status').value;
    const deadline = document.getElementById('filtro-deadline').value;

   
    const filtradas = window.todasTarefas.filter(tarefa => {

     //Formatando as datas das tarefas já cadastradas para o padrão usado no Brasil
    const dataTarefa = new Date(tarefa.deadline);
    const dataFormatada = new Intl.DateTimeFormat("pt-br").format(dataTarefa);

    //Transformando a deadline colocada no filtro de busca para o padrão do Brasil.
    let deadlineFormatada;
    if(deadline){
      const [ano,mes,dia] = deadline.split("-");
      deadlineFormatada = `${dia}/${mes}/${ano}`
      console.log(deadlineFormatada);
    }

    const tituloMatch = tarefa.titulo.toLowerCase().includes(titulo);
    const prioridadeMatch = !prioridade || tarefa.prioridade.toLowerCase() === prioridade.toLowerCase();
    const statusMatch = !status || tarefa.progresso.toLowerCase() === status.toLowerCase();
    const deadlineMatch = !deadline || dataFormatada == deadlineFormatada;
    console.log(tarefa.deadline);
    console.log(deadlineMatch);
    return tituloMatch && prioridadeMatch && statusMatch && deadlineMatch;
    
  });

  aplicarEventos(filtradas);
}

document.getElementById('btn-aplicar-filtros').addEventListener('click', aplicarFiltros);

document.getElementById('fechar-modal').addEventListener('click', () => {
  document.getElementById('modal-editar').classList.add('hidden');
});


document.getElementById('btn-salvar-edicao').addEventListener('click', async (event) => {
  event.preventDefault(); 

  const id = document.getElementById('editar-id').value;
  const titulo = document.getElementById('editar-titulo').value;
  const descricao = document.getElementById('editar-descricao').value;
  const progresso = document.getElementById('editar-progresso').value;
  const prioridade = document.getElementById('editar-prioridade').value;
  const deadline = document.getElementById('editar-deadline').value;

  try {
    const res = await fetch(`/tarefas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo, descricao, progresso, prioridade, deadline })
    });

    const json = await res.json();

    if (res.ok) {
      Swal.fire('Sucesso!', json.mensagem || 'Tarefa atualizada com sucesso!', 'success');
      document.getElementById('modal-editar').classList.add('hidden');
      carregarTarefas();
    } else {
      Swal.fire('Erro!', json.erro || 'Não foi possível atualizar a tarefa.', 'error');
    }
  } catch (err) {
    console.error(err);
    Swal.fire('Erro!', 'Erro ao atualizar tarefa.', 'error');
  }
});


carregarTarefas();
