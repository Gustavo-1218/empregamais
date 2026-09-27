document.addEventListener("DOMContentLoaded", function () {

    const lateral = document.getElementById("menu-lateral");

    if (!lateral) return;


    fetch("menu lateral.html")

        .then(function (resposta) {

            if (!resposta.ok) {
                throw new Error("Não foi possível carregar o menu lateral.");
            }

            return resposta.text();

        })

        .then(function (conteudo) {

            lateral.innerHTML = conteudo;

            marcarPaginaAtual();

            ativarTrocaDeFoto();

        })

        .catch(function (erro) {

            console.error("Erro no menu lateral:", erro);

        });

});


function marcarPaginaAtual() {

    const paginaAtual =
        window.location.pathname.split("/").pop();

    const links =
        document.querySelectorAll(".sidebar-link");


    links.forEach(function (link) {

        const paginaLink =
            link.getAttribute("href");


        if (paginaLink === paginaAtual) {

            link.classList.add("active");

        }

    });

}


function ativarTrocaDeFoto() {

    const botao =
        document.getElementById("changePhotoBtn");

    const input =
        document.getElementById("photoInput");

    const foto =
        document.getElementById("photoCircle");


    if (!botao || !input || !foto) return;


    botao.addEventListener("click", function () {

        input.click();

    });


    input.addEventListener("change", function () {

        const arquivo = input.files[0];

        if (!arquivo) return;


        const imagem =
            document.createElement("img");

        imagem.src =
            URL.createObjectURL(arquivo);


        foto.innerHTML = "";

        foto.appendChild(imagem);

    });

}