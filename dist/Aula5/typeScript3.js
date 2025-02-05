"use strict";
var leitor = require("prompt-sync")();
class Pessoa {
    constructor(nome, idade) {
        this.cpf = 0;
        this.nome = nome;
        this.idade = idade;
    }
}
var pessoa4 = (new Pessoa("José", 35));
pessoa4.cpf = 45;
var pessoas2 = [
    new Pessoa("Vitor", 35), //Chamando a classe
    { nome: "João", idade: 25, cpf: 5 }, // Dando CAST no objeto
    new Pessoa("Maria", 30), //Chamando a classe
    pessoa4 //Usando objeto criado anteriormente
];
var continua = 1;
while (continua == 1) {
    var encontrar = leitor("Digite a idade das pessoas que deseja encontrar.");
    var encontrou = false;
    pessoas2.forEach((a) => {
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
