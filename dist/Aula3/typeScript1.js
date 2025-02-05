"use strict";
function digaOi() {
    console.log("oi");
}
let x = undefined;
function fazOperacao(funcao) {
    console.log("Antes");
    console.log(funcao(10, 30));
    console.log("Depois");
}
function soma(x, y) {
    return x + y;
}
fazOperacao(soma);
//Usando Spread (...)
var a1 = { "nome": "Vitor", "cidade": "Nova Friburgo" };
var b = { "cidade": "Miracema", "gostosMusicais": ["Rock"] };
var c = Object.assign(Object.assign({}, a1), b);
console.log(c);
var d = [1, 2];
var e = [3, 4];
var f = [...d, ...e];
console.log(f);
function somaNova(...valores) {
    var resultado = 0;
    for (var x = 0; x < valores.length; x++) {
        resultado += valores[x];
    }
    return resultado;
}
console.log(somaNova());
console.log(somaNova(10));
console.log(somaNova(10, 20));
var aa = [];
var ab = [1, 2];
var ac = ["Java", "Html"];
var array = [3, 4, 5, 1, 8];
array.forEach((val, index) => {
    console.log(val + " " + index);
});
