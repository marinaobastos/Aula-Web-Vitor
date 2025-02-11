// Remover uma música

const apiURL = 'http://localhost:3000/musicas';

let musicaSelecionada = document.getElementById('musica_selecionada');
let botaoRemover = document.getElementById('botao_remover_musica');

document.addEventListener('DOMContentLoaded', () => {

    fetch(apiURL)
    .then(Response => Response.json())
    .then(dados => {

        musicaSelecionada.innerHTML = '<option value = "">Selecione uma música</option>';

        dados.forEach(elemento => {

            let option = document.createElement('option');
            option.value = elemento.id;
            option.textContent = elemento.nome;
            musicaSelecionada.appendChild(option);
            
        });
    });
});


botaoRemover.addEventListener('click', () => {

    let musicaId = musicaSelecionada.value;

    if(!musicaId) {
        alert('Selecione uma música para remover.');
        return;
    }

    if(confirm('Tem certeza que deseja remover está música?')) {

        fetch(`${apiURL}/${musicaId}`, {
            method: 'DELETE'
        })
        .then(() => {
            alert('Música removida com sucesso.');
            location.reload();
        });
    }
});
