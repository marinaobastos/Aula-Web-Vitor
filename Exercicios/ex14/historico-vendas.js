const apiUrlMedicamentos = 'http://localhost:3000/medicamentos';
const apiURLVendas = 'http://localhost:3000/vendas';

document.addEventListener('DOMContentLoaded', async () => {
    await carregarMedicamentos();
    document.getElementById('buscarVendas').addEventListener('click', buscarVendas);
});

async function carregarMedicamentos() {
    try {
        const response = await fetch(apiUrlMedicamentos);
        const medicamentos = await response.json();
        
        const selectProduto = document.getElementById('produto');
        selectProduto.innerHTML = '<option value="">Selecione um produto</option>';

        medicamentos.forEach(produto => {
            let option = document.createElement('option');
            option.value = produto.id;
            option.textContent = produto.nome;
            selectProduto.appendChild(option);
        });

    } catch (error) {
        console.error('Erro ao carregar medicamentos:', error);
    }
}

async function buscarVendas() {
    const produtoId = document.getElementById('produto').value;

    if (!produtoId) {
        alert('Selecione um produto!');
        return;
    }
    
    try {
        const response = await fetch(apiURLVendas);
        const vendas = await response.json();

        const vendasFiltradas = vendas.filter(venda => 
            venda.produtos.some(p => p.id == produtoId)
        );
        
        const tabelaVendas = document.getElementById('listaVendas');
        tabelaVendas.innerHTML = '';
        
        vendasFiltradas.forEach(venda => {
            let produtoVenda = venda.produtos.find(p => p.id == produtoId);
            let linha = `<tr>
                <td>${venda.data_venda}</td>
                <td>${venda.vendedor}</td>
                <td>${produtoVenda.quantidade}</td>
            </tr>`;
            tabelaVendas.innerHTML += linha;
        });

    } catch (error) {
        console.error('Erro ao buscar vendas:', error);
    }
}
