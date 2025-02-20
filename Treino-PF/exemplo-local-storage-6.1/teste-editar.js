const API_URL = "http://localhost:3000/pessoas";

const cidadesPorEstado = {
    SP: ["São Paulo", "Campinas", "Santos"],
    RJ: ["Rio de Janeiro", "Niterói", "Petrópolis"],
    MG: ["Belo Horizonte", "Uberlândia", "Juiz de Fora"]
};

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
    carregarCidadesEdicao(pessoa.estado, pessoa.cidade);
    carregarDocumentosEdicao(pessoa.documentos);
}

// // CARREGAR CIDADES DINAMICAMENTE
// function carregarCidadesEdicao(estadoSelecionado, cidadeSelecionada) {
//     const cidadeSelect = document.getElementById("editar-cidade");
//     cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';

//     if (estadoSelecionado && cidadesPorEstado[estadoSelecionado]) {
//         cidadesPorEstado[estadoSelecionado].forEach(cidade => {
//             const option = document.createElement("option");
//             option.value = cidade;
//             option.textContent = cidade;
//             if (cidade === cidadeSelecionada) {
//                 option.selected = true;
//             }
//             cidadeSelect.appendChild(option);
//         });
//     }
// }


function carregarCidadesEdicao() {
    const estadoSelecionado = document.getElementById("editar-estado").value;
    const cidadeSelect = document.getElementById("editar-cidade");
    cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
    
    if (estadoSelecionado && cidadesPorEstado[estadoSelecionado]) {
        cidadesPorEstado[estadoSelecionado].forEach(cidade => {
            const option = document.createElement("option");
            option.value = cidade;
            option.textContent = cidade;
            cidadeSelect.appendChild(option);
        });
    }
}


// CARREGAR DOCUMENTOS PARA EDIÇÃO
function carregarDocumentosEdicao(documentos) {
    const documentosDiv = document.getElementById("editar-documentos");
    documentosDiv.innerHTML = "";
    
    documentos.forEach(doc => {
        const documentoDiv = document.createElement("div");
        documentoDiv.classList.add("documento");
        
        const select = document.createElement("select");
        select.innerHTML = `
            <option value="RG" ${doc.tipo === "RG" ? "selected" : ""}>RG</option>
            <option value="CNH" ${doc.tipo === "CNH" ? "selected" : ""}>CNH</option>
            <option value="Passaporte" ${doc.tipo === "Passaporte" ? "selected" : ""}>Passaporte</option>
        `;

        const input = document.createElement("input");
        input.type = "text";
        input.value = doc.numero;

        documentoDiv.appendChild(select);
        documentoDiv.appendChild(input);
        documentosDiv.appendChild(documentoDiv);
    });
}

// SALVAR EDIÇÃO
async function salvarEdicao() {
    const id = document.getElementById("pessoa-id").value;
    const nome = document.getElementById("editar-nome").value.trim();
    const idade = document.getElementById("editar-idade").value.trim();
    const estado = document.getElementById("editar-estado").value;
    const cidade = document.getElementById("editar-cidade").value;
    const documentos = [];

    document.querySelectorAll("#editar-documentos .documento").forEach(div => {
        const tipo = div.querySelector("select").value;
        const numero = div.querySelector("input").value.trim();
        if (numero) {
            documentos.push({ tipo, numero });
        }
    });

    if (!nome || !idade || !estado || !cidade || documentos.length === 0) {
        alert("Preencha todos os campos!");
        return;
    }

    const pessoaAtualizada = { nome, idade, estado, cidade, documentos };

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
