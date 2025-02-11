const apiUrl = 'http://localhost:3000';

// Função para cadastrar um produto
document.getElementById('form-produto').addEventListener('submit', async (event) => {
    event.preventDefault();

    const produto = {
        nome: document.getElementById('nome').value,
        fabricante: document.getElementById('fabricante').value,
        preco: parseFloat(document.getElementById('preco').value),
        tipo_unidade: document.getElementById('tipo_unidade').value
    };

    try {
        const response = await fetch(`${apiUrl}/produtos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });

        if (!response.ok) throw new Error('Erro ao cadastrar produto');
        alert('Produto cadastrado com sucesso!');
        document.getElementById('form-produto').reset();
    } catch (error) {
        console.error(error);
        alert('Erro ao cadastrar produto.');
    }
});