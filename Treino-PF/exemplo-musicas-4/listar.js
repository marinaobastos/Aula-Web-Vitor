// Listar músicas

const apiURL = 'http://localhost:3000/musicas';

document.addEventListener('DOMContentLoaded', () => {
    musicas();
})


function musicas() {

    fetch(apiURL)
    .then(Response => Response.json())
    .then(dados => {

        let listaMusicas = document.getElementById('lista_musicas');
        listaMusicas.innerHTML = '';

        dados.forEach(elemento => {
            
            let linha = `<tr>
                <td>${elemento.nome}</td>
                <td>${elemento.cantor}</td>
                <td>${elemento.ano_lancamento}</td>
                <td>${elemento.ouvintes_mensais}</td>
                <td>${elemento.plataforma_digital}</td>
                <td>${elemento.genero}</td>
                <td>${elemento.duracao}</td>
            </tr>`;

            listaMusicas.innerHTML += linha;
        });

    });

}