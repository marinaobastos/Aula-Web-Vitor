// Cadastrar músicas

const apiURL = 'http://localhost:3000/musicas';

document.getElementById('form_musica').addEventListener('submit', function(evento) {

    evento.preventDefault();

    let novaMusica = {
        nome: document.getElementById('nome').value,
        cantor: document.getElementById('cantor').value,
        ano_lancamento: document.getElementById('ano_lancamento').value,
        ouvintes_mensais: document.getElementById('ouvintes_mensais').value,
        plataforma_digital: document.getElementById('plataforma_digital').value,
        genero_musical: document.getElementById('genero').value,
        duracao: document.getElementById('duracao').value
    };

    fetch(apiURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(novaMusica)
    })

    .then(() => {
        document.getElementById('form_musica').reset();
    });

});