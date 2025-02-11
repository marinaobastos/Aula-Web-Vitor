// Carrega os produtos ao iniciar a página
document.addEventListener('DOMContentLoaded', async () => {
    await carregarProdutosConsulta();
});

// Carrega os produtos para o select de consulta
async function carregarProdutosConsulta() {
    try {
        const response = await fetch(`${apiUrl}/produtos`);
        if (!response.ok) throw new Error('Erro ao carregar produtos');
        const produtos = await response.json();
        const select = document.getElementById('produtoConsulta');
        produtos.forEach(produto => {
            let option = document.createElement('option');
            option.value = produto.id;
            option.textContent = produto.nome;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar produtos.');
    }
}

// Consulta as vendas de um produto
async function consultarVendas() {
    const produtoId = document.getElementById('produtoConsulta').value;
    try {
        const response = await fetch(`${apiUrl}/vendas`);
        if (!response.ok) throw new Error('Erro ao carregar vendas');
        const vendas = await response.json();
        const vendasFiltradas = vendas.filter(venda => 
            venda.produtos.some(produto => produto.id === produtoId)
        );
        exibirVendas(vendasFiltradas);
    } catch (error) {
        console.error(error);
        alert('Erro ao consultar vendas.');
    }
}

// Exibe as vendas na tabela
function exibirVendas(vendas) {
    const listaVendas = document.getElementById('lista_vendas');
    listaVendas.innerHTML = '';

    vendas.forEach(venda => {
        const produto = venda.produtos.find(p => p.id === produtoId);
        let linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${venda.data_venda}</td>
            <td>${venda.vendedor}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${(produto.preco * produto.quantidade).toFixed(2)}</td>
        `;
        listaVendas.appendChild(linha);
    });
}