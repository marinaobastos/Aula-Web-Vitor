// Crie uma aplicação web simples para gerenciar uma lista de produtos utilizando Local Storage.

// Requisitos:
// Cadastro de Produto: O usuário pode inserir um nome e um preço para o produto.
// Leitura dos Produtos: Exibir a lista de produtos cadastrados.
// Atualização: O usuário pode editar o nome e o preço de um produto.
// Remoção: O usuário pode excluir um produto da lista.
// Persistência: Os dados devem ser armazenados e recuperados do Local Storage.
// Uso de Fetch (Simulado): O código deve usar fetch para simular uma requisição assíncrona ao Local Storage.


const LOCAL_STORAGE_KEY = "produtos";

// O que a função getProdutos faz é buscar a lista de produtos do localStorage
async function getProdutos() {

    return new Promise(resolve => {

        setTimeout(() => {
            // localStorage.getItem(LOCAL_STORAGE_KEY) recupera a string armazenada no localStorage sob a chave definida em LOCAL_STORAGE_KEY.
            resolve(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
            // Se não houver nenhum item armazenado (null), a função retorna uma lista vazia ([]).
        }, 300);
    });
}


async function salvarProdutos(produtos) {

    return new Promise(resolve => {

        setTimeout(() => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(produtos));
            resolve();
        }, 300);
    });
}


async function adicionarProduto() {

    const nome = document.getElementById("nome").value.trim();
    const preco = document.getElementById("preco").value.trim();

    if (!nome || !preco) return alert("Preencha os campos!");

    const produtos = await getProdutos();
    produtos.push({ id: Date.now(), nome, preco });

    await salvarProdutos(produtos);
    renderizarLista();
}


async function removerProduto(id) {

    let produtos = await getProdutos();
    produtos = produtos.filter(p => p.id !== id);
    await salvarProdutos(produtos);
    renderizarLista();
}


async function editarProduto(id) {

    let produtos = await getProdutos();
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    const novoNome = prompt("Novo nome:", produto.nome);
    const novoPreco = prompt("Novo preço:", produto.preco);

    if (novoNome && novoPreco) {
        produto.nome = novoNome;
        produto.preco = novoPreco;
        await salvarProdutos(produtos);
        renderizarLista();
    }
}


async function renderizarLista() {
    
    const produtos = await getProdutos();
    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = "";

    produtos.forEach(produto => {
        const li = document.createElement("li");
        li.innerHTML = `${produto.nome} - R$${produto.preco} 
            <button onclick="editarProduto(${produto.id})">Editar</button>
            <button onclick="removerProduto(${produto.id})">Excluir</button>`;
        lista.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", renderizarLista);