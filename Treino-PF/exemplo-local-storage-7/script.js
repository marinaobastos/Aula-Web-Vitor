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


// !!!!!!!!!!!!!!!!!   COM ERRO   !!!!!!!!!!!!!!!!!!!!!!!!



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

    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
    pessoas.push(pessoa);
    localStorage.setItem("pessoas", JSON.stringify(pessoas));

    alert("Pessoa cadastrada no Local Storage!");
    listarPessoas();
    limparFormulario();
}

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
        listarPessoas();
    } catch (erro) {
        alert("Erro ao enviar os dados: " + erro.message);
    }
}

async function buscarDoJsonServer() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error("Erro ao buscar dados do JSON Server.");

        const dados = await resposta.json();
        localStorage.setItem("pessoas", JSON.stringify(dados));
        alert("Dados do JSON Server armazenados no Local Storage!");
        listarPessoas();
    } catch (erro) {
        alert("Erro ao buscar dados: " + erro.message);
    }
}

function listarPessoas() {
    const lista = document.getElementById("listaCadastros");
    lista.innerHTML = "";
    const pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

    pessoas.forEach((pessoa, index) => {
        lista.innerHTML += `
            <div class="item">
                <strong>${pessoa.nome}</strong> - ${pessoa.idade} anos - ${pessoa.estado}, ${pessoa.cidade}
                <button onclick="editarPessoa(${index})">Editar</button>
                <button onclick="excluirPessoa(${index})">Excluir</button>
            </div>
        `;
    });
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



// aqui
// async function editarPessoa(index) {

//     let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
//     const pessoa = pessoas[index];

//     document.getElementById("nome").value = pessoa.nome;
//     document.getElementById("idade").value = pessoa.idade;
//     document.getElementById("estado").value = pessoa.estado;
//     carregarCidades();
//     document.getElementById("cidade").value = pessoa.cidade;

//     const documentosDiv = document.getElementById("documentos");
//     documentosDiv.innerHTML = "";

//     // Adiciona o CPF (obrigatório)
//     const cpfDocumento = document.createElement("div");
//     cpfDocumento.classList.add("documento");
//     cpfDocumento.innerHTML = `
//         <label for="cpf">CPF:</label>
//         <input type="text" id="cpf" name="cpf" value="${pessoa.documentos.find(doc => doc.tipo === 'CPF')?.numero || ''}" required>
//     `;
//     documentosDiv.appendChild(cpfDocumento);

//     // Adiciona outros documentos (RG, CNH, Passaporte)
//     pessoa.documentos.forEach((doc, docIndex) => {
//         if (doc.tipo !== "CPF") {
//             const novoDocumento = document.createElement("div");
//             novoDocumento.classList.add("documento");

//             const select = document.createElement("select");
//             select.id = `tipoDocumento-${docIndex}`;
//             select.name = `tipoDocumento-${docIndex}`;
//             select.innerHTML = `
//                 <option value="RG" ${doc.tipo === "RG" ? "selected" : ""}>RG</option>
//                 <option value="CNH" ${doc.tipo === "CNH" ? "selected" : ""}>CNH</option>
//                 <option value="Passaporte" ${doc.tipo === "Passaporte" ? "selected" : ""}>Passaporte</option>
//             `;


//             const labelDocumento = document.createElement("label");
//             labelDocumento.setAttribute("for", `numeroDocumento-${docIndex}`);
//             labelDocumento.textContent = "Número do Documento:";


//             const input = document.createElement("input");
//             input.type = "text";
//             input.id = `numeroDocumento-${docIndex}`;
//             input.name = `numeroDocumento-${docIndex}`;
//             input.value = doc.numero;

//             const botaoRemover = document.createElement("button");
//             botaoRemover.textContent = "Remover";
//             botaoRemover.onclick = () => documentosDiv.removeChild(novoDocumento);

//             novoDocumento.appendChild(select);
//             novoDocumento.appendChild(labelDocumento);
//             novoDocumento.appendChild(input);
//             novoDocumento.appendChild(botaoRemover);
//             documentosDiv.appendChild(novoDocumento);

//         }
//     });

//     document.getElementById("editIndex").value = index;
// }


async function editarPessoa(index) {

    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

    const pessoa = pessoas[index];

    // Verifica se a pessoa foi encontrada
    if (!pessoa) {
        alert("Pessoa não encontrada.");
        return;
    }

    // Preenche os campos do formulário
    document.getElementById("nome").value = pessoa.nome;
    document.getElementById("idade").value = pessoa.idade;
    document.getElementById("estado").value = pessoa.estado;
    carregarCidades(); // Esta função deve carregar as cidades de acordo com o estado
    document.getElementById("cidade").value = pessoa.cidade;

    const documentosDiv = document.getElementById("documentos");
    documentosDiv.innerHTML = ""; // Limpa os documentos antes de adicionar novos

    // Adiciona o CPF (obrigatório)
    const cpfDocumento = document.createElement("div");
    cpfDocumento.classList.add("documento");
    cpfDocumento.innerHTML = `
        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" name="cpf" value="${pessoa.documentos.find(doc => doc.tipo === 'CPF')?.numero || ''}" required>
    `;
    documentosDiv.appendChild(cpfDocumento);

    // Adiciona outros documentos (RG, CNH, Passaporte)
    pessoa.documentos.forEach((doc, docIndex) => {

        if (doc.tipo !== "CPF") {
            const novoDocumento = document.createElement("div");
            novoDocumento.classList.add("documento");

            const select = document.createElement("select");
            select.id = `tipoDocumento-${docIndex}`;
            select.name = `tipoDocumento-${docIndex}`;
            select.innerHTML = `
                <option value="RG" ${doc.tipo === "RG" ? "selected" : ""}>RG</option>
                <option value="CNH" ${doc.tipo === "CNH" ? "selected" : ""}>CNH</option>
                <option value="Passaporte" ${doc.tipo === "Passaporte" ? "selected" : ""}>Passaporte</option>
            `;

            const labelDocumento = document.createElement("label");
            labelDocumento.setAttribute("for", `numeroDocumento-${docIndex}`);
            labelDocumento.textContent = "Número do Documento:";

            const input = document.createElement("input");
            input.type = "text";
            input.id = `numeroDocumento-${docIndex}`;
            input.name = `numeroDocumento-${docIndex}`;
            input.value = doc.numero;

            const botaoEditar = document.createElement("button");
            botaoEditar.setAttribute("class", 'editar_btn');
            botaoEditar.textContent = "Editar";
            botaoEditar.onclick = () => documentosDiv.removeChild(novoDocumento);

            novoDocumento.appendChild(select);
            novoDocumento.appendChild(labelDocumento);
            novoDocumento.appendChild(input);
            novoDocumento.appendChild(botaoEditar);
            documentosDiv.appendChild(novoDocumento);
        }
    });

    // Define o índice para referência futura ao salvar ou editar
    document.getElementById("editIndex").value = index;
}


const botoesEditar = document.querySelectorAll('.editar_btn');

botoesEditar.forEach((botao) => {

    botao.addEventListener("click", function() {

        const index = this.dataset.index; // Certifique-se de que o índice está correto
        editarPessoa(index);
    })
    

});


// // Exemplo de como chamar a função ao clicar no botão de editar
// document.getElementsByClassName("editarBtn").addEventListener("click", function() {
//     const index = this.dataset.index; // Certifique-se de que o índice está correto
//     editarPessoa(index);
// });




function salvarAlteracoes() {
    const index = document.getElementById("editIndex").value;
    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
    
    const pessoa = pessoas[index];

    // Atualiza os dados básicos
    pessoa.nome = document.getElementById("nome").value;
    pessoa.idade = document.getElementById("idade").value;
    pessoa.estado = document.getElementById("estado").value;
    pessoa.cidade = document.getElementById("cidade").value;

    // Atualiza os documentos
    pessoa.documentos = [];
    // CPF
    pessoa.documentos.push({ tipo: 'CPF', numero: document.getElementById("cpf").value });
    // Outros documentos (RG, CNH, Passaporte)
    const documentoElements = document.querySelectorAll(".documento");
    documentoElements.forEach((docElement, index) => {
        const tipo = docElement.querySelector("select").value;
        const numero = docElement.querySelector("input").value;
        pessoa.documentos.push({ tipo, numero });
    });

    // Atualiza o localStorage com os dados modificados
    pessoas[index] = pessoa;
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
    alert("Dados atualizados com sucesso!");
    listarPessoas(); // Atualize a lista de pessoas na página, se necessário.
}



// Função para salvar as alterações
function salvarEdicao(event) {
    event.preventDefault();
    
    const index = document.getElementById("editIndex").value;
    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
    
    // Coleta os dados básicos
    const pessoaEditada = {
        nome: document.getElementById("nome").value,
        idade: document.getElementById("idade").value,
        estado: document.getElementById("estado").value,
        cidade: document.getElementById("cidade").value,
        documentos: []
    };

    // Coleta o CPF
    const cpf = document.getElementById("cpf").value;
    pessoaEditada.documentos.push({
        tipo: "CPF",
        numero: cpf
    });

    // Coleta outros documentos
    const documentosDiv = document.getElementById("documentos");
    const documentosDivs = documentosDiv.querySelectorAll(".documento:not(:first-child)");
    
    documentosDivs.forEach((docDiv, index) => {
        const tipo = docDiv.querySelector("select").value;
        const numero = docDiv.querySelector("input[type='text']").value;
        
        if (tipo && numero) {
            pessoaEditada.documentos.push({
                tipo: tipo,
                numero: numero
            });
        }
    });

    // Atualiza o array de pessoas
    pessoas[index] = pessoaEditada;
    
    // Salva no localStorage
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
    
    alert("Pessoa atualizada com sucesso!");
    
    // Opcional: redirecionar para a lista de pessoas ou limpar o formulário
    window.location.href = "lista.html"; // Ajuste o caminho conforme necessário
}




async function excluirPessoa(index) {
    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
    const pessoa = pessoas[index];

    const confirmacao = confirm(`Deseja excluir ${pessoa.nome}?`);
    if (!confirmacao) return;

    pessoas.splice(index, 1);
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
    listarPessoas();

    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error("Erro ao buscar dados do JSON Server.");

        const dados = await resposta.json();
        const pessoaNoServidor = dados.find(p => p.nome === pessoa.nome && p.idade == pessoa.idade);

        if (pessoaNoServidor) {
            await fetch(`${API_URL}/${pessoaNoServidor.id}`, {
                method: "DELETE",
            });
        }

        alert("Pessoa excluída com sucesso!");
    } catch (erro) {
        alert("Erro ao excluir do JSON Server: " + erro.message);
    }
}



listarPessoas();