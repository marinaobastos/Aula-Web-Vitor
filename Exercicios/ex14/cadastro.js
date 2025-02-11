// Cadastrar medicamentos

const apiURL = 'http://localhost:3000/medicamentos';

document.getElementById('form_medicamento').addEventListener('submit', async (evento) => {

    evento.preventDefault();

    let novoMedicamento = {
        nome: document.getElementById('nome').value,
        fabricante: document.getElementById('fabricante').value,
        preco: document.getElementById('preco').value,
        tipo_unidade: document.getElementById('tipo_unidade').value
    };

    try {
        await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoMedicamento)
        });
        
        document.getElementById('form_medicamento').reset();
        alert('Produto cadastrado com sucesso!');
        console.log('ok');
        
    } catch (error) {

        console.error('Erro ao cadastrar produto: ', error);
        console.log('erro 0');

    }

});
