/* =========================================================
   NEXT WORK — JAVASCRIPT DO RADAR
   ========================================================= */


/* =========================================================
   DADOS DAS VAGAS
   ========================================================= */

const vagas = [

    {
        titulo: "Desenvolvedor Front-End",
        empresa: "Tech Solutions",
        local: "Natal - RN",
        distancia: "2,4 km",
        requisitos: ["HTML", "CSS", "JavaScript"]
    },

    {
        titulo: "Analista de Marketing",
        empresa: "Agência Criativa",
        local: "Remoto",
        distancia: "0,8 km",
        requisitos: ["Marketing", "Comunicação", "SEO"]
    },

    {
        titulo: "Assistente Administrativo",
        empresa: "Empresa Parceira",
        local: "Extremoz - RN",
        distancia: "3,1 km",
        requisitos: ["Office", "Organização", "Atendimento"]
    },

    {
        titulo: "Designer Gráfico",
        empresa: "Studio Criativo",
        local: "Natal - RN",
        distancia: "4,7 km",
        requisitos: ["Photoshop", "Illustrator", "Design"]
    }

];


/* =========================================================
   QUANDO A PÁGINA CARREGAR
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    ativarFiltros();

    ativarPontosRadar();

    ativarBotoesVagas();

    ativarCriarVaga();

    ativarFavoritos();

    ativarPesquisa();

});


/* =========================================================
   FILTROS DO RADAR
   ========================================================= */

function ativarFiltros() {

    const filtros =
        document.querySelectorAll(".filtro");

    filtros.forEach(function (filtro) {

        filtro.addEventListener("click", function () {

            filtro.classList.toggle("ativo");

            const tipo =
                filtro.dataset.filtro;

            const pontos =
                document.querySelectorAll(
                    `.radar-ponto[data-tipo="${tipo}"]`
                );

            pontos.forEach(function (ponto) {

                if (filtro.classList.contains("ativo")) {

                    ponto.style.opacity = "1";
                    ponto.style.pointerEvents = "auto";

                } else {

                    ponto.style.opacity = "0.1";
                    ponto.style.pointerEvents = "none";

                }

            });

        });

    });

}


/* =========================================================
   PONTOS DO RADAR
   ========================================================= */

function ativarPontosRadar() {

    const pontos =
        document.querySelectorAll(".radar-ponto");

    pontos.forEach(function (ponto) {

        if (ponto.classList.contains("ponto-voce")) {
            return;
        }

        ponto.addEventListener("click", function () {

            const tipo =
                ponto.dataset.tipo;

            if (tipo === "vaga") {

                const pontosVagas =
                    document.querySelectorAll(
                        ".ponto-vaga"
                    );

                const indice =
                    Array.from(pontosVagas)
                        .indexOf(ponto);

                if (vagas[indice]) {

                    mostrarVaga(
                        vagas[indice]
                    );

                }

            }

            if (tipo === "profissional") {

                mostrarMensagem(
                    "Profissional selecionado."
                );

            }

            if (tipo === "empresa") {

                mostrarMensagem(
                    "Empresa selecionada."
                );

            }

            if (tipo === "servico") {

                mostrarMensagem(
                    "Serviço selecionado."
                );

            }

        });

    });

}


/* =========================================================
   BOTÕES DOS CARDS DE VAGAS
   ========================================================= */

function ativarBotoesVagas() {

    const botoes =
        document.querySelectorAll(".botao-card");

    botoes.forEach(function (botao, indice) {

        botao.addEventListener("click", function () {

            if (vagas[indice]) {

                mostrarVaga(
                    vagas[indice]
                );

            }

        });

    });

}


/* =========================================================
   MOSTRAR DETALHES DA VAGA
   ========================================================= */

function mostrarVaga(vaga) {

    const modal =
        document.createElement("div");

    modal.className =
        "nextwork-modal";

    modal.innerHTML = `

        <div class="modal-conteudo">

            <button class="modal-fechar">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="modal-icone">
                <i class="fa-solid fa-briefcase"></i>
            </div>

            <span class="modal-empresa">
                ${vaga.empresa}
            </span>

            <h2>
                ${vaga.titulo}
            </h2>

            <p class="modal-local">
                <i class="fa-solid fa-location-dot"></i>
                ${vaga.local}
            </p>

            <p class="modal-distancia">
                <i class="fa-solid fa-route"></i>
                ${vaga.distancia}
            </p>

            <div class="modal-tags">

                ${vaga.requisitos.map(function (item) {

                    return `<span>${item}</span>`;

                }).join("")}

            </div>

            <button class="modal-principal">
                Quero conhecer esta oportunidade
            </button>

        </div>

    `;

    document.body.appendChild(modal);


    /* Fechar pelo X */

    modal.querySelector(
        ".modal-fechar"
    ).addEventListener(
        "click",
        function () {

            modal.remove();

        }
    );


    /* Fechar clicando fora */

    modal.addEventListener(
        "click",
        function (evento) {

            if (
                evento.target === modal
            ) {

                modal.remove();

            }

        }
    );

}


/* =========================================================
   CRIAR NOVA VAGA
   ========================================================= */

function ativarCriarVaga() {

    const botao =
        document.createElement("button");

    botao.className =
        "botao-criar-vaga";

    botao.innerHTML = `
        <i class="fa-solid fa-plus"></i>
        Criar nova vaga
    `;

    botao.addEventListener(
        "click",
        abrirFormularioVaga
    );


    const secao =
        document.querySelector(".resultados");

    if (secao) {

        secao.insertBefore(
            botao,
            secao.firstChild
        );

    }

}


/* =========================================================
   FORMULÁRIO PARA CRIAR VAGA
   ========================================================= */

function abrirFormularioVaga() {

    const modal =
        document.createElement("div");

    modal.className =
        "nextwork-modal";

    modal.innerHTML = `

        <div class="modal-conteudo">

            <button class="modal-fechar">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="modal-icone">
                <i class="fa-solid fa-plus"></i>
            </div>

            <h2>
                Criar nova vaga
            </h2>

            <p class="modal-descricao">
                Preencha as informações da oportunidade.
            </p>

            <form id="formulario-vaga">

                <input
                    type="text"
                    id="titulo-vaga"
                    placeholder="Nome da vaga"
                    required
                >

                <input
                    type="text"
                    id="empresa-vaga"
                    placeholder="Nome da empresa"
                    required
                >

                <input
                    type="text"
                    id="local-vaga"
                    placeholder="Localização"
                    required
                >

                <input
                    type="text"
                    id="requisitos-vaga"
                    placeholder="Requisitos separados por vírgula"
                    required
                >

                <button
                    type="submit"
                    class="modal-principal"
                >
                    Publicar vaga
                </button>

            </form>

        </div>

    `;

    document.body.appendChild(modal);


    /* Fechar modal */

    modal.querySelector(
        ".modal-fechar"
    ).addEventListener(
        "click",
        function () {

            modal.remove();

        }
    );


    /* Enviar formulário */

    document.querySelector(
        "#formulario-vaga"
    ).addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();

            criarVaga();

        }
    );

}


/* =========================================================
   CRIAR A VAGA
   ========================================================= */

function criarVaga() {

    const titulo =
        document.querySelector(
            "#titulo-vaga"
        ).value;

    const empresa =
        document.querySelector(
            "#empresa-vaga"
        ).value;

    const local =
        document.querySelector(
            "#local-vaga"
        ).value;

    const requisitos =
        document.querySelector(
            "#requisitos-vaga"
        ).value;


    const novaVaga = {

        titulo: titulo,

        empresa: empresa,

        local: local,

        distancia: "Nova",

        requisitos:
            requisitos
                .split(",")
                .map(function (item) {

                    return item.trim();

                })

    };


    vagas.push(novaVaga);


    adicionarCardVaga(
        novaVaga
    );


    document.querySelector(
        ".nextwork-modal"
    ).remove();


    mostrarMensagem(
        "Vaga criada com sucesso!"
    );

}


/* =========================================================
   ADICIONAR CARD DA NOVA VAGA
   ========================================================= */

function adicionarCardVaga(vaga) {

    const container =
        document.querySelector(
            ".cards-vagas"
        );

    const card =
        document.createElement("article");

    card.className =
        "card-vaga";


    card.innerHTML = `

        <div class="card-vaga-topo">

            <div class="card-empresa-icone">
                <i class="fa-solid fa-briefcase"></i>
            </div>

            <span>
                ${vaga.empresa}
            </span>

            <button class="favorito">
                <i class="fa-regular fa-bookmark"></i>
            </button>

        </div>

        <h3>
            ${vaga.titulo}
        </h3>

        <div class="card-informacoes">

            <span>
                <i class="fa-solid fa-location-dot"></i>
                ${vaga.local}
            </span>

            <span>
                <i class="fa-solid fa-route"></i>
                ${vaga.distancia}
            </span>

        </div>

        <div class="card-tags">

            ${vaga.requisitos.map(function (item) {

                return `<span>${item}</span>`;

            }).join("")}

        </div>

        <button class="botao-card">

            <i class="fa-solid fa-arrow-right"></i>

        </button>

    `;


    container.appendChild(card);


    /* Faz o botão da nova vaga funcionar */

    const botao =
        card.querySelector(
            ".botao-card"
        );

    botao.addEventListener(
        "click",
        function () {

            mostrarVaga(vaga);

        }
    );


    /* Faz o favorito funcionar */

    const favorito =
        card.querySelector(
            ".favorito"
        );

    favorito.addEventListener(
        "click",
        function () {

            favorito.classList.toggle(
                "favoritado"
            );

            const icone =
                favorito.querySelector("i");

            icone.classList.toggle(
                "fa-regular"
            );

            icone.classList.toggle(
                "fa-solid"
            );

        }
    );

}


/* =========================================================
   FAVORITOS
   ========================================================= */

function ativarFavoritos() {

    const botoes =
        document.querySelectorAll(
            ".favorito"
        );

    botoes.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                botao.classList.toggle(
                    "favoritado"
                );

                const icone =
                    botao.querySelector("i");

                icone.classList.toggle(
                    "fa-regular"
                );

                icone.classList.toggle(
                    "fa-solid"
                );

            }
        );

    });

}


/* =========================================================
   PESQUISA
   ========================================================= */

function ativarPesquisa() {

    const campo =
        document.querySelector(
            ".campo-busca"
        );

    if (!campo) return;


    campo.addEventListener(
        "input",
        function () {

            const texto =
                campo.value.toLowerCase();


            const cards =
                document.querySelectorAll(
                    ".card-vaga"
                );


            cards.forEach(function (card) {

                const conteudo =
                    card.textContent.toLowerCase();


                if (
                    conteudo.includes(texto)
                ) {

                    card.style.display =
                        "block";

                } else {

                    card.style.display =
                        "none";

                }

            });

        }
    );

}


