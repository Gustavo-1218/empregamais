document.addEventListener("DOMContentLoaded", () => {
    const editForm = document.getElementById("editForm");
    const photoInput = document.getElementById("photoInput");
    const changePhotoBtn = document.getElementById("changePhotoBtn");

    const STORAGE_KEY = "nextWorkCandidato";

    const dadosPadrao = {
        name: "Gustavo Henrique",
        email: "gustavo@email.com",
        phone: "(84) 99999-9999",
        cpf: "000.000.000-00",
        profession: "Desenvolvedor Web",
        location: "Natal, RN",
        about: "Estudante interessado em tecnologia, desenvolvimento web e novas oportunidades profissionais.",
        photo: ""
    };

    function carregarDados() {
        const dadosSalvos = localStorage.getItem(STORAGE_KEY);

        if (!dadosSalvos) {
            return { ...dadosPadrao };
        }

        try {
            return {
                ...dadosPadrao,
                ...JSON.parse(dadosSalvos)
            };
        } catch {
            return { ...dadosPadrao };
        }
    }

    function salvarDados(dados) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    }

    function atualizarPerfil() {
        const dados = carregarDados();

        const elementos = {
            sideName: document.getElementById("sideName"),
            sideProfession: document.getElementById("sideProfession"),
            name: document.getElementById("name"),
            email: document.getElementById("email"),
            phone: document.getElementById("phone"),
            cpf: document.getElementById("cpf"),
            profession: document.getElementById("profession"),
            location: document.getElementById("location"),
            aboutText: document.getElementById("aboutText")
        };

        if (elementos.sideName) {
            elementos.sideName.textContent = dados.name;
        }

        if (elementos.sideProfession) {
            elementos.sideProfession.textContent = dados.profession;
        }

        if (elementos.name) {
            elementos.name.textContent = dados.name;
        }

        if (elementos.email) {
            elementos.email.textContent = dados.email;
        }

        if (elementos.phone) {
            elementos.phone.textContent = dados.phone;
        }

        if (elementos.cpf) {
            elementos.cpf.textContent = dados.cpf;
        }

        if (elementos.profession) {
            elementos.profession.textContent = dados.profession;
        }

        if (elementos.location) {
            elementos.location.textContent = dados.location;
        }

        if (elementos.aboutText) {
            elementos.aboutText.textContent = dados.about;
        }

        atualizarFoto(dados.photo);
        atualizarProgresso(dados);
    }

    function atualizarFoto(photo) {
        const imagens = document.querySelectorAll(
            ".profile-photo, .profile-avatar, #profilePhoto"
        );

        imagens.forEach(img => {
            if (img.tagName === "IMG" && photo) {
                img.src = photo;
            }
        });
    }

    function atualizarProgresso(dados) {
        const campos = [
            dados.name,
            dados.email,
            dados.phone,
            dados.cpf,
            dados.profession,
            dados.location,
            dados.about
        ];

        const preenchidos = campos.filter(
            campo => campo && campo.trim() !== ""
        ).length;

        const porcentagem = Math.round(
            (preenchidos / campos.length) * 100
        );

        const profilePercent = document.getElementById("profilePercent");
        const progressBar = document.getElementById("progressBar");

        if (profilePercent) {
            profilePercent.textContent = `${porcentagem}%`;
        }

        if (progressBar) {
            progressBar.style.width = `${porcentagem}%`;
        }
    }

    window.abrirEdicao = function () {
        const modal = document.getElementById("editModal");

        if (!modal) {
            return;
        }

        const dados = carregarDados();

        const fields = {
            editName: dados.name,
            editEmail: dados.email,
            editPhone: dados.phone,
            editCpf: dados.cpf,
            editProfession: dados.profession,
            editLocation: dados.location,
            editAbout: dados.about
        };

        Object.entries(fields).forEach(([id, value]) => {
            const input = document.getElementById(id);

            if (input) {
                input.value = value;
            }
        });

        modal.classList.add("active");
        document.body.classList.add("modal-open");
    };

    window.fecharEdicao = function () {
        const modal = document.getElementById("editModal");

        if (!modal) {
            return;
        }

        modal.classList.remove("active");
        document.body.classList.remove("modal-open");
    };

    if (editForm) {
        editForm.addEventListener("submit", event => {
            event.preventDefault();

            const dados = carregarDados();

            dados.name =
                document.getElementById("editName")?.value.trim() ||
                dados.name;

            dados.email =
                document.getElementById("editEmail")?.value.trim() ||
                dados.email;

            dados.phone =
                document.getElementById("editPhone")?.value.trim() ||
                dados.phone;

            dados.cpf =
                document.getElementById("editCpf")?.value.trim() ||
                dados.cpf;

            dados.profession =
                document.getElementById("editProfession")?.value.trim() ||
                dados.profession;

            dados.location =
                document.getElementById("editLocation")?.value.trim() ||
                dados.location;

            dados.about =
                document.getElementById("editAbout")?.value.trim() ||
                dados.about;

            salvarDados(dados);
            atualizarPerfil();
            fecharEdicao();
            mostrarMensagem("Perfil atualizado com sucesso!");
        });
    }

    if (changePhotoBtn && photoInput) {
        changePhotoBtn.addEventListener("click", () => {
            photoInput.click();
        });
    }

    if (photoInput) {
        photoInput.addEventListener("change", event => {
            const arquivo = event.target.files[0];

            if (!arquivo) {
                return;
            }

            if (!arquivo.type.startsWith("image/")) {
                mostrarMensagem("Selecione uma imagem válida.");
                return;
            }

            const leitor = new FileReader();

            leitor.onload = event => {
                const dados = carregarDados();

                dados.photo = event.target.result;

                salvarDados(dados);
                atualizarFoto(dados.photo);
                mostrarMensagem("Foto atualizada com sucesso!");
            };

            leitor.readAsDataURL(arquivo);
        });
    }

    window.alternarParaEmpresa = function () {
        window.location.href = "empresaperfil.html";
    };

    function mostrarMensagem(texto) {
        let mensagem = document.getElementById("successMessage");

        if (!mensagem) {
            mensagem = document.createElement("div");
            mensagem.id = "successMessage";

            mensagem.style.position = "fixed";
            mensagem.style.bottom = "25px";
            mensagem.style.right = "25px";
            mensagem.style.padding = "14px 20px";
            mensagem.style.borderRadius = "12px";
            mensagem.style.background = "#151525";
            mensagem.style.color = "#ffffff";
            mensagem.style.border = "1px solid #5865f2";
            mensagem.style.boxShadow = "0 0 20px rgba(88,101,242,.35)";
            mensagem.style.zIndex = "99999";
            mensagem.style.fontFamily = "Poppins, sans-serif";
            mensagem.style.transition = "opacity .3s ease";

            document.body.appendChild(mensagem);
        }

        mensagem.textContent = texto;
        mensagem.style.opacity = "1";

        clearTimeout(mensagem.timer);

        mensagem.timer = setTimeout(() => {
            mensagem.style.opacity = "0";
        }, 2500);
    }

    document.addEventListener("click", event => {
        const modal = document.getElementById("editModal");

        if (!modal) {
            return;
        }

        if (event.target === modal) {
            fecharEdicao();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            fecharEdicao();
        }
    });

    atualizarPerfil();
});