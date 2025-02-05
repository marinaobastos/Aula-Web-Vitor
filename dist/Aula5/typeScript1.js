"use strict";
//Criar um array com marcas de carro e pesquisar nesse array por nome
var leitor = require("prompt-sync")();
var carros = ["Jeep", "Volkswagem", "Ford", "Dogde", "Tesla", "Chevrolet", "BYD"];
var continua = 1;
while (continua) {
    var encontrar = leitor("Digite o carro de deseja encontrar.");
    var posicao = carros.indexOf(encontrar);
    if (posicao != -1) {
        console.log("Carro " + carros[posicao] + " encontrado na posição " + posicao + 1);
    }
    else {
        console.log("Não encontrado");
    }
    continua = leitor("Deseja encontrar um novo carro? (1) para continuar e (0) para sair.");
}
