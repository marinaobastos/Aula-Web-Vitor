"use strict";
var leitor = require("prompt-sync")();
var pessoas = [
    { nome: "Vitor", idade: 35, cpf: 433 },
    { nome: "João", idade: 25, cpf: 433 },
    { nome: "Maria", idade: 30, cpf: 433 },
    { nome: "José", idade: 35, cpf: 433, maior: function () { this.idade > 18; } }
];
var continua = 1;
while (continua) {
    var encontrar = leitor("Digite a idade das pessoas que deseja encontrar.");
    var encontrou = false;
    pessoas.forEach((a) => {
        if (a.idade == encontrar) {
            encontrou = true;
            console.log("Pessoa de nome " + a.nome + " encontrada");
        }
    });
    if (!encontrou) {
        console.log("Nenhuma pessoa encontrada");
    }
    continua = leitor("Deseja encontrar uma nova pessoa? (1) para continuar e (0) para sair.");
}
