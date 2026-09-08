document.addEventListener("DOMContentLoaded", function () {

    const chat = document.querySelector(".chat-entrevista");
    const areaDinamica = document.getElementById("area-dinamica-chat");
    const botaoContinuar = document.getElementById("botao-continuar");
    const textoStatus = document.getElementById("texto-status");

    const contadorPerguntas = document.getElementById("contador-perguntas");
    const progressoPreenchido = document.getElementById("progresso-preenchido");

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

    const nomesCaracteristicas = {
        comunicacao: "Comunicação",
        proatividade: "Proatividade",
        estrategia: "Estratégia",
        adaptacao: "Adaptação",
        colaboracao: "Colaboração",
        aprendizado: "Aprendizado"
    };

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

    let perguntaAtual = 0;
    let respostaSelecionada = null;

    function rolarChat() {
        if (chat) {
            chat.scrollTo({
                top: chat.scrollHeight,
                behavior: "smooth"
            });
        }
    }

    function atualizarProgresso() {
        const total = perguntas.length;
        const respondidas = perguntaAtual;

        if (contadorPerguntas) {
            contadorPerguntas.textContent = respondidas + " / " + total;
        }

        if (progressoPreenchido) {
            progressoPreenchido.style.width = ((respondidas / total) * 100) + "%";
        }

        document.querySelectorAll(".etapa").forEach(function (etapa, indice) {
            etapa.classList.remove("ativa");
            etapa.classList.remove("concluida");

            if (indice < respondidas) {
                etapa.classList.add("concluida");
            }

            if (indice === respondidas && respondidas < total) {
                etapa.classList.add("ativa");
            }
        });
    }

    function atualizarCaracteristicas() {
        document.querySelectorAll(".caracteristica").forEach(function (elemento) {

            const nome = elemento.dataset.caracteristica;

            if (!nome || caracteristicas[nome] === undefined) {
                return;
            }

            const valor = Math.min(caracteristicas[nome] * 3, 100);

            const numero = elemento.querySelector(".valor-caracteristica");
            const barra = elemento.querySelector(".preenchimento-caracteristica");

            if (numero) {
                numero.textContent = Math.round(valor);
            }

            if (barra) {
                barra.style.width = valor + "%";
            }
        });
    }

    function adicionarMensagemIA(texto) {
        const mensagem = document.createElement("div");

        mensagem.className = "mensagem mensagem-ia";

        const avatar = document.createElement("div");
        avatar.className = "avatar-mensagem";

        const icone = document.createElement("i");
        icone.className = "fa-solid fa-sparkles";

        avatar.appendChild(icone);

        const conteudo = document.createElement("div");
        conteudo.className = "conteudo-mensagem";

        const nome = document.createElement("span");
        nome.className = "nome-mensagem";
        nome.textContent = "NEXT IA";

        const balao = document.createElement("div");
        balao.className = "balao-mensagem";

        const textoMensagem = document.createElement("p");
        textoMensagem.textContent = texto;

        const horario = document.createElement("span");
        horario.className = "horario-mensagem";
        horario.textContent = "Agora";

        balao.appendChild(textoMensagem);
        balao.appendChild(horario);

        conteudo.appendChild(nome);
        conteudo.appendChild(balao);

        mensagem.appendChild(avatar);
        mensagem.appendChild(conteudo);

        areaDinamica.appendChild(mensagem);

        rolarChat();
    }

    function adicionarMensagemUsuario(texto) {
        const mensagem = document.createElement("div");

        mensagem.className = "mensagem mensagem-usuario";

        const conteudo = document.createElement("div");
        conteudo.className = "conteudo-mensagem";

        const nome = document.createElement("span");
        nome.className = "nome-mensagem";
        nome.textContent = "VOCÊ";

        const balao = document.createElement("div");
        balao.className = "balao-mensagem";

        const textoMensagem = document.createElement("p");
        textoMensagem.textContent = texto;

        const horario = document.createElement("span");
        horario.className = "horario-mensagem";
        horario.textContent = "Agora";

        balao.appendChild(textoMensagem);
        balao.appendChild(horario);

        conteudo.appendChild(nome);
        conteudo.appendChild(balao);

        mensagem.appendChild(conteudo);

        areaDinamica.appendChild(mensagem);

        rolarChat();
    }

    function criarAlternativas(pergunta) {
        const container = document.createElement("div");

        container.className = "alternativas-entrevista";

        Object.keys(pergunta.respostas).forEach(function (letra) {

            const resposta = pergunta.respostas[letra];

            const botao = document.createElement("button");

            botao.type = "button";
            botao.className = "alternativa";
            botao.dataset.resposta = letra;

            const letraElemento = document.createElement("span");
            letraElemento.className = "letra-alternativa";
            letraElemento.textContent = letra;

            const textoElemento = document.createElement("span");
            textoElemento.className = "texto-alternativa";
            textoElemento.textContent = resposta.texto;

            botao.appendChild(letraElemento);
            botao.appendChild(textoElemento);

            botao.addEventListener("click", function () {
                selecionarResposta(botao, letra);
            });

            container.appendChild(botao);
        });

        areaDinamica.appendChild(container);

        rolarChat();
    }

    function mostrarPergunta() {

        if (perguntaAtual >= perguntas.length) {
            finalizarEntrevista();
            return;
        }

        respostaSelecionada = null;

        if (botaoContinuar) {
            botaoContinuar.disabled = true;
        }

        if (textoStatus) {
            textoStatus.textContent = "Escolha uma alternativa para continuar.";
        }

        const pergunta = perguntas[perguntaAtual];

        setTimeout(function () {

            adicionarMensagemIA(pergunta.texto);

            criarAlternativas(pergunta);

            atualizarProgresso();

        }, 500);
    }

    function selecionarResposta(botaoSelecionado, letra) {

        if (respostaSelecionada !== null) {
            return;
        }

        respostaSelecionada = letra;

        const botoes = areaDinamica.querySelectorAll(".alternativa");

        botoes.forEach(function (botao) {
            botao.disabled = true;

            if (botao !== botaoSelecionado) {
                botao.style.opacity = "0.45";
            }
        });

        botaoSelecionado.style.opacity = "1";

        const pergunta = perguntas[perguntaAtual];
        const resposta = pergunta.respostas[letra];

        Object.keys(resposta.pontos).forEach(function (caracteristica) {
            caracteristicas[caracteristica] += resposta.pontos[caracteristica];
        });

        adicionarMensagemUsuario(resposta.texto);

        atualizarCaracteristicas();

        if (textoStatus) {
            textoStatus.textContent = "Resposta registrada. Clique em continuar.";
        }

        if (botaoContinuar) {
            botaoContinuar.disabled = false;
        }

        rolarChat();
    }

    function continuarEntrevista() {

        if (respostaSelecionada === null) {
            return;
        }

        const alternativasAtuais = areaDinamica.querySelectorAll(".alternativas-entrevista");

        alternativasAtuais.forEach(function (elemento) {
            elemento.remove();
        });

        perguntaAtual++;

        respostaSelecionada = null;

        atualizarProgresso();

        if (perguntaAtual < perguntas.length) {

            if (textoStatus) {
                textoStatus.textContent = "Preparando próxima pergunta...";
            }

            if (botaoContinuar) {
                botaoContinuar.disabled = true;
            }

            mostrarPergunta();

        } else {

            if (botaoContinuar) {
                botaoContinuar.disabled = true;
            }

            finalizarEntrevista();
        }
    }

    function finalizarEntrevista() {

        if (textoStatus) {
            textoStatus.textContent = "Entrevista concluída.";
        }

        atualizarProgresso();

        adicionarMensagemIA(
            "Entrevista concluída. Vou analisar suas escolhas e montar seu perfil profissional."
        );

        setTimeout(function () {
            gerarResultado();
        }, 1500);
    }

    function gerarResultado() {

        let soma = 0;

        Object.keys(caracteristicas).forEach(function (chave) {
            soma += caracteristicas[chave];
        });

        const pontuacaoMaxima = perguntas.length * 20;

        let porcentagem = Math.round((soma / pontuacaoMaxima) * 100);

        porcentagem = Math.max(0, Math.min(porcentagem, 100));

        const ranking = Object.entries(caracteristicas).sort(function (a, b) {
            return b[1] - a[1];
        });

        const principais = ranking.slice(0, 3);

        const principal = principais[0][0];

        let perfil = "";

        if (principal === "comunicacao") {
            perfil = "Seu perfil demonstra facilidade para se comunicar, expressar ideias e construir conexões com outras pessoas.";
        }

        if (principal === "proatividade") {
            perfil = "Você demonstra iniciativa e disposição para transformar ideias em ações, assumindo responsabilidades quando necessário.";
        }

        if (principal === "estrategia") {
            perfil = "Seu perfil apresenta uma forte tendência para análise, planejamento e tomada de decisões.";
        }

        if (principal === "adaptacao") {
            perfil = "Você demonstra facilidade para lidar com mudanças e encontrar novos caminhos diante de situações inesperadas.";
        }

        if (principal === "colaboracao") {
            perfil = "Seu perfil se destaca pela capacidade de trabalhar em equipe, ouvir diferentes perspectivas e construir soluções em conjunto.";
        }

        if (principal === "aprendizado") {
            perfil = "Você demonstra curiosidade, vontade de aprender e capacidade de transformar novas experiências em evolução.";
        }

        if (listaCaracteristicas) {
            listaCaracteristicas.innerHTML = "";

            principais.forEach(function (item) {

                const nome = item[0];

                const elemento = document.createElement("span");

                elemento.className = "caracteristica-final";

                const icone = document.createElement("i");
                icone.className = "fa-solid fa-check";

                const texto = document.createTextNode(
                    " " + nomesCaracteristicas[nome]
                );

                elemento.appendChild(icone);
                elemento.appendChild(texto);

                listaCaracteristicas.appendChild(elemento);
            });
        }

        let frase = "";

        if (porcentagem >= 85) {
            frase = "Seu perfil demonstra um alto potencial de compatibilidade. Você mostra iniciativa, capacidade de evolução e disposição para enfrentar novos desafios.";
        } else if (porcentagem >= 70) {
            frase = "Você apresenta um perfil consistente, com características que podem contribuir bastante para diferentes ambientes profissionais.";
        } else if (porcentagem >= 55) {
            frase = "Seu perfil mostra boas características profissionais e espaço para continuar desenvolvendo novas habilidades.";
        } else {
            frase = "Cada experiência é uma oportunidade de evolução. Seu perfil ainda pode desenvolver novas habilidades e descobrir novos caminhos.";
        }

        if (porcentagemFinal) {
            porcentagemFinal.textContent = porcentagem + "%";
        }

        if (descricaoPerfil) {
            descricaoPerfil.textContent = perfil;
        }

        if (fraseFinal) {
            fraseFinal.textContent = frase;
        }

        if (resultado) {
            resultado.hidden = false;

            resultado.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        if (textoStatus) {
            textoStatus.textContent = "Análise concluída.";
        }
    }

    if (botaoContinuar) {
        botaoContinuar.disabled = true;

        botaoContinuar.addEventListener("click", function () {
            continuarEntrevista();
        });
    }

    atualizarCaracteristicas();
    atualizarProgresso();

    setTimeout(function () {
        mostrarPergunta();
    }, 1000);

});