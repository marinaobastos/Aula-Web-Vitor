// Crie um arquivo produtos.html que carregue e exiba uma lisatgem dos produtos existentes
// no servidor, em uma tabela HTML

// Modifique a listagem de produtos para permitir a seleção de uma linha, utilizando CSS e o 
// evento de clique. Crie um botão Remover que permita remover o produto selecionado da tabela 
// e do servidor (DELETE).

document.addEventListener("DOMContentLoaded", () => {

    // Com a adição do DELETE
    let produtoSelecionado = null;
    // ----------------------

    async function carregarProdutos() {

        try {

            let resposta = await fetch('http://localhost:3000/produtos');

            if(!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}.`);
            }
            
            let produtos = await resposta.json();
            console.log(produtos); // Verifica se os dados foram recebidos corretamente

            let tabela = document.getElementById('tabela-produtos');

            if(!tabela) {
                console.error("Elemento 'tabela-produtos' não encontrado no HTML.");
                return;
            }

            tabela.innerHTML = produtos.map( produto => `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.preco}</td>
                    <td>${produto.cor}</td>
                </tr>
            `).join('');
            // join -> junta as tags escritas acima em uma única string sem separadores

        } catch(erro) {
            console.error('Erro ao carregar produtos: ', erro);
        }
    }

    // Com a adição do DELETE
    function selecionarProduto(linha) {

        if(produtoSelecionado == true) {
            produtoSelecionado.classList.remove('selected');
        }

        produtoSelecionado = linha; // produto selecionado recebe a linha one este produto se encontra
        linha.classList.add('selected');

        document.getElementById('botao-remover').disable = false;
    }

    
    async function removerProduto() {

        //if(!produtoSelecionado) return;

        let id = produtoSelecionado.getAttribute('data-id');

        try {
            
            await fetch(`http://localhost:3000/produtos/${id}`, {method: 'DELETE'});

            produtoSelecionado.remove();
            produtoSelecionado = null;

            document.getElementById('botao-remover').disabled = true;

        } catch(erro) {
            console.error('Erro ao remover produto: ', erro);
        }
    }

    document.getElementById('botao-remover').addEventListener('click', removerProduto);
    // ----------------------

    carregarProdutos();

})