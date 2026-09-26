document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ANIMAÇÃO INICIAL DO HERO
    // ==========================================

    const heroTexto = document.querySelector(".hero-texto");
    const heroVisual = document.querySelector(".hero-visual");

    if (heroTexto) {
        heroTexto.classList.add("hero-aparecer");
    }

    if (heroVisual) {
        heroVisual.classList.add("hero-aparecer");
    }


    // ==========================================
    // CONTADOR DE OPORTUNIDADES
    // ==========================================

    const contador = document.getElementById("total-oportunidades");

    if (contador) {

        const numeroFinal = 10000;
        const duracao = 1800;
        const inicio = performance.now();

        function animarContador(tempoAtual) {

            const progresso =
                Math.min((tempoAtual - inicio) / duracao, 1);

            const valor =
                Math.floor(progresso * numeroFinal);

            contador.textContent =
                "+" + valor.toLocaleString("pt-BR");

            if (progresso < 1) {
                requestAnimationFrame(animarContador);
            }

        }

        requestAnimationFrame(animarContador);
    }


    // ==========================================
    // ANIMAÇÃO DAS SEÇÕES AO ROLAR
    // ==========================================

    const elementos =
        document.querySelectorAll(
            ".secao-vagas, .secao-destaques, .secao-profissionais"
        );

    const observador =
        new IntersectionObserver(function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add(
                        "secao-visivel"
                    );

                    observador.unobserve(
                        entrada.target
                    );
                }

            });

        }, {
            threshold: 0.15
        });


    elementos.forEach(function (elemento) {
        elemento.classList.add("secao-escondida");
        observador.observe(elemento);
    });


    // ==========================================
    // MICROINTERAÇÃO DOS CARDS
    // ==========================================

    const cards =
        document.querySelectorAll(
            ".card-vaga, .card-destaque, .card-profissional"
        );

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.classList.add("card-interagindo");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("card-interagindo");
        });

    });


    // ==========================================
    // BARRA DE BUSCA
    // ==========================================

    const camposBusca =
        document.querySelectorAll(".campo-busca");

    camposBusca.forEach(function (campo) {

        campo.addEventListener("focusin", function () {
            campo.classList.add("campo-busca-ativo");
        });

        campo.addEventListener("focusout", function () {
            campo.classList.remove("campo-busca-ativo");
        });

    });


    // ==========================================
    // ELEMENTOS FLUTUANTES DO HERO
    // ==========================================

    const elementosFlutuantes =
        document.querySelectorAll(
            ".elemento-flutuante"
        );

    elementosFlutuantes.forEach(function (elemento, indice) {

        elemento.style.animationDelay =
            (indice * 0.25) + "s";

        elemento.classList.add(
            "elemento-flutuante-animado"
        );

    });


    console.log("NEXT WORK — interações visuais carregadas.");

});
