// Criar um campo onde o usuário pode digitar um número, e quando pressionar a tecla "Enter", 
// o valor será exibido em um alerta. Se o campo estiver vazio, o usuário verá uma mensagem 
// informando para inserir um número.

let aoPressionarEnter = function(evento) {

    // evento.key -> permite identificar a tecla que foi pressionada
    if(evento.key === 'Enter') { // Verifica se a tecla apertada foi Enter

        // O formulário não é enviado, isso evita o recarregamento da página
        evento.preventDefault(); // Impede o envio do formulário

        let valorDigitado = evento.target.value.trim(); // Captura o valor digitado e remove os espaços extras

        if(valorDigitado === '') { // se valorDigitado for igual a um espaço vazio
            alert('Por favor, digite um número.');

        } else{
            alert(`Você digitou o número ${valorDigitado}.`);
        }
    }
};

// Adiciona o evento ao campo de input
document.getElementById('numero').addEventListener('keydown', aoPressionarEnter);

/*

evento.target.value
-> evento.target se refere ao elemento que disparou o evento (neste caso, o <input>).
-> value pega o que foi digitado dentro do campo.

.trim()
-> Remove espaços extras no início e no fim do texto.
-> Não remove espaços no meio do texto.

*/