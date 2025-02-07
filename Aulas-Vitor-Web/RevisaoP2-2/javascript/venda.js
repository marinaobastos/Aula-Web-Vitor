document.addEventListener('DOMContentLoaded', async (ev) => {
    document.getElementById("oculta").style.display = "none";
    await carregaProdutos(document.getElementById("produto"));
    
    document.getElementById("vendedor")?.addEventListener('change', (ev2) => {
        const vlVendedor = document.getElementById("vendedor").value;
        if (vlVendedor != "") {
            document.getElementById("oculta").style.display = "block";
        } else {
            document.getElementById("oculta").style.display = "none";
        }
        ev.preventDefault();
    });

    document.getElementById("addProduto")?.addEventListener('click', (ev2) => {
        ev2.preventDefault();
        var form = new FormData(document.getElementById("formVenda"));
        adicionaProdutoTabela(form);
    });

    document.getElementById("finalizarCompra")?.addEventListener('click', (ev2) => {
        ev2.preventDefault();
        var form = new FormData(document.getElementById("formVenda"));
        finalizarCompras(form);
    });
});

async function finalizarCompras(dados) {
    try {
        var corpo = { vendedor: dados.get("vendedor"), produtos: produtosComprados, dataVenda: new Date() };
        const response = await fetch('http://localhost:3000/produtos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(corpo),
        });
        if (!response.ok) {
            throw new Error(`Erro ao finalizar venda: ${response.statusText}`);
        }
        alert("Venda finalizada com sucesso!");
    } catch (error) {
        console.error('Erro ao finalizar venda:', error);
    }
}

async function carregaProdutos(select) {
    try {
        const response = await fetch('http://localhost:3000/produtos/');
        if (!response.ok) {
            throw new Error(`Erro ao carregar produtos: ${response.statusText}`);
        }
        const data = await response.json();
        data.forEach((produto) => {
            var option = document.createElement("option");
            option.value = JSON.stringify(produto);
            option.textContent = produto.nome;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

let produtosComprados = [];
let varTotal = 0;

async function adicionaProdutoTabela(dados) {
    document.getElementById("tabelaProdutos")?.querySelectorAll("tbody").forEach((corpoTabela) => {
        var linha = document.createElement("tr");
        var obj = JSON.parse(dados.get("produto")?.toString() ?? "");
        var colunaNome = document.createElement("td");
        colunaNome.textContent = obj.nome;
        var quantidade = parseFloat(dados.get("quantidade")?.toString() ?? "0");
        var colunaQuantidade = document.createElement("td");
        colunaQuantidade.textContent = quantidade.toString().replace(".", ",");
        var valorProduto = obj.preco;
        var colunaValor = document.createElement("td");
        colunaValor.textContent = "R$" + parseFloat(valorProduto).toFixed(2).replace(".", ",");
        var colunaSubTotal = document.createElement("td");
        colunaSubTotal.textContent = "R$" + (valorProduto * quantidade).toFixed(2).replace(".", ",");
        varTotal += (valorProduto * quantidade);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaQuantidade);
        linha.appendChild(colunaValor);
        linha.appendChild(colunaSubTotal);
        corpoTabela.appendChild(linha);
        produtosComprados.push({ idProduto: obj.id, subTotal: (valorProduto * quantidade).toFixed(2), quantidade: quantidade });

        const totalCompraElement = document.getElementById("totalCompra");
        if (totalCompraElement) {
            totalCompraElement.textContent = "R$" + varTotal.toFixed(2).replace(".", ",");
        }
    });
}
