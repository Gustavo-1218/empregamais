document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTOS DA PÁGINA
    ===================================================== */

    const carrossel = document.getElementById("carrosselProfissionais");
    const busca = document.getElementById("buscaAutonomos");
    const filtros = document.querySelectorAll(".filtro");
    const indicadores = document.querySelectorAll(".indicador");

    const formChat = document.getElementById("formChat");
    const mensagemChat = document.getElementById("mensagemChat");
    const mensagensChat = document.getElementById("mensagensChat");
    const sugestoes = document.querySelectorAll(".sugestoes-chat button");

    const fotoChat = document.getElementById("fotoChat");
    const nomeChat = document.getElementById("nomeChat");
    const profissaoChat = document.getElementById("profissaoChat");
    const statusTextoChat = document.getElementById("statusTextoChat");

    const cardEsquerda = document.querySelector(".card-esquerda");
    const cardCentro = document.querySelector(".card-centro");
    const cardDireita = document.querySelector(".card-direita");


    /* =====================================================
       ESTADO
    ===================================================== */

    let indiceCentral = 1;
    let categoriaAtual = "todos";
    let termoBusca = "";

    let profissionaisVisiveis = [];

    let trocaEmAndamento = false;
    let tempoTroca = null;


    /* =====================================================
       DADOS DOS PROFISSIONAIS
    ===================================================== */

    const profissionais = [

        {
            id: "joao",
            nome: "João Silva",
            profissao: "Encanador profissional",
            categoria: "encanamento",
            categoriaTexto: "ENCANAMENTO",
            localizacao: "📍 Extremoz, RN",
            imagem: "João Silva.png",
            iniciais: "JS",
            avaliacao: "4.9",
            status: "Disponível agora",

            mensagemInicial:
                "Olá! 😊 Como posso ajudar você?",

            respostas: {
                custo:
                    "O valor depende do tipo de serviço. Se você me explicar o problema, consigo passar uma estimativa antes de começarmos.",

                regiao:
                    "Sim! Atendo em Extremoz e em algumas regiões próximas de Natal.",

                disponibilidade:
                    "Tenho alguns horários disponíveis durante a semana. Podemos combinar o melhor horário por aqui."
            }
        },


        {
            id: "maria",
            nome: "Maria Santos",
            profissao: "Profissional de limpeza",
            categoria: "limpeza",
            categoriaTexto: "LIMPEZA",
            localizacao: "📍 Natal, RN",
            imagem: "Maria Santos.png",
            iniciais: "MS",
            avaliacao: "5.0",
            status: "Disponível agora",

            mensagemInicial:
                "Olá! 😊 Como posso ajudar você?",

            respostas: {
                custo:
                    "O valor depende do tamanho do local e do tipo de limpeza. Posso entender o que você precisa e combinar um orçamento.",

                regiao:
                    "Atendo principalmente Natal e algumas regiões próximas.",

                disponibilidade:
                    "Tenho disponibilidade durante a semana e também alguns horários aos finais de semana."
            }
        },


        {
            id: "carlos",
            nome: "Carlos Oliveira",
            profissao: "Eletricista residencial",
            categoria: "eletrica",
            categoriaTexto: "ELÉTRICA",
            localizacao: "📍 Parnamirim, RN",
            imagem: "Carlos Oliveira.png",
            iniciais: "CO",
            avaliacao: "4.8",
            status: "Disponível agora",

            mensagemInicial:
                "Olá! ⚡ Posso ajudar com seu serviço elétrico.",

            respostas: {
                custo:
                    "O orçamento depende do serviço. Posso avaliar o problema e explicar o que precisa ser feito antes de iniciar.",

                regiao:
                    "Atendo Parnamirim, Natal e algumas regiões próximas.",

                disponibilidade:
                    "Tenho alguns horários disponíveis. Podemos combinar o atendimento diretamente por aqui."
            }
        },


        {
            id: "rafael",
            nome: "Rafael Costa",
            profissao: "Eletricista",
            categoria: "eletrica",
            categoriaTexto: "ELÉTRICA",
            localizacao: "📍 Extremoz, RN",
            imagem: "Rafael Costa.png",
            iniciais: "RC",
            avaliacao: "4.7",
            status: "Disponível agora",

            mensagemInicial:
                "Olá! ⚡ Estou disponível para conversar.",

            respostas: {
                custo:
                    "Depende do serviço elétrico necessário. Posso entender o problema e passar uma estimativa.",

                regiao:
                    "Atendo Extremoz e algumas regiões próximas.",

                disponibilidade:
                    "Tenho horários disponíveis durante a semana e podemos combinar o atendimento."
            }
        },


        {
            id: "ana",
            nome: "Ana Beatriz",
            profissao: "Pintora residencial",
            categoria: "pintura",
            categoriaTexto: "PINTURA",
            localizacao: "📍 Natal, RN",
            imagem: "Ana Beatriz.png",
            iniciais: "AB",
            avaliacao: "4.9",
            status: "Disponível agora",

            mensagemInicial:
                "Olá! 🎨 Quer conversar sobre seu projeto?",

            respostas: {
                custo:
                    "O preço depende do tamanho do ambiente, quantidade de paredes e tipo de tinta. Posso fazer uma estimativa.",

                regiao:
                    "Atendo principalmente Natal e regiões próximas.",

                disponibilidade:
                    "Posso verificar meus horários disponíveis e combinar uma data com você."
            }
        }

    ];


    /* =====================================================
       OBTER PROFISSIONAL
    ===================================================== */

    function obterProfissional(indice) {

        if (profissionaisVisiveis.length === 0) {
            return null;
        }

        const total = profissionaisVisiveis.length;

        indice = (indice + total) % total;

        return profissionaisVisiveis[indice];
    }


    /* =====================================================
       ATUALIZAR CARD
    ===================================================== */

    function atualizarCard(card, profissional, indice) {

        if (!card || !profissional) {
            return;
        }

        /*
         * Agora o índice acompanha o profissional.
         * Isso corrige o problema antigo do carrossel.
         */

        card.dataset.profissional = profissional.id;
        card.dataset.indice = indice;


        const imagem =
            card.querySelector(".imagem-profissional img");

        const categoria =
            card.querySelector(".categoria");

        const nome =
            card.querySelector(".info-profissional h3");

        const profissao =
            card.querySelector(".profissao");

        const localizacao =
            card.querySelector(".localizacao");

        const avaliacao =
            card.querySelector(".avaliacao");

        const botao =
            card.querySelector(".botao-perfil");


        if (imagem) {

            imagem.src = profissional.imagem;

            imagem.alt =
                `Foto de ${profissional.nome}`;

        }


        if (categoria) {
            categoria.textContent =
                profissional.categoriaTexto;
        }


        if (nome) {
            nome.textContent =
                profissional.nome;
        }


        if (profissao) {
            profissao.textContent =
                profissional.profissao;
        }


        if (localizacao) {
            localizacao.textContent =
                profissional.localizacao;
        }


        if (avaliacao) {

            avaliacao.textContent =
                `★ ${profissional.avaliacao}`;

        }


        if (botao) {

            botao.dataset.profissional =
                profissional.id;

        }

    }


    /* =====================================================
       ATUALIZAR CHAT
    ===================================================== */

    function atualizarChat(profissional) {

        if (!profissional) {
            return;
        }


        if (fotoChat) {

            fotoChat.src =
                profissional.imagem;

            fotoChat.alt =
                `Foto de ${profissional.nome}`;

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
                `● ${profissional.status}`;

        }


        if (!mensagensChat) {
            return;
        }


        mensagensChat.innerHTML = "";


        adicionarMensagemProfissional(
            profissional.iniciais,
            profissional.mensagemInicial,
            "agora"
        );


        const sistema =
            document.createElement("div");

        sistema.className =
            "mensagem-sistema";

        sistema.innerHTML = `
            <span>
                Converse diretamente com este profissional.
            </span>
        `;


        mensagensChat.appendChild(sistema);

    }


    /* =====================================================
       MENSAGEM DO PROFISSIONAL
    ===================================================== */

    function adicionarMensagemProfissional(
        iniciais,
        texto,
        horario
    ) {

        if (!mensagensChat) {
            return;
        }


        const mensagem =
            document.createElement("div");

        mensagem.className =
            "mensagem-profissional";


        mensagem.innerHTML = `
            <div class="avatar-mensagem">
                ${escaparHTML(iniciais)}
            </div>

            <div class="balao-mensagem">

                <p>
                    ${escaparHTML(texto)}
                </p>

                <span>
                    ${escaparHTML(horario)}
                </span>

            </div>
        `;


        mensagensChat.appendChild(mensagem);

        mensagensChat.scrollTop =
            mensagensChat.scrollHeight;

    }


    /* =====================================================
       MENSAGEM DO USUÁRIO
    ===================================================== */

    function adicionarMensagemUsuario(texto) {

        if (!mensagensChat) {
            return;
        }


        const mensagem =
            document.createElement("div");

        mensagem.className =
            "mensagem-usuario";


        mensagem.innerHTML = `
            <div class="balao-usuario">

                <p>
                    ${escaparHTML(texto)}
                </p>

                <span>
                    agora
                </span>

            </div>
        `;


        mensagensChat.appendChild(mensagem);

        mensagensChat.scrollTop =
            mensagensChat.scrollHeight;

    }


    /* =====================================================
       DIGITANDO
    ===================================================== */

    function mostrarDigitando() {

        if (!mensagensChat) {
            return;
        }


        const profissional =
            obterProfissional(indiceCentral);

        if (!profissional) {
            return;
        }


        const digitando =
            document.createElement("div");

        digitando.className =
            "mensagem-digitando";

        digitando.id =
            "mensagemDigitando";


        digitando.innerHTML = `
            <div class="avatar-mensagem">
                ${escaparHTML(profissional.iniciais)}
            </div>

            <div class="balao-digitando">

                <span></span>
                <span></span>
                <span></span>

            </div>
        `;


        mensagensChat.appendChild(digitando);

        mensagensChat.scrollTop =
            mensagensChat.scrollHeight;

    }


    /* =====================================================
       REMOVER DIGITANDO
    ===================================================== */

    function removerDigitando() {

        const digitando =
            document.getElementById(
                "mensagemDigitando"
            );


        if (digitando) {
            digitando.remove();
        }

    }


    /* =====================================================
       RESPOSTA DO CHAT
    ===================================================== */

    function responderMensagem(texto) {

        const profissional =
            obterProfissional(indiceCentral);


        if (!profissional) {
            return;
        }


        const textoNormalizado =
            texto
                .toLowerCase()
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                );


        let resposta = "";


        /*
         * PREÇO
         */

        if (
            textoNormalizado.includes("quanto") ||
            textoNormalizado.includes("preco") ||
            textoNormalizado.includes("valor") ||
            textoNormalizado.includes("custa") ||
            textoNormalizado.includes("orcamento")
        ) {

            resposta =
                profissional.respostas.custo;

        }


        /*
         * REGIÃO
         */

        else if (
            textoNormalizado.includes("regiao") ||
            textoNormalizado.includes("atende") ||
            textoNormalizado.includes("local") ||
            textoNormalizado.includes("onde")
        ) {

            resposta =
                profissional.respostas.regiao;

        }


        /*
         * DISPONIBILIDADE
         */

        else if (
            textoNormalizado.includes("disponivel") ||
            textoNormalizado.includes("horario") ||
            textoNormalizado.includes("quando") ||
            textoNormalizado.includes("agenda")
        ) {

            resposta =
                profissional.respostas.disponibilidade;

        }


        /*
         * SAUDAÇÃO
         */

        else if (
            textoNormalizado.includes("ola") ||
            textoNormalizado.includes("oi") ||
            textoNormalizado.includes("bom dia") ||
            textoNormalizado.includes("boa tarde") ||
            textoNormalizado.includes("boa noite")
        ) {

            resposta =
                `Olá! 😊 É um prazer falar com você. Estou disponível para ajudar com ${profissional.profissao.toLowerCase()}.`;

        }


        /*
         * EXPERIÊNCIA
         */

        else if (
            textoNormalizado.includes("curriculo") ||
            textoNormalizado.includes("experiencia")
        ) {

            resposta =
                "Tenho experiência na área e posso explicar melhor meu trabalho através do meu perfil.";

        }


        /*
         * RESPOSTA GENÉRICA
         */

        else {

            resposta =
                "Claro! Me conte um pouco mais sobre o que você precisa e vou tentar ajudar da melhor forma possível.";

        }


        mostrarDigitando();


        setTimeout(function () {

            removerDigitando();


            /*
             * Confere se o profissional ainda é
             * o mesmo antes de responder.
             */

            const profissionalAtual =
                obterProfissional(indiceCentral);


            if (!profissionalAtual) {
                return;
            }


            adicionarMensagemProfissional(
                profissionalAtual.iniciais,
                resposta,
                "agora"
            );

        }, 1300);

    }


    /* =====================================================
       ATUALIZAR CARDS VISÍVEIS
    ===================================================== */

    function atualizarCardsVisiveis() {

        if (
            profissionaisVisiveis.length === 0
        ) {
            return;
        }


        const total =
            profissionaisVisiveis.length;


        const indiceEsquerda =
            (indiceCentral - 1 + total) % total;


        const indiceDireita =
            (indiceCentral + 1) % total;


        const esquerda =
            profissionaisVisiveis[indiceEsquerda];

        const centro =
            profissionaisVisiveis[indiceCentral];

        const direita =
            profissionaisVisiveis[indiceDireita];


        atualizarCard(
            cardEsquerda,
            esquerda,
            indiceEsquerda
        );


        atualizarCard(
            cardCentro,
            centro,
            indiceCentral
        );


        atualizarCard(
            cardDireita,
            direita,
            indiceDireita
        );

    }


    /* =====================================================
       INDICADORES
    ===================================================== */

    function atualizarIndicadores() {

        indicadores.forEach(function (indicador) {

            indicador.classList.remove("ativo");

        });


        const profissionalCentral =
            obterProfissional(indiceCentral);


        if (!profissionalCentral) {
            return;
        }


        const indiceOriginal =
            profissionais.findIndex(
                function (profissional) {

                    return (
                        profissional.id ===
                        profissionalCentral.id
                    );

                }
            );


        indicadores.forEach(function (indicador) {

            if (
                Number(indicador.dataset.indice) ===
                indiceOriginal
            ) {

                indicador.classList.add("ativo");

            }

        });

    }


    /* =====================================================
       INICIAR TROCA
    ===================================================== */

    function iniciarTroca(indiceDestino) {

        if (trocaEmAndamento) {
            return;
        }


        if (
            profissionaisVisiveis.length < 2
        ) {
            return;
        }


        const total =
            profissionaisVisiveis.length;


        indiceDestino =
            (indiceDestino + total) % total;


        if (
            indiceDestino === indiceCentral
        ) {
            return;
        }


        trocaEmAndamento = true;


        if (cardCentro) {
            cardCentro.classList.add("trocando");
        }

        if (cardEsquerda) {
            cardEsquerda.classList.add("trocando");
        }

        if (cardDireita) {
            cardDireita.classList.add("trocando");
        }


        setTimeout(function () {

            indiceCentral =
                indiceDestino;


            atualizarCardsVisiveis();


            const profissional =
                obterProfissional(indiceCentral);


            atualizarChat(profissional);

            atualizarIndicadores();

        }, 450);


        setTimeout(function () {

            if (cardCentro) {
                cardCentro.classList.remove(
                    "trocando"
                );
            }

            if (cardEsquerda) {
                cardEsquerda.classList.remove(
                    "trocando"
                );
            }

            if (cardDireita) {
                cardDireita.classList.remove(
                    "trocando"
                );
            }


            trocaEmAndamento = false;

        }, 700);

    }


    /* =====================================================
       TROCA AUTOMÁTICA AO PASSAR O MOUSE
    ===================================================== */

    function agendarTroca(indiceDestino) {

        if (trocaEmAndamento) {
            return;
        }


        cancelarTroca();


        tempoTroca =
            setTimeout(function () {

                iniciarTroca(
                    indiceDestino
                );

            }, 3000);

    }


    /* =====================================================
       CANCELAR TROCA
    ===================================================== */

    function cancelarTroca() {

        if (tempoTroca) {

            clearTimeout(
                tempoTroca
            );

            tempoTroca = null;

        }

    }


    /* =====================================================
       EVENTOS DOS CARDS
    ===================================================== */

    function adicionarEventosCards() {

        if (!cardEsquerda ||
            !cardCentro ||
            !cardDireita) {

            return;

        }


        /*
         * CARD ESQUERDO
         */

        cardEsquerda.addEventListener(
            "mouseenter",
            function () {

                if (trocaEmAndamento) {
                    return;
                }


                const indice =
                    Number(
                        cardEsquerda.dataset.indice
                    );


                agendarTroca(indice);

            }
        );


        cardEsquerda.addEventListener(
            "mouseleave",
            function () {

                cancelarTroca();

            }
        );


        /*
         * CARD DIREITO
         */

        cardDireita.addEventListener(
            "mouseenter",
            function () {

                if (trocaEmAndamento) {
                    return;
                }


                const indice =
                    Number(
                        cardDireita.dataset.indice
                    );


                agendarTroca(indice);

            }
        );


        cardDireita.addEventListener(
            "mouseleave",
            function () {

                cancelarTroca();

            }
        );


        /*
         * CARD CENTRAL
         */

        cardCentro.addEventListener(
            "mouseenter",
            function () {

                cancelarTroca();

            }
        );


        /*
         * BOTÃO "VER PERFIL"
         */

        carrossel.addEventListener(
            "click",
            function (evento) {

                const botao =
                    evento.target.closest(
                        ".botao-perfil"
                    );


                if (!botao) {
                    return;
                }


                const id =
                    botao.dataset.profissional;


                abrirPerfil(id);

            }
        );

    }


    /* =====================================================
       ABRIR PERFIL
    ===================================================== */

    function abrirPerfil(id) {

        const profissional =
            profissionais.find(
                function (item) {

                    return item.id === id;

                }
            );


        if (!profissional) {
            return;
        }


        alert(
            `Perfil de ${profissional.nome}\n\n` +
            `${profissional.profissao}\n` +
            `${profissional.localizacao}\n\n` +
            `Avaliação: ★ ${profissional.avaliacao}`
        );

    }


    /* =====================================================
       FILTROS + BUSCA
    ===================================================== */

    function aplicarFiltros() {

        profissionaisVisiveis =
            profissionais.filter(
                function (profissional) {

                    const correspondeCategoria =
                        categoriaAtual === "todos" ||
                        profissional.categoria ===
                        categoriaAtual;


                    const texto =
                        `${profissional.nome} ${profissional.profissao} ${profissional.localizacao} ${profissional.categoriaTexto}`
                            .toLowerCase();


                    const correspondeBusca =
                        termoBusca === "" ||
                        texto.includes(
                            termoBusca.toLowerCase()
                        );


                    return (
                        correspondeCategoria &&
                        correspondeBusca
                    );

                }
            );


        cancelarTroca();


        /*
         * Mantém o segundo profissional
         * como destaque quando houver
         * mais de uma opção.
         */

        indiceCentral =
            profissionaisVisiveis.length > 1
                ? 1
                : 0;


        atualizarCardsVisiveis();

        atualizarIndicadores();


        const profissional =
            obterProfissional(indiceCentral);


        atualizarChat(profissional);

    }


    /* =====================================================
       BOTÕES DE FILTRO
    ===================================================== */

    filtros.forEach(function (filtro) {

        filtro.addEventListener(
            "click",
            function () {

                filtros.forEach(
                    function (item) {

                        item.classList.remove(
                            "ativo"
                        );

                    }
                );


                filtro.classList.add(
                    "ativo"
                );


                categoriaAtual =
                    filtro.dataset.filtro;


                aplicarFiltros();

            }
        );

    });


    /* =====================================================
       BUSCA
    ===================================================== */

    if (busca) {

        busca.addEventListener(
            "input",
            function () {

                termoBusca =
                    busca.value.trim();


                aplicarFiltros();

            }
        );

    }


    /* =====================================================
       INDICADORES
    ===================================================== */

    indicadores.forEach(function (indicador) {

        indicador.addEventListener(
            "click",
            function () {

                const indiceOriginal =
                    Number(
                        indicador.dataset.indice
                    );


                const profissional =
                    profissionais[
                        indiceOriginal
                    ];


                if (!profissional) {
                    return;
                }


                const indiceFiltrado =
                    profissionaisVisiveis.findIndex(
                        function (item) {

                            return (
                                item.id ===
                                profissional.id
                            );

                        }
                    );


                if (
                    indiceFiltrado !== -1
                ) {

                    cancelarTroca();


                    iniciarTroca(
                        indiceFiltrado
                    );

                }

            }
        );

    });


    /* =====================================================
       SUGESTÕES DO CHAT
    ===================================================== */

    sugestoes.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const pergunta =
                    botao.textContent.trim();


                adicionarMensagemUsuario(
                    pergunta
                );


                responderMensagem(
                    pergunta
                );

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


                const texto =
                    mensagemChat.value.trim();


                if (!texto) {
                    return;
                }


                adicionarMensagemUsuario(
                    texto
                );


                mensagemChat.value = "";


                responderMensagem(
                    texto
                );

            }
        );

    }


    /* =====================================================
       ESCAPAR HTML
    ===================================================== */

    function escaparHTML(texto) {

        const div =
            document.createElement("div");


        div.textContent =
            texto;


        return div.innerHTML;

    }


    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    profissionaisVisiveis =
        [...profissionais];


    atualizarCardsVisiveis();


    atualizarChat(
        obterProfissional(
            indiceCentral
        )
    );


    atualizarIndicadores();


    adicionarEventosCards();

});