/* =========================================================
   CARDS
========================================================= */

const cards = document.querySelectorAll(".card");


cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-7px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});


/* =========================================================
   BOTÃO — ATUALIZAR CURRÍCULO
========================================================= */

function abrirCurriculo() {

    window.location.href = "#";
    
}


/* =========================================================
   BOTÃO — PROCURAR OPORTUNIDADES
========================================================= */

function procurarOportunidades() {

    /*
        AQUI VOCÊ PODE COLOCAR A PÁGINA
        DE PESQUISA DE VAGAS.

        Exemplo:

        window.location.href = "oportunidades.html";
    */

    alert(
        "Aqui você pode colocar a página de oportunidades!"
    );
}


/* =========================================================
   ANIMAÇÃO SUAVE DOS CARDS
========================================================= */

const observador = new IntersectionObserver(
    (entradas) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("aparecer");

            }

        });

    },
    {
        threshold: 0.1
    }
);


cards.forEach(card => {

    observador.observe(card);

});
