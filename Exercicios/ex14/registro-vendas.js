const apiUrlMedicamentos = 'http://localhost:3000/medicamentos';
const apiURLVendas = 'http://localhost:3000/vendas';

let carrinho = [];
let totalVenda = 0;

// Carrega os medicamentos ao iniciar a página
document.addEventListener('DOMContentLoaded', async () => {

    await carregarMedicamentos();

});


// Função para carregar os medicamentos da API
async function carregarMedicamentos() {

    try {

        let response = await fetch(apiUrlMedicamentos);

        //if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`);
        let medicamento = await response.json();

        exibirMedicamentos(medicamento);
        preencherFiltroFabricante(medicamento);

    } catch (error) {
        console.error('Erro ao carregar os remédios:', error);
        //alert('Não foi possível carregar os medicamentos. Tente novamente mais tarde.');
    }
}


// Exibe os medicamentos na tabela
function exibirMedicamentos(produtos) {

    let listaMedicamentos = document.getElementById('lista_produtos');
    listaMedicamentos.innerHTML = '';

    produtos.forEach(produto => {

        let linha = document.createElement('tr');
        
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.fabricante}</td>
            <td>R$ ${produto.preco}</td>
            <td><input type="number" min="1" value="1" id="qtd-${produto.id}" onchange="atualizarQuantidadeNoCarrinho(${produto.id}, this.value)"></td>
            <td><button onclick="adicionarAoCarrinho(${produto.id}, '${produto.nome}', ${produto.preco})">Adicionar</button></td>
        `;

        listaMedicamentos.appendChild(linha);
    });
}

// Preenche o filtro de fabricantes
function preencherFiltroFabricante(produtos) {

    let filtroFabricante = document.getElementById('filtro_fabricante');

    let fabricantesUnicos = [...new Set(produtos.map(produto => produto.fabricante))]; // Remove duplicatas

    fabricantesUnicos.forEach(fabricante => {

        let option = document.createElement('option');
        option.value = fabricante;
        option.textContent = fabricante;
        filtroFabricante.appendChild(option);
    });
}


// Filtra os produtos por nome e fabricante
async function filtrarMedicamentos() { 

    let filtroNome = document.getElementById('filtro_nome').value.toLowerCase();
    let filtroFabricante = document.getElementById('filtro_fabricante').value;

    try {
        const response = await fetch(apiUrlMedicamentos);

        //if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`);

        const medicamentos = await response.json();

        const medicamentosFiltrados = medicamentos.filter(produto => {

            let nomeMatch = produto.nome.toLowerCase().includes(filtroNome);
            let fabricanteMatch = filtroFabricante === "" || produto.fabricante === filtroFabricante;

            return nomeMatch && fabricanteMatch;
        });

        exibirMedicamentos(medicamentosFiltrados);

    } catch (error) {
        console.error('Erro ao filtrar produtos:', error);
        //alert('Não foi possível filtrar os produtos. Tente novamente mais tarde.');
    }
}


// Adiciona um produto ao carrinho
function adicionarAoCarrinho(id, nome, preco) {

    let quantidade = parseInt(document.getElementById(`qtd-${id}`).value);

    if (quantidade <= 0) {
        alert("Quantidade inválida");
        return;
    }

    carrinho.push({ id, nome, preco, quantidade });
    totalVenda += preco * quantidade;
    atualizarCarrinho();
}


// Atualiza a quantidade de um produto no carrinho
function atualizarQuantidadeNoCarrinho(id, novaQuantidade) {

    let  item = carrinho.find(item => item.id === id);

    if (item) {
        totalVenda -= item.preco * item.quantidade; // Remove o valor antigo
        item.quantidade = parseInt(novaQuantidade);
        totalVenda += item.preco * item.quantidade; // Adiciona o novo valor

        atualizarCarrinho();
    }
}


// Atualiza a exibição do carrinho
function atualizarCarrinho() {

    let listaCarrinho = document.getElementById('carrinho');
    listaCarrinho.innerHTML = '';

    carrinho.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.nome} - ${item.quantidade}x - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
        listaCarrinho.appendChild(li);
    });

    document.getElementById('total_venda').textContent = totalVenda.toFixed(2);
}


// Finaliza a venda
// async function finalizarVenda() {

//     if (carrinho.length === 0) {
//         alert("Adicione pelo menos um produto antes de finalizar a venda.");
//         return;
//     }

//     let novaVenda = {
//         data_venda: new Date().toISOString().split('T')[0],
//         produtos: carrinho,
//         vendedor: document.getElementById('vendedor').value,
//         total: totalVenda
//     };

//     try {

//         const response = await fetch(apiURLVendas, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(novaVenda)
//         });

//         if (!response.ok) throw new Error('Erro ao registrar venda');

//         alert('Venda registrada com sucesso!');
//         carrinho = [];
//         totalVenda = 0;
//         atualizarCarrinho();
//         limparFiltros();

//     } catch (error) {
//         console.error(error);
//         //alert('Erro ao registrar venda.');
//     }
// }


async function finalizarVenda() {
    if (listaProdutosVenda.length === 0) {
        alert("Adicione pelo menos um produto antes de finalizar a venda.");
        return;
    }

    const vendedor = document.getElementById("vendedor").value;
    const dataVenda = new Date().toISOString().split("T")[0];

    const novaVenda = {
        data_venda: dataVenda,
        vendedor,
        produtos: listaProdutosVenda,
        total: totalVenda
    };

    try {
        const response = await fetch(apiURLVendas, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaVenda)
        });

        if (!response.ok) throw new Error("Erro ao registrar venda");

        alert("Venda registrada com sucesso!");
        listaProdutosVenda.length = 0; // Limpa a lista de produtos
        totalVenda = 0;
        atualizarTotalVenda();
    } catch (error) {
        console.error(error);
        alert("Erro ao registrar venda.");
    }
}


// Limpa os filtros
function limparFiltros() {
    document.getElementById('filtroNome').value = '';
    document.getElementById('filtroFabricante').value = '';
}