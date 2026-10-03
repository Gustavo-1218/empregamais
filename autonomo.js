/* =========================================================
   NEXT WORK - AUTÔNOMOS
   Stories + Chat + Busca + Filtros + Cards
========================================================= */


/* =========================================================
   DADOS DOS PROFISSIONAIS
========================================================= */

const profissionais = [

    {
        id: "joao",

        nome: "João Silva",

        nomeCurto: "João",

        fotoPerfil: "João Silva.png",

        fotoTrabalho: "joaotrabalhando.png",

        profissao: "Encanador profissional",

        categoria: "encanamento",

        categoriaNome: "ENCANAMENTO",

        localizacao: "Extremoz, RN",

        avaliacao: "4.9",

        iniciais: "JS",

        mensagem:
            "Olá! Como posso ajudar você?"
    },


    {
        id: "maria",

        nome: "Maria Santos",

        nomeCurto: "Maria",

        fotoPerfil: "Maria Santos.png",

        fotoTrabalho: "mariatraabalhando.png",

        profissao: "Profissional de limpeza",

        categoria: "limpeza",

        categoriaNome: "LIMPEZA",

        localizacao: "Natal, RN",

        avaliacao: "5.0",

        iniciais: "MS",

        mensagem:
            "Olá! Como posso ajudar você?"
    },


    {
        id: "carlos",

        nome: "Carlos Oliveira",

        nomeCurto: "Carlos",

        fotoPerfil: "Carlos Oliveira.png",

        fotoTrabalho: "carlostrabalhando.png",

        profissao: "Eletricista residencial",

        categoria: "eletrica",

        categoriaNome: "ELÉTRICA",

        localizacao: "Parnamirim, RN",

        avaliacao: "4.8",

        iniciais: "CO",

        mensagem:
            "Olá! Como posso ajudar você?"
    },


    {
        id: "rafael",

        nome: "Rafael Costa",

        nomeCurto: "Rafael",

        fotoPerfil: "Rafael Costa.png",

        fotoTrabalho: "rafaeltrabalhando.png",

        profissao: "Técnico em manutenção",

        categoria: "manutencao",

        categoriaNome: "MANUTENÇÃO",

        localizacao: "Natal, RN",

        avaliacao: "4.9",

        iniciais: "RC",

        mensagem:
            "Olá! Como posso ajudar você?"
    },


    {
        id: "ana",

        nome: "Ana Beatriz",

        nomeCurto: "Ana",

        fotoPerfil: "Ana Beatriz.png",

        fotoTrabalho: "anatrabalhando.png",

        profissao: "Profissional de pintura",

        categoria: "pintura",

        categoriaNome: "PINTURA",

        localizacao: "Extremoz, RN",

        avaliacao: "4.9",

        iniciais: "AB",

        mensagem:
            "Olá! Como posso ajudar você?"
    }

];



/* =========================================================
   ESTADO
========================================================= */

/*
   Este índice representa quem está no centro.

   0 = João
   1 = Maria
   2 = Carlos
   3 = Rafael
   4 = Ana
*/

let indiceCentral = 1;



/*
   Profissionais atualmente permitidos pelos filtros.
*/

let profissionaisVisiveis = [...profissionais];



/*
   Profissional atualmente aberto no chat.
*/

let profissionalChat = profissionais[indiceCentral];



/*
   Controle da busca.
*/

let termoBusca = "";



/*
   Filtro atual.
*/

let filtroAtual = "todos";



/* =========================================================
   ELEMENTOS
========================================================= */

const storiesLista =
    document.getElementById("storiesLista");

const stories =
    document.querySelectorAll(".story-profissional");

const fotoChat =
    document.getElementById("fotoChat");

const nomeChat =
    document.getElementById("nomeChat");

const profissaoChat =
    document.getElementById("profissaoChat");

const statusTextoChat =
    document.getElementById("statusTextoChat");

const avatarMensagem =
    document.getElementById("avatarMensagem");

const mensagemInicial =
    document.getElementById("mensagemInicial");

const mensagensChat =
    document.getElementById("mensagensChat");

const formChat =
    document.getElementById("formChat");

const mensagemChat =
    document.getElementById("mensagemChat");

const buscaAutonomos =
    document.getElementById("buscaAutonomos");

const cards =
    document.querySelectorAll(".card-profissional");

const botoesFiltro =
    document.querySelectorAll(".filtro");

const botoesPerfil =
    document.querySelectorAll(".botao-perfil");

const fecharChat =
    document.getElementById("fecharChat");



/* =========================================================
   ENCONTRAR PROFISSIONAL
========================================================= */

function obterProfissional(id) {

    return profissionais.find(function (profissional) {

        return profissional.id === id;

    });

}



/* =========================================================
   ÍNDICE CIRCULAR
========================================================= */

/*
   Isso permite que a lista continue infinitamente.

   Exemplo:

   Ana → João → Maria → Carlos → Rafael → Ana...
*/

function indiceCircular(indice, tamanho) {

    return (indice + tamanho) % tamanho;

}



/* =========================================================
   OBTER PROFISSIONAL VISÍVEL
========================================================= */

function obterProfissionalVisivel(indice) {

    if (profissionaisVisiveis.length === 0) {
        return null;
    }

    const indiceReal =
        indiceCircular(
            indice,
            profissionaisVisiveis.length
        );

    return profissionaisVisiveis[indiceReal];

}



/* =========================================================
   ATUALIZAR STORY
========================================================= */

function atualizarStory(
    story,
    profissional,
    posicao
) {

    if (!story || !profissional) {
        return;
    }


    const imagem =
        story.querySelector(".story-imagem img");

    const nome =
        story.querySelector(".story-nome");


    /*
       Atualiza a imagem de trabalho.
    */

    imagem.src =
        profissional.fotoTrabalho;

    imagem.alt =
        profissional.nome +
        " trabalhando";


    /*
       Atualiza o nome.
    */

    nome.textContent =
        profissional.nomeCurto;


    /*
       Guarda qual profissional está
       naquele Story.
    */

    story.dataset.profissional =
        profissional.id;


    /*
       Guarda o índice atual.
    */

    story.dataset.indice =
        profissionais.indexOf(profissional);


    /*
       Classes visuais.
    */

    story.classList.remove(
        "story-esquerda",
        "story-centro",
        "story-direita"
    );


    story.classList.add(
        "story-" + posicao
    );


    /*
       O Story central recebe destaque.
    */

    if (posicao === "centro") {

        story.classList.add("ativo");

    } else {

        story.classList.remove("ativo");

    }

}



/* =========================================================
   ATUALIZAR OS 3 STORIES
========================================================= */

function atualizarStories() {

    if (profissionaisVisiveis.length === 0) {
        return;
    }


    /*
       Garante que o índice central
       continue válido depois de um filtro.
    */

    indiceCentral =
        indiceCircular(
            indiceCentral,
            profissionaisVisiveis.length
        );


    const profissionalEsquerda =
        obterProfissionalVisivel(
            indiceCentral - 1
        );


    const profissionalCentro =
        obterProfissionalVisivel(
            indiceCentral
        );


    const profissionalDireita =
        obterProfissionalVisivel(
            indiceCentral + 1
        );


    /*
       Atualiza cada posição.
    */

    atualizarStory(
        document.querySelector(".story-esquerda"),
        profissionalEsquerda,
        "esquerda"
    );


    atualizarStory(
        document.querySelector(".story-centro"),
        profissionalCentro,
        "centro"
    );


    atualizarStory(
        document.querySelector(".story-direita"),
        profissionalDireita,
        "direita"
    );


    /*
       O profissional central
       passa a ser o do chat.
    */

    atualizarChat(
        profissionalCentro
    );

}



/* =========================================================
   SELECIONAR STORY
========================================================= */

function selecionarStory(id) {

    const indice =
        profissionaisVisiveis.findIndex(
            function (profissional) {

                return profissional.id === id;

            }
        );


    if (indice === -1) {
        return;
    }


    /*
       Esse profissional passa
       para o centro.
    */

    indiceCentral = indice;


    atualizarStories();

}



/* =========================================================
   EVENTOS DOS STORIES
========================================================= */

function ativarStories() {

    stories.forEach(function (story) {

        story.addEventListener(
            "click",
            function () {

                const id =
                    story.dataset.profissional;

                if (!id) {
                    return;
                }

                selecionarStory(id);

            }
        );

    });

}



/* =========================================================
   ATUALIZAR CHAT
========================================================= */

function atualizarChat(profissional) {

    if (!profissional) {
        return;
    }


    profissionalChat =
        profissional;


    /*
       Foto de perfil.
    */

    fotoChat.src =
        profissional.fotoPerfil;

    fotoChat.alt =
        "Foto de " +
        profissional.nome;


    /*
       Informações.
    */

    nomeChat.textContent =
        profissional.nome;

    profissaoChat.textContent =
        profissional.profissao;

    statusTextoChat.textContent =
        "● Disponível agora";


    /*
       Avatar da mensagem.
    */

    avatarMensagem.textContent =
        profissional.iniciais;


    /*
       Mensagem inicial.
    */

    mensagemInicial.textContent =
        profissional.mensagem;

}



/* =========================================================
   LIMPAR CHAT
========================================================= */

function limparMensagens() {

    mensagensChat.innerHTML = "";


    const mensagemProfissional =
        document.createElement("div");

    mensagemProfissional.className =
        "mensagem-profissional";


    const avatar =
        document.createElement("div");

    avatar.className =
        "avatar-mensagem";

    avatar.textContent =
        profissionalChat.iniciais;


    const balao =
        document.createElement("div");

    balao.className =
        "balao-mensagem";


    const texto =
        document.createElement("p");

    texto.textContent =
        profissionalChat.mensagem;


    const horario =
        document.createElement("span");

    horario.textContent =
        "14:32";


    balao.appendChild(texto);
    balao.appendChild(horario);


    mensagemProfissional.appendChild(avatar);
    mensagemProfissional.appendChild(balao);


    mensagensChat.appendChild(
        mensagemProfissional
    );


    const sistema =
        document.createElement("div");

    sistema.className =
        "mensagem-sistema";


    const textoSistema =
        document.createElement("span");

    textoSistema.textContent =
        "Converse diretamente com este profissional.";


    sistema.appendChild(textoSistema);


    mensagensChat.appendChild(
        sistema
    );

}



/* =========================================================
   ENVIAR MENSAGEM
========================================================= */

function enviarMensagem(texto) {

    if (!texto.trim()) {
        return;
    }


    /*
       Mensagem do usuário.
    */

    const mensagemUsuario =
        document.createElement("div");

    mensagemUsuario.className =
        "mensagem-usuario";


    const balao =
        document.createElement("div");

    balao.className =
        "balao-usuario";


    const textoMensagem =
        document.createElement("p");

    textoMensagem.textContent =
        texto;


    const horario =
        document.createElement("span");

    horario.textContent =
        "agora";


    balao.appendChild(
        textoMensagem
    );

    balao.appendChild(
        horario
    );


    mensagemUsuario.appendChild(
        balao
    );


    mensagensChat.appendChild(
        mensagemUsuario
    );


    /*
       Scroll para a última mensagem.
    */

    mensagensChat.scrollTop =
        mensagensChat.scrollHeight;


    mensagemChat.value = "";


    /*
       Simula resposta.
    */

    setTimeout(function () {

        const resposta =
            document.createElement("div");

        resposta.className =
            "mensagem-profissional";


        const avatar =
            document.createElement("div");

        avatar.className =
            "avatar-mensagem";

        avatar.textContent =
            profissionalChat.iniciais;


        const balaoResposta =
            document.createElement("div");

        balaoResposta.className =
            "balao-mensagem";


        const textoResposta =
            document.createElement("p");

        textoResposta.textContent =
            "Claro! Posso ajudar você com isso.";


        const horarioResposta =
            document.createElement("span");

        horarioResposta.textContent =
            "agora";


        balaoResposta.appendChild(
            textoResposta
        );

        balaoResposta.appendChild(
            horarioResposta
        );


        resposta.appendChild(
            avatar
        );

        resposta.appendChild(
            balaoResposta
        );


        mensagensChat.appendChild(
            resposta
        );


        mensagensChat.scrollTop =
            mensagensChat.scrollHeight;

    }, 800);

}



/* =========================================================
   FORMULÁRIO DO CHAT
========================================================= */

if (formChat) {

    formChat.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();

            enviarMensagem(
                mensagemChat.value
            );

        }
    );

}



/* =========================================================
   SUGESTÕES DO CHAT
========================================================= */

const sugestoes =
    document.querySelectorAll(
        ".sugestoes-chat button"
    );


sugestoes.forEach(function (botao) {

    botao.addEventListener(
        "click",
        function () {

            enviarMensagem(
                botao.textContent.trim()
            );

        }
    );

});



/* =========================================================
   FECHAR CHAT
========================================================= */

if (fecharChat) {

    fecharChat.addEventListener(
        "click",
        function () {

            const chat =
                document.getElementById("chatArea");

            if (!chat) {
                return;
            }

            chat.classList.toggle(
                "chat-fechado"
            );

        }
    );

}



/* =========================================================
   BUSCA
========================================================= */

if (buscaAutonomos) {

    buscaAutonomos.addEventListener(
        "input",
        function () {

            termoBusca =
                buscaAutonomos.value
                    .toLowerCase()
                    .trim();


            aplicarFiltros();

        }
    );

}



/* =========================================================
   FILTROS
========================================================= */

botoesFiltro.forEach(function (botao) {

    botao.addEventListener(
        "click",
        function () {

            /*
               Remove o estado ativo
               dos outros botões.
            */

            botoesFiltro.forEach(
                function (outroBotao) {

                    outroBotao.classList.remove(
                        "ativo"
                    );

                }
            );


            /*
               Ativa o botão selecionado.
            */

            botao.classList.add(
                "ativo"
            );


            filtroAtual =
                botao.dataset.filtro;


            aplicarFiltros();

        }
    );

});



/* =========================================================
   APLICAR FILTROS
========================================================= */

function aplicarFiltros() {

    profissionaisVisiveis =
        profissionais.filter(
            function (profissional) {


                /*
                   Verificação do filtro.
                */

                const correspondeCategoria =
                    filtroAtual === "todos" ||
                    profissional.categoria === filtroAtual;


                /*
                   Verificação da busca.
                */

                const textoProfissional =
                    (
                        profissional.nome +
                        " " +
                        profissional.profissao +
                        " " +
                        profissional.categoriaNome +
                        " " +
                        profissional.localizacao
                    ).toLowerCase();


                const correspondeBusca =
                    textoProfissional.includes(
                        termoBusca
                    );


                return (
                    correspondeCategoria &&
                    correspondeBusca
                );

            }
        );


    /*
       Se não houver profissionais,
       não tenta atualizar os Stories.
    */

    if (
        profissionaisVisiveis.length === 0
    ) {

        mostrarNenhumResultado();

        return;

    }


    /*
       Reinicia o centro para um profissional
       válido da lista filtrada.
    */

    const profissionalAtual =
        profissionaisVisiveis.find(
            function (profissional) {

                return (
                    profissional.id ===
                    profissionalChat.id
                );

            }
        );


    if (profissionalAtual) {

        indiceCentral =
            profissionaisVisiveis.indexOf(
                profissionalAtual
            );

    } else {

        indiceCentral = 0;

    }


    atualizarStories();

    atualizarCards();

}



/* =========================================================
   ATUALIZAR CARDS
========================================================= */

function atualizarCards() {

    cards.forEach(function (card) {

        const id =
            card.dataset.profissional;

        const profissional =
            obterProfissional(id);


        if (!profissional) {
            return;
        }


        const correspondeCategoria =
            filtroAtual === "todos" ||
            profissional.categoria === filtroAtual;


        const textoProfissional =
            (
                profissional.nome +
                " " +
                profissional.profissao +
                " " +
                profissional.categoriaNome +
                " " +
                profissional.localizacao
            ).toLowerCase();


        const correspondeBusca =
            textoProfissional.includes(
                termoBusca
            );


        if (
            correspondeCategoria &&
            correspondeBusca
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}



/* =========================================================
   NENHUM RESULTADO
========================================================= */

function mostrarNenhumResultado() {

    stories.forEach(function (story) {

        const imagem =
            story.querySelector(
                ".story-imagem img"
            );

        const nome =
            story.querySelector(
                ".story-nome"
            );


        imagem.removeAttribute("src");

        imagem.alt = "";

        nome.textContent =
            "Nenhum resultado";

    });


    nomeChat.textContent =
        "Nenhum profissional";

    profissaoChat.textContent =
        "Tente outro filtro ou busca";

    fotoChat.removeAttribute(
        "src"
    );

    avatarMensagem.textContent =
        "—";


    cards.forEach(function (card) {

        card.style.display = "none";

    });

}



/* =========================================================
   BOTÕES "VER PERFIL"
========================================================= */

botoesPerfil.forEach(function (botao) {

    botao.addEventListener(
        "click",
        function () {

            const id =
                botao.dataset.profissional;

            const profissional =
                obterProfissional(id);


            if (!profissional) {
                return;
            }


            /*
               Por enquanto é uma simulação.
               Depois podemos conectar cada perfil
               a uma página real.
            */

            alert(
                "Perfil de " +
                profissional.nome
            );

        }
    );

});



/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function iniciarAutonomos() {

    /*
       Ativa os cliques dos Stories.
    */

    ativarStories();


    /*
       Mostra os Stories iniciais.
    */

    atualizarStories();


    /*
       Mostra os cards iniciais.
    */

    atualizarCards();

}



/* =========================================================
   INICIAR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    iniciarAutonomos
);