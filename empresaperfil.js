/* =========================================================
   NEXT WORK - PERFIL DA EMPRESA
========================================================= */


/* ================= LOGO DA EMPRESA ================= */

const companyLogo =
    document.getElementById("companyLogo");

const heroLogo =
    document.getElementById("heroLogo");

const logoUpload =
    document.getElementById("logoUpload");

const changeLogoBtn =
    document.getElementById("changeLogoBtn");


/* ABRIR SELETOR DE IMAGEM */

changeLogoBtn.addEventListener("click", function () {

    logoUpload.click();

});


/* TROCAR A FOTO */

logoUpload.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;


    const reader = new FileReader();


    reader.onload = function (event) {

        const image = event.target.result;


        /* MUDA OS DOIS LOGOS */

        companyLogo.src = image;

        heroLogo.src = image;


        /* SALVA NO NAVEGADOR */

        localStorage.setItem(
            "nextwork_company_logo",
            image
        );

    };


    reader.readAsDataURL(file);

});


/* RECUPERAR LOGO SALVA */

const savedLogo =
    localStorage.getItem(
        "nextwork_company_logo"
    );


if (savedLogo) {

    companyLogo.src = savedLogo;

    heroLogo.src = savedLogo;

}



/* =========================================================
   EDITAR INFORMAÇÕES
========================================================= */

const state = {

    heroInfo: {},

    companyInfo: {}

};


/* PEGAR TEXTO */

function text(id) {

    return document
        .getElementById(id)
        .textContent
        .trim();

}


/* ALTERAR TEXTO */

function setText(id, value) {

    document
        .getElementById(id)
        .textContent = value;

}


/* GUARDAR INFORMAÇÕES */

function snapshot(target) {

    if (target === "heroInfo") {

        return {

            name: text("heroName"),

            sector: text("heroSector"),

            location: text("heroLocation"),

            website: text("heroWebsite"),

            description: text("heroDescription")

        };

    }


    return {

        about: text("aboutText"),

        name: text("companyName"),

        cnpj: text("companyCnpj"),

        email: text("companyEmail"),

        phone: text("companyPhone"),

        location: text("companyLocation")

    };

}


/* PREENCHER FORMULÁRIO */

function fillForm(target, data) {

    if (target === "heroInfo") {

        document
            .getElementById("editHeroName")
            .value = data.name;


        document
            .getElementById("editHeroSector")
            .value = data.sector;


        document
            .getElementById("editHeroLocation")
            .value = data.location;


        document
            .getElementById("editHeroWebsite")
            .value = data.website;


        document
            .getElementById("editHeroDescription")
            .value = data.description;

    }

    else {

        document
            .getElementById("editAboutText")
            .value = data.about;


        document
            .getElementById("editCompanyName")
            .value = data.name;


        document
            .getElementById("editCompanyCnpj")
            .value = data.cnpj;


        document
            .getElementById("editCompanyEmail")
            .value = data.email;


        document
            .getElementById("editCompanyPhone")
            .value = data.phone;


        document
            .getElementById("editCompanyLocation")
            .value = data.location;

    }

}


/* ================= EDITAR ================= */

document
    .querySelectorAll(".edit-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const target =
                button.dataset.target;


            state[target] =
                snapshot(target);


            fillForm(
                target,
                state[target]
            );


            document
                .getElementById(target)
                .classList
                .add("editing");

        });

    });


/* ================= CANCELAR ================= */

document
    .querySelectorAll(".cancel-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const target =
                button.dataset.target;


            /* VOLTA OS CAMPOS PARA O ORIGINAL */

            fillForm(
                target,
                state[target]
            );


            document
                .getElementById(target)
                .classList
                .remove("editing");

        });

    });


/* ================= SALVAR ================= */

function save(target) {

    const card =
        document.getElementById(target);


    /* ===== PARTE SUPERIOR ===== */

    if (target === "heroInfo") {

        const data = {

            name:
                document
                    .getElementById("editHeroName")
                    .value,

            sector:
                document
                    .getElementById("editHeroSector")
                    .value,

            location:
                document
                    .getElementById("editHeroLocation")
                    .value,

            website:
                document
                    .getElementById("editHeroWebsite")
                    .value,

            description:
                document
                    .getElementById("editHeroDescription")
                    .value

        };


        setText("heroName", data.name);

        setText("heroSector", data.sector);

        setText("heroLocation", data.location);

        setText("heroWebsite", data.website);

        setText(
            "heroDescription",
            data.description
        );


        /* ATUALIZA NOME NA OUTRA PARTE */

        setText(
            "companyName",
            data.name
        );

    }


    /* ===== SOBRE A EMPRESA ===== */

    else {

        const data = {

            about:
                document
                    .getElementById("editAboutText")
                    .value,

            name:
                document
                    .getElementById("editCompanyName")
                    .value,

            cnpj:
                document
                    .getElementById("editCompanyCnpj")
                    .value,

            email:
                document
                    .getElementById("editCompanyEmail")
                    .value,

            phone:
                document
                    .getElementById("editCompanyPhone")
                    .value,

            location:
                document
                    .getElementById("editCompanyLocation")
                    .value

        };


        setText("aboutText", data.about);

        setText("companyName", data.name);

        setText("companyCnpj", data.cnpj);

        setText("companyEmail", data.email);

        setText("companyPhone", data.phone);

        setText(
            "companyLocation",
            data.location
        );


        /* ATUALIZA INFORMAÇÕES DE CIMA */

        setText("heroName", data.name);

        setText(
            "heroLocation",
            data.location
        );

    }


    /* SALVAR NO NAVEGADOR */

    localStorage.setItem(
        "nextwork_" + target,
        JSON.stringify(snapshot(target))
    );


    /* SAIR DO MODO DE EDIÇÃO */

    card.classList.remove("editing");

}


/* EVENTOS DE SALVAR */

document
    .querySelectorAll(".save-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            save(
                button.dataset.target
            );

        });

    });


/* ================= RECUPERAR DADOS ================= */

function restore() {

    ["heroInfo", "companyInfo"]
        .forEach(target => {

            const saved =
                localStorage.getItem(
                    "nextwork_" + target
                );


            if (!saved) return;


            const data =
                JSON.parse(saved);


            if (target === "heroInfo") {

                setText("heroName", data.name);

                setText("heroSector", data.sector);

                setText(
                    "heroLocation",
                    data.location
                );

                setText(
                    "heroWebsite",
                    data.website
                );

                setText(
                    "heroDescription",
                    data.description
                );

            }


            else {

                setText(
                    "aboutText",
                    data.about
                );

                setText(
                    "companyName",
                    data.name
                );

                setText(
                    "companyCnpj",
                    data.cnpj
                );

                setText(
                    "companyEmail",
                    data.email
                );

                setText(
                    "companyPhone",
                    data.phone
                );

                setText(
                    "companyLocation",
                    data.location
                );

            }

        });

}


restore();

/* =========================================================
   ÚLTIMAS VAGAS PUBLICADAS
========================================================= */

const latestJobsContainer =
    document.getElementById("latestJobs");


function loadLatestJobs() {

    if (!latestJobsContainer) return;


    /* PEGA AS VAGAS SALVAS */

    const savedJobs =
        localStorage.getItem("nextwork_jobs");


    let jobs = [];


    if (savedJobs) {

        jobs = JSON.parse(savedJobs);

    }


    /* LIMPA A ÁREA */

    latestJobsContainer.innerHTML = "";


    /* =========================================
       SE NÃO EXISTIREM VAGAS
    ========================================= */

    if (jobs.length === 0) {

        latestJobsContainer.innerHTML = `

            <div class="no-jobs">

                <div class="no-jobs-icon">
                    💼
                </div>

                <strong>
                    Nenhuma vaga publicada ainda
                </strong>

                <span>
                    Quando você publicar uma nova vaga,
                    ela aparecerá aqui.
                </span>

            </div>

        `;

        return;

    }


    /* =========================================
       MOSTRA AS 3 ÚLTIMAS VAGAS
    ========================================= */

    const latestJobs =
        jobs.slice(-3).reverse();


    latestJobs.forEach(job => {

        const jobRow =
            document.createElement("a");


        jobRow.className = "job-row";


        jobRow.href = "minhas-vagas.html";


        jobRow.innerHTML = `

            <span class="job-icon">
                ⌘
            </span>


            <div>

                <strong>
                    ${job.title || "Vaga sem título"}
                </strong>

                <small>
                    ${job.type || "Não informado"}
                    •
                    ${job.location || "Localização não informada"}
                </small>

            </div>


            <em>
                ${job.status || "Ativa"}
            </em>


            <b>
                →
            </b>

        `;


        latestJobsContainer.appendChild(jobRow);

    });

}


/* CARREGAR AS VAGAS */

loadLatestJobs();

/* =========================================================
   ESTATÍSTICAS DAS VAGAS
========================================================= */


function getAllJobs() {


    const savedJobs =

        localStorage.getItem(
            "nextwork_jobs"
        );


    if (!savedJobs) {

        return [];

    }


    try {


        return JSON.parse(
            savedJobs
        );


    }

    catch (error) {


        return [];

    }


}



/* =========================================================
   ATUALIZAR NÚMEROS DAS VAGAS
========================================================= */


function updateJobStatistics() {


    const jobs =
        getAllJobs();


    const totalJobs =
        document.getElementById(
            "totalJobs"
        );


    const activeJobs =
        document.getElementById(
            "activeJobs"
        );


    const expiredJobs =
        document.getElementById(
            "expiredJobs"
        );


    /* =====================================================
       TOTAL DE VAGAS
    ===================================================== */

    totalJobs.textContent =
        jobs.length;



    /* =====================================================
   VAGAS ATIVAS
===================================================== */

const active =

    jobs.filter(function (job) {


        /* SE NÃO TIVER STATUS,
           CONSIDERA A VAGA COMO ATIVA */

        if (!job.status) {

            return true;

        }


        const status =

            job.status
                .toLowerCase()
                .trim();


        return status === "ativa";

    });


activeJobs.textContent =
    active.length;
    
    /* =====================================================
       VAGAS EXPIRADAS
    ===================================================== */

    const expired =

        jobs.filter(function (job) {


            const status =

                (
                    job.status ||
                    ""
                )

                .toLowerCase();


            return

                status === "expirada" ||

                status === "expirado";

        });


    expiredJobs.textContent =
        expired.length;


}



/* =========================================================
   CARREGAR ESTATÍSTICAS
========================================================= */


updateJobStatistics();