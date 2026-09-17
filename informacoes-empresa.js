/* =========================================================
   NEXT WORK - INFORMAÇÕES DA EMPRESA
========================================================= */


/* ================= LOGOS ================= */

const companyLogo =
    document.getElementById("companyLogo");

const mainCompanyLogo =
    document.getElementById("mainCompanyLogo");

const editCompanyLogo =
    document.getElementById("editCompanyLogo");


const logoUpload =
    document.getElementById("logoUpload");

const changeLogoBtn =
    document.getElementById("changeLogoBtn");


/* =========================================================
   RECUPERAR FOTO ESCOLHIDA NA OUTRA PÁGINA
========================================================= */

const savedLogo =
    localStorage.getItem(
        "nextwork_company_logo"
    );


if (savedLogo) {

    companyLogo.src = savedLogo;

    mainCompanyLogo.src = savedLogo;

    editCompanyLogo.src = savedLogo;

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


        /* ATUALIZA TODOS OS LOGOS */

        companyLogo.src = image;

        mainCompanyLogo.src = image;

        editCompanyLogo.src = image;


        /* SALVA PARA TODAS AS PÁGINAS */

        localStorage.setItem(
            "nextwork_company_logo",
            image
        );

    };


    reader.readAsDataURL(file);

});



/* =========================================================
   ELEMENTOS
========================================================= */

const companyCard =
    document.getElementById("companyInfo");


const editBtn =
    document.getElementById("editBtn");


const saveBtn =
    document.getElementById("saveBtn");


const cancelBtn =
    document.getElementById("cancelBtn");



/* =========================================================
   FUNÇÕES PARA PEGAR TEXTO
========================================================= */

function getText(id) {

    return document
        .getElementById(id)
        .textContent
        .trim();

}


function setText(id, value) {

    document
        .getElementById(id)
        .textContent = value;

}



/* =========================================================
   PEGAR TODAS AS INFORMAÇÕES
========================================================= */

function getCompanyData() {

    return {

        description:
            getText("companyDescription"),

        about:
            getText("aboutText"),

        name:
            getText("companyName"),

        cnpj:
            getText("companyCnpj"),

        email:
            getText("companyEmail"),

        phone:
            getText("companyPhone"),

        location:
            getText("companyLocation"),

        sector:
            getText("companySector"),

        website:
            getText("companyWebsite")

    };

}



/* =========================================================
   PREENCHER FORMULÁRIO
========================================================= */

function fillForm(data) {

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


    document
        .getElementById("editCompanySector")
        .value = data.sector;


    document
        .getElementById("editCompanyWebsite")
        .value = data.website;

}



/* =========================================================
   EDITAR INFORMAÇÕES
========================================================= */

editBtn.addEventListener("click", function () {

    const data = getCompanyData();


    fillForm(data);


    companyCard.classList.add("editing");

});



/* =========================================================
   CANCELAR
========================================================= */

cancelBtn.addEventListener("click", function () {

    companyCard.classList.remove("editing");

});



/* =========================================================
   SALVAR
========================================================= */

saveBtn.addEventListener("click", function () {


    const data = {

        description:
            document
                .getElementById("companyDescription")
                .textContent,

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
                .value,

        sector:
            document
                .getElementById("editCompanySector")
                .value,

        website:
            document
                .getElementById("editCompanyWebsite")
                .value

    };


    /* ATUALIZA A VISUALIZAÇÃO */

    setText(
        "aboutText",
        data.about
    );


    setText(
        "companyName",
        data.name
    );


    setText(
        "infoCompanyName",
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


    setText(
        "companySector",
        data.sector
    );


    setText(
        "companyWebsite",
        data.website
    );


    /* SALVAR NO NAVEGADOR */

    localStorage.setItem(
        "nextwork_company_data",
        JSON.stringify(data)
    );


    /* SAIR DO MODO DE EDIÇÃO */

    companyCard.classList.remove("editing");

});



/* =========================================================
   RECUPERAR INFORMAÇÕES SALVAS
========================================================= */

function restoreCompanyData() {

    const saved =
        localStorage.getItem(
            "nextwork_company_data"
        );


    if (!saved) return;


    const data =
        JSON.parse(saved);


    setText(
        "aboutText",
        data.about
    );


    setText(
        "companyName",
        data.name
    );


    setText(
        "infoCompanyName",
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


    setText(
        "companySector",
        data.sector
    );


    setText(
        "companyWebsite",
        data.website
    );


    if (data.description) {

        setText(
            "companyDescription",
            data.description
        );

    }

}


restoreCompanyData();