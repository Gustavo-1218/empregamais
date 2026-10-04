/* =========================================================
   NEXT ASSISTANT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("nextAssistantContainer");
    const button = document.getElementById("nextAssistantButton");
    const chat = document.getElementById("nextAssistantChat");
    const closeButton = document.getElementById("nextAssistantClose");

    const form = document.getElementById("nextAssistantForm");
    const input = document.getElementById("nextAssistantInput");
    const messages = document.getElementById("nextAssistantMessages");

    const micButton = document.getElementById("nextAssistantMic");

    const suggestionButtons =
        document.querySelectorAll(".suggestion-button");


    if (!container || !button || !chat || !closeButton) {
        return;
    }


    /* =====================================================
       ABRIR ASSISTENTE
       ===================================================== */

    function abrirAssistant() {

        container.classList.add("aberto");

        button.setAttribute("aria-expanded", "true");

        chat.setAttribute("aria-hidden", "false");

        setTimeout(function () {
            if (input) {
                input.focus();
            }
        }, 250);
    }


    /* =====================================================
       FECHAR ASSISTENTE
       ===================================================== */

    function fecharAssistant() {

        container.classList.remove("aberto");

        button.setAttribute("aria-expanded", "false");

        chat.setAttribute("aria-hidden", "true");

        if (input) {
            input.blur();
        }
    }


    button.addEventListener("click", function () {

        const estaAberto =
            container.classList.contains("aberto");

        if (estaAberto) {
            fecharAssistant();
        } else {
            abrirAssistant();
        }

    });


    closeButton.addEventListener("click", function () {
        fecharAssistant();
    });


    /* =====================================================
       RESPOSTAS DO ASSISTENTE
       ===================================================== */

    function obterResposta(pergunta) {

        const texto = pergunta
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");


        /* VAGAS PRÓXIMAS */

        if (
            texto.includes("vaga") &&
            (
                texto.includes("proxima") ||
                texto.includes("perto") ||
                texto.includes("perto de mim") ||
                texto.includes("disponivel")
            )
        ) {

            return "Encontrei algumas oportunidades próximas a você, incluindo vagas na área de informática e atendimento. Para ver todas as oportunidades e seus detalhes, acesse a aba Vagas.";

        }


        /* VAGAS DE INFORMÁTICA */

        if (
            texto.includes("vaga") &&
            (
                texto.includes("informatica") ||
                texto.includes("computador") ||
                texto.includes("tecnologia")
            )
        ) {

            return "Sim. Há oportunidades relacionadas à área de informática disponíveis no momento. Para consultar os requisitos e se candidatar, acesse Vagas.";

        }


        /* PROFISSIONAIS PRÓXIMOS */

        if (
            (
                texto.includes("profissional") ||
                texto.includes("profissionais") ||
                texto.includes("autonomo") ||
                texto.includes("autonomos")
            ) &&
            (
                texto.includes("perto") ||
                texto.includes("proximo") ||
                texto.includes("proximos")
            )
        ) {

            return "Na sua região há profissionais autônomos disponíveis para diferentes serviços. Alguns deles já aparecem nos destaques da página inicial. Para conhecer todos, acesse Autônomos.";

        }


        /* ENCANADOR */

        if (
            texto.includes("encanador") ||
            texto.includes("encanamento")
        ) {

            return "Sim. Há profissionais oferecendo serviços de encanamento. Para consultar os profissionais disponíveis, seus serviços e informações de contato, acesse Autônomos.";

        }


        /* PINTOR */

        if (
            texto.includes("pintor") ||
            texto.includes("pintura")
        ) {

            return "Sim. Há profissionais que oferecem serviços de pintura. Para conhecer os profissionais disponíveis e consultar seus serviços, acesse Autônomos.";

        }


        /* FAXINEIRO */

        if (
            texto.includes("faxineiro") ||
            texto.includes("faxina") ||
            texto.includes("limpeza")
        ) {

            return "Sim. Há profissionais disponíveis para serviços de limpeza e faxina. Para consultar os profissionais e seus serviços, acesse Autônomos.";

        }


        /* SERVIÇO GENÉRICO */

        if (
            texto.includes("servico") ||
            texto.includes("serviço") ||
            texto.includes("preciso de alguem") ||
            texto.includes("preciso de alguém") ||
            texto.includes("contratar")
        ) {

            return "Posso ajudar. Existem profissionais autônomos disponíveis em diferentes áreas. Para encontrar o serviço que você precisa, acesse Autônomos.";

        }


        /* EMPRESAS PRÓXIMAS */

        if (
            texto.includes("empresa") &&
            (
                texto.includes("perto") ||
                texto.includes("proxima") ||
                texto.includes("proximo")
            )
        ) {

            return "Encontrei empresas próximas à sua região. Algumas aparecem nos destaques da página inicial. Para visualizar todas e consultar suas localizações, acesse Empresas.";

        }


        /* LOCALIZAÇÃO DAS EMPRESAS */

        if (
            (
                texto.includes("onde") ||
                texto.includes("localizacao") ||
                texto.includes("localizacao")
            ) &&
            (
                texto.includes("empresa") ||
                texto.includes("empresas")
            )
        ) {

            return "Você pode visualizar a localização das empresas diretamente no mapa. Para pesquisar e explorar as empresas próximas, acesse Empresas.";

        }


        /* CANDIDATURAS */

        if (
            texto.includes("candidatura") ||
            texto.includes("candidaturas") ||
            texto.includes("candidatei")
        ) {

            return "Você pode acompanhar suas candidaturas e verificar o andamento de cada oportunidade. Para consultar os detalhes, acesse Minhas candidaturas.";

        }


        /* PERFIL */

        if (
            texto.includes("meu perfil") ||
            texto.includes("meus dados") ||
            texto.includes("meu curriculo") ||
            texto.includes("meu currículo")
        ) {

            return "Seu perfil reúne suas informações profissionais, habilidades e currículo. Para consultar ou alterar seus dados, acesse Meu perfil.";

        }


        /* CURSOS */

        if (
            texto.includes("curso") ||
            texto.includes("cursos") ||
            texto.includes("certificacao") ||
            texto.includes("certificacao")
        ) {

            return "Seus cursos e certificações ficam registrados no seu perfil profissional. Para consultar todos eles, acesse Cursos e certificações.";

        }


        /* RESPOSTA PADRÃO */

        return "Ainda estou aprendendo a responder essa pergunta. Tente perguntar sobre vagas, empresas, autônomos, candidaturas, seu perfil ou cursos.";

    }


    /* =====================================================
       ADICIONAR MENSAGEM DO USUÁRIO
       ===================================================== */

    function adicionarMensagemUsuario(texto) {

        const mensagem = document.createElement("div");

        mensagem.className = "user-message";

        mensagem.innerHTML = `
            <div class="message-content">
                <span class="message-name">Você</span>
                <p>${escaparHTML(texto)}</p>
            </div>
        `;

        messages.appendChild(mensagem);

        rolarMensagens();

    }


    /* =====================================================
       ADICIONAR MENSAGEM DO ASSISTENTE
       ===================================================== */

    function adicionarMensagemAssistant(texto) {

        const mensagem = document.createElement("div");

        mensagem.className = "assistant-message";

        mensagem.innerHTML = `
            <div class="message-avatar">
                NA
            </div>

            <div class="message-content">
                <span class="message-name">
                    Next Assistant
                </span>

                <p>${escaparHTML(texto)}</p>
            </div>
        `;

        messages.appendChild(mensagem);

        rolarMensagens();

    }


    /* =====================================================
       ENVIO DA PERGUNTA
       ===================================================== */

    function enviarPergunta(pergunta) {

        const texto = pergunta.trim();

        if (!texto) {
            return;
        }


        adicionarMensagemUsuario(texto);

        input.value = "";


        /*
            Pequeno atraso para parecer uma resposta
            processada pelo assistente.
        */

        setTimeout(function () {

            const resposta =
                obterResposta(texto);

            adicionarMensagemAssistant(resposta);

            falarResposta(resposta);

        }, 500);

    }


    form.addEventListener("submit", function (evento) {

        evento.preventDefault();

        enviarPergunta(input.value);

    });


    /* =====================================================
       BOTÕES DE SUGESTÃO
       ===================================================== */

    suggestionButtons.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const pergunta =
                botao.getAttribute("data-question");

            enviarPergunta(pergunta);

        });

    });


    /* =====================================================
       RECONHECIMENTO DE VOZ
       ===================================================== */

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    let reconhecimento = null;


    if (SpeechRecognition) {

        reconhecimento = new SpeechRecognition();

        reconhecimento.lang = "pt-BR";

        reconhecimento.continuous = false;

        reconhecimento.interimResults = false;


        reconhecimento.addEventListener(
            "start",
            function () {

                micButton.classList.add("ouvindo");

                micButton.setAttribute(
                    "aria-label",
                    "Parar reconhecimento de voz"
                );

            }
        );


        reconhecimento.addEventListener(
            "end",
            function () {

                micButton.classList.remove("ouvindo");

                micButton.setAttribute(
                    "aria-label",
                    "Falar com o Next Assistant"
                );

            }
        );


        reconhecimento.addEventListener(
            "result",
            function (evento) {

                const resultado =
                    evento.results[0][0].transcript;

                input.value = resultado;

                enviarPergunta(resultado);

            }
        );


        reconhecimento.addEventListener(
            "error",
            function (evento) {

                console.error(
                    "Erro no reconhecimento de voz:",
                    evento.error
                );

                micButton.classList.remove("ouvindo");

            }
        );


        micButton.addEventListener(
            "click",
            function () {

                try {

                    reconhecimento.start();

                } catch (erro) {

                    console.error(
                        "Não foi possível iniciar o microfone.",
                        erro
                    );

                }

            }
        );

    } else {

        /*
            Caso o navegador não suporte reconhecimento
            de voz, o botão continua visível, mas informa
            que a função não está disponível.
        */

        micButton.addEventListener(
            "click",
            function () {

                adicionarMensagemAssistant(
                    "O reconhecimento de voz não está disponível neste navegador. Você pode digitar sua pergunta."
                );

            }
        );

    }


    /* =====================================================
       SÍNTESE DE VOZ
       ===================================================== */

    function falarResposta(texto) {

        if (!("speechSynthesis" in window)) {
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
       ROLAGEM
       ===================================================== */

    function rolarMensagens() {

        messages.scrollTop =
            messages.scrollHeight;

    }


    /* =====================================================
       SEGURANÇA BÁSICA DO TEXTO
       ===================================================== */

    function escaparHTML(texto) {

        return texto
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       ESC PARA FECHAR
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key === "Escape" &&
                container.classList.contains("aberto")
            ) {

                fecharAssistant();

            }

        }
    );

});