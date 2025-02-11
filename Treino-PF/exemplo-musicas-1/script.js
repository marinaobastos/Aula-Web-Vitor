const apiURL = 'http://localhost:3000/musicas';

document.addEventListener('DOMContentLoaded', () => {
    
    musicas();
})


function musicas() {

    fetch(apiURL)
    .then(Response => Response.json())
    .then( dados => {

        let listaMusicas = document.getElementById('lista_musicas');

        if (listaMusicas) {
            listaMusicas.innerHTML = "";  // Só executa se o elemento existir
        }

        //listaMusicas.innerHTML = '';

        dados.forEach(elemento => {
            
            let linha = `
            <tr>
                <td>${elemento.nome}</td>
                <td>${elemento.cantor}</td>
                <td>${elemento.ano_lancamento}</td>
                <td>${elemento.ouvintes_mensais}</td>
                <td>${elemento.plataforma_digital}</td>
                <td>${elemento.genero_musical}</td>
                <td>${elemento.duracao}</td>
            </tr>`;

            listaMusicas.innerHTML += linha;
            
        });

    });
}


document.getElementById('form_musica').addEventListener('submit', function(evento) {

    evento.preventDefault();

    let novaMusica = {
        nome: document.getElementById('nome').value,
        cantor: document.getElementById('cantor').value,
        ano_lancamento: document.getElementById('ano_lancamento').value,
        ouvintes_mensais: document.getElementById('ouvintes_mensais').value,
        plataforma_digital: document.getElementById('plataforma_digital').value,
        genero_musical: document.getElementById('genero_musical').value,
        duracao: document.getElementById('duracao').value
    };

    fetch(apiURL, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(novaMusica)

    }).then(() => {
        musicas();
        document.getElementById('form_musica').reset();
    });

});