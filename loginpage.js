/* =========================================
   ELEMENTOS
========================================= */

const formLogin =
    document.getElementById("formLogin");

const email =
    document.getElementById("email");

const senha =
    document.getElementById("senha");

const lembrar =
    document.getElementById("lembrar");

const mostrarSenha =
    document.getElementById("mostrarSenha");

const esqueciSenha =
    document.getElementById("esqueciSenha");

const btnGoogle =
    document.getElementById("btnGoogle");

const mensagem =
    document.getElementById("mensagem");

const mensagemGoogle =
    document.getElementById("mensagemGoogle");


/* =========================================
   MENSAGEM GERAL
========================================= */

function mostrarMensagem(texto) {

    mensagem.textContent = texto;

    mensagem.classList.add("mostrar");

    setTimeout(() => {

        mensagem.classList.remove("mostrar");

    }, 3000);

}


/* =========================================
   MENSAGEM DO GOOGLE
========================================= */

function mostrarMensagemGoogle(
    elemento,
    texto,
    tipo
) {

    elemento.textContent = texto;

    elemento.className =
        "mensagem " + tipo;

}


/* =========================================
   LEMBRAR DE MIM
========================================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const emailSalvo =
            localStorage.getItem(
                "nextwork_email"
            );

        if (emailSalvo) {

            email.value =
                emailSalvo;

            lembrar.checked =
                true;

        }

    }
);


/* =========================================
   MOSTRAR / ESCONDER SENHA
========================================= */

mostrarSenha.addEventListener(
    "click",
    () => {

        if (senha.type === "password") {

            senha.type = "text";

            mostrarSenha.textContent =
                "◉";

        } else {

            senha.type = "password";

            mostrarSenha.textContent =
                "◉";

        }

    }
);


/* =========================================
   LOGIN
========================================= */

formLogin.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const emailDigitado =
            email.value.trim();

        const senhaDigitada =
            senha.value.trim();


        /* VERIFICA CAMPOS */

        if (
            !emailDigitado ||
            !senhaDigitada
        ) {

            mostrarMensagem(
                "Preencha seu e-mail e sua senha."
            );

            return;

        }


        /* =====================================
           SALVA O E-MAIL
        ===================================== */

        if (lembrar.checked) {

            localStorage.setItem(
                "nextwork_email",
                emailDigitado
            );

        } else {

            localStorage.removeItem(
                "nextwork_email"
            );

        }


        /* =====================================
           SIMULA O LOGIN
        ===================================== */

        localStorage.setItem(
            "nextwork_usuario_logado",
            "true"
        );


        mostrarMensagem(
            "Login realizado! Entrando..."
        );


        /* =====================================
           REDIRECIONAMENTO DO LOGIN NORMAL
        ===================================== */

        setTimeout(() => {

            window.location.href =
                "emprega.html";

        }, 1200);

    }
);


/* =========================================
   ESQUECI A SENHA
========================================= */

esqueciSenha.addEventListener(
    "click",
    () => {

        const emailUsuario =
            prompt(
                "Digite seu e-mail para recuperar a senha:"
            );


        if (!emailUsuario) {

            return;

        }


        if (
            !emailUsuario.includes("@")
        ) {

            mostrarMensagem(
                "Digite um e-mail válido."
            );

            return;

        }


        mostrarMensagem(
            "Um link de recuperação seria enviado para seu e-mail."
        );

    }
);


/* =========================================
   LOGIN COM GOOGLE
========================================= */

btnGoogle.addEventListener(
    "click",
    function () {

        /*
            Limpa a mensagem anterior
        */

        mensagemGoogle.className =
            "mensagem";


        /*
            Desabilita o botão
        */

        btnGoogle.disabled =
            true;

        btnGoogle.style.opacity =
            "0.65";


        /*
            Altera o texto do botão
        */

        btnGoogle.querySelector(
            "span:last-child"
        ).textContent =
            "Conectando ao Google...";


        /*
            Aguarda 900ms,
            igual ao cadastro
        */

        setTimeout(
            function () {

                /*
                    Ativa novamente
                */

                btnGoogle.disabled =
                    false;

                btnGoogle.style.opacity =
                    "1";


                /*
                    Volta o texto original
                */

                btnGoogle.querySelector(
                    "span:last-child"
                ).textContent =
                    "Entrar com o Google";

                mostrarMensagemGoogle(
                    mensagemGoogle,
                    "A conexão com o Google está pronta para receber a autenticação.",
                    "sucesso"
                );

            },
            900
        );

    }
);
