//Chamando o form de cadastro.
const form = document.getElementById("sign__up__form");

//Alternando a visibilidade do olhinho.
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  //Alternando os ícones de olhinho.
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});



//Adicionando evento de submit no formulário de cadastro.
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome_usuario = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    //Verificando se o email que o usuário inseriu é válido.
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.fire({
          icon: "warning",
          title: "Email inválido",
          text: "Por favor, insira um email válido.",
          scrollbarPadding: false
        });
        return;
      }

    //Verificando a força da senha.
    const senhaRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

    if(!senhaRegex.test(senha)){
      Swal.fire({
        icon: "warning",
        title: "Senha inválida",
        text: "A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula e 1 caractere especial.",
        scrollbarPadding: false
      });
      return; 
    }


    //Usando Fetch API para mandar os dados de cadastro para o banco por meio da rota /cadastro.
    try {
        const response = await fetch("/cadastro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome_usuario, email, senha }),
    });


    //Verificando a resposta JSON e adicionando o SweetAlert2 para retornar ao usuário se o cadastro foi bem-sucedido ou não.
    const data = await response.json();

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: data.mensagem,
            timer: 2000,
            showConfirmButton: false,
            scrollbarPadding: false
          }).then(() => {
            window.location.href = "/login";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: data.error || "Erro ao realizar cadastro",
            scrollbarPadding: false
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro na comunicação com o servidor",
          scrollbarPadding: false
        });
        console.error(error);
      }
});