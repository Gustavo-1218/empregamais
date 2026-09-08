document.addEventListener("DOMContentLoaded", function () {

    const alternativas = document.querySelectorAll(".alternativa");
    const chat = document.querySelector(".chat-mensagens");
    const resultado = document.getElementById("resultado-interview");

    const porcentagemFinal = document.getElementById("porcentagem-final");
    const descricaoPerfil = document.getElementById("descricao-perfil");
    const listaCaracteristicas = document.getElementById("lista-caracteristicas-final");
    const fraseFinal = document.getElementById("frase-perfil-final");

    const caracteristicas = {
        comunicacao: 0,
        proatividade: 0,
        estrategia: 0,
        adaptacao: 0,
        colaboracao: 0,
        aprendizado: 0
    };

    let perguntaAtual = 0;

    /*
    ==========================================
    PERGUNTAS DA ENTREVISTA
    ==========================================
    */

    const perguntas = [
        {
            texto: "Imagine que você recebeu uma tarefa importante, mas o prazo é menor do que esperava. O que você faria?",
            respostas: {
                A: {
                    texto: "Organizaria as prioridades e começaria imediatamente.",
                    pontos: {
                        proatividade: 10,
                        estrategia: 8
                    }
                },

                B: {
                    texto: "Conversaria com a equipe para entender como dividir a tarefa.",
                    pontos: {
                        colaboracao: 10,
                        comunicacao: 8
                    }
                },

                C: {
                    texto: "Analisaria a situação e mudaria minha estratégia.",
                    pontos: {
                        adaptacao: 10,
                        estrategia: 8
                    }
                }
            }
        },

        {
            texto: "Durante um projeto, alguém da equipe apresenta uma ideia completamente diferente da sua. Como você reage?",
            respostas: {
                A: {
                    texto: "Escuto a ideia e tento encontrar uma forma de aproveitá-la.",
                    pontos: {
                        colaboracao: 10,
                        comunicacao: 8
                    }
                },

                B: {
                    texto: "Defendo minha ideia, mas estou disposto a comparar as duas.",
                    pontos: {
                        estrategia: 10,
                        comunicacao: 6
                    }
                },

                C: {
                    texto: "Prefiro experimentar a nova ideia para descobrir se funciona.",
                    pontos: {
                        adaptacao: 10,
                        aprendizado: 8
                    }
                }
            }
        },

        {
            texto: "Você percebe que não sabe fazer uma parte importante da tarefa. O que faria?",
            respostas: {
                A: {
                    texto: "Pesquisaria e aprenderia o necessário para conseguir fazer.",
                    pontos: {
                        aprendizado: 12,
                        proatividade: 6
                    }
                },

                B: {
                    texto: "Pediria ajuda para alguém que já domina aquela tarefa.",
                    pontos: {
                        colaboracao: 10,
                        aprendizado: 8
                    }
                },

                C: {
                    texto: "Tentaria resolver sozinho antes de procurar ajuda.",
                    pontos: {
                        proatividade: 10,
                        estrategia: 6
                    }
                }
            }
        },

        {
            texto: "Em uma reunião, você percebe que sua ideia não está sendo compreendida. O que você faria?",
            respostas: {
                A: {
                    texto: "Explicaria novamente de uma maneira mais simples.",
                    pontos: {
                        comunicacao: 12,
                        adaptacao: 6
                    }
                },

                B: {
                    texto: "Mostraria exemplos para tornar a ideia mais clara.",
                    pontos: {
                        comunicacao: 10,
                        estrategia: 8
                    }
                },

                C: {
                    texto: "Deixaria a equipe discutir e apresentaria minha ideia depois.",
                    pontos: {
                        adaptacao: 8,
                        colaboracao: 8
                    }
                }
            }
        },

        {
            texto: "Você recebe uma crítica sobre algo que fez. Qual seria sua reação?",
            respostas: {
                A: {
                    texto: "Tentaria entender a crítica e usar isso para melhorar.",
                    pontos: {
                        aprendizado: 12,
                        adaptacao: 8
                    }
                },

                B: {
                    texto: "Conversaria com a pessoa para entender melhor o ponto de vista.",
                    pontos: {
                        comunicacao: 10,
                        colaboracao: 8
                    }
                },

                C: {
                    texto: "Analisaria a crítica e decidiria o que realmente faz sentido.",
                    pontos: {
                        estrategia: 10,
                        aprendizado: 6
                    }
                }
            }
        },

        {
            texto: "Se você pudesse escolher uma característica para levar para qualquer trabalho, qual escolheria?",
            respostas: {
                A: {
                    texto: "Iniciativa para fazer as coisas acontecerem.",
                    pontos: {
                        proatividade: 12,
                        estrategia: 6
                    }
                },

                B: {
                    texto: "Facilidade para trabalhar com outras pessoas.",
                    pontos: {
                        colaboracao: 12,
                        comunicacao: 8
                    }
                },

                C: {
                    texto: "Capacidade de aprender e evoluir constantemente.",
                    pontos: {
                        aprendizado: 12,
                        adaptacao: 8
                    }
                }
            }
        }
    ];


    /*
    ==========================================
    ATUALIZAR BARRAS
    ==========================================
    */

    function atualizarCaracteristicas() {

        document.querySelectorAll(".caracteristica").forEach(function (elemento) {

            const nome = elemento.dataset.caracteristica;

            if (!nome || caracteristicas[nome] === undefined) {
                return;
            }

            const valor = Math.min(caracteristicas[nome], 100);

            const numero = elemento.querySelector(".valor-caracteristica");
            const barra = elemento.querySelector(".preenchimento-caracteristica");

            if (numero) {
                numero.textContent = valor;
            }

            if (barra) {
                barra.style.width = valor + "%";
            }

        });
    }


    /*
    ==========================================
    ADICIONAR MENSAGEM DA IA
    ==========================================
    */

    function adicionarMensagemIA(texto) {

        const mensagem = document.createElement("div");

        mensagem.className = "mensagem mensagem-ia";

        mensagem.innerHTML = `
            <div class="avatar-mensagem">
                <i class="fa-solid fa-sparkles"></i>
            </div>

            <div class="conteudo-mensagem">
                <span class="nome-mensagem">NEXT IA</span>
                <p>${texto}</p>
            </div>
        `;

        chat.appendChild(mensagem);

        rolarChat();
    }


    /*
    ==========================================
    ADICIONAR MENSAGEM DO USUÁRIO
    ==========================================
    */

    function adicionarMensagemUsuario(texto) {

        const mensagem = document.createElement("div");

        mensagem.className = "mensagem mensagem-usuario";

        mensagem.innerHTML = `
            <div class="conteudo-mensagem">
                <span class="nome-mensagem">VOCÊ</span>
                <p>${texto}</p>
            </div>
        `;

        chat.appendChild(mensagem);

        rolarChat();
    }


    /*
    ==========================================
    ROLAR CHAT
    ==========================================
    */

    function rolarChat() {

        if (chat) {
            chat.scrollTo({
                top: chat.scrollHeight,
                behavior: "smooth"
            });
        }
    }


    /*
    ==========================================
    MOSTRAR PRÓXIMA PERGUNTA
    ==========================================
    */

    function mostrarPergunta() {

        if (perguntaAtual >= perguntas.length) {
            finalizarEntrevista();
            return;
        }

        const pergunta = perguntas[perguntaAtual];

        setTimeout(function () {

            adicionarMensagemIA(pergunta.texto);

            atualizarAlternativas(pergunta);

        }, 500);
    }


    /*
    ==========================================
    ATUALIZAR BOTÕES
    ==========================================
    */

    function atualizarAlternativas(pergunta) {

        alternativas.forEach(function (botao) {

            const letra = botao.dataset.resposta;

            if (!pergunta.respostas[letra]) {
                botao.style.display = "none";
                return;
            }

            botao.style.display = "flex";

            const texto = botao.querySelector(".texto-alternativa");

            if (texto) {
                texto.textContent = pergunta.respostas[letra].texto;
            }

            botao.disabled = false;
        });
    }


    /*
    ==========================================
    CLIQUE NAS ALTERNATIVAS
    ==========================================
    */

    alternativas.forEach(function (botao) {

        botao.addEventListener("click", function () {

            if (botao.disabled) {
                return;
            }

            const letra = botao.dataset.resposta;
            const pergunta = perguntas[perguntaAtual];
            const resposta = pergunta.respostas[letra];

            if (!resposta) {
                return;
            }

            /*
            Impede clicar várias vezes
            */

            alternativas.forEach(function (item) {
                item.disabled = true;
            });

            /*
            Mostra resposta do usuário
            */

            adicionarMensagemUsuario(resposta.texto);

            /*
            Soma os pontos
            */

            Object.keys(resposta.pontos).forEach(function (caracteristica) {

                caracteristicas[caracteristica] += resposta.pontos[caracteristica];

            });

            atualizarCaracteristicas();

            perguntaAtual++;

            /*
            Esconde as alternativas por enquanto
            */

            alternativas.forEach(function (item) {
                item.style.opacity = "0.4";
            });

            setTimeout(function () {

                alternativas.forEach(function (item) {
                    item.style.opacity = "1";
                });

                mostrarPergunta();

            }, 900);

        });

    });


    /*
    ==========================================
    CALCULAR RESULTADO
    ==========================================
    */

    function finalizarEntrevista() {

        alternativas.forEach(function (botao) {
            botao.style.display = "none";
        });

        adicionarMensagemIA(
            "Entrevista concluída. Vou analisar suas escolhas e montar seu perfil profissional."
        );

        setTimeout(function () {

            gerarResultado();

        }, 1500);
    }


    /*
    ==========================================
    GERAR RESULTADO
    ==========================================
    */

    function gerarResultado() {

        let soma = 0;

        Object.keys(caracteristicas).forEach(function (chave) {
            soma += caracteristicas[chave];
        });

        const quantidade = Object.keys(caracteristicas).length;

        /*
        Cada característica pode chegar a aproximadamente 30+
        Normalizamos para uma porcentagem.
        */

        let porcentagem = Math.round(
            (soma / (perguntas.length * 10)) * 100
        );

        porcentagem = Math.max(0, Math.min(porcentagem, 100));


        /*
        Descobrir características mais fortes
        */

        const ranking = Object.entries(caracteristicas)
            .sort(function (a, b) {
                return b[1] - a[1];
            });


        const principais = ranking.slice(0, 3);


        /*
        Perfil
        */

        let perfil = "";

        const principal = principais[0][0];

        if (principal === "comunicacao") {

            perfil =
                "Seu perfil demonstra facilidade para se comunicar, expressar ideias e construir conexões com outras pessoas.";

        } else if (principal === "proatividade") {

            perfil =
                "Você demonstra iniciativa e disposição para transformar ideias em ações, assumindo responsabilidades quando necessário.";

        } else if (principal === "estrategia") {

            perfil =
                "Seu perfil apresenta uma forte tendência para análise, planejamento e tomada de decisões.";

        } else if (principal === "adaptacao") {

            perfil =
                "Você demonstra facilidade para lidar com mudanças e encontrar novos caminhos diante de situações inesperadas.";

        } else if (principal === "colaboracao") {

            perfil =
                "Seu perfil se destaca pela capacidade de trabalhar em equipe, ouvir diferentes perspectivas e construir soluções em conjunto.";

        } else if (principal === "aprendizado") {

            perfil =
                "Você demonstra curiosidade, vontade de aprender e capacidade de transformar novas experiências em evolução.";

        }


        /*
        Lista visual de características
        */

        listaCaracteristicas.innerHTML = "";

        principais.forEach(function (item) {

            const nome = item[0];
            const valor = Math.min(item[1] * 3, 100);

            const nomes = {
                comunicacao: "Comunicação",
                proatividade: "Proatividade",
                estrategia: "Estratégia",
                adaptacao: "Adaptação",
                colaboracao: "Colaboração",
                aprendizado: "Aprendizado"
            };

            const elemento = document.createElement("span");

            elemento.className = "caracteristica-final";

            elemento.innerHTML = `
                <i class="fa-solid fa-check"></i>
                ${nomes[nome]}
            `;

            listaCaracteristicas.appendChild(elemento);

        });


        /*
        Frases finais diferentes
        */

        let frase = "";

        if (porcentagem >= 85) {

            frase =
                "Seu perfil demonstra um alto potencial de compatibilidade. Você mostra iniciativa, capacidade de evolução e disposição para enfrentar novos desafios.";

        } else if (porcentagem >= 70) {

            frase =
                "Você apresenta um perfil consistente, com características que podem contribuir bastante para diferentes ambientes profissionais.";

        } else if (porcentagem >= 55) {

            frase =
                "Seu perfil mostra boas características profissionais e espaço para continuar desenvolvendo novas habilidades.";

        } else {

            frase =
                "Cada experiência é uma oportunidade de evolução. Seu perfil ainda pode desenvolver novas habilidades e descobrir novos caminhos.";

        }


        /*
        Colocar informações na tela
        */

        porcentagemFinal.textContent = porcentagem + "%";

        descricaoPerfil.textContent = perfil;

        fraseFinal.textContent = frase;


        /*
        Mostrar resultado
        */

        resultado.hidden = false;

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /*
    ==========================================
    INICIALIZAÇÃO
    ==========================================
    */

    atualizarCaracteristicas();

    /*
    Pequeno atraso para parecer que a IA está
    iniciando a entrevista.
    */

    setTimeout(function () {

        mostrarPergunta();

    }, 1000);

});