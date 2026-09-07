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


/* =========================================================
   MENU MOBILE
   ========================================================= */

function ativarMenuMobile() {

    const botao =
        document.getElementById("botao-menu-mobile");

    const menu =
        document.getElementById("menu-mobile");


    if (!botao || !menu) {
        return;
    }


    botao.addEventListener("click", function () {

        const estaAberto =
            menu.classList.toggle("aberto");


        botao.setAttribute(
            "aria-expanded",
            estaAberto
        );


        if (estaAberto) {

            botao.setAttribute(
                "aria-label",
                "Fechar menu"
            );

        } else {

            botao.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    });


    /* Fecha o menu quando clicar em um link */

    const links =
        menu.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                menu.classList.remove("aberto");

                botao.setAttribute(
                    "aria-expanded",
                    "false"
                );

                botao.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            }
        );

    });

}


/* =========================================================
   MARCAR PÁGINA ATUAL
   ========================================================= */

function marcarPaginaAtual() {

    let paginaAtual =
        window.location.pathname
            .split("/")
            .pop();


    /* Caso esteja na página inicial */

    if (
        paginaAtual === "" ||
        paginaAtual === "/"
    ) {

        paginaAtual = "index.html";

    }


    /* Links do desktop */

    const linksDesktop =
        document.querySelectorAll(
            ".lista-menu a"
        );


    linksDesktop.forEach(function (link) {

        const endereco =
            link.getAttribute("href");


        if (
            endereco === paginaAtual
        ) {

            link.classList.add("ativo");

        }

    });


    /* Links do mobile */

    const linksMobile =
        document.querySelectorAll(
            ".menu-mobile ul a"
        );


    linksMobile.forEach(function (link) {

        const endereco =
            link.getAttribute("href");


        if (
            endereco === paginaAtual
        ) {

            link.classList.add("ativo");

        }

    });

}