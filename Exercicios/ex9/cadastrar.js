document.getElementById('form-produto').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const fabricante = document.getElementById('fabricante').value;
    const tipoUnidade = document.getElementById('tipo-unidade').value;

    if (!nome || isNaN(preco) || !fabricante || !tipoUnidade) return;

    try {
        const resposta = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, preco, fabricante, tipo_unidade: tipoUnidade })
        });

        if (resposta.ok) {
            alert('Produto cadastrado com sucesso!');
            document.getElementById('form-produto').reset();
        }
    } catch (erro) {
        console.error('Erro ao cadastrar produto:', erro);
    }
});
