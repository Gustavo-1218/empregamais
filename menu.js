document.addEventListener("DOMContentLoaded", function () {

    const localMenu = document.getElementById("menu");

    if (!localMenu) {
        return;
    }


    fetch("menu.html")

        .then(function (resposta) {

            if (!resposta.ok) {

                throw new Error(
                    "Não foi possível carregar o menu."
                );

            }

            return resposta.text();

        })

        .then(function (menu) {

            localMenu.innerHTML = menu;

            ativarMenuMobile();

            marcarPaginaAtual();

        })

        .catch(function (erro) {

            console.error(
                "Erro ao carregar o menu:",
                erro
            );

        });

});


/* =========================
   MENU MOBILE
   ========================= */

function ativarMenuMobile() {

    const botao =
        document.getElementById(
            "botao-menu-mobile"
        );

    const menu =
        document.getElementById(
            "menu-mobile"
        );


    if (!botao || !menu) {
        return;
    }


    botao.addEventListener(
        "click",
        function () {

            const estaAberto =
                menu.classList.toggle("aberto");


            botao.setAttribute(
                "aria-expanded",
                estaAberto
            );

        }
    );

}


/* =========================
   IDENTIFICAR PÁGINA ATUAL
   ========================= */

function marcarPaginaAtual() {

    let paginaAtual =
        window.location.pathname
        .split("/")
        .pop();


    /*
       Quando o endereço termina apenas
       com uma barra, consideramos index.html.
    */

    if (
        paginaAtual === "" ||
        paginaAtual === "/"
    ) {

        paginaAtual = "index.html";

    }


    /* MENU DESKTOP */

    const linksDesktop =
        document.querySelectorAll(
            ".lista-menu a"
        );


    linksDesktop.forEach(
        function (link) {

            const endereco =
                link.getAttribute("href");


            if (
                endereco === paginaAtual
            ) {

                link.classList.add("ativo");

            }

        }
    );


    /* MENU MOBILE */

    const linksMobile =
        document.querySelectorAll(
            ".menu-mobile a"
        );


    linksMobile.forEach(
        function (link) {

            const endereco =
                link.getAttribute("href");


            if (
                endereco === paginaAtual
            ) {

                link.classList.add("ativo");

            }

        }
    );

}
