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

    window.location.href = "perfil.html";
    
}


/* =========================================================
   BOTÃO — PROCURAR OPORTUNIDADES
========================================================= */

function procurarOportunidades() {

    alert(
        window.location.href = "empresa.html";
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
