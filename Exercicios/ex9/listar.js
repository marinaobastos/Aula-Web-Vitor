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
                <td>R$ ${produto.preco}</td>
                <td>${produto.fabricante}</td>
                <td>${produto.tipo_unidade}</td>
            `;
            tabela.appendChild(linha);
        });
    } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
    }
}

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
