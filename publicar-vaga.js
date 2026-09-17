/* =========================================================
   NEXT WORK - PUBLICAR E CRIAR VAGA
========================================================= */


/* =========================================================
   LOGO DA EMPRESA
========================================================= */

const companyLogo =
    document.getElementById("companyLogo");

const previewCompanyLogo =
    document.getElementById("previewCompanyLogo");

const logoUpload =
    document.getElementById("logoUpload");

const changeLogoBtn =
    document.getElementById("changeLogoBtn");


const savedLogo =
    localStorage.getItem(
        "nextwork_company_logo"
    );


if (savedLogo) {

    companyLogo.src = savedLogo;

    previewCompanyLogo.src = savedLogo;

}


/* =========================================================
   ALTERAR FOTO
========================================================= */

changeLogoBtn.addEventListener("click", function () {

    logoUpload.click();

});


logoUpload.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;


    const reader = new FileReader();


    reader.onload = function (event) {

        const image = event.target.result;


        companyLogo.src = image;

        previewCompanyLogo.src = image;


        localStorage.setItem(
            "nextwork_company_logo",
            image
        );

    };


    reader.readAsDataURL(file);

});


/* =========================================================
   NOME DA EMPRESA
========================================================= */

const savedCompanyData =
    localStorage.getItem(
        "nextwork_company_data"
    );


if (savedCompanyData) {

    const companyData =
        JSON.parse(savedCompanyData);


    if (companyData.name) {

        document
            .getElementById("previewCompanyName")
            .textContent = companyData.name;

    }

}


/* =========================================================
   ELEMENTOS DAS ETAPAS
========================================================= */

const formStep1 =
    document.getElementById("formStep1");

const formStep2 =
    document.getElementById("formStep2");

const formStep3 =
    document.getElementById("formStep3");


const stepIndicator1 =
    document.getElementById("stepIndicator1");

const stepIndicator2 =
    document.getElementById("stepIndicator2");

const stepIndicator3 =
    document.getElementById("stepIndicator3");


const nextStep1 =
    document.getElementById("nextStep1");

const nextStep2 =
    document.getElementById("nextStep2");

const backStep1 =
    document.getElementById("backStep1");

const backStep2 =
    document.getElementById("backStep2");


/* =========================================================
   FUNÇÃO PARA TROCAR ETAPA
========================================================= */

function changeStep(step) {


    /* REMOVE TODAS AS ETAPAS */

    formStep1.classList.remove("active-step");

    formStep2.classList.remove("active-step");

    formStep3.classList.remove("active-step");


    /* REMOVE ESTADOS */

    stepIndicator1.classList.remove(
        "active",
        "completed"
    );

    stepIndicator2.classList.remove(
        "active",
        "completed"
    );

    stepIndicator3.classList.remove(
        "active",
        "completed"
    );


    /* ================= ETAPA 1 ================= */

    if (step === 1) {

        formStep1.classList.add(
            "active-step"
        );

        stepIndicator1.classList.add(
            "active"
        );

    }


    /* ================= ETAPA 2 ================= */

    if (step === 2) {

        formStep2.classList.add(
            "active-step"
        );


        stepIndicator1.classList.add(
            "completed"
        );

        stepIndicator2.classList.add(
            "active"
        );

    }


    /* ================= ETAPA 3 ================= */

    if (step === 3) {

        formStep3.classList.add(
            "active-step"
        );


        stepIndicator1.classList.add(
            "completed"
        );

        stepIndicator2.classList.add(
            "completed"
        );

        stepIndicator3.classList.add(
            "active"
        );

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   PEGAR DADOS DA VAGA
========================================================= */

function getJobData() {

    return {

        title:
            document
                .getElementById("jobTitle")
                .value
                .trim(),

        location:
            document
                .getElementById("jobLocation")
                .value
                .trim(),

        type:
            document
                .getElementById("jobType")
                .value,

        contract:
            document
                .getElementById("jobContract")
                .value,

        salary:
            document
                .getElementById("jobSalary")
                .value
                .trim(),

        area:
            document
                .getElementById("jobArea")
                .value
                .trim(),

        description:
            document
                .getElementById("jobDescription")
                .value
                .trim(),

        experience:
            document
                .getElementById("jobExperience")
                .value,

        education:
            document
                .getElementById("jobEducation")
                .value,

        skills:
            document
                .getElementById("jobSkills")
                .value
                .trim(),

        requirements:
            document
                .getElementById("jobRequirements")
                .value
                .trim(),

        benefits:
            document
                .getElementById("jobBenefits")
                .value
                .trim()

    };

}


/* =========================================================
   SALVAR RASCUNHO
========================================================= */

function saveDraft() {

    const data =
        getJobData();


    localStorage.setItem(

        "nextwork_job_draft",

        JSON.stringify(data)

    );


}


/* =========================================================
   RESTAURAR RASCUNHO
========================================================= */

function restoreDraft() {

    const saved =
        localStorage.getItem(
            "nextwork_job_draft"
        );


    if (!saved) return;


    const data =
        JSON.parse(saved);


    document.getElementById(
        "jobTitle"
    ).value = data.title || "";


    document.getElementById(
        "jobLocation"
    ).value = data.location || "";


    document.getElementById(
        "jobType"
    ).value = data.type || "";


    document.getElementById(
        "jobContract"
    ).value = data.contract || "";


    document.getElementById(
        "jobSalary"
    ).value = data.salary || "";


    document.getElementById(
        "jobArea"
    ).value = data.area || "";


    document.getElementById(
        "jobDescription"
    ).value = data.description || "";


    document.getElementById(
        "jobExperience"
    ).value = data.experience || "";


    document.getElementById(
        "jobEducation"
    ).value = data.education || "";


    document.getElementById(
        "jobSkills"
    ).value = data.skills || "";


    document.getElementById(
        "jobRequirements"
    ).value = data.requirements || "";


    document.getElementById(
        "jobBenefits"
    ).value = data.benefits || "";


    updatePreview();

}


restoreDraft();


/* =========================================================
   ATUALIZAR PRÉVIA
========================================================= */

function updatePreview() {


    const data =
        getJobData();


    document
        .getElementById("previewTitle")
        .textContent =
            data.title || "Título da vaga";


    document
        .getElementById("previewLocation")
        .textContent =
            data.location || "Localização";


    document
        .getElementById("previewType")
        .textContent =
            data.type || "Modalidade";


    document
        .getElementById("previewContract")
        .textContent =
            data.contract || "—";


    document
        .getElementById("previewSalary")
        .textContent =
            data.salary || "A combinar";


    document
        .getElementById("previewDescription")
        .textContent =
            data.description ||

            "As informações da vaga aparecerão aqui conforme você preencher o formulário.";

}


/* =========================================================
   ATUALIZAR PRÉVIA AUTOMATICAMENTE
========================================================= */

const previewInputs = [

    "jobTitle",

    "jobLocation",

    "jobType",

    "jobContract",

    "jobSalary",

    "jobDescription"

];


previewInputs.forEach(function (id) {


    const input =
        document.getElementById(id);


    input.addEventListener(

        "input",

        function () {

            updatePreview();

            saveDraft();

        }

    );


    input.addEventListener(

        "change",

        function () {

            updatePreview();

            saveDraft();

        }

    );

});


/* =========================================================
   ETAPA 1 → ETAPA 2
========================================================= */

nextStep1.addEventListener(

    "click",

    function () {


        const title =
            document
                .getElementById("jobTitle")
                .value
                .trim();


        if (!title) {

            alert(
                "Por favor, informe o título da vaga."
            );

            return;

        }


        /* SALVA AS INFORMAÇÕES */

        saveDraft();


        /* ATUALIZA A PRÉVIA */

        updatePreview();


        /* MUDA DE ETAPA */

        changeStep(2);

    }

);


/* =========================================================
   VOLTAR PARA ETAPA 1
========================================================= */

backStep1.addEventListener(

    "click",

    function () {

        saveDraft();

        changeStep(1);

    }

);


/* =========================================================
   ETAPA 2 → ETAPA 3
========================================================= */

nextStep2.addEventListener(

    "click",

    function () {


        /* SALVA TUDO */

        saveDraft();


        /* ATUALIZA PRÉVIA */

        updatePreview();


        /* ATUALIZA REVISÃO */

        updateReview();


        /* MUDA PARA ETAPA 3 */

        changeStep(3);

    }

);


/* =========================================================
   VOLTAR PARA ETAPA 2
========================================================= */

backStep2.addEventListener(

    "click",

    function () {

        saveDraft();

        changeStep(2);

    }

);


/* =========================================================
   ATUALIZAR REVISÃO
========================================================= */

function updateReview() {


    const data =
        getJobData();


    document.getElementById(
        "reviewTitle"
    ).textContent =
        data.title || "—";


    document.getElementById(
        "reviewLocation"
    ).textContent =
        data.location || "—";


    document.getElementById(
        "reviewType"
    ).textContent =
        data.type || "—";


    document.getElementById(
        "reviewContract"
    ).textContent =
        data.contract || "—";


    document.getElementById(
        "reviewSalary"
    ).textContent =
        data.salary || "—";


    document.getElementById(
        "reviewArea"
    ).textContent =
        data.area || "—";


    document.getElementById(
        "reviewDescription"
    ).textContent =
        data.description || "—";


    document.getElementById(
        "reviewExperience"
    ).textContent =
        data.experience || "—";


    document.getElementById(
        "reviewEducation"
    ).textContent =
        data.education || "—";


    document.getElementById(
        "reviewSkills"
    ).textContent =
        data.skills || "—";


    document.getElementById(
        "reviewRequirements"
    ).textContent =
        data.requirements || "—";


    document.getElementById(
        "reviewBenefits"
    ).textContent =
        data.benefits || "—";

}


/* =========================================================
   PUBLICAR VAGA
========================================================= */

const publishJob =
    document.getElementById("publishJob");

const successMessage =
    document.getElementById("successMessage");


publishJob.addEventListener(

    "click",

    function () {


        const newJob =
            getJobData();


        /* PEGA VAGAS JÁ EXISTENTES */

        const savedJobs =
            localStorage.getItem(
                "nextwork_jobs"
            );


        let jobs = [];


        if (savedJobs) {

            jobs =
                JSON.parse(savedJobs);

        }

        
/* =========================================================
   ADICIONA ID, DATA E STATUS
========================================================= */

newJob.id =
    Date.now();


newJob.createdAt =
    new Date().toISOString();


/* TODA VAGA NOVA COMEÇA COMO ATIVA */

newJob.status =
    "Ativa";
/* TODA NOVA VAGA COMEÇA ATIVA */

newJob.status =
    "Ativa";
        /* ADICIONA NOVA VAGA */

        jobs.push(newJob);


        /* SALVA TODAS AS VAGAS */

        localStorage.setItem(

            "nextwork_jobs",

            JSON.stringify(jobs)

        );


        /* REMOVE RASCUNHO */

        localStorage.removeItem(
            "nextwork_job_draft"
        );


        /* MOSTRA MENSAGEM */

        successMessage.classList.add(
            "show"
        );

    }

);


/* =========================================================
   FECHAR MENSAGEM
========================================================= */

document
    .getElementById("closeSuccess")
    .addEventListener(

        "click",

        function () {


            window.location.href =
                "minhas-vagas.html";

        }

    );