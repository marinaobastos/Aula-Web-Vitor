// Crie um arquivo produtos.html que carregue e exiba uma listagem dos 
// produtos existentes no servidor, em uma tabela HTML.

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

            tabela.appendChild(linha);
        });

    } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
    }
}

document.addEventListener('DOMContentLoaded', carregarProdutos);