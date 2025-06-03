//Chamando o form de login.
const form = document.getElementById('login__form');

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



//Adicionando o evento de submit ao formulário de login.
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Capturando email e senha do usuário.
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // Login OK
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: data.mensagem,
                timer: 2000,
                showConfirmButton: false,
                scrollbarPadding: false
            }).then(() => {
                //Redirecionar para home depois do alerta fechar.
                window.location.href = '/home';
            });

        }else {
            //Erro no login (ex: senha incorreta).
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: data.error || 'Erro ao realizar login'
            });
        }
        } catch (error) {
            Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro na comunicação com o servidor'
        });
        console.error(error);
        }
});