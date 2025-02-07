// throw e try...catch

function dividir(n1, n2) {

    // verifica se o divisor é 0 e lança o erro caso seja necessário: n2 ser igual a 0
    if(n2 === 0) {
        throw new Error('Não é possível dividir por 0.'); // lança o erro
    }

    return n1 / n2;
}

// usando try e catch para tratar o erro
try {
    // recebe a divisão
    let resultado = dividir(4, 0);
    
    // imprimindo o resultado
    console.log('Resultado: ' + resultado); // não será executado se o erro for lançado

} catch(error) {

    // Trata o erro lançado
    console.log('Erro capturado: ', error.message);

} finally {
    
    // sempre é executado, independente de sucesso ou erro
    console.log('Operação finalizada.');
}