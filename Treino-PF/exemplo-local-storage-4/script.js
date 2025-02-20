// Faça um código html e javascript para cadastrar uma pessoa com: nome, idade, estado, 
// cidade e documentos (cpf, rg e cnh). Quando o usuário escolher um estado, as cidades 
// daquele estado devem aparecer para que ele selecione uma. Os documentos, deve ter um 
// campo obrigatório de documento cpf, e para os outros deve haver um botão que ao clicar, 
// o usuário possa cadastrar mais outros documentos como rg e cnh.


const API_URL = "http://localhost:3000/pessoas";

const cidadesPorEstado = {
    SP: ["São Paulo", "Campinas", "Santos"],
    RJ: ["Rio de Janeiro", "Niterói", "Petrópolis"],
    MG: ["Belo Horizonte", "Uberlândia", "Juiz de Fora"]
};

function carregarCidades() {
    const estadoSelecionado = document.getElementById("estado").value;
    const cidadeSelect = document.getElementById("cidade");
    cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';

    if (estadoSelecionado) {
        cidadesPorEstado[estadoSelecionado].forEach(cidade => {
            const option = document.createElement("option");
            option.value = cidade;
            option.textContent = cidade;
            cidadeSelect.appendChild(option);
        });
    }
}

function adicionarDocumento() {
    const documentosDiv = document.getElementById("documentos");
    const novoDocumento = document.createElement("div");
    novoDocumento.classList.add("documento");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "RG ou CNH";
    
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.onclick = () => documentosDiv.removeChild(novoDocumento);

    novoDocumento.appendChild(input);
    novoDocumento.appendChild(botaoRemover);
    documentosDiv.appendChild(novoDocumento);
}

async function cadastrarPessoa() {
    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value.trim();
    const estado = document.getElementById("estado").value;
    const cidade = document.getElementById("cidade").value;
    const documentos = [];

    document.querySelectorAll("#documentos input").forEach(input => {
        if (input.value.trim()) {
            documentos.push(input.value.trim());
        }
    });

    if (!nome || !idade || !estado || !cidade || documentos.length === 0) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const pessoa = { nome, idade, estado, cidade, documentos };

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pessoa)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar a pessoa.");
        }

        alert("Cadastro realizado com sucesso!");
        document.getElementById("nome").value = "";
        document.getElementById("idade").value = "";
        document.getElementById("estado").value = "";
        document.getElementById("cidade").innerHTML = '<option value="">Selecione uma cidade</option>';
        document.getElementById("documentos").innerHTML = '<div class="documento"><input type="text" placeholder="CPF" required></div>';
    } catch (erro) {
        alert("Erro ao cadastrar: " + erro.message);
    }
}