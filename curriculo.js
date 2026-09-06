/* =====================================================
   EFEITO NOS CARDS
===================================================== */

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-7px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});


/* =====================================================
   EFEITO NOS APLICATIVOS
===================================================== */

const aplicativos = document.querySelectorAll(".app");

aplicativos.forEach(app => {

    app.addEventListener("mouseenter", () => {

        app.style.transform = "translateY(-5px)";

    });


    app.addEventListener("mouseleave", () => {

        app.style.transform = "translateY(0)";

    });

});


/* =====================================================
   ANIMAÇÃO SUAVE AO ENTRAR NA PÁGINA
===================================================== */

window.addEventListener("load", () => {

    const elementos = document.querySelectorAll(
        ".introducao, .card, .dica-pdf, footer"
    );


    elementos.forEach((elemento, index) => {

        elemento.style.opacity = "0";

        elemento.style.transform = "translateY(15px)";


        setTimeout(() => {

            elemento.style.transition =
                "opacity .6s ease, transform .6s ease";

            elemento.style.opacity = "1";

            elemento.style.transform = "translateY(0)";

        }, index * 80);

    });

});
