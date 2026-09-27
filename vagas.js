document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       BOTÃO DE CANDIDATURA
    ===================================== */

    const botoesCandidatar =
        document.querySelectorAll(".btn-candidatar");


    const notificacao =
        document.getElementById("notificacao");


    const textoNotificacao =
        document.getElementById("textoNotificacao");


    const fecharNotificacao =
        document.getElementById("fecharNotificacao");


    botoesCandidatar.forEach(function (botao) {

        botao.addEventListener("click", function () {


            /* Pega o nome da vaga */

            const nomeVaga =
                botao.getAttribute("data-vaga");


            /* Muda o botão */

            botao.classList.add(
                "ja-candidatou"
            );


            botao.innerHTML =
                "✓ <span>Já se candidatou</span>";


            botao.disabled = true;


            /* Muda o texto da notificação */

            textoNotificacao.textContent =
                "Você se candidatou para a vaga de "
                + nomeVaga
                + ".";


            /* Mostra a notificação */

            notificacao.classList.add(
                "mostrar"
            );


            /* Esconde automaticamente */

            setTimeout(function () {

                notificacao.classList.remove(
                    "mostrar"
                );

            }, 5000);

        });

    });


    /* =====================================
       FECHAR NOTIFICAÇÃO
    ===================================== */

    fecharNotificacao.addEventListener(
        "click",
        function () {

            notificacao.classList.remove(
                "mostrar"
            );

        }
    );


    /* =====================================
       BOTÃO SALVAR
    ===================================== */

    const botoesSalvar =
        document.querySelectorAll(".btn-salvar");


    botoesSalvar.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {


                botao.classList.toggle(
                    "salvo"
                );


                if (
                    botao.classList.contains("salvo")
                ) {

                    botao.innerHTML =
                        "♥ <span>Vaga salva</span>";

                } else {

                    botao.innerHTML =
                        "♡ <span>Salvar vaga</span>";

                }

            }
        );

    });

});