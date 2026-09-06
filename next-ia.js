document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       DADOS
    ===================================================== */

    const candidatos = [

        {
            nome: "Ana Beatriz",
            inicial: "AB",
            profissao: "Desenvolvedora Front-End",
            localizacao: "Natal, RN",
            area: "tecnologia",
            habilidades: ["HTML", "CSS", "JavaScript"]
        },

        {
            nome: "Lucas Henrique",
            inicial: "LH",
            profissao: "Designer Gráfico",
            localizacao: "Extremoz, RN",
            area: "design",
            habilidades: ["Figma", "Photoshop", "UI/UX"]
        },

        {
            nome: "Mariana Silva",
            inicial: "MS",
            profissao: "Assistente Administrativa",
            localizacao: "Natal, RN",
            area: "administracao",
            habilidades: ["Excel", "Organização", "Atendimento"]
        },

        {
            nome: "Gabriel Santos",
            inicial: "GS",
            profissao: "Analista de Marketing",
            localizacao: "São Gonçalo do Amarante, RN",
            area: "marketing",
            habilidades: ["Marketing", "Redes sociais", "Canva"]
        },

        {
            nome: "João Pedro",
            inicial: "JP",
            profissao: "Desenvolvedor Web",
            localizacao: "Natal, RN",
            area: "tecnologia",
            habilidades: ["HTML", "JavaScript", "Git"]
        },

        {
            nome: "Carolina Alves",
            inicial: "CA",
            profissao: "UX Designer",
            localizacao: "Extremoz, RN",
            area: "design",
            habilidades: ["Figma", "UX", "Prototipagem"]
        }

    ];


    const empresas = [

        {
            nome: "TechNova",
            inicial: "TN",
            profissao: "Tecnologia e Desenvolvimento",
            localizacao: "Natal, RN",
            area: "tecnologia",
            habilidades: ["Desenvolvimento", "Software", "Tecnologia"]
        },

        {
            nome: "Next Design",
            inicial: "ND",
            profissao: "Design e Comunicação",
            localizacao: "Natal, RN",
            area: "design",
            habilidades: ["Design", "Branding", "UI/UX"]
        },

        {
            nome: "Conecta RH",
            inicial: "CR",
            profissao: "Recursos Humanos",
            localizacao: "Extremoz, RN",
            area: "administracao",
            habilidades: ["RH", "Gestão", "Recrutamento"]
        },

        {
            nome: "Digital Mais",
            inicial: "DM",
            profissao: "Marketing Digital",
            localizacao: "Natal, RN",
            area: "marketing",
            habilidades: ["Marketing", "Social Media", "Publicidade"]
        },

        {
            nome: "CodeLab",
            inicial: "CL",
            profissao: "Desenvolvimento de Software",
            localizacao: "São Gonçalo do Amarante, RN",
            area: "tecnologia",
            habilidades: ["Programação", "Web", "Sistemas"]
        },

        {
            nome: "Criativa Comunicação",
            inicial: "CC",
            profissao: "Agência de Comunicação",
            localizacao: "Natal, RN",
            area: "design",
            habilidades: ["Design", "Publicidade", "Branding"]
        }

    ];


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const lista = document.getElementById("lista-conexoes");

    const pesquisa = document.getElementById("pesquisa");

    const filtroArea = document.getElementById("filtro-area");

    const botaoCandidatos =
        document.getElementById("botao-candidatos");

    const botaoEmpresas =
        document.getElementById("botao-empresas");

    const chat =
        document.getElementById("chat");

    const perguntas =
        document.querySelectorAll(".pergunta");


    let tipoAtual = "candidatos";



    /* =====================================================
       RENDERIZAR LISTA
    ===================================================== */

    function renderizarLista() {

        const dados =
            tipoAtual === "candidatos"
                ? candidatos
                : empresas;


        const termo =
            pesquisa.value
                .toLowerCase()
                .trim();


        const area =
            filtroArea.value;


        const resultados = dados.filter(item => {

            const texto =
                (
                    item.nome +
                    " " +
                    item.profissao +
                    " " +
                    item.localizacao +
                    " " +
                    item.habilidades.join(" ")
                ).toLowerCase();


            const correspondePesquisa =
                texto.includes(termo);


            const correspondeArea =
                area === "todas" ||
                item.area === area;


            return correspondePesquisa &&
                   correspondeArea;

        });


        lista.innerHTML = "";


        if (resultados.length === 0) {

            lista.innerHTML = `

                <div class="nenhum-resultado">

                    Nenhuma conexão encontrada.

                </div>

            `;

            return;

        }


        resultados.forEach(item => {

            const card =
                document.createElement("div");


            card.className =
                "card-conexao";


            const classeAvatar =
                tipoAtual === "empresas"
                    ? "avatar empresa"
                    : "avatar";


            card.innerHTML = `

                <div class="${classeAvatar}">
                    ${item.inicial}
                </div>

                <div class="info-conexao">

                    <h3>
                        ${item.nome}
                    </h3>

                    <div class="profissao">
                        ${item.profissao}
                    </div>

                    <div class="localizacao">
                        📍 ${item.localizacao}
                    </div>

                    <div class="habilidades">

                        ${item.habilidades.map(habilidade => `

                            <span class="habilidade">
                                ${habilidade}
                            </span>

                        `).join("")}

                    </div>

                </div>

                <button class="botao-perfil">
                    Ver perfil
                </button>

            `;


            lista.appendChild(card);

        });

    }



    /* =====================================================
       TROCAR CANDIDATOS / EMPRESAS
    ===================================================== */

    function trocarTipo(tipo) {

        tipoAtual = tipo;


        botaoCandidatos
            .classList
            .remove("ativo");


        botaoEmpresas
            .classList
            .remove("ativo");


        if (tipo === "candidatos") {

            botaoCandidatos
                .classList
                .add("ativo");

        } else {

            botaoEmpresas
                .classList
                .add("ativo");

        }


        pesquisa.value = "";

        filtroArea.value = "todas";


        renderizarLista();

    }


    botaoCandidatos.addEventListener(
        "click",
        () => trocarTipo("candidatos")
    );


    botaoEmpresas.addEventListener(
        "click",
        () => trocarTipo("empresas")
    );



    /* =====================================================
       PESQUISA
    ===================================================== */

    pesquisa.addEventListener(
        "input",
        renderizarLista
    );


    filtroArea.addEventListener(
        "change",
        renderizarLista
    );



    /* =====================================================
       FUNÇÃO DE MENSAGEM DA IA
    ===================================================== */

    function adicionarMensagem(
        texto,
        usuario = false
    ) {

        const mensagem =
            document.createElement("div");


        mensagem.className =
            usuario
                ? "mensagem usuario"
                : "mensagem";


        if (usuario) {

            mensagem.innerHTML = `

                <div class="bolha">

                    ${texto}

                </div>

            `;

        } else {

            mensagem.innerHTML = `

                <div class="mini-ia">
                    ✦
                </div>

                <div class="bolha">

                    ${texto}

                </div>

            `;

        }


        chat.appendChild(mensagem);


        chat.scrollTop =
            chat.scrollHeight;

    }



    /* =====================================================
       EFEITO "PENSANDO"
    ===================================================== */

    function mostrarPensando() {

        const mensagem =
            document.createElement("div");


        mensagem.className =
            "mensagem mensagem-pensando";


        mensagem.innerHTML = `

            <div class="mini-ia">
                ✦
            </div>

            <div class="bolha">

                <span>Processando</span>
                <span class="ponto">.</span>
                <span class="ponto">.</span>
                <span class="ponto">.</span>

            </div>

        `;


        chat.appendChild(mensagem);


        chat.scrollTop =
            chat.scrollHeight;


        return mensagem;

    }



    /* =====================================================
       DESTACAR RESULTADOS
    ===================================================== */

    function destacarResultados(
        tipo,
        area = null,
        habilidade = null
    ) {

        const cards =
            lista.querySelectorAll(
                ".card-conexao"
            );


        cards.forEach(card => {

            const texto =
                card.innerText.toLowerCase();


            let destacar = true;


            if (area) {

                destacar =
                    texto.includes(area);

            }


            if (habilidade) {

                destacar =
                    texto.includes(
                        habilidade.toLowerCase()
                    );

            }


            if (destacar) {

                card.classList.add(
                    "destacado"
                );

            }

        });

    }



    /* =====================================================
       RESPOSTAS DA NEXT IA
    ===================================================== */

    function responder(pergunta) {


        let resposta = "";

        let tipo = null;

        let area = null;

        let habilidade = null;


        switch (pergunta) {


            case "html":

                tipo = "candidatos";

                habilidade = "html";


                resposta =
                    "Encontrei candidatos que possuem HTML entre suas habilidades. Analisei as conexões disponíveis e destaquei os perfis mais relacionados.";


                break;



            case "tecnologia":

                tipo = "empresas";

                area = "tecnologia";


                resposta =
                    "Encontrei empresas relacionadas à área de tecnologia. Elas trabalham principalmente com desenvolvimento, software e soluções digitais.";


                break;



            case "natal":

                tipo = "candidatos";


                resposta =
                    "Encontrei candidatos localizados em Natal. Eles foram destacados na lista de conexões.";


                break;



            case "administracao":

                tipo = "candidatos";

                area = "administracao";


                resposta =
                    "Encontrei candidatos relacionados à área de Administração. Alguns possuem experiência com gestão, atendimento e organização.";


                break;



            case "design":

                tipo = "candidatos";

                area = "design";


                resposta =
                    "Encontrei candidatos relacionados a Design. Entre as habilidades estão UI/UX, Figma, prototipagem e comunicação visual.";


                break;

        }


        if (tipo) {

            trocarTipo(tipo);

        }


        const mensagemPensando =
            mostrarPensando();


        setTimeout(() => {

            mensagemPensando.remove();


            adicionarMensagem(
                resposta
            );


            setTimeout(() => {

                destacarResultados(
                    tipo,
                    area,
                    habilidade
                );

            }, 100);


        }, 800);

    }



    /* =====================================================
       PERGUNTAS
    ===================================================== */

    perguntas.forEach(pergunta => {

        pergunta.addEventListener(
            "click",
            () => {

                const tipoPergunta =
                    pergunta.dataset.pergunta;


                const texto =
                    pergunta.innerText;


                adicionarMensagem(
                    texto,
                    true
                );


                perguntas.forEach(
                    botao => {

                        botao.disabled = true;

                    }
                );


                responder(tipoPergunta);


                setTimeout(() => {

                    perguntas.forEach(
                        botao => {

                            botao.disabled = false;

                        }
                    );

                }, 1300);

            }
        );

    });



    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const botaoMenu =
        document.getElementById(
            "botao-menu-mobile"
        );

    const menuMobile =
        document.getElementById(
            "menu-mobile"
        );


    if (botaoMenu && menuMobile) {

        botaoMenu.addEventListener(
            "click",
            () => {

                menuMobile.classList.toggle(
                    "aberto"
                );

            }
        );

    }



    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    renderizarLista();

});
