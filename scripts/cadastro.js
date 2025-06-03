const form = document.getElementById("sign__up__form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome_usuario = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    try {
        const response = await fetch("/cadastro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome_usuario, email, senha }),
    });

    const data = await response.json();

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: data.mensagem,
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "/login";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: data.error || "Erro ao realizar cadastro",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro na comunicação com o servidor",
        });
        console.error(error);
      }
});