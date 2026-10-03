/* =====================================================
   NEXT WORK — AUTÔNOMOS
   STORIES + CHAT + FILTROS
===================================================== */


/* =====================================================
   DADOS
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
   VARIÁVEIS
===================================================== */

let indiceCentral = 1;

let filtroAtual = "todos";

let temporizadorHover = null;

let trocaEmAndamento = false;


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    iniciarPagina();

});


function iniciarPagina() {

    renderizarStories();

    atualizarChat();

    ativarFiltros();

    ativarBusca();

    ativarChat();

    ativarIndicadores();

    ativarBotoesPerfil();

    aplicarFiltro();

}


/* =====================================================
   ELEMENTOS
===================================================== */

function obterElemento(seletor) {

    return document.querySelector(seletor);

}


/* =====================================================
   RENDERIZAR STORIES
===================================================== */

function renderizarStories() {

    const lista =
        obterElemento(".stories-lista");

    if (!lista) {

        console.warn(
            "NEXT WORK: .stories-lista não foi encontrada."
        );

        return;
    }


    const quantidade =
        profissionais.length;


    const indiceEsquerda =
        (indiceCentral - 1 + quantidade) % quantidade;


    const indiceDireita =
        (indiceCentral + 1) % quantidade;


    const stories = [

        {
            profissional: profissionais[indiceEsquerda],
            classe: "story-esquerda"
        },

        {
            profissional: profissionais[indiceCentral],
            classe: "story-centro"
        },

        {
            profissional: profissionais[indiceDireita],
            classe: "story-direita"
        }

    ];


    lista.innerHTML = "";


    stories.forEach(function (item) {

        const profissional =
            item.profissional;


        const story =
            document.createElement("button");


        story.type = "button";

        story.className =
            "story-profissional " + item.classe;


        story.dataset.profissional =
            profissional.id;


        story.setAttribute(
            "aria-label",
            "Mostrar " + profissional.nome
        );


        story.innerHTML = `

            <span class="story-imagem">

                <img
                    src="${profissional.storyImagem}"
                    alt="${profissional.nome} trabalhando"
                >

            </span>

            <span class="story-nome">
                ${primeiroNome(profissional.nome)}
            </span>

        `;


        lista.appendChild(story);

    });


    atualizarIndicadores();

}


/* =====================================================
   PRIMEIRO NOME
===================================================== */

function primeiroNome(nome) {

    return nome.split(" ")[0];

}


/* =====================================================
   EVENTO DOS STORIES
   USANDO DELEGAÇÃO DE EVENTOS
===================================================== */

document.addEventListener("mouseover", function (evento) {

    const story =
        evento.target.closest(".story-profissional");


    if (!story) return;


    /*
     * Se o mouse apenas passou de um
     * elemento interno para outro elemento
     * do mesmo Story, não reinicia o contador.
     */

    const relacionado =
        evento.relatedTarget;


    if (
        relacionado &&
        story.contains(relacionado)
    ) {

        return;

    }


    limparTemporizador();


    const id =
        story.dataset.profissional;


    const indice =
        profissionais.findIndex(
            function (profissional) {

                return profissional.id === id;

            }
        );


    if (indice === -1) return;


    /*
     * Se já está no centro, não faz nada.
     */

    if (indice === indiceCentral) return;


    /*
     * Primeiro deixa o CSS mostrar o crescimento
     * pelo hover.
     *
     * Depois troca para o centro.
     */

    temporizadorHover =
        setTimeout(function () {

            trocarStory(indice);

        }, 550);

});


/* =====================================================
   SAÍDA DO MOUSE
===================================================== */

document.addEventListener("mouseout", function (evento) {

    const story =
        evento.target.closest(".story-profissional");


    if (!story) return;


    const relacionado =
        evento.relatedTarget;


    if (
        relacionado &&
        story.contains(relacionado)
    ) {

        return;

    }


    limparTemporizador();

});


/* =====================================================
   LIMPAR TEMPORIZADOR
===================================================== */

function limparTemporizador() {

    if (temporizadorHover !== null) {

        clearTimeout(temporizadorHover);

        temporizadorHover = null;

    }

}


/* =====================================================
   TROCAR STORY
===================================================== */

function trocarStory(novoIndice) {

    if (trocaEmAndamento) return;

    if (novoIndice === indiceCentral) return;


    if (
        novoIndice < 0 ||
        novoIndice >= profissionais.length
    ) {

        return;

    }


    trocaEmAndamento = true;


    const stories =
        document.querySelectorAll(
            ".story-profissional"
        );


    /*
     * Adiciona a animação de troca.
     */

    stories.forEach(function (story) {

        story.classList.add("trocando");

    });


    /*
     * Espera um pequeno momento para
     * a animação começar.
     */

    setTimeout(function () {

        indiceCentral =
            novoIndice;


        renderizarStories();

        atualizarChat();


        /*
         * Libera uma nova troca.
         */

        setTimeout(function () {

            trocaEmAndamento = false;

        }, 100);

    }, 180);

}


/* =====================================================
   INDICADORES
===================================================== */

function ativarIndicadores() {

    document.addEventListener(
        "click",
        function (evento) {

            const indicador =
                evento.target.closest(".indicador");


            if (!indicador) return;


            const indice =
                Number(indicador.dataset.indice);


            if (
                Number.isNaN(indice) ||
                indice < 0 ||
                indice >= profissionais.length
            ) {

                return;

            }


            limparTemporizador();

            trocarStory(indice);

        }
    );

}


/* =====================================================
   ATUALIZAR INDICADORES
===================================================== */

function atualizarIndicadores() {

    const indicadores =
        document.querySelectorAll(".indicador");


    indicadores.forEach(function (indicador) {

        const indice =
            Number(indicador.dataset.indice);


        indicador.classList.toggle(
            "ativo",
            indice === indiceCentral
        );

    });

}


/* =====================================================
   ATUALIZAR CHAT
===================================================== */

function atualizarChat() {

    const profissional =
        profissionais[indiceCentral];


    if (!profissional) return;


    const foto =
        document.getElementById("fotoChat");


    const nome =
        document.getElementById("nomeChat");


    const profissao =
        document.getElementById("profissaoChat");


    const mensagens =
        document.getElementById("mensagensChat");


    if (foto) {

        foto.src =
            profissional.fotoPerfil;

        foto.alt =
            "Foto de " + profissional.nome;

    }


    if (nome) {

        nome.textContent =
            profissional.nome;

    }


    if (profissao) {

        profissao.textContent =
            profissional.profissao;

    }


    if (mensagens) {

        mensagens.innerHTML = `

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

}


/* =====================================================
   FILTROS
===================================================== */

function ativarFiltros() {

    const filtros =
        document.querySelectorAll(".filtro");


    filtros.forEach(function (filtro) {

        filtro.addEventListener(
            "click",
            function () {

                filtros.forEach(function (item) {

                    item.classList.remove("ativo");

                });


                filtro.classList.add("ativo");


                filtroAtual =
                    filtro.dataset.filtro ||
                    "todos";


                aplicarFiltro();

            }
        );

    });

}


/* =====================================================
   BUSCA
===================================================== */

function ativarBusca() {

    const campo =
        document.getElementById(
            "buscaAutonomos"
        );


    if (!campo) return;


    campo.addEventListener(
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

    const campo =
        document.getElementById(
            "buscaAutonomos"
        );


    const termo =
        campo
            ? campo.value.trim().toLowerCase()
            : "";


    const cards =
        document.querySelectorAll(
            ".card-profissional"
        );


    cards.forEach(function (card) {

        const id =
            card.dataset.profissional;


        const profissional =
            profissionais.find(
                function (item) {

                    return item.id === id;

                }
            );


        if (!profissional) return;


        const pertenceAoFiltro =
            filtroAtual === "todos" ||
            profissional.filtro === filtroAtual;


        const texto =
            (
                profissional.nome +
                " " +
                profissional.profissao +
                " " +
                profissional.categoria +
                " " +
                profissional.localizacao
            ).toLowerCase();


        const pertenceABusca =
            texto.includes(termo);


        card.style.display =
            pertenceAoFiltro &&
            pertenceABusca
                ? ""
                : "none";

    });

}


/* =====================================================
   CHAT
===================================================== */

function ativarChat() {

    const formulario =
        document.getElementById(
            "formChat"
        );


    const campo =
        document.getElementById(
            "mensagemChat"
        );


    if (formulario && campo) {

        formulario.addEventListener(
            "submit",
            function (evento) {

                evento.preventDefault();


                const texto =
                    campo.value.trim();


                if (!texto) return;


                enviarMensagem(texto);


                campo.value = "";

            }
        );

    }


    /*
     * Botões de sugestão.
     */

    document.addEventListener(
        "click",
        function (evento) {

            const botao =
                evento.target.closest(
                    ".sugestoes-chat button"
                );


            if (!botao) return;


            const texto =
                botao.textContent.trim();


            if (!texto) return;


            enviarMensagem(texto);

        }
    );

}


/* =====================================================
   ENVIAR MENSAGEM
===================================================== */

function enviarMensagem(texto) {

    const mensagens =
        document.getElementById(
            "mensagensChat"
        );


    if (!mensagens) return;


    const mensagem =
        document.createElement("div");


    mensagem.className =
        "mensagem-usuario";


    mensagem.style.display =
        "flex";


    mensagem.style.justifyContent =
        "flex-end";


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


    mensagens.appendChild(mensagem);


    mensagens.scrollTop =
        mensagens.scrollHeight;

}


/* =====================================================
   ESCAPAR HTML
===================================================== */

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");


    elemento.textContent =
        texto;


    return elemento.innerHTML;

}


/* =====================================================
   BOTÕES "VER PERFIL"
===================================================== */

document.addEventListener(
    "click",
    function (evento) {

        const botao =
            evento.target.closest(
                ".botao-perfil"
            );


        if (!botao) return;


        const id =
            botao.dataset.profissional;


        const indice =
            profissionais.findIndex(
                function (profissional) {

                    return profissional.id === id;

                }
            );


        if (indice === -1) return;


        limparTemporizador();


        trocarStory(indice);


        const storiesArea =
            document.querySelector(
                ".stories-area"
            );


        if (storiesArea) {

            setTimeout(function () {

                storiesArea.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 250);

        }

    }
);