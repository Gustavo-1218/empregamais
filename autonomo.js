/* =====================================================
   NEXT WORK — AUTÔNOMOS
===================================================== */


/* =====================================================
   DADOS DOS PROFISSIONAIS
===================================================== */

const profissionais = [

    {
        id: "joao",

        nome: "João Silva",

        profissao: "Encanador profissional",

        categoria: "ENCANAMENTO",

        filtro: "encanamento",

        localizacao: "Extremoz, RN",

        avaliacao: "4.9",

        iniciais: "JS",

        fotoPerfil: "João Silva.png",

        storyImagem: "joaotrabalhando.png",

        mensagem: "Olá! Como posso ajudar você?"
    },

    {
        id: "maria",

        nome: "Maria Santos",

        profissao: "Profissional de limpeza",

        categoria: "LIMPEZA",

        filtro: "limpeza",

        localizacao: "Natal, RN",

        avaliacao: "5.0",

        iniciais: "MS",

        fotoPerfil: "Maria Santos.png",

        storyImagem: "mariatraabalhando.png",

        mensagem: "Olá! Posso ajudar com o serviço que você precisa."
    },

    {
        id: "carlos",

        nome: "Carlos Oliveira",

        profissao: "Eletricista residencial",

        categoria: "ELÉTRICA",

        filtro: "eletrica",

        localizacao: "Parnamirim, RN",

        avaliacao: "4.8",

        iniciais: "CO",

        fotoPerfil: "Carlos Oliveira.png",

        storyImagem: "carlostrabalhando.png",

        mensagem: "Olá! Me conte um pouco sobre o serviço."
    },

    {
        id: "rafael",

        nome: "Rafael Costa",

        profissao: "Profissional de manutenção",

        categoria: "MANUTENÇÃO",

        filtro: "manutencao",

        localizacao: "Natal, RN",

        avaliacao: "4.9",

        iniciais: "RC",

        fotoPerfil: "Rafael Costa.png",

        storyImagem: "rafaeltrabalhando.png",

        mensagem: "Olá! Estou disponível para ajudar."
    },

    {
        id: "ana",

        nome: "Ana Beatriz",

        profissao: "Profissional de pintura",

        categoria: "PINTURA",

        filtro: "pintura",

        localizacao: "Extremoz, RN",

        avaliacao: "4.9",

        iniciais: "AB",

        fotoPerfil: "Ana Beatriz.png",

        storyImagem: "anatrabalhando.png",

        mensagem: "Olá! Podemos conversar sobre o serviço."
    }

];


/* =====================================================
   ESTADO
===================================================== */

let indiceCentral = 1;

let filtroAtual = "todos";

let temporizadorStory = null;

let trocaEmAndamento = false;


/* =====================================================
   ELEMENTOS
===================================================== */

const listaStories =
    document.querySelector(".stories-lista");

const indicadores =
    document.querySelectorAll(".indicador");

const fotoChat =
    document.getElementById("fotoChat");

const nomeChat =
    document.getElementById("nomeChat");

const profissaoChat =
    document.getElementById("profissaoChat");

const mensagensChat =
    document.getElementById("mensagensChat");

const buscaAutonomos =
    document.getElementById("buscaAutonomos");


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    renderizarStories();

    atualizarChat();

    ativarFiltros();

    ativarBusca();

    ativarChat();

    ativarBotoesPerfil();

});


/* =====================================================
   PROFISSIONAIS FILTRADOS
===================================================== */

function obterProfissionaisVisiveis() {

    if (filtroAtual === "todos") {

        return profissionais;

    }

    return profissionais.filter(function (profissional) {

        return profissional.filtro === filtroAtual;

    });

}


/* =====================================================
   ÍNDICES DOS STORIES
===================================================== */

function obterIndicesStories() {

    const quantidade = profissionais.length;

    const esquerda =
        (indiceCentral - 1 + quantidade) % quantidade;

    const direita =
        (indiceCentral + 1) % quantidade;

    return {
        esquerda: esquerda,
        centro: indiceCentral,
        direita: direita
    };

}


/* =====================================================
   RENDERIZAR STORIES
===================================================== */

function renderizarStories() {

    if (!listaStories) return;


    const indices =
        obterIndicesStories();


    const profissionaisStories = [

        {
            indice: indices.esquerda,
            classe: "story-esquerda"
        },

        {
            indice: indices.centro,
            classe: "story-centro"
        },

        {
            indice: indices.direita,
            classe: "story-direita"
        }

    ];


    listaStories.innerHTML = "";


    profissionaisStories.forEach(function (item) {

        const profissional =
            profissionais[item.indice];


        const botao =
            document.createElement("button");


        botao.type = "button";

        botao.className =
            "story-profissional " + item.classe;


        botao.dataset.profissional =
            profissional.id;


        botao.setAttribute(
            "aria-label",
            "Mostrar " + profissional.nome
        );


        botao.innerHTML = `

            <span class="story-imagem">

                <img
                    src="${profissional.storyImagem}"
                    alt="${profissional.nome} trabalhando"
                >

            </span>

            <span class="story-nome">
                ${profissional.nome.split(" ")[0]}
            </span>

        `;


        listaStories.appendChild(botao);

    });


    atualizarIndicadores();

    ativarHoverStories();

}


/* =====================================================
   HOVER DOS STORIES
===================================================== */

function ativarHoverStories() {

    const stories =
        document.querySelectorAll(".story-profissional");


    stories.forEach(function (story) {


        story.addEventListener(
            "mouseenter",
            function () {

                clearTimeout(temporizadorStory);


                const id =
                    story.dataset.profissional;


                const novoIndice =
                    profissionais.findIndex(
                        function (profissional) {

                            return profissional.id === id;

                        }
                    );


                if (novoIndice === -1) return;


                if (novoIndice === indiceCentral) {

                    return;

                }


                /*
                 * O Story cresce primeiro.
                 *
                 * Só depois de 550ms
                 * ele vai para o centro.
                 */

                temporizadorStory =
                    setTimeout(
                        function () {

                            trocarStory(novoIndice);

                        },
                        550
                    );

            }
        );


        story.addEventListener(
            "mouseleave",
            function () {

                clearTimeout(temporizadorStory);

            }
        );

    });

}


/* =====================================================
   TROCAR STORY
===================================================== */

function trocarStory(novoIndice) {

    if (trocaEmAndamento) return;

    if (novoIndice === indiceCentral) return;


    trocaEmAndamento = true;


    const storiesAtuais =
        document.querySelectorAll(".story-profissional");


    storiesAtuais.forEach(function (story) {

        story.classList.add("trocando");

    });


    /*
     * Pequeno tempo para a animação
     * começar antes da mudança.
     */

    setTimeout(
        function () {

            indiceCentral = novoIndice;


            renderizarStories();

            atualizarChat();


            setTimeout(
                function () {

                    trocaEmAndamento = false;

                },
                120
            );

        },
        180
    );

}


/* =====================================================
   INDICADORES
===================================================== */

function atualizarIndicadores() {

    indicadores.forEach(function (indicador, indice) {

        indicador.classList.toggle(
            "ativo",
            indice === indiceCentral
        );

    });

}


/* =====================================================
   CLIQUE NOS INDICADORES
===================================================== */

indicadores.forEach(function (indicador) {

    indicador.addEventListener(
        "click",
        function () {

            const novoIndice =
                Number(indicador.dataset.indice);


            if (
                Number.isNaN(novoIndice) ||
                novoIndice < 0 ||
                novoIndice >= profissionais.length
            ) {

                return;

            }


            trocarStory(novoIndice);

        }
    );

});


/* =====================================================
   ATUALIZAR CHAT
===================================================== */

function atualizarChat() {

    const profissional =
        profissionais[indiceCentral];


    if (!profissional) return;


    if (fotoChat) {

        fotoChat.src =
            profissional.fotoPerfil;

        fotoChat.alt =
            "Foto de " + profissional.nome;

    }


    if (nomeChat) {

        nomeChat.textContent =
            profissional.nome;

    }


    if (profissaoChat) {

        profissaoChat.textContent =
            profissional.profissao;

    }


    atualizarMensagemInicial(profissional);

}


/* =====================================================
   MENSAGEM INICIAL DO CHAT
===================================================== */

function atualizarMensagemInicial(profissional) {

    if (!mensagensChat) return;


    mensagensChat.innerHTML = `

        <div class="mensagem-profissional">

            <div class="avatar-mensagem">
                ${profissional.iniciais}
            </div>

            <div class="balao-mensagem">

                <p>
                    ${profissional.mensagem}
                </p>

                <span>
                    agora
                </span>

            </div>

        </div>

        <div class="mensagem-sistema">

            <span>
                Converse diretamente com este profissional.
            </span>

        </div>

    `;

}


/* =====================================================
   FILTROS
===================================================== */

function ativarFiltros() {

    const botoes =
        document.querySelectorAll(".filtro");


    botoes.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                botoes.forEach(function (item) {

                    item.classList.remove("ativo");

                });


                botao.classList.add("ativo");


                filtroAtual =
                    botao.dataset.filtro;


                aplicarFiltro();

            }
        );

    });

}


/* =====================================================
   BUSCA
===================================================== */

function ativarBusca() {

    if (!buscaAutonomos) return;


    buscaAutonomos.addEventListener(
        "input",
        function () {

            aplicarFiltro();

        }
    );

}


/* =====================================================
   APLICAR FILTRO
===================================================== */

function aplicarFiltro() {

    const termo =
        buscaAutonomos
            ? buscaAutonomos.value
                .trim()
                .toLowerCase()
            : "";


    const cards =
        document.querySelectorAll(
            ".card-profissional"
        );


    cards.forEach(function (card) {

        const profissional =
            card.dataset.profissional;


        const dados =
            profissionais.find(
                function (item) {

                    return item.id === profissional;

                }
            );


        if (!dados) return;


        const correspondeFiltro =
            filtroAtual === "todos" ||
            dados.filtro === filtroAtual;


        const textoBusca =
            (
                dados.nome +
                " " +
                dados.profissao +
                " " +
                dados.categoria +
                " " +
                dados.localizacao
            ).toLowerCase();


        const correspondeBusca =
            textoBusca.includes(termo);


        if (
            correspondeFiltro &&
            correspondeBusca
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* =====================================================
   CHAT
===================================================== */

function ativarChat() {

    const form =
        document.getElementById("formChat");


    const campo =
        document.getElementById("mensagemChat");


    if (!form || !campo) return;


    form.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const texto =
                campo.value.trim();


            if (!texto) return;


            adicionarMensagemUsuario(texto);


            campo.value = "";

        }
    );


    const sugestoes =
        document.querySelectorAll(
            ".sugestoes-chat button"
        );


    sugestoes.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const texto =
                    botao.textContent.trim();


                if (!texto) return;


                adicionarMensagemUsuario(texto);

            }
        );

    });

}


/* =====================================================
   ADICIONAR MENSAGEM DO USUÁRIO
===================================================== */

function adicionarMensagemUsuario(texto) {

    if (!mensagensChat) return;


    const mensagem =
        document.createElement("div");


    mensagem.style.display = "flex";

    mensagem.style.justifyContent = "flex-end";


    mensagem.innerHTML = `

        <div
            style="
                max-width:78%;
                padding:10px 12px;
                border-radius:13px 13px 3px 13px;
                background:var(--nw-azul);
                color:#fff;
                font-size:10px;
                line-height:1.5;
            "
        >

            ${escaparHTML(texto)}

        </div>

    `;


    mensagensChat.appendChild(mensagem);


    mensagensChat.scrollTop =
        mensagensChat.scrollHeight;

}


/* =====================================================
   ESCAPAR HTML
===================================================== */

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");


    elemento.textContent = texto;


    return elemento.innerHTML;

}


/* =====================================================
   BOTÕES "VER PERFIL"
===================================================== */

function ativarBotoesPerfil() {

    const botoes =
        document.querySelectorAll(
            ".botao-perfil"
        );


    botoes.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const id =
                    botao.dataset.profissional;


                const indice =
                    profissionais.findIndex(
                        function (profissional) {

                            return profissional.id === id;

                        }
                    );


                if (indice === -1) return;


                trocarStory(indice);


                const stories =
                    document.querySelector(".stories-area");


                if (stories) {

                    stories.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            }
        );

    });

}