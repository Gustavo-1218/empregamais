document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PROGRESSO DO PERFIL
    ====================================================== */

    const porcentagem = 25;


    const porcentagemGrafico =
        document.getElementById("porcentagem-grafico");


    const porcentagemSidebar =
        document.getElementById("porcentagem-sidebar");


    const barraProgresso =
        document.getElementById("barra-progresso");


    if (porcentagemGrafico) {

        porcentagemGrafico.textContent =
            porcentagem + "%";

    }


    if (porcentagemSidebar) {

        porcentagemSidebar.textContent =
            porcentagem + "%";

    }


    if (barraProgresso) {

        barraProgresso.style.width =
            porcentagem + "%";

    }



    /* =====================================================
       CURRÍCULO
    ====================================================== */

    const upload =
        document.getElementById("curriculo-upload");


    const nomeCurriculo =
        document.getElementById("nome-curriculo");


    const detalhesCurriculo =
        document.getElementById("detalhes-curriculo");


    const visualizar =
        document.getElementById("visualizar-curriculo");


    let arquivoAtual = null;


    if (upload) {

        upload.addEventListener("change", function () {

            const arquivo =
                upload.files[0];


            if (!arquivo) {
                return;
            }


            /* Aceita somente PDF */

            if (
                arquivo.type !==
                "application/pdf"
            ) {

                alert(
                    "Selecione um arquivo PDF."
                );

                upload.value = "";

                return;
            }


            arquivoAtual = arquivo;


            /* Nome */

            if (nomeCurriculo) {

                nomeCurriculo.textContent =
                    arquivo.name;

            }


            /* Tamanho */

            const tamanhoMB =
                (
                    arquivo.size /
                    (1024 * 1024)
                ).toFixed(1);


            if (detalhesCurriculo) {

                detalhesCurriculo.textContent =
                    "PDF • " +
                    tamanhoMB +
                    " MB • Selecionado agora";

            }


            /* Cria URL temporária */

            if (visualizar) {

                visualizar.href =
                    URL.createObjectURL(arquivo);

                visualizar.target =
                    "_blank";

            }

        });

    }



    /* =====================================================
       BOTÃO CANCELAR
    ====================================================== */

    const botaoCancelar =
        document.querySelector(
            ".botao-cancelar"
        );


    if (botaoCancelar) {

        botaoCancelar.addEventListener(
            "click",
            function () {

                if (upload) {

                    upload.value = "";

                }


                if (arquivoAtual) {

                    arquivoAtual = null;

                }

            }
        );

    }



    /* =====================================================
       BOTÃO SALVAR
    ====================================================== */

    const botaoContinuar =
        document.querySelector(
            ".botao-continuar"
        );


    if (botaoContinuar) {

        botaoContinuar.addEventListener(
            "click",
            function () {

                botaoContinuar.textContent =
                    "Salvo ✓";


                setTimeout(
                    function () {

                        botaoContinuar.innerHTML =
                            'Salvar e continuar <span>→</span>';

                    },
                    1600
                );

            }
        );

    }

});