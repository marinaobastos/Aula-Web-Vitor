// Ordena os números do array de maneira crescente antes do 50, e decrescente depois do 50

var numeros = [100, 10, 1, 50, 70, 80, 20, 2];

numeros.sort((a, b) => { // ordena arrays de acordo com o que vc especificar na função

    if(a > 50 && b > 50) {
        return b - a;
    }

    return a - b;
});

// Percorre cada elemento do array de numeros e imprime
for(var i in numeros) {
    console.log(numeros[i]);
}