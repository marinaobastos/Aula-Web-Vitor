// Faça um código html e javascript para cadastrar uma pessoa com: nome, idade, estado, 
// cidade e documentos (cpf, rg e cnh). Quando o usuário escolher um estado, as cidades 
// daquele estado devem aparecer para que ele selecione uma. Os documentos, deve ter um 
// campo obrigatório de documento cpf, e para os outros deve haver um botão que ao clicar, 
// o usuário possa cadastrar mais outros documentos como rg e cnh.

// Ajuste o código fazendo a seguinte modificação: quando o usuário escolher cadastrar outro
// documento, ele deve selecionar qual tipo de documento ele deseja cadastrar (além do cpf 
// obrigatório): rg, cnh ou passaporte

// Agora, incremente o código salvando estes dados no local storage, com um botão que envie 
// estes dados para o json server e os traga de volta. Isto é, um botão para enviar os dados 
// cadastrados no local storage para o json server, e outro botão que pegue estes dados do 
// json server e armazene no local storage.

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

function cadastrarPessoa() {
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

    // Salvar no Local Storage
    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
    pessoas.push(pessoa);
    localStorage.setItem("pessoas", JSON.stringify(pessoas));

    alert("Pessoa cadastrada no Local Storage!");

    limparFormulario();
}

//
async function enviarParaJsonServer() {
    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

    if (pessoas.length === 0) {
        alert("Não há dados no Local Storage para enviar.");
        return;
    }

    try {
        for (let pessoa of pessoas) {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pessoa)
            });
        }

        alert("Dados enviados para o JSON Server!");
        localStorage.removeItem("pessoas");
    } catch (erro) {
        alert("Erro ao enviar os dados: " + erro.message);
    }
}

//
async function buscarDoJsonServer() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados do JSON Server.");
        }

        const dados = await resposta.json();
        localStorage.setItem("pessoas", JSON.stringify(dados));
        alert("Dados do JSON Server armazenados no Local Storage!");
    } catch (erro) {
        alert("Erro ao buscar dados: " + erro.message);
    }
}

function limparFormulario() {
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
}