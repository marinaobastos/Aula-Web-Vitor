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
            botaoEditar.setAttribute("id", 'editarBtn');
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


// Exemplo de como chamar a função ao clicar no botão de editar
document.getElementById("editarBtn").addEventListener("click", function() {
    const index = this.dataset.index; // Certifique-se de que o índice está correto
    editarPessoa(index);
});