document.addEventListener("DOMContentLoaded", function () {

    const pontos = document.querySelectorAll(".radar-ponto");

    pontos.forEach(function (ponto) {

        if (ponto.classList.contains("ponto-voce")) {
            return;
        }

        ponto.addEventListener("click", function () {

            const tipo = ponto.dataset.tipo;

            let titulo = "";
            let descricao = "";

            if (tipo === "vaga") {
                titulo = "Oportunidade encontrada";
                descricao = "Uma vaga está disponível próxima a você.";
            }

            if (tipo === "empresa") {
                titulo = "Empresa próxima";
                descricao = "Uma empresa está conectada ao NEXT WORK.";
            }

            if (tipo === "profissional") {
                titulo = "Profissional próximo";
                descricao = "Um profissional está disponível na sua região.";
            }

            if (tipo === "servico") {
                titulo = "Serviço encontrado";
                descricao = "Um serviço está disponível próximo a você.";
            }

            const antiga = document.querySelector(".radar-popup");

            if (antiga) {
                antiga.remove();
            }

            const popup = document.createElement("div");

            popup.className = "radar-popup";

            popup.innerHTML = `
                <button class="radar-popup-fechar">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="radar-popup-icone">
                    <i class="fa-solid fa-location-dot"></i>
                </div>

                <span>NEXT WORK</span>

                <h3>${titulo}</h3>

                <p>${descricao}</p>

                <button class="radar-popup-botao">
                    Ver informações
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            `;

            document.querySelector(".radar-area").appendChild(popup);

            popup.querySelector(".radar-popup-fechar").addEventListener("click", function () {
                popup.remove();
            });

        });

    });


    const botoes = document.querySelectorAll(".botao-card");

    botoes.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const card = botao.closest(".card-vaga");

            document.querySelectorAll(".card-vaga").forEach(function (outroCard) {
                outroCard.classList.remove("vaga-selecionada");
            });

            card.classList.add("vaga-selecionada");

            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    });

});