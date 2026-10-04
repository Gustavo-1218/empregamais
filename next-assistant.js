document.addEventListener("DOMContentLoaded", function () {

    iniciarNextAssistant();

});


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

function iniciarNextAssistant() {

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

    const microfone =
        document.getElementById("nextAssistantMic");


    /*
     * Verificação dos elementos.
     */

    if (!botao) {

        console.error(
            "Next Assistant: botão não encontrado."
        );

        return;

    }


    if (!chat) {

        console.error(
            "Next Assistant: janela do chat não encontrada."
        );

        return;

    }


    if (!fechar) {

        console.error(
            "Next Assistant: botão fechar não encontrado."
        );

        return;

    }


    if (!form) {

        console.error(
            "Next Assistant: formulário não encontrado."
        );

        return;

    }


    if (!input) {

        console.error(
            "Next Assistant: campo de texto não encontrado."
        );

        return;

    }


    /*
     * Estado inicial.
     */

    chat.classList.remove("aberto");

    chat.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
     * Clique no botão principal.
     */

    botao.addEventListener(
        "click",
        function () {

            abrirNextAssistant();

        }
    );


    /*
     * Clique no botão fechar.
     */

    fechar.addEventListener(
        "click",
        function () {

            fecharNextAssistant();

        }
    );


    /*
     * Enviar pergunta pelo formulário.
     */

    form.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const pergunta =
                input.value.trim();


            if (!pergunta) {
                return;
            }


            enviarPergunta(
                pergunta
            );

        }
    );


    /*
     * Botões de sugestão.
     */

    const sugestoes =
        document.querySelectorAll(
            ".suggestion-button"
        );


    sugestoes.forEach(
        function (botaoSugestao) {

            botaoSugestao.addEventListener(
                "click",
                function () {

                    const pergunta =
                        botaoSugestao.getAttribute(
                            "data-question"
                        );


                    if (!pergunta) {
                        return;
                    }


                    enviarPergunta(
                        pergunta
                    );

                }
            );

        }
    );


    /*
     * Microfone.
     */

    if (microfone) {

        microfone.addEventListener(
            "click",
            function () {

                iniciarReconhecimentoDeVoz();

            }
        );

    }


    /*
     * ESC fecha o chat.
     */

    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key === "Escape" &&
                chat.classList.contains("aberto")
            ) {

                fecharNextAssistant();

            }

        }
    );


    console.log(
        "Next Assistant iniciado."
    );

}



/* =========================================================
   ABRIR
   ========================================================= */

function abrirNextAssistant() {

    const chat =
        document.getElementById(
            "nextAssistantChat"
        );


    const botao =
        document.getElementById(
            "nextAssistantButton"
        );


    if (!chat || !botao) {

        console.error(
            "Next Assistant: elementos não encontrados ao abrir."
        );

        return;

    }


    /*
     * Remove qualquer estado anterior.
     */

    chat.classList.remove(
        "fechando"
    );


    /*
     * Adiciona o estado aberto.
     */

    chat.classList.add(
        "aberto"
    );


    /*
     * Atualiza acessibilidade.
     */

    chat.setAttribute(
        "aria-hidden",
        "false"
    );


    botao.setAttribute(
        "aria-expanded",
        "true"
    );


    /*
     * Foco no campo de texto.
     */

    const input =
        document.getElementById(
            "nextAssistantInput"
        );


    if (input) {

        setTimeout(
            function () {

                input.focus();

            },
            200
        );

    }

}



/* =========================================================
   FECHAR
   ========================================================= */

function fecharNextAssistant() {

    const chat =
        document.getElementById(
            "nextAssistantChat"
        );


    const botao =
        document.getElementById(
            "nextAssistantButton"
        );


    if (!chat || !botao) {
        return;
    }


    chat.classList.remove(
        "aberto"
    );


    chat.setAttribute(
        "aria-hidden",
        "true"
    );


    botao.setAttribute(
        "aria-expanded",
        "false"
    );

}



/* =========================================================
   ENVIAR PERGUNTA
   ========================================================= */

function enviarPergunta(pergunta) {

    const input =
        document.getElementById(
            "nextAssistantInput"
        );


    if (input) {

        input.value = "";

    }


    adicionarMensagemUsuario(
        pergunta
    );


    mostrarDigitando();


    setTimeout(
        function () {

            removerDigitando();


            const resposta =
                obterResposta(
                    pergunta
                );


            adicionarMensagemAssistant(
                resposta
            );


            falarResposta(
                resposta
            );

        },
        500
    );

}



/* =========================================================
   MENSAGEM DO USUÁRIO
   ========================================================= */

function adicionarMensagemUsuario(texto) {

    const mensagens =
        document.getElementById(
            "nextAssistantMessages"
        );


    if (!mensagens) {
        return;
    }


    const mensagem =
        document.createElement(
            "div"
        );


    mensagem.className =
        "user-message";


    mensagem.innerHTML = `

        <div class="message-content">

            <span class="message-name">
                Você
            </span>

            <p>
                ${escaparHTML(texto)}
            </p>

        </div>

    `;


    mensagens.appendChild(
        mensagem
    );


    rolarMensagens();

}



/* =========================================================
   MENSAGEM DO ASSISTANT
   ========================================================= */

function adicionarMensagemAssistant(texto) {

    const mensagens =
        document.getElementById(
            "nextAssistantMessages"
        );


    if (!mensagens) {
        return;
    }


    const mensagem =
        document.createElement(
            "div"
        );


    mensagem.className =
        "assistant-message";


    mensagem.innerHTML = `

        <div class="message-avatar">

            <img
                src="audio.png"
                alt=""
            >

        </div>

        <div class="message-content">

            <span class="message-name">
                Next Assistant
            </span>

            <p>
                ${escaparHTML(texto)}
            </p>

        </div>

    `;


    mensagens.appendChild(
        mensagem
    );


    rolarMensagens();

}



/* =========================================================
   DIGITANDO
   ========================================================= */

function mostrarDigitando() {

    const mensagens =
        document.getElementById(
            "nextAssistantMessages"
        );


    if (!mensagens) {
        return;
    }


    if (
        document.getElementById(
            "nextAssistantTyping"
        )
    ) {

        return;

    }


    const digitando =
        document.createElement(
            "div"
        );


    digitando.id =
        "nextAssistantTyping";


    digitando.className =
        "assistant-message";


    digitando.innerHTML = `

        <div class="message-avatar">

            <img
                src="audio.png"
                alt=""
            >

        </div>

        <div class="message-content">

            <span class="message-name">
                Next Assistant
            </span>

            <p>
                <span class="typing-dots">
                    •••
                </span>
            </p>

        </div>

    `;


    mensagens.appendChild(
        digitando
    );


    rolarMensagens();

}



/* =========================================================
   REMOVER DIGITANDO
   ========================================================= */

function removerDigitando() {

    const digitando =
        document.getElementById(
            "nextAssistantTyping"
        );


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
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );


    /*
     * VAGAS PRÓXIMAS
     */

    if (
        texto.includes("vaga") &&
        (
            texto.includes("perto") ||
            texto.includes("proxim")
        )
    ) {

        return "Encontrei algumas oportunidades próximas a você, incluindo vagas na área de informática e atendimento. Para ver todas as oportunidades e seus detalhes, acesse a aba Vagas.";

    }


    /*
     * VAGAS DE INFORMÁTICA
     */

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


    /*
     * PROFISSIONAIS PRÓXIMOS
     */

    if (
        (
            texto.includes("profissional") ||
            texto.includes("profissionais")
        ) &&
        (
            texto.includes("perto") ||
            texto.includes("proxim")
        )
    ) {

        return "Na sua região há profissionais autônomos disponíveis para diferentes serviços. Alguns deles já aparecem nos destaques da página inicial. Para conhecer todos, acesse Autônomos.";

    }


    /*
     * ENCANADOR
     */

    if (
        texto.includes("encanador") ||
        texto.includes("encanamento")
    ) {

        return "Sim. Há profissionais oferecendo serviços de encanamento. Para consultar os profissionais disponíveis, seus serviços e informações de contato, acesse Autônomos.";

    }


    /*
     * PINTOR
     */

    if (
        texto.includes("pintor") ||
        texto.includes("pintura")
    ) {

        return "Sim. Há profissionais oferecendo serviços de pintura. Para consultar os profissionais disponíveis, seus serviços e informações de contato, acesse Autônomos.";

    }


    /*
     * FAXINEIRO
     */

    if (
        texto.includes("faxineiro") ||
        texto.includes("limpeza") ||
        texto.includes("faxina")
    ) {

        return "Sim. Há profissionais oferecendo serviços de limpeza. Para consultar os profissionais disponíveis, seus serviços e informações de contato, acesse Autônomos.";

    }


    /*
     * CONTRATAR SERVIÇO
     */

    if (
        texto.includes("preciso de alguem") ||
        texto.includes("fazer um servico") ||
        texto.includes("contratar alguem")
    ) {

        return "Posso ajudar. Existem profissionais autônomos disponíveis em diferentes áreas. Para encontrar o serviço que você precisa, acesse Autônomos.";

    }


    /*
     * EMPRESAS PRÓXIMAS
     */

    if (
        texto.includes("empresa") &&
        (
            texto.includes("perto") ||
            texto.includes("proxim")
        )
    ) {

        return "Encontrei empresas próximas à sua região. Algumas aparecem nos destaques da página inicial. Para visualizar todas e consultar suas localizações, acesse Empresas.";

    }


    /*
     * LOCALIZAÇÃO DAS EMPRESAS
     */

    if (
        texto.includes("onde fica") ||
        texto.includes("onde ficam") ||
        texto.includes("localizacao das empresas") ||
        texto.includes("localizacao empresa")
    ) {

        return "Você pode visualizar a localização das empresas diretamente no mapa. Para pesquisar e explorar as empresas próximas, acesse Empresas.";

    }


    /*
     * CANDIDATURAS
     */

    if (
        texto.includes("candidatura") ||
        texto.includes("candidaturas") ||
        texto.includes("meu processo")
    ) {

        return "Você pode acompanhar suas candidaturas e verificar o andamento de cada oportunidade. Para consultar os detalhes, acesse Minhas candidaturas.";

    }


    /*
     * PERFIL
     */

    if (
        texto.includes("meu perfil") ||
        texto.includes("informacoes do meu perfil") ||
        texto.includes("dados do meu perfil")
    ) {

        return "Seu perfil reúne suas informações profissionais, habilidades e currículo. Para consultar ou alterar seus dados, acesse Meu perfil.";

    }


    /*
     * CURSOS
     */

    if (
        texto.includes("curso") ||
        texto.includes("cursos") ||
        texto.includes("certificacao") ||
        texto.includes("certificacoes")
    ) {

        return "Seus cursos e certificações ficam registrados no seu perfil profissional. Para consultar todos eles, acesse Cursos e certificações.";

    }


    /*
     * SAUDAÇÕES
     */

    if (
        texto === "oi" ||
        texto === "ola" ||
        texto === "bom dia" ||
        texto === "boa tarde" ||
        texto === "boa noite"
    ) {

        return "Olá! Eu sou o Next Assistant. Como posso ajudar você?";

    }


    /*
     * AJUDA
     */

    if (
        texto.includes("o que voce faz") ||
        texto.includes("o que voce pode fazer") ||
        texto.includes("como voce pode ajudar")
    ) {

        return "Posso ajudar você a encontrar vagas, empresas e profissionais autônomos, além de consultar informações sobre candidaturas, perfil, cursos e certificações.";

    }


    /*
     * RESPOSTA PADRÃO
     */

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
        document.getElementById(
            "nextAssistantInput"
        );


    const microfone =
        document.getElementById(
            "nextAssistantMic"
        );


    if (microfone) {

        microfone.classList.add(
            "ouvindo"
        );

    }


    reconhecimento.start();


    reconhecimento.onresult =
        function (evento) {

            const resultado =
                evento
                    .results[0][0]
                    .transcript;


            if (input) {

                input.value =
                    resultado;

            }


            enviarPergunta(
                resultado
            );

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

                microfone.classList.remove(
                    "ouvindo"
                );

            }

        };

}



/* =========================================================
   RESPOSTA POR VOZ
   ========================================================= */

function falarResposta(texto) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;

    }


    window.speechSynthesis.cancel();


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



/* =========================================================
   ROLAR MENSAGENS
   ========================================================= */

function rolarMensagens() {

    const mensagens =
        document.getElementById(
            "nextAssistantMessages"
        );


    if (!mensagens) {
        return;
    }


    setTimeout(
        function () {

            mensagens.scrollTop =
                mensagens.scrollHeight;

        },
        50
    );

}



/* =========================================================
   PROTEGER HTML
   ========================================================= */

function escaparHTML(texto) {

    return texto
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}