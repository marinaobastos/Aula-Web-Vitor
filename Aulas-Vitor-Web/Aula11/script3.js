// O usuário pode digitar um número e pressionar Enter ou clicar no botão para exibir o número digitado.
// Se o campo estiver vazio, aparecerá uma mensagem de aviso.

// Função para exibir o número digitado
function exibirNumero() {

    let inputNumero = document.getElementById('numero'); // Captura o campo input

    let valorDigitado = inputNumero.value.trim(); // Captura o número e remove os espaços extras

    if(valorDigitado === '') {
        alert('Por favor, digite um número.');
    } else {
        alert(`O número digitado foi ${valorDigitado}.`);
    }

}

// Função para detectar Enter e chamar a função exibirNumero
function aoPressionarEnter(evento) {

    if(evento.key === 'Enter') {
        evento.preventDefault(); // Impede o envio do formulário
        exibirNumero(); // Chama a função    
    }
}

// Adiciona evento de tecla ao campo de input
document.getElementById('numero').addEventListener('keydown', aoPressionarEnter);
// Se o Enter não for pressionado, nada acontece


// Adiciona evento de clique ao botão
document.getElementById('botao').addEventListener('click', exibirNumero);
