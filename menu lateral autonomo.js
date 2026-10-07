document.addEventListener("DOMContentLoaded",function(){
    const localMenu=document.getElementById("menu-lateral")||document.getElementById("menu-lateral-autonomo");
    if(!localMenu)return;
    fetch("menu lateral autonomo.html")
        .then(function(resposta){
            if(!resposta.ok)throw new Error("Não foi possível carregar o menu lateral do autônomo.");
            return resposta.text();
        })
        .then(function(menu){
            localMenu.innerHTML=menu;
            marcarPaginaAtual();
            ativarTrocaDeFoto();
        })
        .catch(function(erro){
            console.error("Erro ao carregar o menu lateral do autônomo:",erro);
        });
});

function marcarPaginaAtual(){
    let paginaAtual=window.location.pathname.split("/").pop();
    if(paginaAtual===""||paginaAtual==="/")paginaAtual="servicos-autonomo.html";
    document.querySelectorAll(".sidebar-nav a").forEach(function(link){
        link.classList.remove("ativo");
        if(link.getAttribute("href")===paginaAtual){
            link.classList.add("ativo");
        }
    });
}

function ativarTrocaDeFoto(){
    const botao=document.getElementById("trocarFoto");
    const input=document.getElementById("inputFoto");
    const imagem=document.getElementById("sidePhoto");
    if(!botao||!input||!imagem)return;
    const fotoSalva=localStorage.getItem("nextwork_autonomo_photo");
    if(fotoSalva)imagem.src=fotoSalva;
    botao.addEventListener("click",function(){
        input.click();
    });
    input.addEventListener("change",function(){
        const arquivo=input.files[0];
        if(!arquivo)return;
        if(!arquivo.type.startsWith("image/")){
            alert("Selecione uma imagem válida.");
            input.value="";
            return;
        }
        const leitor=new FileReader();
        leitor.onload=function(evento){
            imagem.src=evento.target.result;
            localStorage.setItem("nextwork_autonomo_photo",evento.target.result);
        };
        leitor.readAsDataURL(arquivo);
    });
}