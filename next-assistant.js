document.addEventListener("DOMContentLoaded", function () {

    console.log("Next Assistant iniciado.");


    /* =====================================================
       ELEMENTOS
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
        console.error("Next Assistant: campo de texto não encontrado.");
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
       ABRIR CHAT
    ===================================================== */

    botao.addEventListener("click", function () {

        chat.classList.add("aberto");

        chat.setAttribute(
            "aria-hidden",
            "false"
        );

        entrada.focus();

    });


    /* =====================================================
       FECHAR CHAT
    ===================================================== */

    fechar.addEventListener("click", function () {

        chat.classList.remove("aberto");

        chat.setAttribute(
            "aria-hidden",
            "true"
        );

    });


    /* =====================================================
       RESPOSTAS DO ASSISTENTE
    ===================================================== */

    const respostas = [

        {
            palavras: ["vagas", "disponiveis", "perto"],
            resposta:
                "Encontrei algumas oportunidades próximas a você, incluindo vagas na área de informática e atendimento. Para ver todas as oportunidades e seus detalhes, acesse a aba Vagas."
        },

        {
            palavras: ["vaga", "informatica"],
            resposta:
                "Sim. Há oportunidades relacionadas à área de informática disponíveis no momento. Para consultar os requisitos e se candidatar, acesse Vagas."
        },

        {
            palavras: ["profissionais", "perto"],
            resposta:
                "Na sua região há profissionais autônomos disponíveis para diferentes serviços. Alguns deles já aparecem nos destaques da página inicial. Para conhecer todos, acesse Autônomos."
        },

        {
            palavras: ["encanador"],
            resposta:
                "Sim. Há profissionais autônomos disponíveis para serviços de encanamento. Para encontrar um profissional, acesse Autônomos."
        },

        {
            palavras: ["pintor"],
            resposta:
                "Sim. Há profissionais autônomos disponíveis para serviços de pintura. Para encontrar um profissional, acesse Autônomos."
        },

        {
            palavras: ["faxineiro", "faxina", "limpeza"],
            resposta:
                "Há profissionais autônomos disponíveis para serviços de limpeza. Para consultar os profissionais disponíveis, acesse Autônomos."
        },

        {
            palavras: ["servico", "profissional"],
            resposta:
                "Posso ajudar. Existem profissionais autônomos disponíveis em diferentes áreas. Para encontrar o serviço que você precisa, acesse Autônomos."
        },

        {
            palavras: ["empresas", "perto"],
            resposta:
                "Encontrei empresas próximas à sua região. Algumas aparecem nos destaques da página inicial. Para visualizar todas e consultar suas localizações, acesse Empresas."
        },

        {
            palavras: ["onde", "empresas"],
            resposta:
                "Você pode visualizar a localização das empresas diretamente no mapa. Para pesquisar e explorar as empresas próximas, acesse Empresas."
        },

        {
            palavras: ["candidaturas"],
            resposta:
                "Você pode acompanhar suas candidaturas e verificar o andamento de cada oportunidade. Para consultar os detalhes, acesse Minhas candidaturas."
        },

        {
            palavras: ["perfil"],
            resposta:
                "Seu perfil reúne suas informações profissionais, habilidades e currículo. Para consultar ou alterar seus dados, acesse Meu perfil."
        },

        {
            palavras: ["cursos", "certificacoes"],
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
            .replace(/[\u0300-\u036f]/g, "");

    }


    /* =====================================================
       ENCONTRAR RESPOSTA
    ===================================================== */

    function encontrarResposta(pergunta) {

        const texto = normalizar(pergunta);

        let melhorResposta = null;
        let maiorPontuacao = 0;


        respostas.forEach(function (item) {

            let pontuacao = 0;


            item.palavras.forEach(function (palavra) {

                if (
                    texto.includes(
                        normalizar(palavra)
                    )
                ) {

                    pontuacao++;

                }

            });


            if (pontuacao > maiorPontuacao) {

                maiorPontuacao = pontuacao;

                melhorResposta = item.resposta;

            }

        });


        if (melhorResposta) {

            return melhorResposta;

        }


        return "Ainda não consegui encontrar uma resposta para essa pergunta. Tente perguntar sobre vagas, empresas, profissionais autônomos, candidaturas, perfil ou cursos.";

    }


    /* =====================================================
       ADICIONAR MENSAGEM
    ===================================================== */

    function adicionarMensagem(texto, tipo) {

        const mensagem =
            document.createElement("div");


        mensagem.classList.add(
            "next-assistant-message",
            tipo
        );


        mensagem.textContent = texto;


        mensagens.appendChild(mensagem);


        mensagens.scrollTop =
            mensagens.scrollHeight;

    }


    /* =====================================================
       FALAR RESPOSTA
    ===================================================== */

    function falar(texto) {

        if (
            !("speechSynthesis" in window)
        ) {

            return;

        }


        window.speechSynthesis.cancel();


        const fala =
            new SpeechSynthesisUtterance(texto);


        fala.lang = "pt-BR";

        fala.rate = 1;

        fala.pitch = 1;


        window.speechSynthesis.speak(fala);

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


        adicionarMensagem(
            pergunta,
            "usuario"
        );


        entrada.value = "";


        setTimeout(function () {

            const resposta =
                encontrarResposta(pergunta);


            adicionarMensagem(
                resposta,
                "assistant"
            );


            falar(resposta);

        }, 400);

    }


    /* =====================================================
       ENVIAR
    ===================================================== */

    enviar.addEventListener(
        "click",
        processarPergunta
    );


    /* =====================================================
       ENTER
    ===================================================== */

    entrada.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key === "Enter") {

                evento.preventDefault();

                processarPergunta();

            }

        }
    );


    /* =====================================================
       RECONHECIMENTO DE VOZ
    ===================================================== */

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (SpeechRecognition) {

        const reconhecimento =
            new SpeechRecognition();


        reconhecimento.lang =
            "pt-BR";


        reconhecimento.continuous =
            false;


        reconhecimento.interimResults =
            false;


        reconhecimento.addEventListener(
            "start",
            function () {

                voz.classList.add(
                    "ouvindo"
                );

                entrada.placeholder =
                    "Estou ouvindo...";

            }
        );


        reconhecimento.addEventListener(
            "result",
            function (evento) {

                const resultado =
                    evento.results[0][0].transcript;


                entrada.value =
                    resultado;


                processarPergunta();

            }
        );


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


        reconhecimento.addEventListener(
            "error",
            function (evento) {

                console.error(
                    "Erro no reconhecimento de voz:",
                    evento.error
                );


                voz.classList.remove(
                    "ouvindo"
                );


                entrada.placeholder =
                    "Digite sua pergunta...";

            }
        );


        voz.addEventListener(
            "click",
            function () {

                try {

                    reconhecimento.start();

                } catch (erro) {

                    console.log(
                        "Reconhecimento já iniciado."
                    );

                }

            }
        );


    } else {

        voz.addEventListener(
            "click",
            function () {

                alert(
                    "O reconhecimento de voz não está disponível neste navegador."
                );

            }
        );

    }


    console.log(
        "Next Assistant funcionando corretamente."
    );

});