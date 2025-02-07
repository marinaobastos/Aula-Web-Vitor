// Crie uma função com comportamento assíncrono que retorne o número 100 após
// 3 segundos. Use setTimeout na solução.

function retornar100() {

    return new Promise((resolve) => {

        setTimeout(() => {
            resolve(100); // retorna o 100
        }, 3000);
    });
}

// Testando a função 
retornar100().then((resultado) => {
    console.log(resultado);
});

