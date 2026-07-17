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
    if(response.ok){// Verifica se a resposta do servidor foi bem-sucedida
        alert("Usuário cadastrado com sucesso!");// Exibe uma mensagem de sucesso para o usuário
    console.log("Formulário enviado com sucesso!");

    
    
    }else{
        alert("Erro ao enviar o formulário. Por favor, tente novamente.");
    }});