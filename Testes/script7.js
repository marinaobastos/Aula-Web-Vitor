/**
 * PROMISE
 * 
Cenário:
  -> Você fez uma compra online e o pagamento precisa ser processado.
  -> Se o pagamento for aprovado, você recebe uma confirmação de que a compra foi bem-sucedida.
  -> Se o pagamento falhar, você recebe uma mensagem de erro.

  Vamos usar a Promise para simular esse processo de forma assíncrona, com um tempo de espera para 
  simular a verificação do pagamento

*/

function verificarPagamento() {

    return new Promise((sucesso, falha) => {

        console.log('Vamos verificar o seu pagamento... 💳');

        let pagamentoConcluido = false;

        setTimeout(() => {
            
            if(pagamentoConcluido == true) {
                sucesso('Pagamento efetuado com sucesso! 😄');

            } else {
                falha('Verifique o seu cartão! Infelizmente não foi possível efetuar o pagamento. 😞');
            }

        }, 3000);

    });

}

// Fazendo a verificação do pagamento
verificarPagamento()
    .then((mensagem) => {
        console.log(mensagem);
    })
    .catch((erro) => {
        console.log(erro);
    });
