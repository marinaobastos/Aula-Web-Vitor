// Lista, começando em 0, até o número digitado pelo usuário 

var leitor = require ("prompt-sync")();

var parada = leitor("Informe o número: ");

/*
for (let i = 0; i < parada; i++) {
    //console.log(`Número ${i}`);    
    alert(`Número ${i}`)
}*/

var i = 0
while(i <= parada) {
    console.log(`Número ${i}`)
    i++;
}