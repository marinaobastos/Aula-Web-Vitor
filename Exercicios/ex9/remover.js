let produtoSelecionado = null;

async function carregarProdutos() {
    try {
        const resposta = await fetch('http://localhost:3000/produtos'); // API fictícia
        const produtos = await resposta.json();
        const tabela = document.getElementById('tabela-produtos');
        tabela.innerHTML = '';

        produtos.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>${produto.fabricante}</td>
                <td>${produto.tipo_unidade}</td>
            `;
            linha.addEventListener('click', () => selecionarProduto(linha, produto));
            tabela.appendChild(linha);
        });
    } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
    }
}

function selecionarProduto(linha, produto) {
    document.querySelectorAll('tr').forEach(tr => tr.classList.remove('selected'));
    linha.classList.add('selected');
    produtoSelecionado = produto;
    document.getElementById('btn-remover').disabled = false;
}

async function removerProduto() {
    if (!produtoSelecionado) return;

    const confirmacao = confirm(`Tem certeza que deseja remover "${produtoSelecionado.nome}"?`);
    if (!confirmacao) return;

    try {
        await fetch(`http://localhost:3000/produtos/${produtoSelecionado.id}`, {
            method: 'DELETE'
        });

        alert('Produto removido com sucesso!');
        carregarProdutos();
    } catch (erro) {
        console.error('Erro ao remover produto:', erro);
    }
}

document.getElementById('btn-remover').addEventListener('click', removerProduto);
document.getElementById('filtro').addEventListener('input', filtrarProdutos);

function filtrarProdutos() {
    const termo = document.getElementById('filtro').value.toLowerCase();
    document.querySelectorAll('#tabela-produtos tr').forEach(linha => {
        const texto = linha.innerText.toLowerCase();
        linha.style.display = texto.includes(termo) ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', carregarProdutos);
document.addEventListener('keydown', event => {
    if (event.key === 'F3') {
        event.preventDefault();
        document.getElementById('filtro').focus();
    }
});
