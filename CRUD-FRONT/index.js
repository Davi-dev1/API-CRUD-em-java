let usuarioIdLogado=null;








const btn =document.getElementById("btn");
const form = document.getElementById("form");//meu json tinha corpo mas nn tinha dados por causa que esqueci de adicionar um  id no form do html, então coloquei o id no form e peguei ele aqui






var url = "http://localhost:8083/usuarios/salvar";

form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário  
    const formData= new FormData(form);// Cria um objeto FormData com os dados do formulário
    console.log(formData);// Exibe os dados do formulário no console para depuração

    const response = await fetch(url, {// Envia os dados do formulário para o servidor usando fetch
        method: "POST",
        headers: {// Define o cabeçalho da requisição como JSON
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData))// Converte os dados do formulário em um objeto JSON e envia como corpo da requisição(json é um tipo de dado simples e leve, que é fácil de ler e escrever para humanos, e fácil de analisar e gerar para máquinas)

        
    });




    //REGRA PARA ARMAZENAR AS INFORMAÇÕES DO USUARIO ::::::::::::::::::
    if(response.ok){// Verifica se a resposta do servidor foi bem-sucedida
         const usuario = await response.json();
            console.log('Cadastro realizado com sucesso:', usuario);
const nomeDoNovoUsuario = usuario.nome || usuario.nomeUsuario;
const usuarioId = usuario.id||usuario.usuarioId;
//o true serve como um flag para indicar que é para guardar os novos dados 
localStorage.setItem('usuarioLogado',true);
localStorage.setItem('emailUsuario',usuario.email);
localStorage.setItem('nomeUsuario',nomeDoNovoUsuario);
localStorage.setItem('usuarioId',usuarioId);



         
        const msg = document.getElementById("saida");
        const cartaoinformativo=  document.getElementById("cartao-informativo");
        const sobreposicaotela=document.getElementById("sobreposicao-tela");

      msg.innerHTML = `<span class="marcador-boasvindas">👋<span><h3>Bem-vindo, ${limparInput(nomeDoNovoUsuario)}!</h3><br><p>Seu acesso a plataforma foi configurado com sucesso !</p><br>
      <button id="confirmar" onclick="window.location.href='minhaconta.html'">Começar</button>`;

      const ok=document.getElementById("confirmar");
  
      msg.querySelector('p').style.color="red";
      msg.querySelector('h3').style.color="black";
      
        cartaoinformativo.style.background="#fff";
        cartaoinformativo.style.padding="40px";
        cartaoinformativo.style.borderRadius= "20px";
        cartaoinformativo.style.textAlign= "center";
        cartaoinformativo.style.maxWidth= "380px";
        cartaoinformativo.style.width= "90%";
        cartaoinformativo.style.boxShadow= "0 15px 30px rgba(0,0,0,0.3)";
        cartaoinformativo.style.animation= "entradaSuave 0.4s cubic-bezier(0.68,-0.55,0.265,1.55) forwards";
     
         sobreposicaotela.style.position="fixed";
         sobreposicaotela.style.top="0";
         sobreposicaotela.style.left="0";
         sobreposicaotela.style.width="100%";
         sobreposicaotela.style.height="100%";
         sobreposicaotela.style.background="rgba(0,0,0,0.7)";
         sobreposicaotela.style.display="flex";
         sobreposicaotela.style.justifyContent="center";
         sobreposicaotela.style.alignItems="center";
         sobreposicaotela.style.zIndex="9999";
         sobreposicaotela.style.backdropFilter="blur(5px)";                                                     
         
         ok.style.background="blue";
         ok.style.color="white";
         ok.style.fontWeight="BOLD";
         ok.style.fontSize="18px";
         ok.style.borderRadius="10px";
         ok.style.cursor="pointer";
         ok.style.transition="background 0.3s ease, transform 0.3s ease";
         ok.style.padding="10px 20px";

    //     alert("Usuário cadastrado com sucesso!");// Exibe uma mensagem de sucesso para o usuário
    // console.log("Formulário enviado com sucesso!");
console.log("id do usuario cadastrado : " +usuarioId);

  
    
    }else{
        // alert("Erro ao enviar o formulário. Por favor, tente novamente.");
   const msg = document.getElementById("saida");
   const cartaoinformativo = document.getElementById("cartao-informativo");
   const sobreposicaotela = document.getElementById("sobreposicao-tela");


   msg.innerHTML =`<h3>Oh Não!</h3> <br> <p> Houve um erro inesperado para atender a sua requisição....</p> <br> <button id = "confirmar" onclick = "window.location.href=   'cadastro.html'">Tentar Novamente</button>
`;
const ok = document.getElementById("confirmar");
msg.querySelector('p').style.color="red";
msg.querySelector("h3").style.color="black";



cartaoinformativo.style.background="#fff";
        cartaoinformativo.style.padding="40px";
        cartaoinformativo.style.borderRadius= "20px";
        cartaoinformativo.style.textAlign= "center";
        cartaoinformativo.style.maxWidth= "380px";
        cartaoinformativo.style.width= "90%";
        cartaoinformativo.style.boxShadow= "0 15px 30px rgba(0,0,0,0.3)";
        cartaoinformativo.style.animation= "entradaSuave 0.4s cubic-bezier(0.68,-0.55,0.265,1.55) forwards";
     
         sobreposicaotela.style.position="fixed";
         sobreposicaotela.style.top="0";
         sobreposicaotela.style.left="0";
         sobreposicaotela.style.width="100%";
         sobreposicaotela.style.height="100%";
         sobreposicaotela.style.background="rgba(0,0,0,0.7)";
         sobreposicaotela.style.display="flex";
         sobreposicaotela.style.justifyContent="center";
         sobreposicaotela.style.alignItems="center";
         sobreposicaotela.style.zIndex="9999";
         sobreposicaotela.style.backdropFilter="blur(5px)";                                                     
         
         ok.style.background="blue";
         ok.style.color="white";
         ok.style.fontWeight="BOLD";
         ok.style.fontSize="18px";
         ok.style.borderRadius="10px";
         ok.style.cursor="pointer";
         ok.style.transition="background 0.3s ease, transform 0.3s ease";
         ok.style.padding="10px 20px";



    }

function limparInput(texto){
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}   
    

});

