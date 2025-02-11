// Listar músicas

const apiURL = 'http://localhost:3000/musicas';

document.addEventListener('DOMContentLoaded', () => {
    listarMusicas();
});

async function listarMusicas() {

    try {
        const response = await fetch(apiURL);
        const dados = await response.json();
        let listaMusicas = document.getElementById('lista_musicas');
        listaMusicas.innerHTML = '';

        dados.forEach(musica => {

            let linha = `
                <tr>
                    <td>${musica.nome}</td>
                    <td>${musica.cantor}</td>
                    <td>${musica.ano_lancamento}</td>
                    <td>${musica.ouvintes_mensais}</td>
                    <td>${musica.plataforma_digital}</td>
                    <td>${musica.genero}</td>
                    <td>${musica.duracao}</td>
                </tr>`;
            listaMusicas.innerHTML += linha;
        });

    } catch (error) {
        console.error('Erro ao listar músicas:', error);
    }
}
