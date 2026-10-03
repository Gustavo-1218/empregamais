/* =========================================================
   NEXT WORK — AUTÔNOMOS
   JavaScript adaptado ao autonomo.html atual
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("AUTONOMO.JS: página iniciada");

    /* =====================================================
       DADOS DOS PROFISSIONAIS
    ===================================================== */

    const profissionais = [

        {
            id: "joao",
            nome: "João Silva",
            profissao: "Encanador profissional",
            categoria: "encanamento",
            categoriaNome: "ENCANAMENTO",
            localizacao: "Extremoz, RN",
            imagemStory: "joaotrabalhando.png",
            imagemPerfil: "João Silva.png",
            mensagem: "Olá! Sou o João. Posso ajudar com serviços de encanamento.",
            avaliacao: "4.9"
        },

        {
            id: "maria",
            nome: "Maria Santos",
            profissao: "Profissional de limpeza",
            categoria: "limpeza",
            categoriaNome: "LIMPEZA",
            localizacao: "Natal, RN",
            imagemStory: "mariatraabalhando.png",
            imagemPerfil: "Maria Santos.png",
            mensagem: "Olá! Sou a Maria. Posso ajudar com serviços de limpeza.",
            avaliacao: "5.0"
        },

        {
            id: "carlos",
            nome: "Carlos Oliveira",
            profissao: "Eletricista residencial",
            categoria: "eletrica",
            categoriaNome: "ELÉTRICA",
            localizacao: "Parnamirim, RN",
            imagemStory: "carlostrabalhando.png",
            imagemPerfil: "Carlos Oliveira.png",
            mensagem: "Olá! Sou o Carlos. Posso ajudar com instalações e serviços elétricos.",
            avaliacao: "4.8"
        },

        {
            id: "rafael",
            nome: "Rafael Costa",
            profissao: "Técnico em manutenção",
            categoria: "manutencao",
            categoriaNome: "MANUTENÇÃO",
            localizacao: "Natal, RN",
            imagemStory: "rafaeltrabalhando.png",
            imagemPerfil: "Rafael Costa.png",
            mensagem: "Olá! Sou o Rafael. Posso ajudar com serviços de manutenção.",
            avaliacao: "4.9"
        },

        {
            id: "ana",
            nome: "Ana Beatriz",
            profissao: "Profissional de pintura",
            categoria: "pintura",
            categoriaNome: "PINTURA",
            localizacao: "Natal, RN",
            imagemStory: "anatrabalhando.png",
            imagemPerfil: "Ana Beatriz.png",
            mensagem: "Olá! Sou a Ana. Posso ajudar com serviços de pintura.",
            avaliacao: "4.9"
        }

    ];


    /* =====================================================
       ESTADO DA PÁGINA
    ===================================================== */

    let indiceCentral = 1;

    let filtroAtual = "todos";

    let buscaAtual = "";

    let temporizadorHover = null;

    let trocaEmAndamento = false;


    /* =====================================================
       ELEMENTOS DO HTML
    ===================================================== */

    const storiesLista = document.getElementById("storiesLista");

    const chatArea = document.getElementById("chatArea");

    const fotoChat = document.getElementById("fotoChat");

    const nomeChat = document.getElementById("nomeChat");

    const profissaoChat = document.getElementById("profissaoChat");

    const statusTextoChat = document.getElementById("statusTextoChat");

    const avatarMensagem = document.getElementById("avatarMensagem");

    const mensagemInicial = document.getElementById("mensagemInicial");

    const mensagensChat = document.getElementById("mensagensChat");

    const formChat = document.getElementById("formChat");

    const mensagemChat = document.getElementById("mensagemChat");

    const fecharChat = document.getElementById("fecharChat");

    const buscaInput = document.getElementById("buscaAutonomos");

    const cardsProfissionais = document.getElementById("cardsProfissionais");

    const filtros = document.querySelectorAll(".filtro");


    /* =====================================================
       VERIFICAÇÃO
    ===================================================== */

    console.log("Stories:", storiesLista);
    console.log("Chat:", chatArea);
    console.log("Cards:", cardsProfissionais);


    if (!storiesLista) {
        console.error("ERRO: #storiesLista não foi encontrado.");
        return;
    }


    /* =====================================================
       PEGAR PROFISSIONAIS VISÍVEIS
    ===================================================== */

    function profissionaisFiltrados() {

        let resultado = profissionais.filter(function (profissional) {

            const correspondeFiltro =
                filtroAtual === "todos" ||
                profissional.categoria === filtroAtual;

            const textoBusca =
                buscaAtual.trim().toLowerCase();

            const correspondeBusca =
                textoBusca === "" ||
                profissional.nome.toLowerCase().includes(textoBusca) ||
                profissional.profissao.toLowerCase().includes(textoBusca) ||
                profissional.categoriaNome.toLowerCase().includes(textoBusca);

            return correspondeFiltro && correspondeBusca;

        });


        /*
            Se o filtro não encontrar ninguém,
            usamos todos os profissionais para que
            o Stories não fique completamente vazio.
        */

        if (resultado.length === 0) {
            return [];
        }

        return resultado;
    }


    /* =====================================================
       NORMALIZAR ÍNDICE
    ===================================================== */

    function normalizarIndice(indice, quantidade) {

        if (quantidade <= 0) {
            return 0;
        }

        return ((indice % quantidade) + quantidade) % quantidade;
    }


    /* =====================================================
       RENDERIZAR STORIES
    ===================================================== */

    function renderizarStories() {

        const lista = profissionaisFiltrados();

        storiesLista.innerHTML = "";


        if (lista.length === 0) {

            storiesLista.innerHTML = `
                <div class="stories-vazio">
                    Nenhum profissional encontrado.
                </div>
            `;

            atualizarChat(null);

            return;
        }


        indiceCentral = normalizarIndice(
            indiceCentral,
            lista.length
        );


        /*
            Com apenas 1 profissional,
            mostramos somente o centro.
        */

        if (lista.length === 1) {

            criarStory(
                lista[0],
                "centro",
                true
            );

            atualizarChat(lista[0]);

            ativarEventosStories();

            return;
        }


        /*
            Profissional da esquerda
        */

        const indiceEsquerda =
            normalizarIndice(
                indiceCentral - 1,
                lista.length
            );


        /*
            Profissional do centro
        */

        const indiceCentro =
            normalizarIndice(
                indiceCentral,
                lista.length
            );


        /*
            Profissional da direita
        */

        const indiceDireita =
            normalizarIndice(
                indiceCentral + 1,
                lista.length
            );


        criarStory(
            lista[indiceEsquerda],
            "esquerda",
            false
        );


        criarStory(
            lista[indiceCentro],
            "centro",
            true
        );


        criarStory(
            lista[indiceDireita],
            "direita",
            false
        );


        atualizarChat(
            lista[indiceCentro]
        );


        ativarEventosStories();
    }


    /* =====================================================
       CRIAR STORY
    ===================================================== */

    function criarStory(
        profissional,
        posicao,
        ativo
    ) {

        const botao =
            document.createElement("button");

        botao.type = "button";

        botao.className =
            "story-profissional story-" + posicao;

        if (ativo) {
            botao.classList.add("ativo");
        }


        botao.dataset.posicao = posicao;

        botao.dataset.profissional =
            profissional.id;


        botao.innerHTML = `

            <span class="story-imagem">

                <img
                    src="${profissional.imagemStory}"
                    alt="${profissional.nome} trabalhando"
                >

            </span>

            <span class="story-nome">
                ${profissional.nome}
            </span>

        `;


        storiesLista.appendChild(botao);
    }


    /* =====================================================
       ATIVAR EVENTOS DOS STORIES
    ===================================================== */

    function ativarEventosStories() {

        const stories =
            storiesLista.querySelectorAll(
                ".story-profissional"
            );


        stories.forEach(function (story) {


            /* ---------------------------------------------
               CLIQUE
            --------------------------------------------- */

            story.addEventListener(
                "click",
                function () {

                    const profissionalId =
                        story.dataset.profissional;

                    centralizarProfissional(
                        profissionalId
                    );

                }
            );


            /* ---------------------------------------------
               ENTRADA DO MOUSE
            --------------------------------------------- */

            story.addEventListener(
                "mouseenter",
                function () {

                    limparTemporizador();

                    /*
                        O centro não precisa se mover
                        para o centro novamente.
                    */

                    if (
                        story.classList.contains("story-centro")
                    ) {
                        return;
                    }


                    /*
                        Pequena espera para evitar
                        troca acidental.
                    */

                    story.classList.add(
                        "hover-preparando"
                    );


                    temporizadorHover =
                        setTimeout(function () {

                            const profissionalId =
                                story.dataset.profissional;

                            centralizarProfissional(
                                profissionalId
                            );

                        }, 550);

                }
            );


            /* ---------------------------------------------
               SAÍDA DO MOUSE
            --------------------------------------------- */

            story.addEventListener(
                "mouseleave",
                function () {

                    limparTemporizador();

                    story.classList.remove(
                        "hover-preparando"
                    );

                }
            );

        });
    }


    /* =====================================================
       LIMPAR TEMPORIZADOR
    ===================================================== */

    function limparTemporizador() {

        if (temporizadorHover !== null) {

            clearTimeout(
                temporizadorHover
            );

            temporizadorHover = null;
        }

    }


    /* =====================================================
       CENTRALIZAR PROFISSIONAL
    ===================================================== */

    function centralizarProfissional(
        profissionalId
    ) {

        if (trocaEmAndamento) {
            return;
        }


        const lista =
            profissionaisFiltrados();


        const novoIndice =
            lista.findIndex(function (profissional) {

                return profissional.id === profissionalId;

            });


        if (novoIndice === -1) {
            return;
        }


        if (novoIndice === indiceCentral) {
            return;
        }


        trocaEmAndamento = true;


        storiesLista.classList.add(
            "trocando"
        );


        setTimeout(function () {

            indiceCentral =
                novoIndice;


            renderizarStories();


            storiesLista.classList.remove(
                "trocando"
            );


            setTimeout(function () {

                trocaEmAndamento = false;

            }, 80);


        }, 180);

    }


    /* =====================================================
       ATUALIZAR CHAT
    ===================================================== */

    function atualizarChat(
        profissional
    ) {

        if (!profissional) {

            if (nomeChat) {
                nomeChat.textContent =
                    "Nenhum profissional";
            }

            if (profissaoChat) {
                profissaoChat.textContent =
                    "Nenhum resultado encontrado";
            }

            return;
        }


        if (chatArea) {
            chatArea.classList.remove(
                "chat-fechado"
            );
        }


        if (fotoChat) {

            fotoChat.src =
                profissional.imagemPerfil;

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


        if (statusTextoChat) {

            statusTextoChat.textContent =
                "● Disponível agora";

        }


        if (avatarMensagem) {

            avatarMensagem.textContent =
                gerarIniciais(
                    profissional.nome
                );

        }


        if (mensagemInicial) {

            mensagemInicial.textContent =
                profissional.mensagem;

        }

    }


    /* =====================================================
       GERAR INICIAIS
    ===================================================== */

    function gerarIniciais(nome) {

        const partes =
            nome.trim().split(/\s+/);


        if (partes.length === 1) {
            return partes[0]
                .substring(0, 2)
                .toUpperCase();
        }


        return (
            partes[0][0] +
            partes[partes.length - 1][0]
        ).toUpperCase();

    }


    /* =====================================================
       FILTROS
    ===================================================== */

    filtros.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                filtroAtual =
                    botao.dataset.filtro;


                filtros.forEach(
                    function (outroBotao) {

                        outroBotao.classList.remove(
                            "ativo"
                        );

                    }
                );


                botao.classList.add(
                    "ativo"
                );


                indiceCentral = 0;


                renderizarStories();


                atualizarCards();

            }
        );

    });


    /* =====================================================
       BUSCA
    ===================================================== */

    if (buscaInput) {

        buscaInput.addEventListener(
            "input",
            function () {

                buscaAtual =
                    buscaInput.value;


                indiceCentral = 0;


                renderizarStories();


                atualizarCards();

            }
        );

    }


    /* =====================================================
       ATUALIZAR CARDS
    ===================================================== */

    function atualizarCards() {

        if (!cardsProfissionais) {
            return;
        }


        const cards =
            cardsProfissionais.querySelectorAll(
                ".card-profissional"
            );


        cards.forEach(function (card) {

            const categoria =
                card.dataset.categoria || "";

            const id =
                card.dataset.profissional || "";


            const profissional =
                profissionais.find(
                    function (item) {

                        return item.id === id;

                    }
                );


            if (!profissional) {
                return;
            }


            const correspondeFiltro =
                filtroAtual === "todos" ||
                categoria === filtroAtual;


            const textoBusca =
                buscaAtual.trim().toLowerCase();


            const correspondeBusca =
                textoBusca === "" ||
                profissional.nome.toLowerCase().includes(textoBusca) ||
                profissional.profissao.toLowerCase().includes(textoBusca) ||
                profissional.categoriaNome.toLowerCase().includes(textoBusca);


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
       FECHAR CHAT
    ===================================================== */

    if (fecharChat) {

        fecharChat.addEventListener(
            "click",
            function () {

                if (!chatArea) {
                    return;
                }

                chatArea.classList.add(
                    "chat-fechado"
                );

            }
        );

    }


    /* =====================================================
       SUGESTÕES DO CHAT
    ===================================================== */

    const sugestoes =
        document.querySelectorAll(
            ".sugestoes-chat button"
        );


    sugestoes.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                if (!mensagemChat) {
                    return;
                }


                mensagemChat.value =
                    botao.textContent.trim();


                mensagemChat.focus();

            }
        );

    });


    /* =====================================================
       ENVIO DE MENSAGEM
    ===================================================== */

    if (formChat) {

        formChat.addEventListener(
            "submit",
            function (evento) {

                evento.preventDefault();


                if (!mensagemChat) {
                    return;
                }


                const texto =
                    mensagemChat.value.trim();


                if (texto === "") {
                    return;
                }


                adicionarMensagemUsuario(
                    texto
                );


                mensagemChat.value = "";


                /*
                    Simulação de resposta
                */

                setTimeout(function () {

                    adicionarRespostaAutomatica();

                }, 700);

            }
        );

    }


    /* =====================================================
       ADICIONAR MENSAGEM DO USUÁRIO
    ===================================================== */

    function adicionarMensagemUsuario(
        texto
    ) {

        if (!mensagensChat) {
            return;
        }


        const mensagem =
            document.createElement("div");


        mensagem.className =
            "mensagem-usuario";


        mensagem.innerHTML = `

            <div class="balao-mensagem">

                <p>
                    ${escaparHTML(texto)}
                </p>

                <span>
                    agora
                </span>

            </div>

        `;


        mensagensChat.appendChild(
            mensagem
        );


        rolarChatParaBaixo();

    }


    /* =====================================================
       RESPOSTA AUTOMÁTICA
    ===================================================== */

    function adicionarRespostaAutomatica() {

        if (!mensagensChat) {
            return;
        }


        const mensagem =
            document.createElement("div");


        mensagem.className =
            "mensagem-profissional";


        const lista =
            profissionaisFiltrados();


        const profissional =
            lista[indiceCentral];


        if (!profissional) {
            return;
        }


        mensagem.innerHTML = `

            <div
                class="avatar-mensagem"
            >
                ${gerarIniciais(profissional.nome)}
            </div>

            <div class="balao-mensagem">

                <p>
                    Claro! Podemos conversar sobre os detalhes do serviço.
                </p>

                <span>
                    agora
                </span>

            </div>

        `;


        mensagensChat.appendChild(
            mensagem
        );


        rolarChatParaBaixo();

    }


    /* =====================================================
       ROLAR CHAT
    ===================================================== */

    function rolarChatParaBaixo() {

        if (!mensagensChat) {
            return;
        }


        mensagensChat.scrollTop =
            mensagensChat.scrollHeight;

    }


    /* =====================================================
       BOTÕES "VER PERFIL"
    ===================================================== */

    const botoesPerfil =
        document.querySelectorAll(
            ".botao-perfil"
        );


    botoesPerfil.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const profissionalId =
                    botao.dataset.profissional;


                const profissional =
                    profissionais.find(
                        function (item) {

                            return item.id === profissionalId;

                        }
                    );


                if (!profissional) {
                    return;
                }


                mostrarPerfil(
                    profissional
                );

            }
        );

    });


    /* =====================================================
       MOSTRAR PERFIL
    ===================================================== */

    function mostrarPerfil(
        profissional
    ) {

        const existente =
            document.querySelector(
                ".modal-perfil-autonomo"
            );


        if (existente) {
            existente.remove();
        }


        const modal =
            document.createElement("div");


        modal.className =
            "modal-perfil-autonomo";


        modal.innerHTML = `

            <div class="conteudo-modal-perfil">

                <button
                    type="button"
                    class="fechar-modal-perfil"
                    aria-label="Fechar perfil"
                >
                    ×
                </button>

                <img
                    src="${profissional.imagemPerfil}"
                    alt="Foto de ${profissional.nome}"
                >

                <span>
                    ${profissional.categoriaNome}
                </span>

                <h2>
                    ${profissional.nome}
                </h2>

                <p>
                    ${profissional.profissao}
                </p>

                <p>
                    📍 ${profissional.localizacao}
                </p>

                <strong>
                    ★ ${profissional.avaliacao}
                </strong>

                <button
                    type="button"
                    class="botao-conversar-modal"
                >
                    Conversar com profissional
                </button>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        const fechar =
            modal.querySelector(
                ".fechar-modal-perfil"
            );


        fechar.addEventListener(
            "click",
            function () {

                modal.remove();

            }
        );


        modal.addEventListener(
            "click",
            function (evento) {

                if (evento.target === modal) {
                    modal.remove();
                }

            }
        );


        const botaoConversar =
            modal.querySelector(
                ".botao-conversar-modal"
            );


        botaoConversar.addEventListener(
            "click",
            function () {

                modal.remove();


                centralizarProfissional(
                    profissional.id
                );


                if (chatArea) {

                    chatArea.classList.remove(
                        "chat-fechado"
                    );

                }

            }
        );

    }


    /* =====================================================
       ESCAPAR HTML
    ===================================================== */

    function escaparHTML(texto) {

        const div =
            document.createElement("div");

        div.textContent = texto;

        return div.innerHTML;

    }


    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    renderizarStories();

    atualizarCards();


    console.log(
        "AUTONOMO.JS: inicialização concluída"
    );

});
