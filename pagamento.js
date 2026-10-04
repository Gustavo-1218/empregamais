const parametros = new URLSearchParams(
    window.location.search
);


const nome = parametros.get("nome");
const profissao = parametros.get("profissao");
const foto = parametros.get("foto");
const retorno = parametros.get("retorno");


const nomeProfissional =
    document.getElementById("nomeProfissional");

const profissaoProfissional =
    document.getElementById("profissaoProfissional");

const fotoProfissional =
    document.getElementById("fotoProfissional");

const voltarPerfil =
    document.getElementById("voltarPerfil");

const metodos =
    document.querySelectorAll(".metodo");

const btnPagar =
    document.getElementById("btnPagar");

const notificacao =
    document.getElementById("notificacao");

const tituloNotificacao =
    document.getElementById("tituloNotificacao");

const textoNotificacao =
    document.getElementById("textoNotificacao");


/* Informações do profissional */

if (nome) {
    nomeProfissional.textContent = nome;
}

if (profissao) {
    profissaoProfissional.textContent = profissao;
}


/* Fotos dos profissionais */

const fotosProfissionais = {

    joao: "João Silva.png",

    maria: "Maria Santos.png",

    carlos: "Carlos Oliveira.png",

    rafael: "Rafael Costa.png"

};


if (foto && fotosProfissionais[foto]) {

    fotoProfissional.src =
        fotosProfissionais[foto];

    fotoProfissional.alt =
        `Foto de ${nome}`;

}


/* Botão voltar */

if (retorno) {

    voltarPerfil.href = retorno;

} else {

    voltarPerfil.href = "autonomo.html";

}


/* Método de pagamento */

let metodoEscolhido = "";


metodos.forEach((metodo) => {

    metodo.addEventListener("click", () => {

        metodos.forEach((item) => {

            item.classList.remove(
                "selecionado"
            );

        });


        metodo.classList.add(
            "selecionado"
        );


        metodoEscolhido =
            metodo.dataset.metodo;


        btnPagar.disabled = false;

    });

});


/* Finalização */

btnPagar.addEventListener("click", () => {

    if (!metodoEscolhido || !retorno) {
        return;
    }


    btnPagar.disabled = true;

    btnPagar.textContent =
        "Processando pagamento...";


    setTimeout(() => {

        /*
         * Salva a contratação somente
         * para o profissional escolhido.
         */

        localStorage.setItem(
            `contratado-${retorno}`,
            "true"
        );


        tituloNotificacao.textContent =
            "Pagamento processado!";


        textoNotificacao.textContent =
            `O pagamento foi processado com sucesso pelo ${metodoEscolhido}.`;


        notificacao.classList.add(
            "mostrar"
        );


        setTimeout(() => {

            tituloNotificacao.textContent =
                "Pagamento realizado!";


            textoNotificacao.textContent =
                `${nome} foi contratado e já foi notificado sobre o seu serviço. Logo logo ele entrará em contato com você.`;


            setTimeout(() => {

                window.location.href =
                    retorno;

            }, 2200);

        }, 1800);

    }, 1500);

});