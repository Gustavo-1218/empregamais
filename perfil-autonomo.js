const botaoContratar = document.querySelector(".btn-contratar");

if (botaoContratar) {

    const paginaAtual = window.location.pathname
        .split("/")
        .pop();

    const contratado = localStorage.getItem(
        `contratado-${paginaAtual}`
    );

    if (contratado === "true") {

        botaoContratar.textContent = "Pessoa contratada";

        botaoContratar.classList.add("contratado");

        botaoContratar.removeAttribute("href");

    }
}