let carrinho = [];
let totalVenda = 0;

// Carrega os produtos ao iniciar a página
document.addEventListener('DOMContentLoaded', async () => {
    await carregarMedicamentos();
});

// Função para carregar os produtos
async function carregarMedicamentos() {
    try {
        const response = await fetch(`${apiUrl}/produtos`);
        if (!response.ok) throw new Error('Erro ao carregar produtos');
        const produtos = await response.json();
        exibirMedicamentos(produtos);
        preencherFiltroFabricante(produtos);
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar produtos.');
    }
}

// Exibe os produtos na tabela
function exibirMedicamentos(produtos) {
    const listaMedicamentos = document.getElementById('lista_produtos');
    listaMedicamentos.innerHTML = '';

    produtos.forEach(produto => {
        let linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.fabricante}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td><input type="number" min="1" value="1" id="qtd-${produto.id}"></td>
            <td><button onclick="adicionarAoCarrinho(${produto.id}, '${produto.nome}', ${produto.preco})">Adicionar</button></td>
        `;
        listaMedicamentos.appendChild(linha);
    });
}

// Preenche o filtro de fabricantes
function preencherFiltroFabricante(produtos) {
    const filtroFabricante = document.getElementById('filtroFabricante');
    const fabricantesUnicos = [...new Set(produtos.map(produto => produto.fabricante))];
    fabricantesUnicos.forEach(fabricante => {
        let option = document.createElement('option');
        option.value = fabricante;
        option.textContent = fabricante;
        filtroFabricante.appendChild(option);
    });
}

// Adiciona um produto ao carrinho
function adicionarAoCarrinho(id, nome, preco) {
    const quantidade = parseInt(document.getElementById(`qtd-${id}`).value);
    if (quantidade <= 0) {
        alert("Quantidade inválida");
        return;
    }

    carrinho.push({ id, nome, preco, quantidade });
    totalVenda += preco * quantidade;
    atualizarCarrinho();
}

// Atualiza o carrinho
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('carrinho');
    listaCarrinho.innerHTML = '';

    carrinho.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.nome} - ${item.quantidade}x - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
        listaCarrinho.appendChild(li);
    });

    document.getElementById('totalVenda').textContent = totalVenda.toFixed(2);
}

// Finaliza a venda
async function finalizarVenda() {
    if (carrinho.length === 0) {
        alert("Adicione pelo menos um produto.");
        return;
    }

    const novaVenda = {
        data_venda: new Date().toISOString().split('T')[0],
        produtos: carrinho,
        vendedor: document.getElementById('vendedor').value,
        total: totalVenda
    };

    try {
        const response = await fetch(`${apiUrl}/vendas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaVenda)
        });

        if (!response.ok) throw new Error('Erro ao registrar venda');
        alert('Venda registrada com sucesso!');
        carrinho = [];
        totalVenda = 0;
        atualizarCarrinho();
    } catch (error) {
        console.error(error);
        alert('Erro ao registrar venda.');
    }
}