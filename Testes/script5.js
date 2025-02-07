/**
PROMISE

Imagina que você pediu para sua mãe fazer um bolo, e ela te disse:

"Eu vou fazer o bolo, mas vou demorar um pouquinho. Quando eu terminar, vou te avisar."

Aqui, a mãe é a promessa e o bolo é o que você espera (o valor que você quer).

Passos:
-> Você pediu o bolo: Você fez o pedido e ficou esperando.
-> A mãe trabalha no bolo: A mãe está fazendo o bolo, mas ela ainda não terminou.
-> Quando o bolo fica pronto, ela te avisa: Assim que ela terminar, ela te conta que o bolo ficou pronto. 
Isso é o que chamamos de "resolvido".

*/

let fazerBolo = new Promise((sucesso, falha) => {

    let boloPronto = false; // suponha que o bolo ficou pronto

    if(boloPronto == true) {
        sucesso('O bolo está pronto.'); // resolve
    } else{
        falha('O bolo não deu certo.'); // reject
    }

});


// Chamamos o "resolve" ou "reject" dependendo do que aconteceu.
fazerBolo.then((mensagem) => {
    console.log(mensagem);

}).catch((erro) => {
    console.log(erro);
});

// .catch() é um método usado para lidar com erros ou falhas da Promise.
// Ele é chamado se a Promise for rejeitada (se algo der errado na hora de fazer o bolo).

