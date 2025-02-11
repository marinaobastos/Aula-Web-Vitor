// Alterar as músicas

const apiUrl = 'http://localhost:3000/musicas';

let musicaSelecionada = document.getElementById('musica_selecionada');
let formEditar = document.getElementById('form_editar_musica');
let musicaSelecionadaId = null;

document.addEventListener('DOMContentLoaded', () => {

    fetch(apiUrl)
    .then(Response => Response.json())
    .then(dados => {
        
        dados.forEach(elemento => {
            
            let option = document.createElement('option');
            option.value = elemento.id;
            option.textContent = elemento.nome;
            musicaSelecionada.appendChild(option);
        });
    });
});


musicaSelecionada.addEventListener('change', () => {

    musicaSelecionadaId = musicaSelecionada.value;

    if(musicaSelecionadaId) {

        fetch(`${apiUrl}/${musicaSelecionadaId}`)
        .then(response => response.json())
        .then(musica => {
            document.getElementById('nome').value = musica.nome;
            document.getElementById('cantor').value = musica.cantor;
            document.getElementById('ano_lancamento').value = musica.ano_lancamento;
            document.getElementById('ouvintes_mensais').value = musica.ouvintes_mensais;
            document.getElementById('plataforma_digital').value = musica.plataforma_digital;
            document.getElementById('genero').value = musica.genero;
            document.getElementById('duracao').value = musica.duracao;
            formEditar.style.display = 'block';
        });
    }
});


formEditar.addEventListener('submit', function(evento) {

    evento.preventDefault();

    let updateMusica = {
        nome: document.getElementById('nome').value,
        cantor: document.getElementById('cantor').value,
        ano_lancamento: document.getElementById('ano_lancamento').value,
        ouvintes_mensais: document.getElementById('ouvintes_mensais').value,
        plataforma_digital: document.getElementById('plataforma_digital').value,
        genero: document.getElementById('genero').value,
        duracao: document.getElementById('duracao').value
    };

    fetch(`${apiUrl}/${musicaSelecionadaId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateMusica) 
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao atualizar música');
        return response.json();
    })
    .then(() => {
        alert('Música atualizada com sucesso!');
        location.reload();
    })
    .catch(error => console.error('Erro ao atualizar música:', error));

    // .then(() => {
    //     alert('Música atualizada com sucesso!');
    //     location.reload();
    // })

});

