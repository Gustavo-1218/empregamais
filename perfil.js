document.addEventListener("DOMContentLoaded", () => {

    const PROFILE_KEY = "nextwork_candidate_profile";
    const PHOTO_KEY = "nextwork_candidate_photo";

    const PDF_DB_NAME = "nextwork_pdf_database";
    const PDF_STORE_NAME = "curriculum";
    const PDF_KEY = "current";

    const defaultProfile = {
        name: "João da Silva",
        email: "candidato@email.com",
        phone: "(84) 99999-9999",
        cpf: "***.***.***-**",
        profession: "Desenvolvedor Web",
        location: "Natal, RN",
        about: "Sou estudante interessado em tecnologia, desenvolvimento web e novas oportunidades profissionais. Busco uma oportunidade para desenvolver minhas habilidades e contribuir com novos projetos."
    };

    const elements = {
        modal: document.getElementById("editModal"),
        form: document.getElementById("editForm"),
        sideName: document.getElementById("sideName"),
        sideProfession: document.getElementById("sideProfession"),
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        cpf: document.getElementById("cpf"),
        profession: document.getElementById("profession"),
        location: document.getElementById("location"),
        about: document.getElementById("aboutText"),
        editName: document.getElementById("editName"),
        editEmail: document.getElementById("editEmail"),
        editPhone: document.getElementById("editPhone"),
        editCpf: document.getElementById("editCpf"),
        editProfession: document.getElementById("editProfession"),
        editLocation: document.getElementById("editLocation"),
        editAbout: document.getElementById("editAbout"),
        profilePercent: document.getElementById("profilePercent"),
        progressBar: document.getElementById("progressBar"),
        changePhotoBtn: document.getElementById("changePhotoBtn"),
        photoInput: document.getElementById("photoInput"),
        photoCircle: document.getElementById("photoCircle"),
        pdfUploadBtn: document.getElementById("pdfUploadBtn"),
        pdfInput: document.getElementById("pdfInput"),
        pdfFileName: document.getElementById("pdfFileName"),
        pdfView: document.getElementById("pdfView"),
        pdfDownload: document.getElementById("pdfDownload"),
        pdfPreview: document.getElementById("pdfPreview")
    };

    let state = {
        profile: {},
        photo: "",
        pdfUrl: ""
    };

    function loadProfile() {
        const saved = localStorage.getItem(PROFILE_KEY);

        if (!saved) {
            state.profile = { ...defaultProfile };
            return;
        }

        try {
            state.profile = {
                ...defaultProfile,
                ...JSON.parse(saved)
            };
        } catch {
            state.profile = { ...defaultProfile };
        }
    }

    function saveProfile() {
        localStorage.setItem(
            PROFILE_KEY,
            JSON.stringify(state.profile)
        );
    }

    function loadPhoto() {
        state.photo = localStorage.getItem(PHOTO_KEY) || "";
    }

    function setText(element, value) {
        if (element) {
            element.textContent = value;
        }
    }

    function updateProfileScreen() {
        const profile = state.profile;

        setText(elements.sideName, profile.name);
        setText(elements.sideProfession, profile.profession);
        setText(elements.name, profile.name);
        setText(elements.email, profile.email);
        setText(elements.phone, profile.phone);
        setText(elements.cpf, profile.cpf);
        setText(elements.profession, profile.profession);
        setText(elements.location, profile.location);
        setText(elements.about, profile.about);

        updateCompletion();
    }

    function updateCompletion() {
        const profile = state.profile;

        const fields = [
            profile.name,
            profile.email,
            profile.phone,
            profile.cpf,
            profile.profession,
            profile.location,
            profile.about
        ];

        const filled = fields.filter(value =>
            typeof value === "string" &&
            value.trim() !== ""
        ).length;

        const percentage = Math.round(
            (filled / fields.length) * 100
        );

        setText(
            elements.profilePercent,
            `${percentage}%`
        );

        if (elements.progressBar) {
            elements.progressBar.style.width = `${percentage}%`;
        }
    }

    function fillEditForm() {
        const profile = state.profile;

        if (elements.editName) {
            elements.editName.value = profile.name;
        }

        if (elements.editEmail) {
            elements.editEmail.value = profile.email;
        }

        if (elements.editPhone) {
            elements.editPhone.value = profile.phone;
        }

        if (elements.editCpf) {
            elements.editCpf.value = profile.cpf;
        }

        if (elements.editProfession) {
            elements.editProfession.value = profile.profession;
        }

        if (elements.editLocation) {
            elements.editLocation.value = profile.location;
        }

        if (elements.editAbout) {
            elements.editAbout.value = profile.about;
        }
    }

    function openEditModal() {
        if (!elements.modal) {
            return;
        }

        fillEditForm();
        elements.modal.classList.add("open");
        document.body.classList.add("modal-open");
    }

    function closeEditModal() {
        if (!elements.modal) {
            return;
        }

        elements.modal.classList.remove("open");
        document.body.classList.remove("modal-open");
    }

    function saveEditedProfile() {
        state.profile = {
            name: elements.editName.value.trim(),
            email: elements.editEmail.value.trim(),
            phone: elements.editPhone.value.trim(),
            cpf: elements.editCpf.value.trim(),
            profession: elements.editProfession.value.trim(),
            location: elements.editLocation.value.trim(),
            about: elements.editAbout.value.trim()
        };

        saveProfile();
        updateProfileScreen();
        closeEditModal();
        showMessage("Perfil atualizado com sucesso!");
    }

    function openCompanyProfile() {
        window.location.href = "empresaperfil.html";
    }

    function updatePhoto() {
        if (!elements.photoCircle) {
            return;
        }

        if (state.photo) {
            elements.photoCircle.innerHTML = "";

            const image = document.createElement("img");

            image.src = state.photo;
            image.alt = "Foto do candidato";

            elements.photoCircle.appendChild(image);
        } else {
            elements.photoCircle.textContent = "♙";
        }
    }

    function savePhoto(file) {
        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            showMessage("Selecione uma imagem válida.");
            return;
        }

        const reader = new FileReader();

        reader.onload = event => {
            state.photo = event.target.result;

            localStorage.setItem(
                PHOTO_KEY,
                state.photo
            );

            updatePhoto();
            showMessage("Foto atualizada com sucesso!");
        };

        reader.readAsDataURL(file);
    }

    function openPdfDatabase() {
        return new Promise((resolve, reject) => {

            const request = indexedDB.open(
                PDF_DB_NAME,
                1
            );

            request.onupgradeneeded = event => {

                const database = event.target.result;

                if (!database.objectStoreNames.contains(PDF_STORE_NAME)) {
                    database.createObjectStore(
                        PDF_STORE_NAME
                    );
                }
            };

            request.onsuccess = event => {
                resolve(event.target.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    function savePdf(file) {
        return openPdfDatabase().then(database => {

            return new Promise((resolve, reject) => {

                const transaction =
                    database.transaction(
                        PDF_STORE_NAME,
                        "readwrite"
                    );

                const store =
                    transaction.objectStore(
                        PDF_STORE_NAME
                    );

                store.put(
                    {
                        blob: file,
                        name: file.name,
                        type: file.type,
                        date: Date.now()
                    },
                    PDF_KEY
                );

                transaction.oncomplete = () => {
                    database.close();
                    resolve();
                };

                transaction.onerror = () => {
                    database.close();
                    reject(transaction.error);
                };
            });
        });
    }

    function getSavedPdf() {
        return openPdfDatabase().then(database => {

            return new Promise((resolve, reject) => {

                const transaction =
                    database.transaction(
                        PDF_STORE_NAME,
                        "readonly"
                    );

                const store =
                    transaction.objectStore(
                        PDF_STORE_NAME
                    );

                const request =
                    store.get(PDF_KEY);

                request.onsuccess = () => {
                    const result = request.result;
                    database.close();
                    resolve(result || null);
                };

                request.onerror = () => {
                    database.close();
                    reject(request.error);
                };
            });
        });
    }

    function setPdfDisplay(url, fileName) {

        if (state.pdfUrl && state.pdfUrl.startsWith("blob:")) {
            URL.revokeObjectURL(state.pdfUrl);
        }

        state.pdfUrl = url;

        setText(
            elements.pdfFileName,
            fileName
        );

        if (elements.pdfView) {
            elements.pdfView.href = url;
            elements.pdfView.target = "_blank";
        }

        if (elements.pdfDownload) {
            elements.pdfDownload.href = url;
            elements.pdfDownload.download = fileName;
        }

        if (elements.pdfPreview) {
            elements.pdfPreview.src = url;
        }
    }

    async function loadPdf() {

        try {

            const savedPdf = await getSavedPdf();

            if (!savedPdf || !savedPdf.blob) {
                setPdfDisplay(
                    "Curriculo_Candidato.pdf",
                    "Curriculo_Candidato.pdf"
                );
                return;
            }

            const url =
                URL.createObjectURL(
                    savedPdf.blob
                );

            setPdfDisplay(
                url,
                savedPdf.name || "Curriculo_Candidato.pdf"
            );

        } catch {

            setPdfDisplay(
                "Curriculo_Candidato.pdf",
                "Curriculo_Candidato.pdf"
            );
        }
    }

    async function handlePdfUpload(file) {

        if (!file) {
            return;
        }

        const isPdf =
            file.type === "application/pdf" ||
            file.name.toLowerCase().endsWith(".pdf");

        if (!isPdf) {
            showMessage("Selecione um arquivo PDF.");
            return;
        }

        if (file.size > 15 * 1024 * 1024) {
            showMessage("O PDF deve ter no máximo 15 MB.");
            return;
        }

        try {

            await savePdf(file);

            const url =
                URL.createObjectURL(file);

            setPdfDisplay(
                url,
                file.name
            );

            showMessage("Currículo atualizado com sucesso!");

        } catch {

            showMessage("Não foi possível salvar o PDF.");
        }
    }

    function showMessage(message) {

        let messageElement =
            document.getElementById(
                "profileMessage"
            );

        if (!messageElement) {

            messageElement =
                document.createElement("div");

            messageElement.id =
                "profileMessage";

            document.body.appendChild(
                messageElement
            );
        }

        messageElement.textContent =
            message;

        messageElement.classList.add(
            "show"
        );

        clearTimeout(
            messageElement.messageTimer
        );

        messageElement.messageTimer =
            setTimeout(() => {

                messageElement.classList.remove(
                    "show"
                );

            }, 2500);
    }

    if (elements.form) {

        elements.form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                saveEditedProfile();
            }
        );
    }

    if (elements.changePhotoBtn) {

        elements.changePhotoBtn.addEventListener(
            "click",
            () => {

                if (elements.photoInput) {
                    elements.photoInput.click();
                }

            }
        );
    }

    if (elements.photoInput) {

        elements.photoInput.addEventListener(
            "change",
            event => {

                const file =
                    event.target.files[0];

                savePhoto(file);

                event.target.value = "";
            }
        );
    }

    if (elements.pdfUploadBtn) {

        elements.pdfUploadBtn.addEventListener(
            "click",
            () => {

                if (elements.pdfInput) {
                    elements.pdfInput.click();
                }

            }
        );
    }

    if (elements.pdfInput) {

        elements.pdfInput.addEventListener(
            "change",
            async event => {

                const file =
                    event.target.files[0];

                await handlePdfUpload(file);

                event.target.value = "";
            }
        );
    }

    if (elements.modal) {

        elements.modal.addEventListener(
            "click",
            event => {

                if (event.target === elements.modal) {
                    closeEditModal();
                }

            }
        );
    }

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeEditModal();
            }

        }
    );

    window.abrirEdicao =
        openEditModal;

    window.fecharEdicao =
        closeEditModal;

    window.alternarParaEmpresa =
        openCompanyProfile;

    loadProfile();
    loadPhoto();

    updateProfileScreen();
    updatePhoto();

    loadPdf();

});