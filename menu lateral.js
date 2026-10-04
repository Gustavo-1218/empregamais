document.addEventListener("DOMContentLoaded",function(){
    const localMenu=document.getElementById("menu-lateral");
    if(!localMenu)return;
    fetch("menu lateral.html")
        .then(function(resposta){
            if(!resposta.ok)throw new Error("Não foi possível carregar o menu lateral.");
            return resposta.text();
        })
        .then(function(menu){
            localMenu.innerHTML=menu;
            marcarPaginaAtual();
            ativarTrocaDeFoto();
            carregarDadosPerfil();
        })
        .catch(function(erro){
            console.error("Erro ao carregar o menu lateral:",erro);
        });
});

function marcarPaginaAtual(){
    let paginaAtual=window.location.pathname.split("/").pop();
    if(paginaAtual===""||paginaAtual==="/")paginaAtual="perfil.html";
    document.querySelectorAll(".sidebar-menu a").forEach(function(link){
        link.classList.remove("ativo");
        if(link.getAttribute("href")===paginaAtual){
            link.classList.add("ativo");
        }
    });
}

function ativarTrocaDeFoto(){
    const botao=document.getElementById("changePhotoBtn");
    const input=document.getElementById("photoInput");
    const circulo=document.getElementById("photoCircle");
    if(!botao||!input||!circulo)return;
    const fotoSalva=localStorage.getItem("nextwork_candidate_photo");
    if(fotoSalva){
        circulo.textContent="";
        circulo.style.backgroundImage="url('"+fotoSalva+"')";
        circulo.style.backgroundSize="cover";
        circulo.style.backgroundPosition="center";
    }
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
            const foto=evento.target.result;
            circulo.textContent="";
            circulo.style.backgroundImage="url('"+foto+"')";
            circulo.style.backgroundSize="cover";
            circulo.style.backgroundPosition="center";
            localStorage.setItem("nextwork_candidate_photo",foto);
        };
        leitor.readAsDataURL(arquivo);
    });
}

function carregarDadosPerfil(){
    const nome=document.getElementById("sideName");
    const profissao=document.getElementById("sideProfession");
    const dados=localStorage.getItem("nextwork_candidate_profile");
    if(!dados)return;
    try{
        const perfil=JSON.parse(dados);
        if(nome&&perfil.nome)nome.textContent=perfil.nome;
        if(profissao&&perfil.profissao)profissao.textContent=perfil.profissao;
    }catch(erro){
        console.error("Erro ao carregar dados do perfil:",erro);
    }
}