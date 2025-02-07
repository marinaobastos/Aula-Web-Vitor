// async e await 

/*
Conceito de async e await em JavaScript

Exemplo detalhado:
Imagine que temos uma função que simula a busca de dados de um banco de dados.
Vamos criar um código assíncrono para essa situação.

*/

// Função assíncrona que simula a busca de dados no banco de dados
function buscarDadosDoBanco() { // Função que retorna uma Promise

    return new Promise ((resposta) => {
        
        setTimeout(() => {
            resposta('Os dados foram carregados com sucesso!'); // simulando apenas o caso de sucesso
        }, 3000); // simula 3 segundos de atraso
    
    });
}

// Criando uma função assícrona usando async e await
async function obterDados() {

    console.log('Buscando dados...');

    // 1º Usando await para esperar a resposta da Promise
    // 2º Usa await buscarDadosDoBanco(), buscando que a Promise seja resolvida antes de continuar a execução.
    // 3º Como usamos await, o JavaScript pausa a execução da função obterDados() até que a Promise seja resolvida.
    let resultado = await buscarDadosDoBanco();

    console.log(resultado); // Exibe 'Os dados foram carregados com sucesso!'

}

// Chamando a função 
obterDados();