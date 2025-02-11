// Crie um arquivo produtos.html que carregue e exiba uma lisatgem dos produtos existentes
// no servidor, em uma tabela HTML

document.addEventListener("DOMContentLoaded", () => {

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

    carregarProdutos();

})