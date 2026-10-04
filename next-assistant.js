console.log("========== NEXT ASSISTANT TESTE ==========");

document.addEventListener("DOMContentLoaded", function () {

    console.log("JavaScript carregou.");
    console.log("Procurando botão...");

    const botao = document.getElementById("nextAssistantButton");

    console.log("Resultado:", botao);

    if (!botao) {
        console.error("BOTÃO NÃO FOI ENCONTRADO.");
        return;
    }

    console.log("BOTÃO ENCONTRADO.");

    botao.addEventListener("click", function () {

        alert("O JavaScript do Next Assistant está funcionando!");

        console.log("CLIQUE DETECTADO.");

    });

});