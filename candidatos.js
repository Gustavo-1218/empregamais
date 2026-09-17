/* =========================================================
   NEXT WORK - VER CANDIDATOS
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const companyLogo =
    document.getElementById("companyLogo");


const searchInput =
    document.getElementById("searchInput");


const candidatesList =
    document.getElementById("candidatesList");


const notFound =
    document.getElementById("notFound");


const candidatesCount =
    document.getElementById("candidatesCount");


const totalCandidates =
    document.getElementById("totalCandidates");


const analysisCandidates =
    document.getElementById("analysisCandidates");


const interviewCandidates =
    document.getElementById("interviewCandidates");


const completedCandidates =
    document.getElementById("completedCandidates");


/* =========================================================
   RECUPERAR LOGO DA EMPRESA
========================================================= */

const savedLogo =
    localStorage.getItem(
        "nextwork_company_logo"
    );


if (savedLogo) {

    companyLogo.src = savedLogo;

}



/* =========================================================
   PEGAR TODOS OS CARDS
========================================================= */

const candidateCards =
    document.querySelectorAll(
        ".candidate-card"
    );



/* =========================================================
   BUSCAR CANDIDATOS
========================================================= */

function searchCandidates() {


    const text =

        searchInput.value

            .toLowerCase()

            .trim();


    let visibleCandidates = 0;


    candidateCards.forEach(function (card) {


        const cardText =

            card.textContent

                .toLowerCase();


        if (
            cardText.includes(text)
        ) {


            card.style.display =
                "block";


            visibleCandidates++;


        } else {


            card.style.display =
                "none";

        }


    });



    /* =====================================================
       ATUALIZAR CONTADOR
    ===================================================== */

    if (visibleCandidates === 1) {


        candidatesCount.textContent =
            "1 candidato encontrado";


    } else {


        candidatesCount.textContent =
            `${visibleCandidates} candidatos encontrados`;

    }



    /* =====================================================
       MOSTRAR OU ESCONDER
       MENSAGEM DE NÃO ENCONTRADO
    ===================================================== */

    if (visibleCandidates === 0) {


        notFound.style.display =
            "block";


    } else {


        notFound.style.display =
            "none";

    }


}



/* =========================================================
   EVENTO DA BUSCA
========================================================= */

searchInput.addEventListener(

    "input",

    searchCandidates

);



/* =========================================================
   ATUALIZAR ESTATÍSTICAS
========================================================= */

function updateStatistics() {


    /* TOTAL */

    const total =
        candidateCards.length;


    totalCandidates.textContent =
        total;



    /* EM ANÁLISE */

    const analysis =
        document.querySelectorAll(
            '.candidate-card[data-status="analysis"]'
        );


    analysisCandidates.textContent =
        analysis.length;



    /* EM ENTREVISTA */

    const interviews =
        document.querySelectorAll(
            '.candidate-card[data-status="interview"]'
        );


    interviewCandidates.textContent =
        interviews.length;



    /* CONCLUÍDOS */

    const completed =
        document.querySelectorAll(
            '.candidate-card[data-status="completed"]'
        );


    completedCandidates.textContent =
        completed.length;


}



/* =========================================================
   INICIAR PÁGINA
========================================================= */

updateStatistics();


candidatesCount.textContent =

    candidateCards.length === 1

        ? "1 candidato encontrado"

        : `${candidateCards.length} candidatos encontrados`;