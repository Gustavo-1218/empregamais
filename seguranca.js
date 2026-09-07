/* =========================================================
   BOTÃO VOLTAR
========================================================= */

function voltarParaDicas() {
  
    window.history.back();
}


/* =========================================================
   EFEITO NOS CARDS
========================================================= */

const cards = document.querySelectorAll(".card");


cards.forEach(function(card) {

    card.addEventListener("mouseenter", function() {

        card.style.transition = "0.35s";

    });

});


/* =========================================================
   ANIMAÇÃO QUANDO A PÁGINA CARREGA
========================================================= */

window.addEventListener("load", function() {

    document.querySelector(".hero").classList.add("carregado");

});
