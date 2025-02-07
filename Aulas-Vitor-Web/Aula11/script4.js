/*
📝 Exercício: Validação de Número Par
O usuário deve digitar um número no campo de input.

Se for par, exibe uma mensagem: ✅ "O número X é par!"
Se for ímpar, exibe: ❌ "O número X é ímpar!"
Se for um valor inválido, alerta: ⚠ "Digite um número válido!"

🚀 A complexidade extra:
addEventListener é adicionado dentro da função (não no escopo global).
O evento de "keydown" só é registrado após clicar no botão "Ativar".
A tecla Enter também dispara a verificação.
*/

let inputNumero = document.getElementById('numero');
let mensagem = document.getElementById('mensagem');
let botao = document.getElementById('botao-ativar');


function verificarNumero() {

    let valor = inputNumero.value.trim();

    // Converte o valor para número
    let numero = Number(valor);

    if(isNaN(numero)) {
        mensagem.textContent = 'Digite um número válido!';
        mensagem.style.color = 'red';

    } else if(numero % 2 == 0) {
        mensagem.textContent = `O número ${numero} é par!`;
        mensagem.style.color = 'green';

    } else {
        mensagem.textContent = `O número ${numero} é ímpar!`;
        mensagem.style.color = 'blue';
    }

}


function ativarEventos() {

    // Adiciona evento ao input somente quando ativarEventos() for chamado
    inputNumero.onkeydown = function(evento) { // onkeydown é um evento acionado quando uma tecla 
                                               // do teclado é pressionada

        if(evento.key === 'Enter') { // Se pressionar Enter chama a verificação
            verificarNumero();
        }
    };

    botao.onclick = verificarNumero;
    // OU botao.addEventListener('click', verificarNumero);
}


// Chama a função para ativar os eventos
ativarEventos();

/*

botao.onclick = verificarNumero;

botao.onclick = verificarNumero; diz ao JavaScript que quando o botão for clicado, ele deve 
executar a função verificarNumero.

Como verificarNumero é apenas referenciado (sem ()), o JavaScript não a executa imediatamente. 
Ele só a chama quando o usuário clica no botão.

verificarNumero() -> é executada imediatamente no momento em que essa linha for lida, 
em vez de esperar o clique do usuário.

✅ O jeito correto é sem os parênteses, para que a função só seja chamada quando o clique acontecer.

*/