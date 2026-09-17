/* =========================================
   NEXT WORK
   PERFIL DO CANDIDATO
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const viewCurriculum =
    document.getElementById("viewCurriculum");


const pdfContainer =
    document.getElementById("pdfContainer");


const curriculumPdf =
    document.getElementById("curriculumPdf");



/* =========================================
   VISUALIZAR CURRÍCULO
========================================= */

viewCurriculum.addEventListener(
    "click",
    function () {


        /* =====================================
           MOSTRAR OU ESCONDER O PDF
        ====================================== */

        pdfContainer.classList.toggle("show");



        /* =====================================
           ALTERAR TEXTO DO BOTÃO
        ====================================== */

        if (
            pdfContainer.classList.contains("show")
        ) {


            viewCurriculum.innerHTML =
                "✕ Fechar currículo";


            /* ROLAR ATÉ O PDF */

            setTimeout(
                function () {

                    pdfContainer.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                },

                100
            );


        } else {


            viewCurriculum.innerHTML =
                "👁 Visualizar currículo";


        }


    }
);