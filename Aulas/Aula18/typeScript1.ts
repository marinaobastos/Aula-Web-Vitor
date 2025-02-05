async function retornaApos3Segundos() {
    return new Promise(resolve => {
        setTimeout(() => resolve(100), 3000);
    });
}
(async () => {
    var retorno = await retornaApos3Segundos();
    console.log(retorno);
})();