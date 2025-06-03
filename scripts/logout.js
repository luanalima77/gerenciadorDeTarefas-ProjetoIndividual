document.getElementById('btn-logout').addEventListener('click', function(event) {
  event.preventDefault();

  Swal.fire({
    title: 'Tem certeza que deseja sair?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, sair',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        //Fazendo o logout via GET.
        const response = await fetch('/logout', { method: 'GET' });
        
        if (response.ok) {
          //Mostrando a mensagem de sucesso do logout.
          Swal.fire({
            icon: 'success',
            title: 'Logout efetuado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            //Redirecionando para a landing page após o logout.
            window.location.href = '/';
          });
        } else {
          Swal.fire('Erro', 'Não foi possível sair. Tente novamente.', 'error');
        }
      } catch (error) {
        Swal.fire('Erro', 'Erro ao se comunicar com o servidor.', 'error');
      }
    }
  });
});
