/* =========================================
   ANIMAÇÃO DOS CARDS
========================================= */

const cards = document.querySelectorAll(".tip-card");

cards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {

        card.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, 150 + (index * 100));

});


/* =========================================
   HOVER DOS ÍCONES FLUTUANTES
========================================= */

const icons =
    document.querySelectorAll(".floating-icon");

icons.forEach(icon => {

    icon.addEventListener("mouseenter", () => {

        icon.style.boxShadow =
            "0 0 25px currentColor";

    });

    icon.addEventListener("mouseleave", () => {

        icon.style.boxShadow = "none";

    });

});


/* =========================================
   ANIMAÇÃO DA LÂMPADA
========================================= */

const lampada =
    document.querySelector(".lampada-container");

if (lampada) {

    lampada.addEventListener("mouseenter", () => {

        lampada.classList.add("lampada-hover");

    });

    lampada.addEventListener("mouseleave", () => {

        lampada.classList.remove("lampada-hover");

    });

}


/* =========================================
   LINKS DAS DICAS
========================================= */

/*
   Não usamos alert() aqui.

   O link do HTML já direciona
   diretamente para a página correta.

   Exemplo:

   dica.html?dica=curriculo
*/


const links =
    document.querySelectorAll(".tip-link");

links.forEach(link => {

    link.addEventListener("mouseenter", () => {

        link.querySelector("span").style
            .transform = "translateX(5px)";

    });

    link.addEventListener("mouseleave", () => {

        link.querySelector("span").style
            .transform = "translateX(0)";

    });

});
