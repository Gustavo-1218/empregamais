document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       NEXT WORK — MAIS.JS
       Interações, animações, busca e efeitos visuais
       ========================================================= */


    /* =========================================================
       1. DADOS DAS VAGAS
       ========================================================= */

    const vagas = [
        {
            titulo: "Desenvolvedor Front-End",
            empresa: "Tech Solutions",
            localizacao: "Natal - RN",
            salario: "A combinar",
            habilidades: ["HTML", "CSS", "JavaScript"],
            imagem: "paper.png"
        },
        {
            titulo: "Analista de Marketing",
            empresa: "Agência Criativa",
            localizacao: "Remoto",
            salario: "A combinar",
            habilidades: ["Marketing", "Comunicação", "SEO"],
            imagem: "lamp.png"
        },
        {
            titulo: "Assistente Administrativo",
            empresa: "Empresa Parceira",
            localizacao: "Extremoz - RN",
            salario: "A combinar",
            habilidades: ["Office", "Organização", "Atendimento"],
            imagem: "dados.png"
        },
        {
            titulo: "Designer Gráfico",
            empresa: "Studio Criativo",
            localizacao: "Natal - RN",
            salario: "A combinar",
            habilidades: ["Photoshop", "Illustrator", "Design"],
            imagem: "empresas.png"
        }
    ];


    /* =========================================================
       2. DADOS DOS PROFISSIONAIS
       ========================================================= */

    const profissionais = [
        {
            nome: "Gaby",
            profissao: "Designer",
            localizacao: "Natal - RN",
            habilidades: ["UI/UX", "Figma", "Photoshop"],
            foto: "gabyfoto.jpeg"
        },
        {
            nome: "Henry",
            profissao: "Desenvolvedor Full Stack",
            localizacao: "Natal - RN",
            habilidades: ["JavaScript", "React", "Node.js"],
            foto: "henryfoto.jpeg"
        },
        {
            nome: "Eduarda",
            profissao: "Assistente Virtual",
            localizacao: "Natal - RN",
            habilidades: ["Administração", "Office", "Comunicação"],
            foto: "eduardafoto.jpeg"
        },
        {
            nome: "Julya Mizraim",
            profissao: "Analista de Dados",
            localizacao: "Natal - RN",
            habilidades: ["Python", "SQL", "Power BI"],
            foto: "julyafoto.jpeg"
        }
    ];


    /* =========================================================
       3. ESTILOS DAS INTERAÇÕES
       O JS injeta estes estilos automaticamente.
       ========================================================= */

    const estilos = document.createElement("style");

    estilos.textContent = `

        /* ==============================================
           HERO — ENTRADA
           ============================================== */

        .nw-entrada {
            opacity: 0;
            transform: translateY(25px);
            transition:
                opacity 0.9s ease,
                transform 0.9s ease;
        }

        .nw-entrada.visivel {
            opacity: 1;
            transform: translateY(0);
        }


        /* ==============================================
           ELEMENTOS FLUTUANTES
           ============================================== */

        .elemento-flutuante {
            will-change: transform;
        }

        .nw-flutuante-1 {
            animation: nwFlutuar 4s ease-in-out infinite;
        }

        .nw-flutuante-2 {
            animation: nwFlutuar 4.8s ease-in-out infinite;
            animation-delay: .7s;
        }

        @keyframes nwFlutuar {

            0% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(-9px);
            }

            100% {
                transform: translateY(0);
            }

        }


        /* ==============================================
           PONTOS DO HERO
           ============================================== */

        .hero-ponto-decorativo {
            animation: nwPulso 2.8s ease-in-out infinite;
        }

        .hero-ponto-2 {
            animation-delay: .7s;
        }

        .hero-ponto-3 {
            animation-delay: 1.4s;
        }

        @keyframes nwPulso {

            0%, 100% {
                opacity: .45;
                transform: scale(1);
            }

            50% {
                opacity: 1;
                transform: scale(1.35);
            }

        }


        /* ==============================================
           SEÇÕES AO ROLAR
           ============================================== */

        .nw-scroll {
            opacity: 0;
            transform: translateY(35px);
            transition:
                opacity .8s ease,
                transform .8s ease;
        }

        .nw-scroll.visivel {
            opacity: 1;
            transform: translateY(0);
        }


        /* ==============================================
           CARDS
           ============================================== */

        .card-vaga,
        .card-destaque,
        .card-profissional {
            will-change: transform;
        }

        .nw-card-ativo {
            transform: translateY(-6px);
        }


        /* ==============================================
           IMAGENS DOS PROFISSIONAIS
           ============================================== */

        .card-profissional img {
            transition:
                transform .45s ease,
                filter .45s ease;
        }

        .nw-card-profissional-hover img {
            transform: scale(1.045);
            filter: brightness(1.08);
        }


        /* ==============================================
           ÍCONES DOS CARDS DE DESTAQUE
           ============================================== */

        .card-destaque img {
            transition:
                transform .35s ease;
        }

        .nw-destaque-hover img {
            transform: scale(1.08);
        }


        /* ==============================================
           LINKS
           ============================================== */

        .card-vaga a,
        .card-destaque a,
        .card-profissional a {
            transition:
                transform .3s ease,
                gap .3s ease;
        }

        .nw-link-hover {
            transform: translateX(4px);
        }


        /* ==============================================
           BARRA DE BUSCA
           ============================================== */

        .campo-busca {
            transition:
                transform .25s ease,
                box-shadow .25s ease,
                border-color .25s ease;
        }

        .nw-busca-ativa {
            transform: translateY(-2px);
            box-shadow:
                0 0 22px rgba(0, 221, 255, .18);
        }


        /* ==============================================
           BOTÃO DE BUSCA
           ============================================== */

        .botao-busca {
            transition:
                transform .25s ease,
                box-shadow .25s ease;
        }

        .nw-botao-hover {
            transform: translateY(-2px);
            box-shadow:
                0 0 24px rgba(0, 221, 255, .28);
        }


        /* ==============================================
           SUGESTÕES
           ============================================== */

        .nw-sugestoes {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            width: 100%;
            z-index: 999;
            padding: 7px;
            border: 1px solid rgba(0, 221, 255, .18);
            border-radius: 14px;
            background: rgba(3, 10, 25, .97);
            box-shadow:
                0 15px 40px rgba(0, 0, 0, .35),
                0 0 25px rgba(0, 150, 255, .08);
            backdrop-filter: blur(18px);
            opacity: 0;
            transform: translateY(-7px);
            pointer-events: none;
            transition:
                opacity .2s ease,
                transform .2s ease;
        }

        .nw-sugestoes.visivel {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        .nw-sugestao {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            padding: 11px 12px;
            border: 0;
            border-radius: 9px;
            background: transparent;
            color: #fff;
            text-align: left;
            cursor: pointer;
            transition:
                background .2s ease,
                transform .2s ease;
        }

        .nw-sugestao:hover {
            background: rgba(0, 221, 255, .08);
            transform: translateX(3px);
        }

        .nw-sugestao i {
            color: #00ddff;
            width: 18px;
        }

        .nw-sugestao-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .nw-sugestao-info strong {
            font-size: 13px;
        }

        .nw-sugestao-info span {
            font-size: 11px;
            opacity: .55;
        }


        /* ==============================================
           HISTÓRICO
           ============================================== */

        .nw-historico {
            margin-top: 10px;
            display: none;
            flex-wrap: wrap;
            gap: 7px;
        }

        .nw-historico.visivel {
            display: flex;
        }

        .nw-historico-item {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 7px 10px;
            border: 1px solid rgba(255,255,255,.08);
            border-radius: 20px;
            background: rgba(255,255,255,.035);
            color: rgba(255,255,255,.7);
            font-size: 11px;
            cursor: pointer;
            transition:
                border-color .2s ease,
                background .2s ease,
                transform .2s ease;
        }

        .nw-historico-item:hover {
            transform: translateY(-2px);
            border-color: rgba(0,221,255,.35);
            background: rgba(0,221,255,.06);
        }


        /* ==============================================
           RESULTADOS
           ============================================== */

        .nw-resultado-vazio {
            grid-column: 1 / -1;
            padding: 45px 20px;
            text-align: center;
            border: 1px solid rgba(0,221,255,.12);
            border-radius: 18px;
            background: rgba(4,14,30,.65);
            animation: nwEntradaResultado .45s ease;
        }

        .nw-resultado-vazio i {
            display: block;
            margin-bottom: 12px;
            font-size: 30px;
            color: #00ddff;
        }

        .nw-resultado-vazio strong {
            display: block;
            margin-bottom: 7px;
            font-size: 16px;
        }

        .nw-resultado-vazio span {
            opacity: .55;
            font-size: 13px;
        }

        @keyframes nwEntradaResultado {
            from {
                opacity: 0;
                transform: translateY(12px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }


        /* ==============================================
           FAVORITOS
           ============================================== */

        .nw-favorito-ativo {
            animation: nwFavorito .35s ease;
        }

        @keyframes nwFavorito {

            0% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.2);
            }

            100% {
                transform: scale(1);
            }

        }


        /* ==============================================
           FOTO / PREVIEW
           ============================================== */

        .nw-preview-foto {
            max-width: 160px;
            max-height: 160px;
            border-radius: 50%;
            object-fit: cover;
            animation: nwFotoEntrada .45s ease;
        }

        @keyframes nwFotoEntrada {

            from {
                opacity: 0;
                transform: scale(.85);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }

        }


        /* ==============================================
           ACESSIBILIDADE
           ============================================== */

        @media (prefers-reduced-motion: reduce) {

            *,
            *::before,
            *::after {
                animation-duration: .01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: .01ms !important;
            }

        }

    `;

    document.head.appendChild(estilos);


    /* =========================================================
       4. ENTRADA DO HERO
       ========================================================= */

    const heroTexto = document.querySelector(".hero-texto");
    const heroVisual = document.querySelector(".hero-visual");

    if (heroTexto) {
        heroTexto.classList.add("nw-entrada");

        setTimeout(function () {
            heroTexto.classList.add("visivel");
        }, 100);
    }

    if (heroVisual) {
        heroVisual.classList.add("nw-entrada");

        setTimeout(function () {
            heroVisual.classList.add("visivel");
        }, 300);
    }


    /* =========================================================
       5. ELEMENTOS FLUTUANTES
       ========================================================= */

    const flutuantes =
        document.querySelectorAll(".elemento-flutuante");

    flutuantes.forEach(function (elemento, indice) {

        if (indice % 2 === 0) {
            elemento.classList.add("nw-flutuante-1");
        } else {
            elemento.classList.add("nw-flutuante-2");
        }

    });


    /* =========================================================
       6. ANIMAÇÃO DAS SEÇÕES AO ROLAR
       ========================================================= */

    const secoes =
        document.querySelectorAll(
            "main section:not(.hero)"
        );

    const observador =
        new IntersectionObserver(function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add(
                        "nw-scroll"
                    );

                    requestAnimationFrame(function () {

                        entrada.target.classList.add(
                            "visivel"
                        );

                    });

                    observador.unobserve(
                        entrada.target
                    );
                }

            });

        }, {
            threshold: 0.12
        });


    secoes.forEach(function (secao) {
        observador.observe(secao);
    });


    /* =========================================================
       7. MICROINTERAÇÕES DOS CARDS
       ========================================================= */

    const cards =
        document.querySelectorAll(
            ".card-vaga, .card-destaque, .card-profissional"
        );

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            card.classList.add("nw-card-ativo");

            if (card.classList.contains("card-profissional")) {
                card.classList.add(
                    "nw-card-profissional-hover"
                );
            }

            if (card.classList.contains("card-destaque")) {
                card.classList.add(
                    "nw-destaque-hover"
                );
            }

            const link =
                card.querySelector("a");

            if (link) {
                link.classList.add("nw-link-hover");
            }

        });


        card.addEventListener("mouseleave", function () {

            card.classList.remove("nw-card-ativo");
            card.classList.remove(
                "nw-card-profissional-hover"
            );
            card.classList.remove(
                "nw-destaque-hover"
            );

            const link =
                card.querySelector("a");

            if (link) {
                link.classList.remove("nw-link-hover");
            }

        });

    });


    /* =========================================================
       8. BARRA DE BUSCA
       ========================================================= */

    const camposBusca =
        document.querySelectorAll(".campo-busca");

    camposBusca.forEach(function (campo) {

        campo.addEventListener("focusin", function () {
            campo.classList.add("nw-busca-ativa");
        });

        campo.addEventListener("focusout", function () {
            campo.classList.remove("nw-busca-ativa");
        });

    });


    /* =========================================================
       9. BOTÃO DE BUSCA
       ========================================================= */

    const botaoBusca =
        document.getElementById("botao-busca");

    if (botaoBusca) {

        botaoBusca.addEventListener(
            "mouseenter",
            function () {
                botaoBusca.classList.add(
                    "nw-botao-hover"
                );
            }
        );

        botaoBusca.addEventListener(
            "mouseleave",
            function () {
                botaoBusca.classList.remove(
                    "nw-botao-hover"
                );
            }
        );

    }


    /* =========================================================
       10. CONTADOR +10.000
       ========================================================= */

    const contador =
        document.getElementById(
            "total-oportunidades"
        );

    if (contador) {

        const numeroFinal = 10000;
        const duracao = 1800;
        const inicio = performance.now();

        function animarContador(tempoAtual) {

            const progresso =
                Math.min(
                    (tempoAtual - inicio) / duracao,
                    1
                );

            const suavizado =
                1 - Math.pow(1 - progresso, 3);

            const valor =
                Math.floor(
                    suavizado * numeroFinal
                );

            contador.textContent =
                "+" +
                valor.toLocaleString("pt-BR");

            if (progresso < 1) {
                requestAnimationFrame(
                    animarContador
                );
            }

        }

        requestAnimationFrame(
            animarContador
        );
    }


    /* =========================================================
       11. BUSCA
       ========================================================= */

    const campoBusca =
        document.getElementById(
            "campo-busca"
        );

    const campoLocalizacao =
        document.getElementById(
            "campo-localizacao"
        );


    /* =========================================================
       13. FILTRAGEM DAS VAGAS
       ========================================================= */

    function buscarVagas() {

        if (!campoBusca) return;

        const termo =
            campoBusca.value
                .trim()
                .toLowerCase();

        const localizacao =
            campoLocalizacao
                ? campoLocalizacao.value
                    .trim()
                    .toLowerCase()
                : "";


        salvarHistorico(termo);


        const cardsVagas =
            document.querySelectorAll(
                ".card-vaga"
            );


        if (!cardsVagas.length) {

            console.log(
                "Busca realizada:",
                termo
            );

            return;

        }


        let encontrados = 0;


        cardsVagas.forEach(function (card, indice) {

            const vaga =
                vagas[indice];


            if (!vaga) return;


            const texto =
                (
                    vaga.titulo +
                    " " +
                    vaga.empresa +
                    " " +
                    vaga.localizacao +
                    " " +
                    vaga.habilidades.join(" ")
                ).toLowerCase();


            const correspondeTexto =
                !termo ||
                texto.includes(termo);


            const correspondeLocal =
                !localizacao ||
                vaga.localizacao
                    .toLowerCase()
                    .includes(localizacao);


            const mostrar =
                correspondeTexto &&
                correspondeLocal;


            if (mostrar) {

                card.style.display = "";

                setTimeout(function () {
                    card.classList.add(
                        "nw-card-ativo"
                    );
                }, 10);

                encontrados++;

            } else {

                card.style.display = "none";

            }

        });


        mostrarMensagemResultado(
            encontrados,
            cardsVagas.length
        );


        if (caixaSugestoes) {
            caixaSugestoes.classList.remove(
                "visivel"
            );
        }

    }


    if (botaoBusca) {

        botaoBusca.addEventListener(
            "click",
            buscarVagas
        );

    }


    if (campoBusca) {

        campoBusca.addEventListener(
            "keydown",
            function (evento) {

                if (evento.key === "Enter") {
                    evento.preventDefault();
                    buscarVagas();
                }

            }
        );

    }


    if (campoLocalizacao) {

        campoLocalizacao.addEventListener(
            "change",
            function () {

                if (
                    campoBusca &&
                    campoBusca.value.trim()
                ) {
                    buscarVagas();
                }

            }
        );

    }


    /* =========================================================
       14. MENSAGEM DE NENHUM RESULTADO
       ========================================================= */

    function mostrarMensagemResultado(
        encontrados,
        total
    ) {

        const container =
            document.querySelector(
                ".lista-vagas, .vagas-grid, .grid-vagas, .cards-vagas"
            );


        if (!container) return;


        const mensagemExistente =
            container.querySelector(
                ".nw-resultado-vazio"
            );


        if (encontrados === 0 && total > 0) {

            if (mensagemExistente) return;


            const mensagem =
                document.createElement("div");

            mensagem.className =
                "nw-resultado-vazio";

            mensagem.innerHTML = `
                <i class="fa-solid fa-magnifying-glass"></i>

                <strong>
                    Nenhuma oportunidade encontrada
                </strong>

                <span>
                    Tente outro cargo, palavra-chave
                    ou localização.
                </span>
            `;

            container.appendChild(
                mensagem
            );

        } else {

            if (mensagemExistente) {
                mensagemExistente.remove();
            }

        }

    }


    /* =========================================================
       15. HISTÓRICO DE BUSCAS
       ========================================================= */

    const CHAVE_HISTORICO =
        "nextwork_historico_buscas";


    function obterHistorico() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    CHAVE_HISTORICO
                )
            ) || [];

        } catch (erro) {

            return [];

        }

    }


    function salvarHistorico(termo) {

        if (!termo) return;


        let historico =
            obterHistorico();


        historico =
            historico.filter(function (item) {
                return item !== termo;
            });


        historico.unshift(
            termo
        );


        historico =
            historico.slice(0, 5);


        localStorage.setItem(
            CHAVE_HISTORICO,
            JSON.stringify(historico)
        );

    }


    /* =========================================================
       16. FECHAR SUGESTÕES AO CLICAR FORA
       ========================================================= */

    document.addEventListener(
        "click",
        function (evento) {

            if (
                caixaSugestoes &&
                !caixaSugestoes.contains(
                    evento.target
                ) &&
                evento.target !== campoBusca
            ) {

                caixaSugestoes.classList.remove(
                    "visivel"
                );

            }

        }
    );


    /* =========================================================
       17. FAVORITOS
       ========================================================= */

    let favoritos = 0;

    const botoesFavorito =
        document.querySelectorAll(
            ".botao-favorito, .favoritar, [data-favorito]"
        );


    botoesFavorito.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const ativo =
                    botao.classList.toggle(
                        "favorito-ativo"
                    );


                if (ativo) {

                    favoritos++;

                } else {

                    favoritos =
                        Math.max(
                            0,
                            favoritos - 1
                        );

                }


                botao.classList.add(
                    "nw-favorito-ativo"
                );


                setTimeout(function () {

                    botao.classList.remove(
                        "nw-favorito-ativo"
                    );

                }, 350);


                atualizarContadorFavoritos();

            }
        );

    });


    function atualizarContadorFavoritos() {

        const elementos =
            document.querySelectorAll(
                ".contador-favoritos, [data-contador-favoritos]"
            );


        elementos.forEach(function (elemento) {

            elemento.textContent =
                favoritos;

        });

    }


    /* =========================================================
       18. FOTO DE PERFIL / PREVIEW
       ========================================================= */

    const inputFoto =
        document.querySelector(
            "#foto-perfil, #input-foto-perfil, .input-foto-perfil"
        );


    const previewFoto =
        document.querySelector(
            "#preview-foto, .preview-foto, .foto-preview"
        );


    if (inputFoto && previewFoto) {

        inputFoto.addEventListener(
            "change",
            function () {

                const arquivo =
                    inputFoto.files[0];


                if (!arquivo) return;


                if (
                    !arquivo.type.startsWith(
                        "image/"
                    )
                ) {
                    return;
                }


                const leitor =
                    new FileReader();


                leitor.onload =
                    function (evento) {

                        previewFoto.src =
                            evento.target.result;

                        previewFoto.classList.add(
                            "nw-preview-foto"
                        );

                    };


                leitor.readAsDataURL(
                    arquivo
                );

            }
        );

    }


    /* =========================================================
       19. ESCONDER SUGESTÕES COM ESC
       ========================================================= */

    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key === "Escape" &&
                caixaSugestoes
            ) {

                caixaSugestoes.classList.remove(
                    "visivel"
                );

            }

        }
    );


    /* =========================================================
       20. MOVIMENTO SUTIL DOS PONTOS DO HERO
       ========================================================= */

    const pontosHero =
        document.querySelectorAll(
            ".hero-ponto-decorativo"
        );


    pontosHero.forEach(function (ponto, indice) {

        ponto.style.animationDelay =
            (indice * 0.6) + "s";

    });


    /* =========================================================
       21. INICIALIZAÇÃO
       ========================================================= */

    console.log(
        "NEXT WORK — sistema visual carregado."
    );

    console.log(
        "Vagas:",
        vagas.length
    );

    console.log(
        "Profissionais:",
        profissionais.length
    );

});