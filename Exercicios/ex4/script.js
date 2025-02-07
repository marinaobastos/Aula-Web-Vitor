// Agora, pegue o código do exercício feito acima e incremente com o seguinte: Modifique a listagem de 
// produtos para permitir a seleção de uma linha, utilizando CSS e o evento de clique.  Crie um botão 
// Remover que permita remover o produto selecionado da tabela e do servidor (DELETE). 

let produtoSelecionado = null;

async function carregarProdutos() {

    try {
        const resposta = await fetch('http://localhost:3000/produtos'); // Substituir pela URL correta
        const produtos = await resposta.json();
        const tabela = document.getElementById('tabela-produtos');
        
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
        await fetch(`http://localhost:3000/produtos${produtoSelecionado.id}`, { method: 'DELETE' });

        document.querySelector('.selected').remove();

        produtoSelecionado = null;

        document.getElementById('btn-remover').disabled = true;

    } catch (erro) {
        console.error('Erro ao remover produto:', erro);
    }
}

document.getElementById('btn-remover').addEventListener('click', removerProduto);
document.addEventListener('DOMContentLoaded', carregarProdutos);
