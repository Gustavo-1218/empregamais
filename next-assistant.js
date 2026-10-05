document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const botao = document.getElementById("nextAssistantButton");
    const chat = document.getElementById("nextAssistantChat");
    const fechar = document.getElementById("nextAssistantClose");

    const mensagens = document.getElementById("nextAssistantMessages");
    const microfone = document.getElementById("nextAssistantMic");

    const sugestoes =
        document.querySelectorAll(".suggestion-button");


    console.log("Next Assistant iniciado.");


    /* =====================================================
       VERIFICAÇÃO
    ===================================================== */

    if (!botao) {
        console.error(
            "Next Assistant: botão principal não encontrado."
        );
        return;
    }

    if (!chat) {
        console.error(
            "Next Assistant: janela não encontrada."
        );
        return;
    }

    if (!fechar) {
        console.error(
            "Next Assistant: botão fechar não encontrado."
        );
        return;
    }

    if (!mensagens) {
        console.error(
            "Next Assistant: área de mensagens não encontrada."
        );
        return;
    }

    if (!microfone) {
        console.error(
            "Next Assistant: microfone não encontrado."
        );
        return;
    }


    /* =====================================================
       ESTADO INICIAL
    ===================================================== */

    chat.style.display = "none";

    chat.setAttribute(
        "aria-hidden",
        "true"
    );

    botao.setAttribute(
        "aria-expanded",
        "false"
    );


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

        botao.setAttribute(
            "aria-expanded",
            "true"
        );

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

        botao.setAttribute(
            "aria-expanded",
            "false"
        );

        pararFala();

    });


    /* =====================================================
       BANCO DE PERGUNTAS
    ===================================================== */

    const perguntas = [

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
                "vagas disponiveis",
                "vagas",
                "oportunidades"
            ],

            resposta:
                "Encontrei algumas oportunidades próximas a você, incluindo vagas na área de informática e atendimento. Para ver todas as oportunidades e seus detalhes, acesse a aba Vagas."
        },


        {
            palavras: [
                "profissionais perto",
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
                "serviço",
                "serviços"
            ],

            resposta:
                "Posso ajudar. Existem profissionais autônomos disponíveis em diferentes áreas. Para encontrar o serviço que você precisa, acesse Autônomos."
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
                "empresas perto",
                "empresas",
                "empresa"
            ],

            resposta:
                "Encontrei empresas próximas à sua região. Algumas aparecem nos destaques da página inicial. Para visualizar todas e consultar suas localizações, acesse Empresas."
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
                "meu perfil",
                "perfil"
            ],

            resposta:
                "Seu perfil reúne suas informações profissionais, habilidades e currículo. Para consultar ou alterar seus dados, acesse Meu perfil."
        },


        {
            palavras: [
                "certificacoes",
                "certificação",
                "cursos",
                "curso"
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


            if (pontuacao > maiorPontuacao) {

                maiorPontuacao = pontuacao;

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
       ADICIONAR PERGUNTA
    ===================================================== */

    function adicionarPergunta(texto) {

        const mensagem =
            document.createElement("div");


        mensagem.className =
            "usuario-mensagem";


        mensagem.textContent =
            texto;


        mensagens.appendChild(
            mensagem
        );


        mensagens.scrollTop =
            mensagens.scrollHeight;

    }


    /* =====================================================
       ADICIONAR RESPOSTA DA NEXT IA
    ===================================================== */

    function adicionarResposta(texto) {

        const mensagem =
            document.createElement("div");


        mensagem.className =
            "assistant-message";


        /* FOTO DA NEXT IA */

        const avatar =
            document.createElement("div");


        avatar.className =
            "message-avatar";


        const imagem =
            document.createElement("img");


        imagem.src =
            "ia quadrado.png";


        imagem.alt =
            "Next Assistant";


        avatar.appendChild(
            imagem
        );


        /* CONTEÚDO */

        const conteudo =
            document.createElement("div");


        conteudo.className =
            "message-content";


        const nome =
            document.createElement("span");


        nome.className =
            "message-name";


        nome.textContent =
            "Next Assistant";


        const textoResposta =
            document.createElement("p");


        textoResposta.textContent =
            texto;


        conteudo.appendChild(
            nome
        );


        conteudo.appendChild(
            textoResposta
        );


        mensagem.appendChild(
            avatar
        );


        mensagem.appendChild(
            conteudo
        );


        mensagens.appendChild(
            mensagem
        );


        mensagens.scrollTop =
            mensagens.scrollHeight;

    }


    /* =====================================================
       FALA DA NEXT IA
    ===================================================== */

    function falar(texto) {

        if (!window.speechSynthesis) {

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


        fala.lang =
            "pt-BR";


        fala.rate =
            1;


        fala.pitch =
            1;


        fala.volume =
            1;


        window.speechSynthesis.speak(
            fala
        );

    }


    function pararFala() {

        if (window.speechSynthesis) {

            window.speechSynthesis.cancel();

        }

    }


    /* =====================================================
       PROCESSAR PERGUNTA
    ===================================================== */

    function processarPergunta(pergunta) {

        if (!pergunta) return;


        console.log(
            "Pergunta recebida:",
            pergunta
        );


        adicionarPergunta(
            pergunta
        );


        setTimeout(function () {

            const resposta =
                encontrarResposta(
                    pergunta
                );


            console.log(
                "Resposta:",
                resposta
            );


            adicionarResposta(
                resposta
            );


            falar(
                resposta
            );

        }, 450);

    }


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


                microfone.classList.add(
                    "ouvindo"
                );

            }
        );


        /* PERGUNTA RECONHECIDA */

        reconhecimento.addEventListener(
            "result",
            function (evento) {

                const texto =
                    evento.results[0][0]
                        .transcript;


                console.log(
                    "Voz reconhecida:",
                    texto
                );


                processarPergunta(
                    texto
                );

            }
        );


        /* PAROU DE OUVIR */

        reconhecimento.addEventListener(
            "end",
            function () {

                microfone.classList.remove(
                    "ouvindo"
                );

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


                microfone.classList.remove(
                    "ouvindo"
                );

            }
        );


        /* CLIQUE NO MICROFONE */

        microfone.addEventListener(
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

        microfone.addEventListener(
            "click",
            function () {

                alert(
                    "O reconhecimento de voz não está disponível neste navegador."
                );

            }
        );

    }


    /* =====================================================
       SUGESTÕES
    ===================================================== */

    sugestoes.forEach(
        function (botaoSugestao) {

            botaoSugestao.addEventListener(
                "click",
                function () {

                    const pergunta =
                        botaoSugestao.dataset.question;


                    processarPergunta(
                        pergunta
                    );

                }
            );

        }
    );


    /* =====================================================
       FINALIZAÇÃO
    ===================================================== */

    console.log(
        "Next Assistant carregado com sucesso."
    );

});