/* =========================================================
   NEXT WORK - CURRÍCULO JULYA MIZRAIM SILVA ARAÚJO
========================================================= */


/* =========================================================
   ELEMENTOS DO CURRÍCULO
========================================================= */

const viewCurriculum =
    document.getElementById("viewCurriculum");

const pdfContainer =
    document.getElementById("pdfContainer");



/* =========================================================
   VISUALIZAR CURRÍCULO
========================================================= */

if (viewCurriculum && pdfContainer) {

    viewCurriculum.addEventListener("click", function () {

        /* MOSTRA O PDF */

        pdfContainer.classList.toggle("show");


        /* ALTERA O TEXTO DO BOTÃO */

        if (pdfContainer.classList.contains("show")) {

            viewCurriculum.textContent =
                "✕ Fechar currículo";

            /* ROLA ATÉ O PDF */

            setTimeout(function () {

                pdfContainer.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        } else {

            viewCurriculum.textContent =
                "👁 Visualizar currículo";

        }

    });

}



/* =========================================================
   GARANTIR QUE O PDF COMECE FECHADO
========================================================= */

if (pdfContainer) {

    pdfContainer.classList.remove("show");

}