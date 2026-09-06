const elementos = document.querySelectorAll("[data-node]");
const cards = document.querySelectorAll(".card");

function selecionar(nome) {

    elementos.forEach((elemento) => {
        elemento.classList.remove("active");

        if (elemento.dataset.node === nome) {
            elemento.classList.add("active");
        }
    });

}


// Elementos da direita

elementos.forEach((elemento) => {

    elemento.addEventListener("mouseenter", () => {
        selecionar(elemento.dataset.node);
    });

    elemento.addEventListener("click", () => {
        selecionar(elemento.dataset.node);
    });

});


// Cards da esquerda

cards.forEach((card) => {

    card.addEventListener("click", () => {

        selecionar(card.dataset.node);

        document.querySelector(".network").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});


selecionar("central");
