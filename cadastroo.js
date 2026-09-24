/* =====================================================
   ELEMENTOS
===================================================== */

const formCadastro =
    document.getElementById("formCadastro");

const nome =
    document.getElementById("nome");

const email =
    document.getElementById("email");

const telefone =
    document.getElementById("telefone");

const nascimento =
    document.getElementById("nascimento");

const senha =
    document.getElementById("senha");

const confirmarSenha =
    document.getElementById("confirmarSenha");

const aceitarTermos =
    document.getElementById("aceitarTermos");

const mensagemCadastro =
    document.getElementById(
        "mensagemCadastro"
    );

const botaoCriar =
    document.getElementById(
        "botaoCriar"
    );

const mostrarSenha =
    document.getElementById(
        "mostrarSenha"
    );

const mostrarConfirmacao =
    document.getElementById(
        "mostrarConfirmacao"
    );

const botaoGoogle =
    document.getElementById(
        "botaoGoogle"
    );

const mensagemGoogle =
    document.getElementById(
        "mensagemGoogle"
    );

const linkTermos =
    document.getElementById(
        "linkTermos"
    );

const linkPrivacidade =
    document.getElementById(
        "linkPrivacidade"
    );



/* =====================================================
   FUNÇÃO DE MENSAGEM
===================================================== */

function mostrarMensagem(
    elemento,
    texto,
    tipo
) {

    elemento.textContent = texto;

    elemento.className =
        "mensagem " + tipo;

}



/* =====================================================
   VALIDAR E-MAIL
===================================================== */

function emailValido(valor) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(valor);

}



/* =====================================================
   MOSTRAR / OCULTAR SENHA
===================================================== */

mostrarSenha.addEventListener(
    "click",
    function () {

        if (
            senha.type ===
            "password"
        ) {

            senha.type = "text";

        } else {

            senha.type = "password";

        }

    }
);



/* =====================================================
   MOSTRAR / OCULTAR CONFIRMAÇÃO
===================================================== */

mostrarConfirmacao.addEventListener(
    "click",
    function () {

        if (
            confirmarSenha.type ===
            "password"
        ) {

            confirmarSenha.type =
                "text";

        } else {

            confirmarSenha.type =
                "password";

        }

    }
);



/* =====================================================
   MÁSCARA TELEFONE
===================================================== */

telefone.addEventListener(
    "input",
    function () {

        let valor =
            telefone.value
                .replace(/\D/g, "")
                .slice(0, 11);


        if (valor.length > 6) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{5})(\d{0,4}).*/,
                    "($1) $2-$3"
                );

        } else if (
            valor.length > 2
        ) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{0,5}).*/,
                    "($1) $2"
                );

        }


        telefone.value =
            valor;

    }
);



/* =====================================================
   MÁSCARA DATA
===================================================== */

nascimento.addEventListener(
    "input",
    function () {

        let valor =
            nascimento.value
                .replace(/\D/g, "")
                .slice(0, 8);


        if (valor.length > 4) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{2})(\d{0,4}).*/,
                    "$1/$2/$3"
                );

        } else if (
            valor.length > 2
        ) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{0,2}).*/,
                    "$1/$2"
                );

        }


        nascimento.value =
            valor;

    }
);



/* =====================================================
   CRIAR CONTA
===================================================== */

formCadastro.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        mensagemCadastro.className =
            "mensagem";


        const nomeValor =
            nome.value.trim();


        const emailValor =
            email.value.trim();


        const telefoneValor =
            telefone.value.trim();


        const nascimentoValor =
            nascimento.value.trim();


        const senhaValor =
            senha.value;


        const confirmarValor =
            confirmarSenha.value;



        /* =================================================
           NOME
        ================================================== */

        if (
            nomeValor.length < 3
        ) {

            mostrarMensagem(
                mensagemCadastro,
                "Digite seu nome completo.",
                "erro"
            );

            nome.focus();

            return;

        }



        /* =================================================
           E-MAIL
        ================================================== */

        if (
            !emailValido(emailValor)
        ) {

            mostrarMensagem(
                mensagemCadastro,
                "Digite um e-mail válido.",
                "erro"
            );

            email.focus();

            return;

        }



        /* =================================================
           TELEFONE
        ================================================== */

        const telefoneNumeros =
            telefoneValor.replace(
                /\D/g,
                ""
            );


        if (
            telefoneNumeros.length < 10
        ) {

            mostrarMensagem(
                mensagemCadastro,
                "Digite um telefone válido.",
                "erro"
            );

            telefone.focus();

            return;

        }



        /* =================================================
           DATA
        ================================================== */

        if (
            nascimentoValor.length !== 10
        ) {

            mostrarMensagem(
                mensagemCadastro,
                "Digite uma data de nascimento válida.",
                "erro"
            );

            nascimento.focus();

            return;

        }



        /* =================================================
           SENHA
        ================================================== */

        if (
            senhaValor.length < 6
        ) {

            mostrarMensagem(
                mensagemCadastro,
                "A senha precisa ter pelo menos 6 caracteres.",
                "erro"
            );

            senha.focus();

            return;

        }



        /* =================================================
           CONFIRMAÇÃO
        ================================================== */

        if (
            senhaValor !==
            confirmarValor
        ) {

            mostrarMensagem(
                mensagemCadastro,
                "As senhas não são iguais.",
                "erro"
            );

            confirmarSenha.focus();

            return;

        }



        /* =================================================
           TERMOS
        ================================================== */

        if (
            !aceitarTermos.checked
        ) {

            mostrarMensagem(
                mensagemCadastro,
                "Você precisa aceitar os Termos de Uso e a Política de Privacidade.",
                "erro"
            );

            return;

        }



        /* =================================================
           VERIFICA E-MAIL
        ================================================== */

        const cadastroExistente =
            localStorage.getItem(
                "nextwork_cadastro"
            );


        if (cadastroExistente) {

            try {

                const usuarioSalvo =
                    JSON.parse(
                        cadastroExistente
                    );


                if (
                    usuarioSalvo.email ===
                    emailValor
                ) {

                    mostrarMensagem(
                        mensagemCadastro,
                        "Este e-mail já possui um cadastro.",
                        "erro"
                    );

                    email.focus();

                    return;

                }

            } catch (erro) {

                console.log(
                    "Cadastro anterior inválido."
                );

            }

        }



        /* =================================================
           SALVAR CADASTRO
        ================================================== */

        const usuario = {

            nome:
                nomeValor,

            email:
                emailValor,

            telefone:
                telefoneValor,

            nascimento:
                nascimentoValor,

            senha:
                senhaValor

        };


        localStorage.setItem(
            "nextwork_cadastro",
            JSON.stringify(usuario)
        );



        /* =================================================
           ANIMAÇÃO
        ================================================== */

        botaoCriar.disabled =
            true;


        botaoCriar.querySelector(
            "span"
        ).textContent =
            "Criando conta...";


        botaoCriar.style.opacity =
            "0.7";



        /* =================================================
           REDIRECIONAMENTO
        ================================================== */

        setTimeout(
            function () {

                botaoCriar.disabled =
                    false;


                botaoCriar.style.opacity =
                    "1";


                botaoCriar.querySelector(
                    "span"
                ).textContent =
                    "Criar conta";


                window.location.href =
                    "loginpage.html";


            },
            1000
        );

    }
);



/* =====================================================
   GOOGLE
===================================================== */

botaoGoogle.addEventListener(
    "click",
    function () {

        mensagemGoogle.className =
            "mensagem";


        botaoGoogle.disabled =
            true;


        botaoGoogle.style.opacity =
            "0.65";


        botaoGoogle.querySelector(
            "span:last-child"
        ).textContent =
            "Conectando ao Google...";


        setTimeout(
            function () {

                botaoGoogle.disabled =
                    false;


                botaoGoogle.style.opacity =
                    "1";


                botaoGoogle.querySelector(
                    "span:last-child"
                ).textContent =
                    "Cadastrar com o Google";


                mostrarMensagem(
                    mensagemGoogle,
                    "A conexão com o Google está pronta para receber a autenticação.",
                    "sucesso"
                );


            },
            900
        );

    }
);



/* =====================================================
   TERMOS
===================================================== */

const btnTermos =
    document.getElementById("btnTermos");

const btnPrivacidade =
    document.getElementById("btnPrivacidade");


btnTermos.addEventListener(
    "click",
    function () {

        window.location.href =
            "termos.html";

    }
);


btnPrivacidade.addEventListener(
    "click",
    function () {

        window.location.href =
            "privacidade.html";

    }
);