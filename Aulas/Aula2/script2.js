// Lê um número e imprime de 0 até o número informado

var leitor = require ("prompt-sync")();

var parada = leitor('Informe o número: ');

for(var i = 0; i <= parada; i++) {
    console.log(`Número: ${i} \n`);
}