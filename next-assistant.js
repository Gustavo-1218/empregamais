document.addEventListener("DOMContentLoaded", function () {

    console.log("NEXT ASSISTANT: JavaScript carregado.");

    const botao = document.getElementById("nextAssistantButton");
    const chat = document.getElementById("nextAssistantChat");

    console.log("Botão:", botao);
    console.log("Chat:", chat);

    if (!botao) {
        console.error("NEXT ASSISTANT: botão não encontrado.");
        return;
    }

    botao.addEventListener("click", function () {

        console.log("NEXT ASSISTANT: botão clicado.");

        if (chat.style.display === "block") {
            chat.style.display = "none";
        } else {
            chat.style.display = "block";
        }

    });

});