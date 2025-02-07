let produtoSelecionado = null;
async function carregarProdutos() {
    try {
        const resposta = await fetch('http://localhost:3000/produtos'); // Substituir pela URL correta
        const produtos = await resposta.json();
        const tabela = document.getElementById('tabela-produtos');
        tabela.innerHTML = '';
        const nomeList = document.getElementById('nome-list');
        const precoList = document.getElementById('preco-list');
        const fabricanteList = document.getElementById('fabricante-list');
        
        produtos.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>${produto.fabricante}</td>
                <td>${produto.tipo_unidade}</td>
            `;
            linha.addEventListener('click', () => selecionarLinha(linha, produto));
            tabela.appendChild(linha);
            
            nomeList.innerHTML += `<option value="${produto.nome}">`;
            precoList.innerHTML += `<option value="${produto.preco}">`;
            fabricanteList.innerHTML += `<option value="${produto.fabricante}">`;
        });
    } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
    }
}

function selecionarLinha(linha, produto) {
    document.querySelectorAll('tr').forEach(tr => tr.classList.remove('selected'));
    linha.classList.add('selected');
    produtoSelecionado = produto;
    document.getElementById('btn-remover').disabled = false;
}

async function removerProduto() {
    if (!produtoSelecionado) return;
    try {
        await fetch(`http://localhost:3000/produtos/${produtoSelecionado.id}`, { method: 'DELETE' });
        document.querySelector('.selected').remove();
        produtoSelecionado = null;
        document.getElementById('btn-remover').disabled = true;
    } catch (erro) {
        console.error('Erro ao remover produto:', erro);
    }
}

async function cadastrarProduto(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const fabricante = document.getElementById('fabricante').value;
    const tipoUnidade = document.getElementById('tipo-unidade').value;
    
    if (!nome || isNaN(preco) || !fabricante || !tipoUnidade) return;
    
    try {
        const resposta = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, preco, fabricante, tipo_unidade: tipoUnidade })
        });
        if (resposta.ok) {
            carregarProdutos();
            document.getElementById('form-produto').reset();
        }
    } catch (erro) {
        console.error('Erro ao cadastrar produto:', erro);
    }
}

document.getElementById('form-produto').addEventListener('submit', cadastrarProduto);
document.getElementById('btn-remover').addEventListener('click', removerProduto);
document.addEventListener('DOMContentLoaded', carregarProdutos);