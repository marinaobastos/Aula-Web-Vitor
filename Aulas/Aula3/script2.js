// Função que escreve na tela antes e depois de executar uma determinada função passada como parâmetro
function fazOperacao(funcao) {

    console.log("Antes");
    console.log(funcao(10, 30)); // a função passada aqui foi soma
    console.log("Depois");
}


// Função de soma
function soma(x, y) {
    return x + y;
}


// Chama a função fazOperacao, passando a função soma como argumento
fazOperacao(soma);
