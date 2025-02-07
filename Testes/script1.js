// Throw

function dividir(n1, n2) {

    if(n2 === 0) {
        throw new Error('Não é possível dividir por 0.'); // lança o erro
    }

    return n1/n2;
}

console.log(dividir(4, 0)); // aqui ele para a execução do programa e lança o erro
// console.log(dividir(4, 2));