const ctxTarefas = document.getElementById('grafico1').getContext('2d');
const ctxOutro = document.getElementById('grafico2').getContext('2d');

// Primeiro gráfico (doughnut)
new Chart(ctxTarefas, {
    type: 'pie',
        data: {
          labels: ['A Fazer', 'Concluídas'],
          datasets: [{
            label: 'Tarefas',
            data: [<%= tarefasAFazer %>, <%= tarefasConcluidas %>],
            backgroundColor: ['#FF6384', '#36A2EB'],
            borderColor: ['#fff', '#fff'],
            borderWidth: 1
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
        }
    }
});

// Segundo gráfico (exemplo: barras com totais)
new Chart(ctxOutro, {
        type: 'bar',
        data: {
          labels: ['Total de Tarefas'],
          datasets: [{
            label: 'Quantidade',
            data: [<%= totalTarefas %>],
            backgroundColor: ['#FFCE56'],
            borderColor: ['#fff'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true }
          },
          plugins: { legend: { display: false } }
        }
});