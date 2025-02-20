const API_URL = "http://localhost:3000/pessoas";

// BUSCAR E LISTAR PESSOAS PARA REMOÇÃO
async function listarPessoasParaRemocao() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados do JSON Server.");
        }
        
        const pessoas = await resposta.json();
        exibirListaRemocao(pessoas);
    } catch (erro) {
        alert("Erro ao buscar dados: " + erro.message);
    }
}

// EXIBIR LISTA PARA REMOÇÃO
function exibirListaRemocao(pessoas) {
    const lista = document.getElementById("lista-pessoas");
    lista.innerHTML = "";
    
    pessoas.forEach(pessoa => {
        const item = document.createElement("li");
        item.textContent = `${pessoa.nome} - ${pessoa.idade} anos - ${pessoa.cidade}, ${pessoa.estado}`;
        
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = () => removerPessoa(pessoa.id);
        
        item.appendChild(botaoRemover);
        lista.appendChild(item);
    });
}

// REMOVER PESSOA
async function removerPessoa(id) {
    if (!confirm("Tem certeza que deseja remover esta pessoa?")) return;
    
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao remover a pessoa.");
        }
        
        alert("Pessoa removida com sucesso!");
        listarPessoasParaRemocao();
    } catch (erro) {
        alert("Erro ao remover: " + erro.message);
    }
}

// Carregar lista ao iniciar
listarPessoasParaRemocao();


// ATUALIZAR LOCAL STORAGE
async function atualizarLocalStorage() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados para atualização do Local Storage.");
        }
        
        const pessoas = await resposta.json();
        localStorage.setItem("pessoas", JSON.stringify(pessoas));
        alert("Local Storage atualizado com sucesso!");
    } catch (erro) {
        alert("Erro ao atualizar Local Storage: " + erro.message);
    }
}


// ADICIONAR BOTÃO PARA ATUALIZAR LOCAL STORAGE
const botaoAtualizar = document.createElement("button");
botaoAtualizar.textContent = "Atualizar Local Storage";
botaoAtualizar.onclick = atualizarLocalStorage;
document.body.appendChild(botaoAtualizar);


// VOLTAR PARA A PÁGINA PRINCIPAL
function voltarParaPaginaPrincipal() {
    window.location.href = "indice.html"; // Altere para o nome da sua página principal
}