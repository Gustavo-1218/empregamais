/* =========================================================
   NEXT WORK - MINHAS VAGAS
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const companyLogo =
    document.getElementById("companyLogo");


const searchInput =
    document.getElementById("searchInput");


const jobsList =
    document.getElementById("jobsList");


const notFound =
    document.getElementById("notFound");


const emptyJobs =
    document.getElementById("emptyJobs");


const jobsCount =
    document.getElementById("jobsCount");



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
   PEGAR VAGAS SALVAS
========================================================= */

function getJobs() {

    const savedJobs =
        localStorage.getItem(
            "nextwork_jobs"
        );


    if (!savedJobs) {

        return [];

    }


    try {

        return JSON.parse(savedJobs);

    }

    catch (error) {

        return [];

    }

}



/* =========================================================
   SALVAR VAGAS
========================================================= */

function saveJobs(jobs) {

    localStorage.setItem(
        "nextwork_jobs",
        JSON.stringify(jobs)
    );

}



/* =========================================================
   PEGAR NOME DA EMPRESA
========================================================= */

function getCompanyName() {

    const savedCompany =
        localStorage.getItem(
            "nextwork_company_data"
        );


    if (!savedCompany) {

        return "Sua empresa";

    }


    try {

        const company =
            JSON.parse(savedCompany);


        return company.name ||
            "Sua empresa";

    }

    catch (error) {

        return "Sua empresa";

    }

}



/* =========================================================
   FORMATAR DATA
========================================================= */

function formatDate(date) {

    if (!date) {

        return "Recentemente";

    }


    const newDate =
        new Date(date);


    if (isNaN(newDate)) {

        return date;

    }


    return newDate.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}



/* =========================================================
   EXCLUIR VAGA
========================================================= */

function deleteJob(jobId) {

    const confirmation =
        confirm(
            "Tem certeza que deseja excluir esta vaga?"
        );


    if (!confirmation) {

        return;

    }


    let jobs =
        getJobs();


    jobs =
        jobs.filter(function (job) {

            return String(job.id) !== String(jobId);

        });


    saveJobs(jobs);


    /*
        ATUALIZA A LISTA
        MANTENDO A BUSCA ATUAL
    */

    searchJobs();

}



/* =========================================================
   CRIAR CARD DA VAGA
========================================================= */

function createJobCard(job, index) {

    const card =
        document.createElement("article");


    card.classList.add("job-card");


    /*
        PEGAR INFORMAÇÕES
    */

    const title =
        job.title ||
        job.titulo ||
        job.nome ||
        "Vaga sem título";


    const company =
        job.company ||
        job.empresa ||
        getCompanyName();


    const location =
        job.location ||
        job.localizacao ||
        "Não informado";


    const type =
        job.type ||
        job.tipo ||
        job.modelo ||
        "Não informado";


    const salary =
        job.salary ||
        job.salario ||
        "A combinar";


    const candidates =
        job.candidates ||
        job.candidatos ||
        0;


    const date =
        job.date ||
        job.data ||
        job.createdAt ||
        "Recentemente";


    /*
        GARANTE QUE A VAGA TENHA UM ID
    */

    const jobId =
        job.id !== undefined
            ? job.id
            : index;



    card.innerHTML = `

        <div class="job-card-top">

            <div>

                <h2 class="job-title">

                    ${title}

                </h2>


                <p class="job-company">

                    ${company}

                </p>

            </div>


            <span class="job-status status-active">

                ● Ativa

            </span>

        </div>



        <div class="job-line"></div>



        <div class="job-details">


            <div class="job-detail">

                📍

                <strong>Localização:</strong>

                ${location}

            </div>



            <div class="job-detail">

                💼

                <strong>Tipo:</strong>

                ${type}

            </div>



            <div class="job-detail">

                💰

                <strong>Salário:</strong>

                ${salary}

            </div>


        </div>



        <div class="job-footer">


            <span class="job-date">

                Publicada em:
                ${formatDate(date)}

            </span>



            <div class="job-actions">


                <span class="job-candidates">

                    👥
                    ${candidates}
                    candidato(s)

                </span>


                <button
                    class="btn-delete-job"
                    type="button"
                >

                    🗑 Excluir vaga

                </button>


            </div>


        </div>

    `;



    /* =====================================================
       EVENTO DO BOTÃO EXCLUIR
    ===================================================== */

    const deleteButton =
        card.querySelector(
            ".btn-delete-job"
        );


    deleteButton.addEventListener(
        "click",
        function () {

            deleteJob(jobId);

        }
    );


    return card;

}



/* =========================================================
   MOSTRAR VAGAS
========================================================= */

function renderJobs(jobs) {


    /* LIMPA A LISTA */

    jobsList.innerHTML = "";


    /* ESCONDE AS MENSAGENS */

    notFound.style.display = "none";

    emptyJobs.style.display = "none";


    /*
        SE NÃO EXISTIR NENHUMA VAGA
    */

    if (jobs.length === 0) {


        const allJobs =
            getJobs();


        /*
            EXISTEM VAGAS,
            MAS A BUSCA NÃO ENCONTROU
        */

        if (

            allJobs.length > 0 &&

            searchInput.value.trim() !== ""

        ) {

            notFound.style.display =
                "block";


            jobsCount.textContent =
                "0 vagas encontradas";


            return;

        }


        /*
            NÃO EXISTEM VAGAS PUBLICADAS
        */

        emptyJobs.style.display =
            "block";


        jobsCount.textContent =
            "0 vagas publicadas";


        return;

    }



    /* =====================================================
       MOSTRAR VAGAS
    ===================================================== */

    jobs.forEach(function (job, index) {

        const card =
            createJobCard(
                job,
                index
            );


        jobsList.appendChild(card);

    });

    /* =====================================================
   STATUS DA VAGA
===================================================== */


const status =
    job.status ||
    "Ativa";


const normalizedStatus =
    status.toLowerCase();


let statusClass =
    "status-active";


let statusText =
    "● Ativa";


if (

    normalizedStatus === "expirada" ||

    normalizedStatus === "expirado"

) {


    statusClass =
        "status-expired";


    statusText =
        "● Expirada";

}



    /* =====================================================
       ATUALIZAR CONTADOR
    ===================================================== */

    const total =
        jobs.length;


    jobsCount.textContent =

        total === 1

            ? "1 vaga encontrada"

            : `${total} vagas encontradas`;

}



/* =========================================================
   BUSCAR VAGAS
========================================================= */

function searchJobs() {


    const text =
        searchInput.value
            .toLowerCase()
            .trim();


    const jobs =
        getJobs();



    /*
        CAMPO VAZIO:
        MOSTRA TODAS
    */

    if (text === "") {

        renderJobs(jobs);

        return;

    }



    /* =====================================================
       FILTRAR VAGAS
    ===================================================== */

    const filteredJobs =
        jobs.filter(function (job) {


            const title =

                (
                    job.title ||
                    job.titulo ||
                    job.nome ||
                    ""
                )
                .toLowerCase();



            const location =

                (
                    job.location ||
                    job.localizacao ||
                    ""
                )
                .toLowerCase();



            const type =

                (
                    job.type ||
                    job.tipo ||
                    job.modelo ||
                    ""
                )
                .toLowerCase();



            return (

                title.includes(text) ||

                location.includes(text) ||

                type.includes(text)

            );

        });



    renderJobs(filteredJobs);

}



/* =========================================================
   EVENTO DE BUSCA
========================================================= */

searchInput.addEventListener(
    "input",
    searchJobs
);



/* =========================================================
   INICIAR PÁGINA
========================================================= */

const jobs =
    getJobs();


renderJobs(jobs);