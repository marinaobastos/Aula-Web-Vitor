// async e await
 
/**
 
Imagine que você quer fazer um café da manhã delicioso. Você precisa:
 
Ferver a água para o café.
Torrar o pão.
Passar manteiga no pão.
Beber o café e comer o pão.
 
O problema é que algumas dessas tarefas levam tempo, como ferver a água e torrar o pão. Se tentarmos fazer
tudo ao mesmo tempo sem esperar, o café pode ficar pronto antes da água ferver!
 
No JavaScript, quando temos tarefas que levam tempo (como buscar dados na internet), usamos async e await para
esperar cada passo ser concluído antes de seguir para o próximo.
 
*/

// Função para ferver a água (demora 3 segundos)
function ferverAguaParaCafe() {
    
    return new Promise((sucesso, falha) => {

        console.log('Esquentando a água...');

        let aguaFervida = true;

        setTimeout(() => {
            
            if(aguaFervida == true) {
                sucesso('Água fervida!');

            } else {
                falha('A água ainda não ferveu.');
            }

        }, 3000);

    });
}


// Função para torrar o pão (demora 3 segundos)
function torrarPao() {

    return new Promise((sucesso, falha) => {

        console.log('Torrando o pão...');

        let paoTorrado = true;

        setTimeout(() => {
            
            if(paoTorrado == true) {
                sucesso('O pão está torrado!');

            } else {
                falha('O pão queimou.');
            }

        }, 3000);

    });
}


// Função para passar manteiga no pão (demora 3 segundos)
function passarManteiga() {

    return new Promise((sucesso, falha) => {

        console.log('Passando manteiga no pão...');

        let paoComManteiga = true;

        setTimeout(() => {

            if(paoComManteiga == true) {
                sucesso('Pão com manteiga está pronto!');

            } else {
                falha('Acabou a manteiga.');
            }
            
        }, 3000);

    });
}


// Função assíncrona para preparar o café da manhã
async function prepararCafeDaManha() {

    console.log('Preparando o café da manhã!');

    try{

        // Fervendo a água e esperando terminar
        let aguaCafe = await ferverAguaParaCafe();
        console.log(aguaCafe);
    
        // Torrando o pão e esperando terminar
        let pao = await torrarPao();
        console.log(pao);
    
        // Passando manteiga no pão
        let manteiga = await passarManteiga();
        console.log(manteiga);
    
        // Café da manhã pronto
        console.log('Café da manhã pronto!');

    } catch(erro) {
        console.log(`❌ O café da manhã não pôde ser preparado: ${erro}`);
    }

}


// Chamando a função
prepararCafeDaManha();
