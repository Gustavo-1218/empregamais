document.addEventListener("DOMContentLoaded", () => {

    const campoPesquisa = document.getElementById("campoPesquisa");
    const filtroArea = document.getElementById("filtroArea");
    const filtroModalidade = document.getElementById("filtroModalidade");

    const vagas = document.querySelectorAll(".vaga-card");

    const contador = document.getElementById("contadorVagas");
    const semResultados = document.getElementById("semResultados");


    function filtrarVagas() {

        const pesquisa = campoPesquisa.value
            .toLowerCase()
            .trim();

        const areaSelecionada = filtroArea.value;

        const modalidadeSelecionada = filtroModalidade.value;

        let quantidadeVisivel = 0;


        vagas.forEach((vaga) => {

            const titulo = vaga
                .querySelector("h2")
                .textContent
                .toLowerCase();

            const empresa = vaga
                .querySelector(".empresa")
                .textContent
                .toLowerCase();

            const area = vaga.dataset.area;

            const modalidade = vaga.dataset.modalidade;


            const correspondePesquisa =
                pesquisa === "" ||
                titulo.includes(pesquisa) ||
                empresa.includes(pesquisa);


            const correspondeArea =
                areaSelecionada === "todas" ||
                area === areaSelecionada;


            const correspondeModalidade =
                modalidadeSelecionada === "todas" ||
                modalidade === modalidadeSelecionada;


            const mostrar =
                correspondePesquisa &&
                correspondeArea &&
                correspondeModalidade;


            if (mostrar) {

                vaga.style.display = "flex";

                quantidadeVisivel++;

            } else {

                vaga.style.display = "none";

            }

        });


        atualizarContador(quantidadeVisivel);


        if (quantidadeVisivel === 0) {

            semResultados.style.display = "flex";

        } else {

            semResultados.style.display = "none";

        }

    }


    function atualizarContador(quantidade) {

        if (quantidade === 1) {

            contador.textContent = "1 vaga encontrada";

        } else {

            contador.textContent =
                `${quantidade} vagas encontradas`;

        }

    }


    campoPesquisa.addEventListener(
        "input",
        filtrarVagas
    );


    filtroArea.addEventListener(
        "change",
        filtrarVagas
    );


    filtroModalidade.addEventListener(
        "change",
        filtrarVagas
    );


    /*
       OS CARDS JÁ SÃO LINKS.
       Portanto, ao clicar em cada vaga,
       o navegador abre diretamente o HTML
       correspondente:
       
       Designer       → vaga-designer.html
       Assistente     → vaga-assistente.html
       Marketing      → vaga-marketing.html
       Front-end      → vaga-frontend.html
    */


    filtrarVagas();

});