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

            ativarTema();

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


/* =========================================================
   TEMA CLARO / ESCURO
   ========================================================= */

function ativarTema() {

    const botaoDesktop =
        document.getElementById("botao-tema");

    const botaoMobile =
        document.getElementById("botao-tema-mobile");


    if (!botaoDesktop && !botaoMobile) {
        return;
    }


    /* Verifica se existe um tema salvo */

    const temaSalvo =
        localStorage.getItem("nextwork-tema");


    if (temaSalvo === "escuro") {

        document.documentElement.setAttribute(
            "data-tema",
            "escuro"
        );

    }


    atualizarBotoesTema();


    /* Botão desktop */

    if (botaoDesktop) {

        botaoDesktop.addEventListener(
            "click",
            alternarTema
        );

    }


    /* Botão mobile */

    if (botaoMobile) {

        botaoMobile.addEventListener(
            "click",
            alternarTema
        );

    }

}


/* =========================================================
   ALTERNAR TEMA
   ========================================================= */

function alternarTema() {

    const temaAtual =
        document.documentElement.getAttribute(
            "data-tema"
        );


    if (temaAtual === "escuro") {

        /* Modo claro */

        document.documentElement.removeAttribute(
            "data-tema"
        );

        localStorage.setItem(
            "nextwork-tema",
            "claro"
        );


    } else {

        /* Modo escuro */

        document.documentElement.setAttribute(
            "data-tema",
            "escuro"
        );

        localStorage.setItem(
            "nextwork-tema",
            "escuro"
        );

    }


    atualizarBotoesTema();

}


/* =========================================================
   ATUALIZAR OS BOTÕES
   ========================================================= */

function atualizarBotoesTema() {

    const botoes = [
        document.getElementById("botao-tema"),
        document.getElementById("botao-tema-mobile")
    ];


    const estaEscuro =
        document.documentElement.getAttribute(
            "data-tema"
        ) === "escuro";


    botoes.forEach(function (botao) {

        if (!botao) {
            return;
        }


        const icone =
            botao.querySelector("i");

        const texto =
            botao.querySelector("span");


        if (estaEscuro) {

            if (icone) {
                icone.className =
                    "fa-solid fa-sun";
            }

            if (texto) {
                texto.textContent =
                    "Modo claro";
            }

            botao.setAttribute(
                "aria-label",
                "Ativar modo claro"
            );

            botao.setAttribute(
                "aria-pressed",
                "true"
            );


        } else {

            if (icone) {
                icone.className =
                    "fa-solid fa-moon";
            }

            if (texto) {
                texto.textContent =
                    "Modo escuro";
            }

            botao.setAttribute(
                "aria-label",
                "Ativar modo escuro"
            );

            botao.setAttribute(
                "aria-pressed",
                "false"
            );

        }

    });

}