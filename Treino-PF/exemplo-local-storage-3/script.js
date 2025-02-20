// Crie uma aplicação web para gerenciar tarefas. O sistema deve permitir:

// Cadastro de Tarefas com título e descrição.
// Listagem das Tarefas armazenadas no Local Storage.
// Edição de Tarefas (alterar título e descrição).
// Exclusão de Tarefas.
// Envio das Tarefas para o JSON Server ao clicar em um botão.


const LOCAL_STORAGE_KEY = "tarefas";
const API_URL = "http://localhost:3000/tarefas";


async function getTarefas() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
        }, 300);
    });
}


async function salvarTarefas(tarefas) {
    return new Promise(resolve => {
        setTimeout(() => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tarefas));
            resolve();
        }, 300);
    });
}


async function adicionarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    if (!titulo || !descricao) return alert("Preencha os campos!");

    const tarefas = await getTarefas();
    tarefas.push({ id: Date.now(), titulo, descricao });
    await salvarTarefas(tarefas);
    renderizarLista();
}


async function removerTarefa(id) {
    let tarefas = await getTarefas();
    tarefas = tarefas.filter(t => t.id !== id);
    await salvarTarefas(tarefas);
    renderizarLista();
}


async function editarTarefa(id) {
    let tarefas = await getTarefas();
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;

    const novoTitulo = prompt("Novo título:", tarefa.titulo);
    const novaDescricao = prompt("Nova descrição:", tarefa.descricao);
    if (novoTitulo && novaDescricao) {
        tarefa.titulo = novoTitulo;
        tarefa.descricao = novaDescricao;
        await salvarTarefas(tarefas);
        renderizarLista();
    }
}


async function enviarParaServidor() {
    const tarefas = await getTarefas();
    if (tarefas.length === 0) return alert("Nenhuma tarefa para enviar!");

    for (const tarefa of tarefas) {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarefa)
        });
    }

    alert("Tarefas enviadas para o servidor!");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    renderizarLista();
}


async function renderizarLista() {
    const tarefas = await getTarefas();
    const lista = document.getElementById("lista-tarefas");
    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.innerHTML = `${tarefa.titulo} - ${tarefa.descricao} 
            <button onclick="editarTarefa(${tarefa.id})">Editar</button>
            <button onclick="removerTarefa(${tarefa.id})">Excluir</button>`;
        lista.appendChild(li);
    });
}


document.addEventListener("DOMContentLoaded", renderizarLista);