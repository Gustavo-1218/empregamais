document.addEventListener("DOMContentLoaded", function () {

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

    let indiceCentral = 1;
    let categoriaAtual = "todos";
    let termoBusca = "";

    let profissionaisVisiveis = [];
    let trocaPendente = null;
    let trocaEmAndamento = false;
    let tempoTroca = null;
    let contadorTroca = null;

    const profissionais = [

        {
            id: "joao",
            nome: "João Silva",
            profissao: "Encanador profissional",
            categoria: "encanamento",
            categoriaTexto: "ENCANAMENTO",
            localizacao: "📍 Extremoz, RN",
            imagem: "autonomos/joao.jpg",
            iniciais: "JS",
            avaliacao: "4.9",
            status: "Disponível agora",
            mensagemInicial: "Olá! 😊 Como posso ajudar você?",
            respostas: {
                custo: "O valor depende do tipo de serviço. Se você me explicar o problema, consigo passar uma estimativa antes de começarmos.",
                regiao: "Sim! Atendo em Extremoz e em algumas regiões próximas de Natal.",
                disponibilidade: "Tenho alguns horários disponíveis durante a semana. Podemos combinar o melhor horário por aqui."
            }
        },

        {
            id: "maria",
            nome: "Maria Santos",
            profissao: "Profissional de limpeza",
            categoria: "limpeza",
            categoriaTexto: "LIMPEZA",
            localizacao: "📍 Natal, RN",
            imagem: "autonomos/maria.jpg",
            iniciais: "MS",
            avaliacao: "5.0",
            status: "Disponível agora",
            mensagemInicial: "Olá! 😊 Como posso ajudar você?",
            respostas: {
                custo: "O valor depende do tamanho do local e do tipo de limpeza. Posso entender o que você precisa e combinar um orçamento.",
                regiao: "Atendo principalmente Natal e algumas regiões próximas.",
                disponibilidade: "Tenho disponibilidade durante a semana e também alguns horários aos finais de semana."
            }
        },

        {
            id: "carlos",
            nome: "Carlos Oliveira",
            profissao: "Eletricista residencial",
            categoria: "eletrica",
            categoriaTexto: "ELÉTRICA",
            localizacao: "📍 Parnamirim, RN",
            imagem: "autonomos/carlos.jpg",
            iniciais: "CO",
            avaliacao: "4.8",
            status: "Disponível agora",
            mensagemInicial: "Olá! ⚡ Posso ajudar com seu serviço elétrico.",
            respostas: {
                custo: "O orçamento depende do serviço. Posso avaliar o problema e explicar o que precisa ser feito antes de iniciar.",
                regiao: "Atendo Parnamirim, Natal e algumas regiões próximas.",
                disponibilidade: "Tenho alguns horários disponíveis. Podemos combinar o atendimento diretamente por aqui."
            }
        },

        {
            id: "ana",
            nome: "Ana Beatriz",
            profissao: "Pintora residencial",
            categoria: "pintura",
            categoriaTexto: "PINTURA",
            localizacao: "📍 Natal, RN",
            imagem: "autonomos/ana.jpg",
            iniciais: "AB",
            avaliacao: "4.9",
            status: "Disponível agora",
            mensagemInicial: "Olá! 🎨 Quer conversar sobre seu projeto?",
            respostas: {
                custo: "O preço depende do tamanho do ambiente, quantidade de paredes e tipo de tinta. Posso fazer uma estimativa.",
                regiao: "Atendo principalmente Natal e regiões próximas.",
                disponibilidade: "Posso verificar meus horários disponíveis e combinar uma data com você."
            }
        },

        {
            id: "lucas",
            nome: "Lucas Ferreira",
            profissao: "Técnico de manutenção",
            categoria: "manutencao",
            categoriaTexto: "MANUTENÇÃO",
            localizacao: "📍 São Gonçalo do Amarante, RN",
            imagem: "autonomos/lucas.jpg",
            iniciais: "LF",
            avaliacao: "4.8",
            status: "Disponível agora",
            mensagemInicial: "Olá! 🔧 Posso ajudar com sua manutenção.",
            respostas: {
                custo: "Preciso entender qual equipamento ou problema você possui para conseguir estimar o valor.",
                regiao: "Atendo São Gonçalo do Amarante e algumas regiões próximas.",
                disponibilidade: "Tenho alguns horários disponíveis durante a semana. Podemos combinar o melhor horário."
            }
        },

        {
            id: "beatriz",
            nome: "Beatriz Lima",
            profissao: "Profissional de limpeza",
            categoria: "limpeza",
            categoriaTexto: "LIMPEZA",
            localizacao: "📍 Natal, RN",
            imagem: "autonomos/beatriz.jpg",
            iniciais: "BL",
            avaliacao: "4.9",
            status: "Disponível agora",
            mensagemInicial: "Olá! Posso explicar como funciona meu serviço.",
            respostas: {
                custo: "O orçamento depende do tamanho do espaço e do serviço necessário.",
                regiao: "Atendo Natal e algumas regiões próximas.",
                disponibilidade: "Podemos combinar um horário de acordo com sua necessidade."
            }
        },

        {
            id: "rafael",
            nome: "Rafael Costa",
            profissao: "Eletricista",
            categoria: "eletrica",
            categoriaTexto: "ELÉTRICA",
            localizacao: "📍 Extremoz, RN",
            imagem: "autonomos/rafael.jpg",
            iniciais: "RC",
            avaliacao: "4.7",
            status: "Disponível agora",
            mensagemInicial: "Olá! ⚡ Estou disponível para conversar.",
            respostas: {
                custo: "Depende do serviço elétrico necessário. Posso entender o problema e passar uma estimativa.",
                regiao: "Atendo Extremoz e algumas regiões próximas.",
                disponibilidade: "Tenho horários disponíveis durante a semana e podemos combinar o atendimento."
            }
        }

    ];

    function obterProfissional(indice) {

        if (profissionaisVisiveis.length === 0) {
            return null;
        }

        const total = profissionaisVisiveis.length;

        indice = (indice + total) % total;

        return profissionaisVisiveis[indice];
    }

    function atualizarCard(card, profissional) {

        if (!card || !profissional) {
            return;
        }

        card.dataset.profissional = profissional.id;

        const imagem = card.querySelector(".imagem-profissional img");
        const categoria = card.querySelector(".categoria");
        const nome = card.querySelector(".info-profissional h3");
        const profissao = card.querySelector(".profissao");
        const localizacao = card.querySelector(".localizacao");
        const avaliacao = card.querySelector(".avaliacao");
        const botao = card.querySelector(".botao-perfil");

        if (imagem) {
            imagem.src = profissional.imagem;
            imagem.alt = `${profissional.nome} realizando serviço`;
        }

        if (categoria) {
            categoria.textContent = profissional.categoriaTexto;
        }

        if (nome) {
            nome.textContent = profissional.nome;
        }

        if (profissao) {
            profissao.textContent = profissional.profissao;
        }

        if (localizacao) {
            localizacao.textContent = profissional.localizacao;
        }

        if (avaliacao) {
            avaliacao.textContent = `★ ${profissional.avaliacao}`;
        }

        if (botao) {
            botao.dataset.profissional = profissional.id;
        }
    }

    function atualizarChat(profissional) {

        if (!profissional) {
            return;
        }

        fotoChat.src = profissional.imagem;
        fotoChat.alt = `Foto de ${profissional.nome}`;

        nomeChat.textContent = profissional.nome;
        profissaoChat.textContent = profissional.profissao;
        statusTextoChat.textContent = `● ${profissional.status}`;

        mensagensChat.innerHTML = "";

        adicionarMensagemProfissional(
            profissional.iniciais,
            profissional.mensagemInicial,
            "agora"
        );

        const sistema = document.createElement("div");

        sistema.className = "mensagem-sistema";

        sistema.innerHTML = `
            <span>
                Converse diretamente com este profissional.
            </span>
        `;

        mensagensChat.appendChild(sistema);
    }

    function adicionarMensagemProfissional(iniciais, texto, horario) {

        const mensagem = document.createElement("div");

        mensagem.className = "mensagem-profissional";

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

        mensagensChat.scrollTop = mensagensChat.scrollHeight;
    }

    function adicionarMensagemUsuario(texto) {

        const mensagem = document.createElement("div");

        mensagem.className = "mensagem-usuario";

        mensagem.innerHTML = `
            <div class="balao-usuario">
                <p>${escaparHTML(texto)}</p>
                <span>agora</span>
            </div>
        `;

        mensagensChat.appendChild(mensagem);

        mensagensChat.scrollTop = mensagensChat.scrollHeight;
    }

    function mostrarDigitando() {

        const digitando = document.createElement("div");

        digitando.className = "mensagem-digitando";
        digitando.id = "mensagemDigitando";

        digitando.innerHTML = `
            <div class="avatar-mensagem">
                ${escaparHTML(obterProfissional(indiceCentral).iniciais)}
            </div>

            <div class="balao-digitando">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        mensagensChat.appendChild(digitando);

        mensagensChat.scrollTop = mensagensChat.scrollHeight;
    }

    function removerDigitando() {

        const digitando = document.getElementById("mensagemDigitando");

        if (digitando) {
            digitando.remove();
        }
    }

    function responderMensagem(texto) {

        const profissional = obterProfissional(indiceCentral);

        if (!profissional) {
            return;
        }

        const textoNormalizado = texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        let resposta = "";

        if (
            textoNormalizado.includes("quanto") ||
            textoNormalizado.includes("preco") ||
            textoNormalizado.includes("valor") ||
            textoNormalizado.includes("custa") ||
            textoNormalizado.includes("orcamento")
        ) {

            resposta = profissional.respostas.custo;

        } else if (
            textoNormalizado.includes("regiao") ||
            textoNormalizado.includes("atende") ||
            textoNormalizado.includes("local") ||
            textoNormalizado.includes("onde")
        ) {

            resposta = profissional.respostas.regiao;

        } else if (
            textoNormalizado.includes("disponivel") ||
            textoNormalizado.includes("horario") ||
            textoNormalizado.includes("quando") ||
            textoNormalizado.includes("agenda")
        ) {

            resposta = profissional.respostas.disponibilidade;

        } else if (
            textoNormalizado.includes("ola") ||
            textoNormalizado.includes("oi") ||
            textoNormalizado.includes("bom dia") ||
            textoNormalizado.includes("boa tarde") ||
            textoNormalizado.includes("boa noite")
        ) {

            resposta = `Olá! 😊 É um prazer falar com você. Estou disponível para ajudar com ${profissional.profissao.toLowerCase()}.`;

        } else if (
            textoNormalizado.includes("curriculo") ||
            textoNormalizado.includes("experiencia") ||
            textoNormalizado.includes("experiencia")
        ) {

            resposta = "Tenho experiência na área e posso explicar melhor meu trabalho através do meu perfil.";

        } else {

            resposta = `Claro! Me conte um pouco mais sobre o que você precisa e vou tentar ajudar da melhor forma possível.`;
        }

        mostrarDigitando();

        setTimeout(function () {

            removerDigitando();

            adicionarMensagemProfissional(
                profissional.iniciais,
                resposta,
                "agora"
            );

        }, 1300);
    }

    function iniciarTroca(indiceDestino) {

        if (trocaEmAndamento) {
            return;
        }

        if (profissionaisVisiveis.length < 2) {
            return;
        }

        indiceDestino =
            (indiceDestino + profissionaisVisiveis.length) %
            profissionaisVisiveis.length;

        if (indiceDestino === indiceCentral) {
            return;
        }

        trocaEmAndamento = true;

        const profissionalDestino = obterProfissional(indiceDestino);

        cardCentro.classList.add("trocando");
        cardEsquerda.classList.add("trocando");
        cardDireita.classList.add("trocando");

        setTimeout(function () {

            indiceCentral = indiceDestino;

            atualizarCardsVisiveis();

            atualizarChat(profissionalDestino);

            atualizarIndicadores();

        }, 450);

        setTimeout(function () {

            cardCentro.classList.remove("trocando");
            cardEsquerda.classList.remove("trocando");
            cardDireita.classList.remove("trocando");

            trocaEmAndamento = false;

        }, 700);
    }

    function agendarTroca(indiceDestino) {

        if (trocaEmAndamento) {
            return;
        }

        cancelarTroca();

        trocaPendente = indiceDestino;

        tempoTroca = setTimeout(function () {

            iniciarTroca(indiceDestino);

            trocaPendente = null;

        }, 3000);

    }

    function cancelarTroca() {

        if (tempoTroca) {
            clearTimeout(tempoTroca);
            tempoTroca = null;
        }

        if (contadorTroca) {
            clearInterval(contadorTroca);
            contadorTroca = null;
        }

        trocaPendente = null;
    }

    function atualizarCardsVisiveis() {

        if (profissionaisVisiveis.length === 0) {
            return;
        }

        const esquerda = obterProfissional(indiceCentral - 1);
        const centro = obterProfissional(indiceCentral);
        const direita = obterProfissional(indiceCentral + 1);

        atualizarCard(cardEsquerda, esquerda);
        atualizarCard(cardCentro, centro);
        atualizarCard(cardDireita, direita);
    }

    function atualizarIndicadores() {

        indicadores.forEach(function (indicador) {
            indicador.classList.remove("ativo");
        });

        const profissionalCentral = obterProfissional(indiceCentral);

        if (!profissionalCentral) {
            return;
        }

        const indiceOriginal = profissionais.findIndex(function (profissional) {
            return profissional.id === profissionalCentral.id;
        });

        indicadores.forEach(function (indicador) {

            if (Number(indicador.dataset.indice) === indiceOriginal) {
                indicador.classList.add("ativo");
            }

        });
    }

    function adicionarEventosCards() {

        cardEsquerda.addEventListener("mouseenter", function () {

            if (trocaEmAndamento) {
                return;
            }

            const indice = Number(
                cardEsquerda.dataset.indice
            );

            agendarTroca(indice);

        });

        cardEsquerda.addEventListener("mouseleave", function () {
            cancelarTroca();
        });

        cardDireita.addEventListener("mouseenter", function () {

            if (trocaEmAndamento) {
                return;
            }

            const indice = Number(
                cardDireita.dataset.indice
            );

            agendarTroca(indice);

        });

        cardDireita.addEventListener("mouseleave", function () {
            cancelarTroca();
        });

        cardCentro.addEventListener("mouseenter", function () {
            cancelarTroca();
        });

        carrossel.addEventListener("click", function (evento) {

            const botao = evento.target.closest(".botao-perfil");

            if (!botao) {
                return;
            }

            const id = botao.dataset.profissional;

            abrirPerfil(id);

        });

    }

    function abrirPerfil(id) {

        const profissional = profissionais.find(function (item) {
            return item.id === id;
        });

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

    function aplicarFiltros() {

        profissionaisVisiveis = profissionais.filter(function (profissional) {

            const correspondeCategoria =
                categoriaAtual === "todos" ||
                profissional.categoria === categoriaAtual;

            const texto =
                `${profissional.nome} ${profissional.profissao} ${profissional.localizacao} ${profissional.categoriaTexto}`
                    .toLowerCase();

            const correspondeBusca =
                termoBusca === "" ||
                texto.includes(termoBusca.toLowerCase());

            return correspondeCategoria && correspondeBusca;

        });

        cancelarTroca();

        indiceCentral = profissionaisVisiveis.length > 1 ? 1 : 0;

        atualizarCardsVisiveis();
        atualizarIndicadores();

        const profissional = obterProfissional(indiceCentral);

        atualizarChat(profissional);
    }

    filtros.forEach(function (filtro) {

        filtro.addEventListener("click", function () {

            filtros.forEach(function (item) {
                item.classList.remove("ativo");
            });

            filtro.classList.add("ativo");

            categoriaAtual = filtro.dataset.filtro;

            aplicarFiltros();

        });

    });

    busca.addEventListener("input", function () {

        termoBusca = busca.value.trim();

        aplicarFiltros();

    });

    indicadores.forEach(function (indicador) {

        indicador.addEventListener("click", function () {

            const indiceOriginal = Number(
                indicador.dataset.indice
            );

            const profissional = profissionais[indiceOriginal];

            if (!profissional) {
                return;
            }

            const indiceFiltrado =
                profissionaisVisiveis.findIndex(function (item) {
                    return item.id === profissional.id;
                });

            if (indiceFiltrado !== -1) {

                cancelarTroca();

                iniciarTroca(indiceFiltrado);

            }

        });

    });

    sugestoes.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const pergunta = botao.textContent.trim();

            adicionarMensagemUsuario(pergunta);

            responderMensagem(pergunta);

        });

    });

    formChat.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const texto = mensagemChat.value.trim();

        if (!texto) {
            return;
        }

        adicionarMensagemUsuario(texto);

        mensagemChat.value = "";

        responderMensagem(texto);

    });

    function escaparHTML(texto) {

        const div = document.createElement("div");

        div.textContent = texto;

        return div.innerHTML;
    }

    profissionaisVisiveis = [...profissionais];

    atualizarCardsVisiveis();
    atualizarChat(obterProfissional(indiceCentral));
    atualizarIndicadores();

    adicionarEventosCards();

});