// Try... Catch

function dividir(n1, n2) {

    try {
        
        if(n2 === 0) {
            console.log(x); // - esse código faz a operação cair no catch
            console.error('Não é possível dividir por 0.');
            return null // retorna null indicando que a operação falhou
        }

        return n1 / n2; // caso n2 não seja 0

    } catch (error) {
        console.error('Erro capturado: ', error.message);
        console.log('teste');

        return null; // garante que função retorne algo mesmo em caso de falha
    }
}

let resultado = dividir(4, 0);

if(resultado == null) {
    console.log('A operação falhou.');
} else {
    console.log(resultado);
}

