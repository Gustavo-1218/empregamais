document.addEventListener("DOMContentLoaded", function () {

    // FILTROS DAS CANDIDATURAS

    const filtros = document.querySelectorAll(".filtro");
    const candidaturas = document.querySelectorAll(".card-candidatura");

    filtros.forEach(function (filtro) {

        filtro.addEventListener("click", function () {

            filtros.forEach(function (item) {
                item.classList.remove("ativo");
            });

            filtro.classList.add("ativo");

            const tipo = filtro.dataset.filtro;

            candidaturas.forEach(function (candidatura) {

                if (tipo === "todas") {
                    candidatura.style.display = "flex";
                } 
                else if (candidatura.dataset.status === tipo) {
                    candidatura.style.display = "flex";
                } 
                else {
                    candidatura.style.display = "none";
                }

            });

        });

    });


    // CANDIDATAR-SE A UMA NOVA VAGA

    const botoesCandidatura = document.querySelectorAll(".botao-adicionar");
    const contador = document.getElementById("contador-candidaturas");

    botoesCandidatura.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const card = botao.closest(".card-oportunidade");

            const vaga = card.dataset.vaga;
            const empresa = card.dataset.empresa;

            botao.innerHTML = '<i class="fa-solid fa-check"></i> Candidatado';
            botao.disabled = true;

            botao.style.background = "rgba(0,230,168,.12)";
            botao.style.border = "1px solid rgba(0,230,168,.3)";
            botao.style.color = "#65f2c5";

            contador.textContent =
                Number(contador.textContent) + 1;

            mostrarMensagem(
                "Candidatura enviada para " + empresa + "!"
            );

            console.log("Nova candidatura:", vaga);
        });

    });


    // BOTÃO PARA MOSTRAR UMA MENSAGEM

    function mostrarMensagem(texto) {

        const mensagem = document.getElementById("toast");

        mensagem.textContent = texto;
        mensagem.classList.add("mostrar");

        setTimeout(function () {
            mensagem.classList.remove("mostrar");
        }, 2500);

    }

});
