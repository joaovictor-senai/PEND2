const formulario = document.getElementById("formulario");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const mensagem = document.getElementById("mensagem");
const botaoTema = document.getElementById("tema");

function mostrarMensagem(texto, cor) {
    mensagem.textContent = texto;
    mensagem.style.color = cor;
}

function validarNome() {
    return nome.value.trim().length >= 3;
}

function validarEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value.trim());
}

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!validarNome()) {
        mostrarMensagem("Digite um nome com pelo menos 3 caracteres.", "#dc2626");
        nome.focus();
        return;
    }

    if (!validarEmail()) {
        mostrarMensagem("Digite um e-mail válido.", "#dc2626");
        email.focus();
        return;
    }

    mostrarMensagem(
        `Olá, ${nome.value}! Seu formulário foi enviado com sucesso. Obrigado pelo contato!`,
        "#16a34a"
    );

    formulario.reset();

});

if (botaoTema) {

    botaoTema.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            botaoTema.textContent = "Tema Claro";
        } else {
            botaoTema.textContent = "Tema escuro";
        }

    });

}