const API_URL = "http://localhost:3000/pessoas";

// BUSCAR DO JSON SERVER PARA O LOCAL STORAGE
async function buscarDoJsonServer() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados do JSON Server.");
        }

        const dados = await resposta.json();
        localStorage.setItem("pessoas", JSON.stringify(dados));
        alert("Dados do JSON Server armazenados no Local Storage!");
    } catch (erro) {
        alert("Erro ao buscar dados: " + erro.message);
    }
}