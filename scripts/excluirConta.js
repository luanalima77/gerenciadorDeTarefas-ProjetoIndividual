document.getElementById("btn-excluir-conta").addEventListener("click", async () => {
  const { isConfirmed } = await Swal.fire({
    title: 'Tem certeza?',
    text: "Deseja apagar sua conta? Essa ação não pode ser desfeita.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, apagar minha conta',
    cancelButtonText: 'Cancelar'
  });

  if (!isConfirmed) return;

  //Usando fetch API para excluir conta.
  try {
    const res = await fetch("/excluirConta", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();

    if (res.ok) {
      await Swal.fire({
        icon: 'success',
        title: 'Conta apagada',
        text: data.mensagem,
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      window.location.href = "/"; 
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: data.error || 'Erro ao apagar conta.',
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Erro na comunicação com o servidor.',
    });
  }
});
