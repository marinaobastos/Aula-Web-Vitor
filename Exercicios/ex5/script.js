// Agora, pegue o código do exercício feito acima e incremente com o seguinte: Crie um 
// formulário, acima da listagem de produtos, que permita cadastrar um produto no servidor 
// (POST), ao clicar em Salvar. Acima do formulário, crie o botão Novo, que deve criar um 
// produto novo e limpar o formulário.

let produtoSelecionado = null;

async function carregarProdutos() {

    try {
        const resposta = await fetch('http://localhost:3000/produtos'); // Substituir pela URL correta
        const produtos = await resposta.json();
        const tabela = document.getElementById('tabela-produtos');

        tabela.innerHTML = '';

        produtos.forEach(produto => {

            const linha = document.createElement('tr');

            linha.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco}</td>
            `;

            linha.addEventListener('click', () => selecionarLinha(linha, produto));
            tabela.appendChild(linha);
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
    
    if (!nome || isNaN(preco)) return;
    
    try {

        const resposta = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, preco })
        });

        if (resposta.ok) {

            carregarProdutos();
            document.getElementById('form-produto').reset();
        }

    } catch (erro) {
        console.error('Erro ao cadastrar produto:', erro);
    }
}


function novoProduto() {
    document.getElementById('form-produto').reset();
}

document.getElementById('btn-novo').addEventListener('click', novoProduto);
document.getElementById('form-produto').addEventListener('submit', cadastrarProduto);
document.getElementById('btn-remover').addEventListener('click', removerProduto);
document.addEventListener('DOMContentLoaded', carregarProdutos);