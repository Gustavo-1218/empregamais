document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTOS DO NEXT ASSISTANT
    ===================================================== */

    const botao = document.getElementById("nextAssistantButton");
    const chat = document.getElementById("nextAssistantChat");
    const fechar = document.getElementById("nextAssistantClose");

    const mensagens = document.getElementById("nextAssistantMessages");
    const entrada = document.getElementById("nextAssistantInput");

    const enviar = document.getElementById("nextAssistantSend");
    const voz = document.getElementById("nextAssistantVoice");


    /* =====================================================
       VERIFICAÇÃO
    ===================================================== */

    console.log("Next Assistant iniciado.");

    console.log("Botão:", botao);
    console.log("Chat:", chat);
    console.log("Fechar:", fechar);
    console.log("Mensagens:", mensagens);
    console.log("Entrada:", entrada);
    console.log("Enviar:", enviar);
    console.log("Voz:", voz);


    if (!botao) {
        console.error("Next Assistant: botão não encontrado.");
        return;
    }

    if (!chat) {
        console.error("Next Assistant: chat não encontrado.");
        return;
    }

    if (!fechar) {
        console.error("Next Assistant: botão fechar não encontrado.");
        return;
    }

    if (!mensagens) {
        console.error("Next Assistant: área de mensagens não encontrada.");
        return;
    }

    if (!entrada) {
        console.error("Next Assistant: campo de pergunta não encontrado.");
        return;
    }

    if (!enviar) {
        console.error("Next Assistant: botão enviar não encontrado.");
        return;
    }

    if (!voz) {
        console.error("Next Assistant: botão de voz não encontrado.");
        return;
    }


    /* =====================================================
       ABRIR ASSISTENTE
    ===================================================== */

    botao.addEventListener("click", function () {

        console.log("Abrindo Next Assistant.");

        chat.style.display = "block";

        chat.setAttribute(
            "aria-hidden",
            "false"
        );

        entrada.focus();

    });


    /* =====================================================
       FECHAR ASSISTENTE
    ===================================================== */

    fechar.addEventListener("click", function () {

        console.log("Fechando Next Assistant.");

        chat.style.display = "none";

        chat.setAttribute(
            "aria-hidden",
            "true"
        );

        pararFala();

    });


    /* =====================================================
       BANCO DE RESPOSTAS
    ===================================================== */

    const perguntas = [

        {
            palavras: [
                "vagas",
                "disponiveis",
                "oportunidades"
            ],

            resposta:
                "Encontrei algumas oportunidades próximas a você, incluindo vagas na área de informática e atendimento. Para ver todas as oportunidades e seus detalhes, acesse a aba Vagas."
        },


        {
            palavras: [
                "vaga de informatica",
                "vaga informatica",
                "vagas de informatica",
                "vagas informatica"
            ],

            resposta:
                "Sim. Há oportunidades relacionadas à área de informática disponíveis no momento. Para consultar os requisitos e se candidatar, acesse Vagas."
        },


        {
            palavras: [
                "profissionais",
                "autonomos"
            ],

            resposta:
                "Na sua região há profissionais autônomos disponíveis para diferentes serviços. Alguns deles já aparecem nos destaques da página inicial. Para conhecer todos, acesse Autônomos."
        },


        {
            palavras: [
                "encanador",
                "encanamento"
            ],

            resposta:
                "Sim. Há profissionais autônomos disponíveis para serviços de encanamento. Para encontrar um profissional, acesse Autônomos."
        },


        {
            palavras: [
                "pintor",
                "pintura"
            ],

            resposta:
                "Sim. Há profissionais autônomos disponíveis para serviços de pintura. Para encontrar um profissional, acesse Autônomos."
        },


        {
            palavras: [
                "faxineiro",
                "faxina",
                "limpeza"
            ],

            resposta:
                "Há profissionais autônomos disponíveis para serviços de limpeza. Para encontrar um profissional, acesse Autônomos."
        },


        {
            palavras: [
                "servico",
                "serviços"
            ],

            resposta:
                "Posso ajudar. Existem profissionais autônomos disponíveis em diferentes áreas. Para encontrar o serviço que você precisa, acesse Autônomos."
        },


        {
            palavras: [
                "empresas",
                "empresa"
            ],

            resposta:
                "Encontrei empresas próximas à sua região. Algumas aparecem nos destaques da página inicial. Para visualizar todas e consultar suas localizações, acesse Empresas."
        },


        {
            palavras: [
                "onde ficam as empresas",
                "localizacao das empresas",
                "localização das empresas"
            ],

            resposta:
                "Você pode visualizar a localização das empresas diretamente no mapa. Para pesquisar e explorar as empresas próximas, acesse Empresas."
        },


        {
            palavras: [
                "candidaturas",
                "candidatura"
            ],

            resposta:
                "Você pode acompanhar suas candidaturas e verificar o andamento de cada oportunidade. Para consultar os detalhes, acesse Minhas candidaturas."
        },


        {
            palavras: [
                "perfil",
                "meu perfil"
            ],

            resposta:
                "Seu perfil reúne suas informações profissionais, habilidades e currículo. Para consultar ou alterar seus dados, acesse Meu perfil."
        },


        {
            palavras: [
                "cursos",
                "curso",
                "certificacoes",
                "certificação"
            ],

            resposta:
                "Seus cursos e certificações ficam registrados no seu perfil profissional. Para consultar todos eles, acesse Cursos e certificações."
        }

    ];


    /* =====================================================
       NORMALIZAR TEXTO
    ===================================================== */

    function normalizar(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    }


    /* =====================================================
       ENCONTRAR RESPOSTA
    ===================================================== */

    function encontrarResposta(pergunta) {

        const texto = normalizar(pergunta);

        let respostaEncontrada = null;

        let maiorPontuacao = 0;


        perguntas.forEach(function (item) {

            let pontuacao = 0;


            item.palavras.forEach(function (palavra) {

                const palavraNormalizada =
                    normalizar(palavra);


                if (
                    texto.includes(palavraNormalizada)
                ) {

                    pontuacao++;

                }

            });


            if (
                pontuacao > maiorPontuacao
            ) {

                maiorPontuacao =
                    pontuacao;

                respostaEncontrada =
                    item.resposta;

            }

        });


        if (respostaEncontrada) {

            return respostaEncontrada;

        }


        return "Ainda não consegui encontrar uma resposta para essa pergunta. Tente perguntar sobre vagas, empresas, profissionais autônomos, candidaturas, perfil ou cursos.";

    }


    /* =====================================================
       ADICIONAR MENSAGEM
    ===================================================== */

    function adicionarMensagem(
        texto,
        tipo
    ) {

        const mensagem =
            document.createElement("div");


        mensagem.className =
            "next-assistant-message " + tipo;


        mensagem.textContent =
            texto;


        mensagens.appendChild(
            mensagem
        );


        mensagens.scrollTop =
            mensagens.scrollHeight;

    }


    /* =====================================================
       LEITURA EM VOZ ALTA
    ===================================================== */

    function falar(texto) {

        if (
            !window.speechSynthesis
        ) {

            console.log(
                "Síntese de voz não disponível."
            );

            return;

        }


        pararFala();


        const fala =
            new SpeechSynthesisUtterance(
                texto
            );


        fala.lang = "pt-BR";

        fala.rate = 1;

        fala.pitch = 1;

        fala.volume = 1;


        window.speechSynthesis.speak(
            fala
        );

    }


    /* =====================================================
       PARAR VOZ
    ===================================================== */

    function pararFala() {

        if (
            window.speechSynthesis
        ) {

            window.speechSynthesis.cancel();

        }

    }


    /* =====================================================
       PROCESSAR PERGUNTA
    ===================================================== */

    function processarPergunta() {

        const pergunta =
            entrada.value.trim();


        if (!pergunta) {

            return;

        }


        console.log(
            "Pergunta:",
            pergunta
        );


        /* MENSAGEM DO USUÁRIO */

        adicionarMensagem(
            pergunta,
            "usuario"
        );


        /* LIMPAR CAMPO */

        entrada.value = "";


        /* RESPOSTA */

        setTimeout(function () {

            const resposta =
                encontrarResposta(
                    pergunta
                );


            console.log(
                "Resposta:",
                resposta
            );


            adicionarMensagem(
                resposta,
                "assistant"
            );


            falar(resposta);

        }, 350);

    }


    /* =====================================================
       BOTÃO ENVIAR
    ===================================================== */

    enviar.addEventListener(
        "click",
        function () {

            processarPergunta();

        }
    );


    /* =====================================================
       ENTER
    ===================================================== */

    entrada.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key === "Enter"
            ) {

                evento.preventDefault();

                processarPergunta();

            }

        }
    );


    /* =====================================================
       RECONHECIMENTO DE VOZ
    ===================================================== */

    const Reconhecimento =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    let reconhecimento = null;


    if (Reconhecimento) {

        reconhecimento =
            new Reconhecimento();


        reconhecimento.lang =
            "pt-BR";


        reconhecimento.continuous =
            false;


        reconhecimento.interimResults =
            false;


        /* COMEÇOU A OUVIR */

        reconhecimento.addEventListener(
            "start",
            function () {

                console.log(
                    "Next Assistant está ouvindo."
                );


                voz.classList.add(
                    "ouvindo"
                );


                entrada.placeholder =
                    "Estou ouvindo...";

            }
        );


        /* RECEBEU A VOZ */

        reconhecimento.addEventListener(
            "result",
            function (evento) {

                const texto =
                    evento
                        .results[0][0]
                        .transcript;


                console.log(
                    "Voz reconhecida:",
                    texto
                );


                entrada.value =
                    texto;


                processarPergunta();

            }
        );


        /* PAROU DE OUVIR */

        reconhecimento.addEventListener(
            "end",
            function () {

                voz.classList.remove(
                    "ouvindo"
                );


                entrada.placeholder =
                    "Digite sua pergunta...";

            }
        );


        /* ERRO */

        reconhecimento.addEventListener(
            "error",
            function (evento) {

                console.error(
                    "Erro no reconhecimento:",
                    evento.error
                );


                voz.classList.remove(
                    "ouvindo"
                );


                entrada.placeholder =
                    "Digite sua pergunta...";

            }
        );


        /* BOTÃO DE VOZ */

        voz.addEventListener(
            "click",
            function () {

                try {

                    reconhecimento.start();

                } catch (erro) {

                    console.log(
                        "O reconhecimento já está ativo."
                    );

                }

            }
        );


    } else {

        /* NAVEGADOR NÃO SUPORTA VOZ */

        voz.addEventListener(
            "click",
            function () {

                alert(
                    "O reconhecimento de voz não está disponível neste navegador."
                );

            }
        );

    }


    /* =====================================================
       FINAL
    ===================================================== */

    console.log(
        "Next Assistant carregado com sucesso."
    );

});