// Alterar as músicas

const apiURL = 'http://localhost:3000/musicas';

let musicaSelecionada = document.getElementById('musica_selecionada');
let formEditar = document.getElementById('form_editar_musica');
let musicaSelecionadaId = null;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(apiURL);
        const dados = await response.json();

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

musicaSelecionada.addEventListener('change', async () => {
    musicaSelecionadaId = musicaSelecionada.value;

    if (musicaSelecionadaId) {
        try {
            const response = await fetch(`${apiURL}/${musicaSelecionadaId}`);
            const musica = await response.json();

            document.getElementById('nome').value = musica.nome;
            document.getElementById('cantor').value = musica.cantor;
            document.getElementById('ano_lancamento').value = musica.ano_lancamento;
            document.getElementById('ouvintes_mensais').value = musica.ouvintes_mensais;
            document.getElementById('plataforma_digital').value = musica.plataforma_digital;
            document.getElementById('genero').value = musica.genero;
            document.getElementById('duracao').value = musica.duracao;

            formEditar.style.display = 'block';
        } catch (error) {
            console.error('Erro ao carregar dados da música:', error);
        }
    }
});

formEditar.addEventListener('submit', async (evento) => {
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

    try {
        const response = await fetch(`${apiURL}/${musicaSelecionadaId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateMusica)
        });

        if (!response.ok) throw new Error('Erro ao atualizar música');

        alert('Música atualizada com sucesso!');
        location.reload();
    } catch (error) {
        console.error('Erro ao atualizar música:', error);
    }
});

