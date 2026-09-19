function abrirEditarPerfil() {

    window.location.href = "editar-perfil.html";

}


function abrirInformacoes() {

    window.location.href = "informacoes-pessoais.html";

}


/* ==================================================
   ANIMAÇÃO DOS INDICADORES
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const numeros = document.querySelectorAll(
        ".stat-information strong"
    );

    numeros.forEach((numero, index) => {

        numero.style.opacity = "0";

        numero.style.transform = "translateY(5px)";

        setTimeout(() => {

            numero.style.transition = "0.4s";

            numero.style.opacity = "1";

            numero.style.transform = "translateY(0)";

        }, 150 + (index * 100));

    });

});