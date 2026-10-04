document.addEventListener("DOMContentLoaded", function () {

    carregarNextAssistant();

});


/* =========================================================
   CARREGAMENTO DO NEXT ASSISTANT
   ========================================================= */

function carregarNextAssistant() {

    /*
     * Verifica se o Assistant já foi carregado.
     * Isso evita carregar duas vezes na mesma página.
     */

    if (document.getElementById("nextAssistantContainer")) {
        iniciarNextAssistant();
        return;
    }


    /*
     * Cria automaticamente um espaço para o Assistant.
     */

    const container = document.createElement("div");

    container.id = "next-assistant-loader";

    document.body.appendChild(container);


    /*
     * Busca o HTML do Assistant.
     */

    fetch("next-assistant.html")

        .then(function (resposta) {

            if (!resposta.ok) {
                throw new Error(
                    "Não foi possível carregar o next-assistant.html"
                );
            }

            return resposta.text();

        })

        .then(function (html) {

            container.innerHTML = html;

            iniciarNextAssistant();

        })

        .catch(function (erro) {

            console.error(
                "Erro ao carregar o Next Assistant:",
                erro
            );

        });

}



/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

function iniciarNextAssistant() {

    const container =
        document.getElementById("nextAssistantContainer");

    const botao =
        document.getElementById("nextAssistantButton");

    const chat =
        document.getElementById("nextAssistantChat");

    const fechar =
        document.getElementById("nextAssistantClose");

    const form =
        document.getElementById("nextAssistantForm");

    const input =
        document.getElementById("nextAssistantInput");

    const mensagens =
        document.getElementById("nextAssistantMessages");

    const microfone =
        document.getElementById("nextAssistantMic");


    /*
     * Se alguma parte essencial não existir,
     * interrompe a inicialização.
     */

    if (
        !container ||
        !botao ||
        !chat ||
        !fechar ||
        !form ||
        !input ||
        !mensagens
    ) {

        console.error(
            "Next Assistant: estrutura HTML incompleta."
        );

        return;

    }


    /* =====================================================
       ABRIR ASSISTANT
       ===================================================== */

    botao.addEventListener("click", function () {

        abrirNextAssistant();

    });


    /* =====================================================
       FECHAR ASSISTANT
       ===================================================== */

    fechar.addEventListener("click", function () {

        fecharNextAssistant();

    });


    /* =====================================================
       FORMULÁRIO
       ===================================================== */

    form.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const pergunta = input.value.trim();

        if (!pergunta) {
            return;
        }

        enviarPergunta(pergunta);

    });


    /* =====================================================
       BOTÕES DE SUGESTÃO
       ===================================================== */

    const sugestoes =
        document.querySelectorAll(".suggestion-button");

    sugestoes.forEach(function (botaoSugestao) {

        botaoSugestao.addEventListener("click", function () {

            const pergunta =
                botaoSugestao.getAttribute("data-question");

            if (!pergunta) {
                return;
            }

            enviarPergunta(pergunta);

        });

    });


    /* =====================================================
       MICROFONE
       ===================================================== */

    if (microfone) {

        microfone.addEventListener("click", function () {

            iniciarReconhecimentoDeVoz();

        });

    }


    /* =====================================================
       ESC PARA FECHAR
       ===================================================== */

    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {

            const estaAberto =
                chat.classList.contains("aberto");

            if (estaAberto) {

                fecharNextAssistant();

            }

        }

    });


    console.log("Next Assistant carregado com sucesso.");

}



/* =========================================================
   ABRIR
   ========================================================= */

function abrirNextAssistant() {

    const botao =
        document.getElementById("nextAssistantButton");

    const chat =
        document.getElementById("nextAssistantChat");

    if (!botao || !chat) {
        return;
    }


    chat.classList.add("aberto");

    chat.setAttribute("aria-hidden", "false");

    botao.setAttribute("aria-expanded", "true");



    const input =
        document.getElementById("nextAssistantInput");

    if (input) {

        setTimeout(function () {

            input.focus();

        }, 150);

    }

}



/* =========================================================
   FECHAR
   ========================================================= */

function fecharNextAssistant() {

    const botao =
        document.getElementById("nextAssistantButton");

    const chat =
        document.getElementById("nextAssistantChat");

    if (!botao || !chat) {
        return;
    }


    chat.classList.remove("aberto");

    chat.setAttribute("aria-hidden", "true");

    botao.setAttribute("aria-expanded", "false");

}



/* =========================================================
   ENVIAR PERGUNTA
   ========================================================= */

function enviarPergunta(pergunta) {

    const input =
        document.getElementById("nextAssistantInput");

    if (input) {
        input.value = "";
    }


    adicionarMensagemUsuario(pergunta);


    /*
     * Pequeno atraso para parecer que o Assistant
     * está processando a pergunta.
     */

    mostrarDigitando();


    setTimeout(function () {

        removerDigitando();


        const resposta =
            obterResposta(pergunta);


        adicionarMensagemAssistant(resposta);


        falarResposta(resposta);

    }, 500);

}



/* =========================================================
   MENSAGEM DO USUÁRIO
   ========================================================= */

function adicionarMensagemUsuario(texto) {

    const mensagens =
        document.getElementById("nextAssistantMessages");

    if (!mensagens) {
        return;
    }


    const mensagem =
        document.createElement("div");

    mensagem.className =
        "user-message";


    mensagem.innerHTML = `

        <div class="message-content">

            <span class="message-name">
                Você
            </span>

            <p>${escaparHTML(texto)}</p>

        </div>

    `;


    mensagens.appendChild(mensagem);

    rolarMensagensParaBaixo();

}



/* =========================================================
   MENSAGEM DO ASSISTANT
   ========================================================= */

function adicionarMensagemAssistant(texto) {

    const mensagens =
        document.getElementById("nextAssistantMessages");

    if (!mensagens) {
        return;
    }


    const mensagem =
        document.createElement("div");

    mensagem.className =
        "assistant-message";


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


    mensagens.appendChild(mensagem);

    rolarMensagensParaBaixo();

}



/* =========================================================
   "DIGITANDO..."
   ========================================================= */

function mostrarDigitando() {

    const mensagens =
        document.getElementById("nextAssistantMessages");

    if (!mensagens) {
        return;
    }


    if (document.getElementById("nextAssistantTyping")) {
        return;
    }


    const digitando =
        document.createElement("div");

    digitando.id =
        "nextAssistantTyping";

    digitando.className =
        "assistant-message";


    digitando.innerHTML = `

        <div class="message-avatar">
            NA
        </div>

        <div class="message-content">

            <span class="message-name">
                Next Assistant
            </span>

            <p>
                <span class="typing-dots">•••</span>
            </p>

        </div>

    `;


    mensagens.appendChild(digitando);

    rolarMensagensParaBaixo();

}



/* =========================================================
   REMOVER "DIGITANDO..."
   ========================================================= */

function removerDigitando() {

    const digitando =
        document.getElementById("nextAssistantTyping");

    if (digitando) {

        digitando.remove();

    }

}



/* =========================================================
   RESPOSTAS
   ========================================================= */

function obterResposta(pergunta) {

    const texto =
        pergunta
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");


    /* -----------------------------------------------
       VAGAS
       ----------------------------------------------- */

    if (
        texto.includes("vaga") &&
        (
            texto.includes("perto") ||
            texto.includes("proxim")
        )
    ) {

        return "Encontrei algumas oportunidades próximas a você, incluindo vagas na área de informática e atendimento. Para ver todas as oportunidades e seus detalhes, acesse a aba Vagas.";

    }


    if (
        texto.includes("vaga") &&
        (
            texto.includes("informatica") ||
            texto.includes("programacao") ||
            texto.includes("tecnologia")
        )
    ) {

        return "Sim. Há oportunidades relacionadas à área de informática disponíveis no momento. Para consultar os requisitos e se candidatar, acesse Vagas.";

    }


    /* -----------------------------------------------
       PROFISSIONAIS
       ----------------------------------------------- */

    if (
        (
            texto.includes("profissionais") ||
            texto.includes("profissional")
        ) &&
        (
            texto.includes("perto") ||
            texto.includes("proxim")
        )
    ) {

        return "Na sua região há profissionais autônomos disponíveis para diferentes serviços. Alguns deles já aparecem nos destaques da página inicial. Para conhecer todos, acesse Autônomos.";

    }


    /* -----------------------------------------------
       ENCANADOR
       ----------------------------------------------- */

    if (texto.includes("encanador")) {

        return "Sim. Há profissionais oferecendo serviços de encanamento. Para consultar os profissionais disponíveis, seus serviços e informações de contato, acesse Autônomos.";

    }


    /* -----------------------------------------------
       PINTOR
       ----------------------------------------------- */

    if (texto.includes("pintor") || texto.includes("pintura")) {

        return "Sim. Há profissionais oferecendo serviços de pintura. Para consultar os profissionais disponíveis, seus serviços e informações de contato, acesse Autônomos.";

    }


    /* -----------------------------------------------
       FAXINEIRO
       ----------------------------------------------- */

    if (
        texto.includes("faxineiro") ||
        texto.includes("limpeza") ||
        texto.includes("faxina")
    ) {

        return "Sim. Há profissionais oferecendo serviços de limpeza. Para consultar os profissionais disponíveis, seus serviços e informações de contato, acesse Autônomos.";

    }


    /* -----------------------------------------------
       PRECISO DE UM SERVIÇO
       ----------------------------------------------- */

    if (
        texto.includes("preciso de alguem") ||
        texto.includes("preciso de alguém") ||
        texto.includes("fazer um servico") ||
        texto.includes("fazer um serviço") ||
        texto.includes("contratar alguem") ||
        texto.includes("contratar alguém")
    ) {

        return "Posso ajudar. Existem profissionais autônomos disponíveis em diferentes áreas. Para encontrar o serviço que você precisa, acesse Autônomos.";

    }


    /* -----------------------------------------------
       EMPRESAS
       ----------------------------------------------- */

    if (
        texto.includes("empresa") &&
        (
            texto.includes("perto") ||
            texto.includes("proxim")
        )
    ) {

        return "Encontrei empresas próximas à sua região. Algumas aparecem nos destaques da página inicial. Para visualizar todas e consultar suas localizações, acesse Empresas.";

    }


    if (
        texto.includes("onde fica") ||
        texto.includes("onde ficam") ||
        texto.includes("localizacao das empresas") ||
        texto.includes("localizacao empresa")
    ) {

        return "Você pode visualizar a localização das empresas diretamente no mapa. Para pesquisar e explorar as empresas próximas, acesse Empresas.";

    }


    /* -----------------------------------------------
       CANDIDATURAS
       ----------------------------------------------- */

    if (
        texto.includes("candidatura") ||
        texto.includes("candidaturas") ||
        texto.includes("meu processo")
    ) {

        return "Você pode acompanhar suas candidaturas e verificar o andamento de cada oportunidade. Para consultar os detalhes, acesse Minhas candidaturas.";

    }


    /* -----------------------------------------------
       PERFIL
       ----------------------------------------------- */

    if (
        texto.includes("meu perfil") ||
        texto.includes("informacoes do meu perfil") ||
        texto.includes("informacao do meu perfil") ||
        texto.includes("dados do meu perfil")
    ) {

        return "Seu perfil reúne suas informações profissionais, habilidades e currículo. Para consultar ou alterar seus dados, acesse Meu perfil.";

    }


    /* -----------------------------------------------
       CURSOS
       ----------------------------------------------- */

    if (
        texto.includes("curso") ||
        texto.includes("cursos") ||
        texto.includes("certificacao") ||
        texto.includes("certificacoes")
    ) {

        return "Seus cursos e certificações ficam registrados no seu perfil profissional. Para consultar todos eles, acesse Cursos e certificações.";

    }


    /* -----------------------------------------------
       SAUDAÇÕES
       ----------------------------------------------- */

    if (
        texto === "oi" ||
        texto === "ola" ||
        texto === "bom dia" ||
        texto === "boa tarde" ||
        texto === "boa noite"
    ) {

        return "Olá! Eu sou o Next Assistant. Posso ajudar você a encontrar vagas, empresas, profissionais autônomos e informações sobre seu perfil.";

    }


    /* -----------------------------------------------
       AJUDA
       ----------------------------------------------- */

    if (
        texto.includes("o que voce faz") ||
        texto.includes("o que voce pode fazer") ||
        texto.includes("como voce pode ajudar")
    ) {

        return "Posso ajudar você a encontrar vagas, empresas e profissionais autônomos, além de consultar informações sobre candidaturas, perfil, cursos e certificações.";

    }


    /* -----------------------------------------------
       RESPOSTA PADRÃO
       ----------------------------------------------- */

    return "Ainda estou aprendendo a responder essa pergunta. Tente perguntar sobre vagas, empresas, profissionais autônomos, candidaturas, seu perfil ou cursos e certificações.";

}



/* =========================================================
   RECONHECIMENTO DE VOZ
   ========================================================= */

function iniciarReconhecimentoDeVoz() {

    const Reconhecimento =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!Reconhecimento) {

        alert(
            "O reconhecimento de voz não está disponível neste navegador."
        );

        return;

    }


    const reconhecimento =
        new Reconhecimento();


    reconhecimento.lang =
        "pt-BR";

    reconhecimento.interimResults =
        false;

    reconhecimento.continuous =
        false;


    const input =
        document.getElementById("nextAssistantInput");

    const microfone =
        document.getElementById("nextAssistantMic");


    if (microfone) {

        microfone.classList.add("ouvindo");

    }


    reconhecimento.start();


    reconhecimento.onresult =
        function (evento) {

            const resultado =
                evento.results[0][0].transcript;


            if (input) {

                input.value =
                    resultado;

            }


            enviarPergunta(resultado);

        };


    reconhecimento.onerror =
        function (evento) {

            console.error(
                "Erro no reconhecimento de voz:",
                evento.error
            );

        };


    reconhecimento.onend =
        function () {

            if (microfone) {

                microfone.classList.remove("ouvindo");

            }

        };

}



/* =========================================================
   RESPOSTA FALADA
   ========================================================= */

function falarResposta(texto) {

    if (!("speechSynthesis" in window)) {
        return;
    }


    /*
     * Cancela qualquer fala anterior.
     */

    window.speechSynthesis.cancel();


    const fala =
        new SpeechSynthesisUtterance(texto);


    fala.lang =
        "pt-BR";

    fala.rate =
        1;

    fala.pitch =
        1;

    fala.volume =
        1;


    window.speechSynthesis.speak(fala);

}



/* =========================================================
   ROLAGEM DAS MENSAGENS
   ========================================================= */

function rolarMensagensParaBaixo() {

    const mensagens =
        document.getElementById("nextAssistantMessages");

    if (!mensagens) {
        return;
    }


    setTimeout(function () {

        mensagens.scrollTop =
            mensagens.scrollHeight;

    }, 50);

}



/* =========================================================
   SEGURANÇA BÁSICA DO TEXTO
   ========================================================= */

function escaparHTML(texto) {

    return texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}