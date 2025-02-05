// Função de soma usando o spread
function somaNova(...valores) {

    var resultado = 0;

    for (var x = 0; x < valores.length; x++) { // valores.length -> número de elementos no array
        resultado += valores[x];
    }
    return resultado;
}

console.log(somaNova());
console.log(somaNova(10));
console.log(somaNova(10, 20));
console.log(somaNova(10, 20, 30, 40, 50));