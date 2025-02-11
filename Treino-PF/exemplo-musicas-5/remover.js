// Remover uma música

const apiURL = 'http://localhost:3000/musicas';

let musicaSelecionada = document.getElementById('musica_selecionada');
let botaoRemover = document.getElementById('botao_remover_musica');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(apiURL);
        const dados = await response.json();

        musicaSelecionada.innerHTML = '<option value="">Selecione uma música</option>';

        dados.forEach(musica => {
            let option = document.createElement('option');
            option.value = musica.id;
            option.textContent = musica.nome;
            musicaSelecionada.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar lista de músicas:', error);
    }
});

botaoRemover.addEventListener('click', async () => {
    let musicaId = musicaSelecionada.value;

    if (!musicaId) {
        alert('Selecione uma música para remover.');
        return;
    }

    if (confirm('Tem certeza que deseja remover esta música?')) {
        try {
            await fetch(`${apiURL}/${musicaId}`, {
                method: 'DELETE'
            });

            alert('Música removida com sucesso.');
            location.reload();
        } catch (error) {
            console.error('Erro ao remover música:', error);
        }
    }
});
