const API_URL = "http://localhost:3000/pessoas";

// BUSCAR LISTA DE PESSOAS DO JSON SERVER
async function buscarDoJsonServer() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados do JSON Server.");
        }

        const dados = await resposta.json();
        exibirListaPessoas(dados);
    } catch (erro) {
        alert("Erro ao buscar dados: " + erro.message);
    }
}

// EXIBIR LISTA DE PESSOAS
function exibirListaPessoas(pessoas) {
    const lista = document.getElementById("lista-pessoas");
    lista.innerHTML = "";
    
    pessoas.forEach(pessoa => {
        const item = document.createElement("li");
        item.textContent = `${pessoa.nome} - ${pessoa.idade} anos - ${pessoa.cidade}, ${pessoa.estado}`;
        lista.appendChild(item);
    });
}

// BUSCAR UMA PESSOA ESPECÍFICA
function buscarPessoa() {
    const nomeBuscado = document.getElementById("buscar-nome").value.trim();
    if (!nomeBuscado) {
        alert("Digite um nome para buscar.");
        return;
    }

    fetch(API_URL)
        .then(resposta => resposta.json())
        .then(pessoas => {
            const pessoaEncontrada = pessoas.find(pessoa => pessoa.nome.toLowerCase() === nomeBuscado.toLowerCase());
            exibirDetalhesPessoa(pessoaEncontrada);
        })
        .catch(erro => alert("Erro ao buscar pessoa: " + erro.message));
}

// EXIBIR DETALHES DE UMA PESSOA
function exibirDetalhesPessoa(pessoa) {
    const detalhes = document.getElementById("detalhes-pessoa");
    detalhes.innerHTML = "";
    
    if (!pessoa) {
        detalhes.innerHTML = "<p>Pessoa não encontrada.</p>";
        return;
    }
    
    detalhes.innerHTML = `
        <p><strong>Nome:</strong> ${pessoa.nome}</p>
        <p><strong>Idade:</strong> ${pessoa.idade}</p>
        <p><strong>Estado:</strong> ${pessoa.estado}</p>
        <p><strong>Cidade:</strong> ${pessoa.cidade}</p>
        <p><strong>Documentos:</strong></p>
        <ul>
            ${pessoa.documentos.map(doc => `<li>${doc.tipo}: ${doc.numero}</li>`).join('')}
        </ul>
    `;
}


// VOLTAR PARA A PÁGINA PRINCIPAL
function voltarParaPaginaPrincipal() {
    window.location.href = "indice.html"; // Altere para o nome da sua página principal
}