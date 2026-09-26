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

document.addEventListener("DOMContentLoaded", function () {
    ativarFiltros();
    ativarPontosRadar();
    ativarBotoesVagas();
    ativarFavoritos();
    ativarCriarVaga();
    ativarPesquisa();
});

function ativarFiltros() {
    const filtros = document.querySelectorAll(".filtro");

    filtros.forEach(function (filtro) {
        filtro.addEventListener("click", function () {
            filtro.classList.toggle("ativo");

            const tipo = filtro.dataset.filtro;
            const pontos = document.querySelectorAll(
                `.radar-ponto[data-tipo="${tipo}"]`
            );

            pontos.forEach(function (ponto) {
                if (filtro.classList.contains("ativo")) {
                    ponto.style.opacity = "1";
                    ponto.style.pointerEvents = "auto";
                } else {
                    ponto.style.opacity = "0.15";
                    ponto.style.pointerEvents = "none";
                }
            });
        });
    });
}

function ativarPontosRadar() {
    const pontos = document.querySelectorAll(".radar-ponto");

    pontos.forEach(function (ponto) {
        if (ponto.classList.contains("ponto-voce")) {
            return;
        }

        ponto.addEventListener("click", function () {
            const tipo = ponto.dataset.tipo;

            if (tipo === "vaga") {
                const pontosVagas = document.querySelectorAll(".ponto-vaga");
                const indice = Array.from(pontosVagas).indexOf(ponto);

                if (vagas[indice]) {
                    mostrarVaga(vagas[indice]);
                }
            }

            if (tipo === "empresa") {
                mostrarMensagem("Empresa selecionada.");
            }

            if (tipo === "profissional") {
                mostrarMensagem("Profissional selecionado.");
            }

            if (tipo === "servico") {
                mostrarMensagem("Serviço selecionado.");
            }
        });
    });
}

function ativarBotoesVagas() {
    const botoes = document.querySelectorAll(".botao-card");

    botoes.forEach(function (botao, indice) {
        botao.addEventListener("click", function () {
            if (vagas[indice]) {
                mostrarVaga(vagas[indice]);
            }
        });
    });
}

function mostrarVaga(vaga) {
    const modal = document.createElement("div");

    modal.className = "nextwork-modal";

    modal.innerHTML = `
        <div class="modal-conteudo">
            <button class="modal-fechar">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="modal-icone">
                <i class="fa-solid fa-briefcase"></i>
            </div>

            <span class="modal-empresa">${vaga.empresa}</span>

            <h2>${vaga.titulo}</h2>

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

    modal.querySelector(".modal-fechar").addEventListener("click", function () {
        modal.remove();
    });

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            modal.remove();
        }
    });
}

function ativarFavoritos() {
    const botoes = document.querySelectorAll(".favorito");

    botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {
            botao.classList.toggle("favoritado");

            const icone = botao.querySelector("i");

            if (icone) {
                icone.classList.toggle("fa-regular");
                icone.classList.toggle("fa-solid");
            }
        });
    });
}

function ativarCriarVaga() {
    const botao = document.querySelector(".botao-criar-vaga");

    if (!botao) {
        return;
    }

    botao.addEventListener("click", function () {
        abrirFormularioVaga();
    });
}

function abrirFormularioVaga() {
    const modal = document.createElement("div");

    modal.className = "nextwork-modal";

    modal.innerHTML = `
        <div class="modal-conteudo">
            <button class="modal-fechar">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="modal-icone">
                <i class="fa-solid fa-plus"></i>
            </div>

            <h2>Criar nova vaga</h2>

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
                    placeholder="HTML, CSS, JavaScript"
                    required
                >

                <button type="submit" class="modal-principal">
                    Publicar vaga
                </button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".modal-fechar").addEventListener("click", function () {
        modal.remove();
    });

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            modal.remove();
        }
    });

    document.querySelector("#formulario-vaga").addEventListener("submit", function (evento) {
        evento.preventDefault();
        criarVaga(modal);
    });
}

function criarVaga(modal) {
    const titulo = document.querySelector("#titulo-vaga").value;
    const empresa = document.querySelector("#empresa-vaga").value;
    const local = document.querySelector("#local-vaga").value;
    const requisitosTexto = document.querySelector("#requisitos-vaga").value;

    const novaVaga = {
        titulo: titulo,
        empresa: empresa,
        local: local,
        distancia: "Nova",
        requisitos: requisitosTexto.split(",").map(function (item) {
            return item.trim();
        })
    };

    vagas.push(novaVaga);

    adicionarCardVaga(novaVaga);

    modal.remove();

    mostrarMensagem("Vaga publicada com sucesso!");
}

function adicionarCardVaga(vaga) {
    const container = document.querySelector(".cards-vagas");

    if (!container) {
        return;
    }

    const card = document.createElement("article");

    card.className = "card-vaga";

    card.innerHTML = `
        <div class="card-vaga-topo">
            <div class="card-empresa-icone">
                <i class="fa-solid fa-briefcase"></i>
            </div>

            <span>${vaga.empresa}</span>

            <button class="favorito">
                <i class="fa-regular fa-bookmark"></i>
            </button>
        </div>

        <h3>${vaga.titulo}</h3>

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

    card.querySelector(".botao-card").addEventListener("click", function () {
        mostrarVaga(vaga);
    });

    card.querySelector(".favorito").addEventListener("click", function () {
        const favorito = this;
        const icone = favorito.querySelector("i");

        favorito.classList.toggle("favoritado");
        icone.classList.toggle("fa-regular");
        icone.classList.toggle("fa-solid");
    });
}

function ativarPesquisa() {
    const campo = document.querySelector(".campo-busca");

    if (!campo) {
        return;
    }

    campo.addEventListener("input", function () {
        const texto = campo.value.toLowerCase();

        const cards = document.querySelectorAll(".card-vaga");

        cards.forEach(function (card) {
            const conteudo = card.textContent.toLowerCase();

            if (conteudo.includes(texto)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}

function mostrarMensagem(texto) {
    const mensagem = document.createElement("div");

    mensagem.className = "nextwork-mensagem";
    mensagem.textContent = texto;

    document.body.appendChild(mensagem);

    setTimeout(function () {
        mensagem.classList.add("visivel");
    }, 50);

    setTimeout(function () {
        mensagem.remove();
    }, 2500);
}