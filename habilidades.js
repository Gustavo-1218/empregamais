document.addEventListener("DOMContentLoaded", function () {

    const botaoAdicionar = document.getElementById("botao-adicionar");
    const lista = document.getElementById("lista-habilidades");
    const contador = document.getElementById("contador-habilidades");

    botaoAdicionar.addEventListener("click", function () {

        const nome = document.getElementById("nome-habilidade").value;
        const categoria = document.getElementById("categoria-habilidade").value;
        const nivel = document.getElementById("nivel-habilidade").value;

        if (nome.trim() === "") {
            mostrarMensagem("Digite uma habilidade.");
            return;
        }

        let porcentagem = 40;

        if (nivel === "Intermediário") {
            porcentagem = 65;
        }

        if (nivel === "Avançado") {
            porcentagem = 90;
        }

        const card = document.createElement("article");

        card.className = "card-habilidade";

        card.innerHTML = `
            <div class="icone-habilidade azul">
                <i class="fa-solid fa-star"></i>
            </div>

            <div class="habilidade-conteudo">

                <div class="habilidade-topo">

                    <h3>${nome}</h3>

                    <span class="nivel ${nivel.toLowerCase()}">
                        ${nivel}
                    </span>

                </div>

                <p>${categoria}</p>

                <div class="barra-nivel">
                    <span style="width:${porcentagem}%"></span>
                </div>

            </div>

            <button class="botao-remover" type="button">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        lista.appendChild(card);

        contador.textContent =
            Number(contador.textContent) + 1;

        adicionarRemocao(card);

        document.getElementById("nome-habilidade").value = "";
        document.getElementById("categoria-habilidade").value = "";

        mostrarMensagem("Habilidade adicionada!");

    });


    function adicionarRemocao(card) {

        const botao = card.querySelector(".botao-remover");

        botao.addEventListener("click", function () {

            card.remove();

            contador.textContent =
                Number(contador.textContent) - 1;

            mostrarMensagem("Habilidade removida.");

        });

    }


    document.querySelectorAll(".botao-remover").forEach(function (botao) {

        botao.addEventListener("click", function () {

            const card =
                botao.closest(".card-habilidade");

            card.remove();

            contador.textContent =
                Number(contador.textContent) - 1;

            mostrarMensagem("Habilidade removida.");

        });

    });


    function mostrarMensagem(texto) {

        const mensagem =
            document.getElementById("toast");

        mensagem.textContent = texto;

        mensagem.classList.add("mostrar");

        setTimeout(function () {

            mensagem.classList.remove("mostrar");

        }, 2500);

    }

});