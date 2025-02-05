const { rejects } = require("assert");

function carregarFrutas( num) {
       git
}

//document.addEventListener( 'DOMContentLoaded', () => {
    const promessa = carregarFrutas(3);
    promessa.then( ( a ) => {
        console.log( 'As frutas são: ', a );
    } ).catch(error=> {
        console.log(error);
    });
   
    console.log( 'Fim do script.' );
//});