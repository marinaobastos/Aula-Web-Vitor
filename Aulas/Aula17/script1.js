function f1() { return Promise.resolve( 10 ); }
f1().then( valor => {
console.log( 'Recebi ', valor );
return 20;
} ).then( valor => {
console.log( 'Recebi ', valor );
if ( valor < 50 ) { throw new Error( 'Menor que 50'); }
return 100;
} ).then( valor => {
console.log( 'Recebi ', valor );
return 200;
} ).catch( razao => {
console.log( 'Erro: ', razao.message );
} );