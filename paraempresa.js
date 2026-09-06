/* =========================================================
   EFEITO DOS CARDS
========================================================= */

const cards = document.querySelectorAll(".card");


cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-6px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});



/* =========================================================
   EFEITO DO BOTÃO
========================================================= */

const botao = document.querySelector(".botao-vaga");


if (botao) {

    botao.addEventListener("mouseenter", () => {

        botao.style.transform = "translateY(-3px)";

    });


    botao.addEventListener("mouseleave", () => {

        botao.style.transform = "translateY(0)";

    });

}
