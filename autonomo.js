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
            status: "Disponível agora",
            avaliacao: "4.9",
            mensagem: "Olá! 😊 Como posso ajudar você?"
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
            status: "Disponível agora",
            avaliacao: "5.0",
            mensagem: "Olá! 😊 Como posso ajudar você?"
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
            status: "Disponível agora",
            avaliacao: "4.8",
            mensagem: "Olá! ⚡ Posso ajudar com seu serviço elétrico."
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
            status: "Disponível agora",
            avaliacao: "4.9",
            mensagem: "Olá! 🎨 Quer conversar sobre seu projeto?"
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
            status: "Disponível agora",
            avaliacao: "4.8",
            mensagem: "Olá! 🔧 Posso ajudar com sua manutenção."
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
            status: "Disponível agora",
            avaliacao: "4.9",
            mensagem: "Olá! Posso explicar como funciona meu serviço."
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
            status: "Disponível agora",
            avaliacao: "4.7",
            mensagem: "Olá! ⚡ Estou disponível para conversar."
        }
    ];

    let profissionaisFiltrados = [...profissionais];
    let indiceCentral = 1;
    let categoriaAtual = "todos";
    let termoBusca = "";

    function indiceValido(indice) {
        const total = profissionaisFiltrados.length;

        if (total === 0) {
            return 0;
        }

        return (indice + total) % total;
    }

    function obterProfissional(indice) {
        if (profissionaisFiltrados.length === 0) {
            return null;
        }

        return profissionaisFiltrados[indiceValido(indice)];
    }

    function criarCard(profissional, classe, indice) {

        const card = document.createElement("article");

        card.className = `card-profissional ${classe}`;
        card.dataset.indice = indice;
        card.dataset.profissional = profissional.id;

        card.innerHTML = `
            <div class="imagem-profissional">
                <img src="${profissional.imagem}" alt="${profissional.nome} realizando serviço">
                <span class="status-online">
                    <i></i>
                    Disponível
                </span>
            </div>

            <div class="info-profissional">
                <span class="categoria">${profissional.categoriaTexto}</span>

                <h3>${profissional.nome}</h3>

                <p class="profissao">
                    ${profissional.profissao}
                </p>

                <p class="localizacao">
                    ${profissional.localizacao}
                </p>

                <div class="rodape-card">
                    <span class="avaliacao">★ ${profissional.avaliacao}</span>

                    <button
                        type="button"
                        class="botao-perfil"
                        data-profissional="${profissional.id}"
                    >
                        Ver perfil
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    function atualizarIndicadores() {

        indicadores.forEach(function (indicador) {
            indicador.classList.remove("ativo");
        });

        if (profissionaisFiltrados.length === 0) {
            return;
        }

        const profissionalCentral = obterProfissional(indiceCentral);

        const indiceOriginal = profissionais.findIndex(function (profissional) {
            return profissional.id === profissionalCentral.id;
        });

        indicadores.forEach(function (indicador) {

            const indice = Number(indicador.dataset.indice);

            if (indice === indiceOriginal) {
                indicador.classList.add("ativo");
            }

        });
    }

    function atualizarChat(profissional) {

        if (!profissional) {
            nomeChat.textContent = "Nenhum profissional";
            profissaoChat.textContent = "Nenhum resultado encontrado";
            statusTextoChat.textContent = "";
            return;
        }

        fotoChat.src = profissional.imagem;
        fotoChat.alt = `Foto de ${profissional.nome}`;

        nomeChat.textContent = profissional.nome;
        profissaoChat.textContent = profissional.profissao;
        statusTextoChat.textContent = `● ${profissional.status}`;

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

    function atualizarCards(animar = true) {

        carrossel.innerHTML = "";

        if (profissionaisFiltrados.length === 0) {

            carrossel.innerHTML = `
                <div style="
                    width:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    min-height:300px;
                    color:var(--nw-texto-2);
                    font-size:13px;
                    text-align:center;
                ">
                    Nenhum profissional encontrado.
                </div>
            `;

            atualizarChat(null);
            atualizarIndicadores();

            return;
        }

        if (indiceCentral >= profissionaisFiltrados.length) {
            indiceCentral = 0;
        }

        const esquerda = obterProfissional(indiceCentral - 1);
        const centro = obterProfissional(indiceCentral);
        const direita = obterProfissional(indiceCentral + 1);

        const cardEsquerda = criarCard(
            esquerda,
            "card-esquerda",
            indiceValido(indiceCentral - 1)
        );

        const cardCentro = criarCard(
            centro,
            "card-centro",
            indiceValido(indiceCentral)
        );

        const cardDireita = criarCard(
            direita,
            "card-direita",
            indiceValido(indiceCentral + 1)
        );

        carrossel.appendChild(cardEsquerda);
        carrossel.appendChild(cardCentro);
        carrossel.appendChild(cardDireita);

        atualizarChat(centro);
        atualizarIndicadores();

        adicionarEventosCards();

        if (animar) {

            carrossel.classList.remove("mudando");

            void carrossel.offsetWidth;

            carrossel.classList.add("mudando");

        }
    }

    function selecionarProfissional(indice, animar = true) {

        if (profissionaisFiltrados.length === 0) {
            return;
        }

        indiceCentral = indiceValido(indice);

        atualizarCards(animar);
    }

    function adicionarEventosCards() {

        const cardEsquerda = carrossel.querySelector(".card-esquerda");
        const cardCentro = carrossel.querySelector(".card-centro");
        const cardDireita = carrossel.querySelector(".card-direita");

        if (cardEsquerda) {

            cardEsquerda.addEventListener("mouseenter", function () {

                const indice = Number(cardEsquerda.dataset.indice);

                selecionarProfissional(indice);

            });

        }

        if (cardDireita) {

            cardDireita.addEventListener("mouseenter", function () {

                const indice = Number(cardDireita.dataset.indice);

                selecionarProfissional(indice);

            });

        }

        const cards = carrossel.querySelectorAll(".card-profissional");

        cards.forEach(function (card) {

            card.addEventListener("click", function (evento) {

                const botao = evento.target.closest(".botao-perfil");

                if (botao) {
                    abrirPerfil(botao.dataset.profissional);
                    return;
                }

                const indice = Number(card.dataset.indice);

                selecionarProfissional(indice);

            });

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
            `${profissional.localizacao}`
        );
    }

    function aplicarFiltros() {

        profissionaisFiltrados = profissionais.filter(function (profissional) {

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

        indiceCentral = profissionaisFiltrados.length > 1 ? 1 : 0;

        atualizarCards(false);
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

            const indiceOriginal = Number(indicador.dataset.indice);

            const profissional = profissionais[indiceOriginal];

            if (!profissional) {
                return;
            }

            const indiceFiltrado = profissionaisFiltrados.findIndex(function (item) {
                return item.id === profissional.id;
            });

            if (indiceFiltrado !== -1) {
                selecionarProfissional(indiceFiltrado);
            }

        });

    });

    sugestoes.forEach(function (botao) {

        botao.addEventListener("click", function () {

            mensagemChat.value = botao.textContent.trim();

            mensagemChat.focus();

        });

    });

    formChat.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const texto = mensagemChat.value.trim();

        if (texto === "") {
            return;
        }

        const mensagemUsuario = document.createElement("div");

        mensagemUsuario.style.cssText = `
            display:flex;
            justify-content:flex-end;
            margin-top:14px;
        `;

        mensagemUsuario.innerHTML = `
            <div style="
                max-width:80%;
                padding:10px 12px;
                border-radius:12px 12px 3px 12px;
                background:linear-gradient(135deg,#087cf0,#7147e8);
                color:#fff;
                font-size:10px;
                line-height:1.5;
            ">
                ${escaparHTML(texto)}
            </div>
        `;

        mensagensChat.appendChild(mensagemUsuario);

        mensagemChat.value = "";

        mensagensChat.scrollTop = mensagensChat.scrollHeight;

    });

    function escaparHTML(texto) {

        const div = document.createElement("div");

        div.textContent = texto;

        return div.innerHTML;
    }

    atualizarCards(false);

});