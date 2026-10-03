/* =========================================================
   NEXT WORK — PERFIL AUTÔNOMO
========================================================= */


/* =========================================================
   DADOS DO PROFISSIONAL
========================================================= */

const profissional = {

    nome: "João Silva",

    profissao: "Encanador profissional",

    localizacao: "Natal, RN",

    avaliacao: "4,8",

    avaliacoes: "24 avaliações",

    foto: "joaotrabalhando.png",

    sobre:
        "Trabalho com instalações hidráulicas, manutenção e pequenos reparos residenciais e comerciais. Busco oferecer um atendimento responsável, ágil e com foco na satisfação do cliente.",

    telefone: "(84) 98765-4321",

    email: "joao.silva@email.com",

    regiao:
        "Natal e região"

};


/* =========================================================
   CARREGAR DADOS
========================================================= */

function carregarPerfil() {

    const nome =
        document.getElementById("profileName");

    const profissao =
        document.getElementById("profileProfession");

    const foto =
        document.getElementById("profilePhoto");

    const sobre =
        document.getElementById("aboutText");


    if (nome) {
        nome.textContent = profissional.nome;
    }


    if (profissao) {
        profissao.textContent =
            profissional.profissao;
    }


    if (foto) {
        foto.src =
            profissional.foto;

        foto.alt =
            profissional.nome;
    }


    if (sobre) {
        sobre.textContent =
            profissional.sobre;
    }

}


/* =========================================================
   SOLICITAR SERVIÇO
========================================================= */

function ativarSolicitacao() {

    const botao =
        document.getElementById("btnSolicitar");


    if (!botao) return;


    botao.addEventListener(
        "click",
        function () {

            mostrarMensagem(
                "Solicitação iniciada. O contato com o profissional será aberto."
            );

        }
    );

}


/* =========================================================
   MENSAGEM
========================================================= */

function mostrarMensagem(texto) {

    const mensagem =
        document.getElementById(
            "profileMessage"
        );


    if (!mensagem) return;


    mensagem.textContent =
        texto;


    mensagem.classList.add(
        "mostrar"
    );


    setTimeout(
        function () {

            mensagem.classList.remove(
                "mostrar"
            );

        },
        3500
    );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarPerfil();

        ativarSolicitacao();

    }
);