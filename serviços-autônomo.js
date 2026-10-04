document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const modal = document.getElementById("modalEdicao");
    const btnAbrir = document.getElementById("btnAbrirEdicao");
    const btnFechar = document.getElementById("btnFecharEdicao");
    const formulario = document.getElementById("formEdicao");
    const mensagem = document.getElementById("mensagem");


    /* =====================================================
       DADOS
    ===================================================== */

    const dados = {
        nome: "João Silva",
        email: "joao.silva@email.com",
        celular: "(84) 99999-1111",
        profissao: "Encanador profissional",
        localizacao: "Natal, RN"
    };


    /* =====================================================
       ABRIR E FECHAR MODAL
    ===================================================== */

    function abrirModal() {

        modal.classList.add("aberto");
        modal.setAttribute("aria-hidden", "false");

    }


    function fecharModal() {

        modal.classList.remove("aberto");
        modal.setAttribute("aria-hidden", "true");

    }


    btnAbrir.addEventListener("click", abrirModal);

    btnFechar.addEventListener("click", fecharModal);


    /* =====================================================
       CLICAR FORA DO MODAL
    ===================================================== */

    modal.addEventListener("click", function (evento) {

        if (evento.target === modal) {

            fecharModal();

        }

    });


    /* =====================================================
       ESC FECHA O MODAL
    ===================================================== */

    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {

            fecharModal();

        }

    });


    /* =====================================================
       SALVAR
    ===================================================== */

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();


        const novoNome =
            document.getElementById("campoNome").value.trim();

        const novoEmail =
            document.getElementById("campoEmail").value.trim();

        const novoCelular =
            document.getElementById("campoCelular").value.trim();

        const novaProfissao =
            document.getElementById("campoProfissao").value.trim();

        const novaLocalizacao =
            document.getElementById("campoLocalizacao").value.trim();


        /* -------------------------------------------------
           VALIDAÇÃO
        ------------------------------------------------- */

        if (
            novoNome === "" ||
            novoEmail === "" ||
            novoCelular === "" ||
            novaProfissao === "" ||
            novaLocalizacao === ""
        ) {

            mostrarMensagem(
                "Preencha todos os campos."
            );

            return;

        }


        /* -------------------------------------------------
           ATUALIZA OBJETO
        ------------------------------------------------- */

        dados.nome = novoNome;
        dados.email = novoEmail;
        dados.celular = novoCelular;
        dados.profissao = novaProfissao;
        dados.localizacao = novaLocalizacao;


        /* -------------------------------------------------
           ATUALIZA A PÁGINA
        ------------------------------------------------- */

        document.getElementById("nome").textContent =
            dados.nome;

        document.getElementById("profissao").textContent =
            dados.profissao;

        document.getElementById("localizacao").textContent =
            dados.localizacao;

        document.getElementById("email").textContent =
            dados.email;

        document.getElementById("celular").textContent =
            dados.celular;

        document.getElementById("localInfo").textContent =
            dados.localizacao;


        /* -------------------------------------------------
           FECHA
        ------------------------------------------------- */

        fecharModal();


        /* -------------------------------------------------
           FEEDBACK
        ------------------------------------------------- */

        mostrarMensagem(
            "Informações atualizadas."
        );

    });


    /* =====================================================
       MENSAGEM
    ===================================================== */

    function mostrarMensagem(texto) {

        mensagem.textContent = texto;

        mensagem.classList.add("mostrar");


        setTimeout(function () {

            mensagem.classList.remove("mostrar");

        }, 2500);

    }

});
