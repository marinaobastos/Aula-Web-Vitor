// Lê o nome e a idade do usuário, depois os exibe no console

var leitor = require ("prompt-sync")();

var nome = leitor("Digite seu nome: ");

var idade = leitor("Digite a idade: ");

console.log(`Nome: ${nome}`);

console.log("Idade: " + idade);