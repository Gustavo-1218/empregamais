document.addEventListener("DOMContentLoaded", function () {

    const opcoes = document.querySelectorAll("[data-grupo]");
    const interesses = document.querySelectorAll(".interesse-card");
    const salvar = document.getElementById("salvar-preferencias");

    carregarPreferencias();


    /* ==============================
       OPÇÕES
    ============================== */

    opcoes.forEach(function (opcao) {

        opcao.addEventListener("click", function () {

            const grupo = opcao.dataset.grupo;

            /*
             * Tipo, modalidade e localização
             * permitem múltiplas escolhas.
             */

            opcao.classList.toggle("selecionado");

            atualizarResumo();
        });

    });


    /* ==============================
       ÁREAS DE INTERESSE
    ============================== */

    interesses.forEach(function (interesse) {

        interesse.addEventListener("click", function () {

            interesse.classList.toggle("selecionado");

            atualizarResumo();

        });

    });


    /* ==============================
       SALVAR
    ============================== */

    salvar.addEventListener("click", function () {

        const preferencias = {
            tipo: obterSelecionados("tipo"),
            modalidade: obterSelecionados("modalidade"),
            localizacao: obterSelecionados("localizacao"),
            interesses: obterInteresses(),

            salarioMinimo:
                document.getElementById("salario-minimo").value,

            salarioMaximo:
                document.getElementById("salario-maximo").value,

            recomendacoes:
                document.getElementById("notificar-recomendacoes").checked,

            novasVagas:
                document.getElementById("notificar-vagas").checked
        };


        localStorage.setItem(
            "nextwork_preferencias",
            JSON.stringify(preferencias)
        );


        mostrarMensagem("Preferências salvas com sucesso!");

    });


    /* ==============================
       RESUMO
    ============================== */

    function atualizarResumo() {

        const resumo = document.getElementById("resumo-tags");

        resumo.innerHTML = "";

        const selecionados = [
            ...document.querySelectorAll(".selecionado")
        ];

        selecionados.forEach(function (item) {

            let texto = "";

            const strong = item.querySelector("strong");

            if (strong) {
                texto = strong.textContent;
            } else {
                texto = item.textContent.trim();
            }

            if (texto !== "") {

                const tag = document.createElement("span");

                tag.textContent = texto;

                resumo.appendChild(tag);
            }

        });


        const minimo =
            document.getElementById("salario-minimo").value;

        const maximo =
            document.getElementById("salario-maximo").value;


        if (minimo || maximo) {

            const tagSalario = document.createElement("span");

            tagSalario.textContent =
                "R$ " +
                formatarNumero(minimo) +
                " – R$ " +
                formatarNumero(maximo);

            resumo.appendChild(tagSalario);
        }

    }


    /* ==============================
       PEGAR SELECIONADOS
    ============================== */

    function obterSelecionados(grupo) {

        const selecionados =
            document.querySelectorAll(
                '[data-grupo="' + grupo + '"].selecionado'
            );

        return Array.from(selecionados).map(function (item) {

            const strong = item.querySelector("strong");

            if (strong) {
                return strong.textContent;
            }

            return item.textContent.trim();

        });

    }


    function obterInteresses() {

        return Array.from(
            document.querySelectorAll(".interesse-card.selecionado")
        ).map(function (item) {

            return item.textContent.trim();

        });

    }


    /* ==============================
       CARREGAR DADOS SALVOS
    ============================== */

    function carregarPreferencias() {

        const dados =
            localStorage.getItem("nextwork_preferencias");

        if (!dados) {

            selecionarPadrao();

            atualizarResumo();

            return;
        }


        const preferencias = JSON.parse(dados);


        restaurarGrupo("tipo", preferencias.tipo);
        restaurarGrupo("modalidade", preferencias.modalidade);
        restaurarGrupo("localizacao", preferencias.localizacao);


        document.querySelectorAll(".interesse-card")
            .forEach(function (card) {

                const nome = card.textContent.trim();

                if (preferencias.interesses.includes(nome)) {
                    card.classList.add("selecionado");
                }

            });


        document.getElementById("salario-minimo").value =
            preferencias.salarioMinimo || 1500;

        document.getElementById("salario-maximo").value =
            preferencias.salarioMaximo || 3000;


        document.getElementById("notificar-recomendacoes").checked =
            preferencias.recomendacoes !== false;

        document.getElementById("notificar-vagas").checked =
            preferencias.novasVagas !== false;


        atualizarResumo();

    }


    /* ==============================
       PREFERÊNCIAS PADRÃO
    ============================== */

    function selecionarPadrao() {

        selecionarPorTexto(
            "tipo",
            "Emprego"
        );

        selecionarPorTexto(
            "modalidade",
            "Híbrido"
        );

        selecionarPorTexto(
            "localizacao",
            "Natal"
        );

        selecionarInteresse(
            "Desenvolvimento Web"
        );

    }


    function selecionarPorTexto(grupo, texto) {

        document.querySelectorAll(
            '[data-grupo="' + grupo + '"]'
        ).forEach(function (item) {

            const strong = item.querySelector("strong");

            const nome = strong
                ? strong.textContent.trim()
                : item.textContent.trim();

            if (nome === texto) {
                item.classList.add("selecionado");
            }

        });

    }


    function selecionarInteresse(texto) {

        document.querySelectorAll(".interesse-card")
            .forEach(function (item) {

                if (item.textContent.trim() === texto) {
                    item.classList.add("selecionado");
                }

            });

    }


    /* ==============================
       RESTAURAR GRUPOS
    ============================== */

    function restaurarGrupo(grupo, valores) {

        if (!Array.isArray(valores)) return;

        document.querySelectorAll(
            '[data-grupo="' + grupo + '"]'
        ).forEach(function (item) {

            const strong = item.querySelector("strong");

            const nome = strong
                ? strong.textContent.trim()
                : item.textContent.trim();

            if (valores.includes(nome)) {
                item.classList.add("selecionado");
            }

        });

    }


    /* ==============================
       FORMATAÇÃO
    ============================== */

    function formatarNumero(numero) {

        if (!numero) return "0";

        return Number(numero).toLocaleString("pt-BR");

    }


    /* ==============================
       TOAST
    ============================== */

    function mostrarMensagem(texto) {

        const toast =
            document.getElementById("toast");

        toast.textContent = texto;

        toast.classList.add("mostrar");

        setTimeout(function () {

            toast.classList.remove("mostrar");

        }, 2500);

    }


    /* Atualiza resumo quando salário muda */

    document.getElementById("salario-minimo")
        .addEventListener("input", atualizarResumo);

    document.getElementById("salario-maximo")
        .addEventListener("input", atualizarResumo);

});
