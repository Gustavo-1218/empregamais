/* =========================
   ANIMAÇÃO AO APARECER
========================= */

const elementos = document.querySelectorAll(
    ".beneficio, .passo"
);

const observador = new IntersectionObserver(
    function (entradas) {

        entradas.forEach(function (entrada) {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("apareceu");

            }

        });

    },
    {
        threshold: 0.15
    }
);


elementos.forEach(function (elemento) {

    observador.observe(elemento);

});


/* =========================
   BOTÕES DOS CARDS
========================= */

const botoes = document.querySelectorAll(
    ".botao-card"
);

botoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const mensagem =
            botao.getAttribute("data-mensagem");

        mostrarMensagem(mensagem);

    });

});


/* =========================
   MENSAGEM
========================= */

function mostrarMensagem(texto) {

    const mensagemAntiga =
        document.querySelector(".mensagem-site");

    if (mensagemAntiga) {
        mensagemAntiga.remove();
    }


    const mensagem =
        document.createElement("div");

    mensagem.classList.add("mensagem-site");

    mensagem.innerHTML = `
        <span>✦</span>
        <p>${texto}</p>
    `;


    document.body.appendChild(mensagem);


    setTimeout(function () {

        mensagem.classList.add("mostrar");

    }, 50);


    setTimeout(function () {

        mensagem.classList.remove("mostrar");

        setTimeout(function () {
            mensagem.remove();
        }, 300);

    }, 4000);

}


/* =========================
   ESTILO DA MENSAGEM
========================= */

const estiloMensagem =
    document.createElement("style");

estiloMensagem.innerHTML = `

    .mensagem-site {
        position: fixed;

        left: 50%;
        bottom: 30px;

        transform:
            translate(-50%, 30px);

        opacity: 0;

        z-index: 9999;

        display: flex;

        align-items: center;

        gap: 12px;

        width: min(450px, 90%);

        padding: 16px 20px;

        border-radius: 14px;

        background: rgba(10, 12, 29, 0.95);

        border:
            1px solid rgba(110, 100, 255, 0.35);

        box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.45);

        backdrop-filter: blur(15px);

        transition: 0.3s ease;
    }


    .mensagem-site.mostrar {
        transform:
            translate(-50%, 0);

        opacity: 1;
    }


    .mensagem-site span {
        width: 35px;
        height: 35px;

        display: flex;

        align-items: center;
        justify-content: center;

        flex-shrink: 0;

        border-radius: 9px;

        background: #655cff;

        color: white;
    }


    .mensagem-site p {
        color: #d3d5df;

        font-size: 13px;

        line-height: 1.5;
    }

`;

document.head.appendChild(estiloMensagem);


/* =========================
   EFEITO NA MULHER
========================= */

const mulher =
    document.querySelector(".mulher");

const imagemPrincipal =
    document.querySelector(".imagem-principal");


if (mulher && imagemPrincipal) {

    imagemPrincipal.addEventListener(
        "mousemove",
        function (evento) {

            if (window.innerWidth <= 650) {
                return;
            }

            const rect =
                imagemPrincipal.getBoundingClientRect();

            const x =
                evento.clientX - rect.left;

            const y =
                evento.clientY - rect.top;


            const centroX =
                rect.width / 2;

            const centroY =
                rect.height / 2;


            const movimentoX =
                (x - centroX) / 30;

            const movimentoY =
                (y - centroY) / 40;


            mulher.style.transform =
                `translate(${movimentoX}px, ${movimentoY}px)`;

        }
    );


    imagemPrincipal.addEventListener(
        "mouseleave",
        function () {

            mulher.style.transform =
                "translate(0, 0)";

        }
    );

}


/* =========================
   LINKS INTERNOS
========================= */

const links =
    document.querySelectorAll(
        'a[href^="#"]'
    );


links.forEach(function (link) {

    link.addEventListener(
        "click",
        function (evento) {

            const destino =
                link.getAttribute("href");

            if (destino === "#") {
                return;
            }


            const elemento =
                document.querySelector(destino);

            if (!elemento) {
                return;
            }


            evento.preventDefault();


            elemento.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});
