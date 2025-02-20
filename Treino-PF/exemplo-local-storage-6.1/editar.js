const API_URL = "http://localhost:3000/pessoas";

// BUSCAR E LISTAR PESSOAS PARA EDIÇÃO
async function listarPessoasParaEdicao() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados do JSON Server.");
        }
        
        const pessoas = await resposta.json();
        exibirListaEdicao(pessoas);
    } catch (erro) {
        alert("Erro ao buscar dados: " + erro.message);
    }
}

// EXIBIR LISTA PARA EDIÇÃO
function exibirListaEdicao(pessoas) {
    const lista = document.getElementById("lista-pessoas");
    lista.innerHTML = "";
    
    pessoas.forEach(pessoa => {
        const item = document.createElement("li");
        item.textContent = `${pessoa.nome} - ${pessoa.idade} anos - ${pessoa.cidade}, ${pessoa.estado}`;
        
        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.onclick = () => carregarDadosParaEdicao(pessoa);
        
        item.appendChild(botaoEditar);
        lista.appendChild(item);
    });
}

// CARREGAR DADOS PARA O FORMULÁRIO DE EDIÇÃO
function carregarDadosParaEdicao(pessoa) {
    document.getElementById("pessoa-id").value = pessoa.id;
    document.getElementById("editar-nome").value = pessoa.nome;
    document.getElementById("editar-idade").value = pessoa.idade;
    document.getElementById("editar-estado").value = pessoa.estado;
    document.getElementById("editar-cidade").value = pessoa.cidade;
}

// SALVAR EDIÇÃO
async function salvarEdicao() {
    const id = document.getElementById("pessoa-id").value;
    const nome = document.getElementById("editar-nome").value.trim();
    const idade = document.getElementById("editar-idade").value.trim();
    const estado = document.getElementById("editar-estado").value.trim();
    const cidade = document.getElementById("editar-cidade").value.trim();

    if (!nome || !idade || !estado || !cidade) {
        alert("Preencha todos os campos!");
        return;
    }

    const pessoaAtualizada = { nome, idade, estado, cidade };

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pessoaAtualizada)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar dados.");
        }
        
        alert("Dados atualizados com sucesso!");
        listarPessoasParaEdicao();
    } catch (erro) {
        alert("Erro ao salvar edição: " + erro.message);
    }
}

// Carregar lista ao iniciar
listarPessoasParaEdicao();


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
