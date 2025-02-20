const API_URL = "http://localhost:3000/pessoas";

// ENVIAR DO LOCAL STORAGE PARA O JSON SERVER
async function enviarParaJsonServer() {
    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

    if (pessoas.length === 0) {
        alert("Não há dados no Local Storage para enviar.");
        return;
    }

    try {
        for (let pessoa of pessoas) {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pessoa)
            });
        }

        alert("Dados enviados para o JSON Server!");
        localStorage.removeItem("pessoas");
    } catch (erro) {
        alert("Erro ao enviar os dados: " + erro.message);
    }
}


// VOLTAR PARA A PÁGINA PRINCIPAL
function voltarParaPaginaPrincipal() {
    window.location.href = "indice.html"; // Altere para o nome da sua página principal
}