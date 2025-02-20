// Faça um código html e javascript para cadastrar uma pessoa com: nome, idade, estado, 
// cidade e documentos (cpf, rg e cnh). Quando o usuário escolher um estado, as cidades 
// daquele estado devem aparecer para que ele selecione uma. Os documentos, deve ter um 
// campo obrigatório de documento cpf, e para os outros deve haver um botão que ao clicar, 
// o usuário possa cadastrar mais outros documentos como rg e cnh.

// Ajuste o código fazendo a seguinte modificação: quando o usuário escolher cadastrar outro
// documento, ele deve selecionar qual tipo de documento ele deseja cadastrar (além do cpf 
// obrigatório): rg, cnh ou passaporte


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

    const select = document.createElement("select");
    select.innerHTML = `
        <option value="RG">RG</option>
        <option value="CNH">CNH</option>
        <option value="Passaporte">Passaporte</option>
    `;

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Número do documento";
    
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.onclick = () => documentosDiv.removeChild(novoDocumento);

    novoDocumento.appendChild(select);
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

    document.querySelectorAll("#documentos .documento").forEach(div => {
        const tipo = div.querySelector("select") ? div.querySelector("select").value : "CPF";
        const numero = div.querySelector("input").value.trim();
        if (numero) {
            documentos.push({ tipo, numero });
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
        document.getElementById("documentos").innerHTML = `
            <div class="documento">
                <label>CPF:</label>
                <input type="text" placeholder="CPF" required>
            </div>
        `;
    } catch (erro) {
        alert("Erro ao cadastrar: " + erro.message);
    }
}