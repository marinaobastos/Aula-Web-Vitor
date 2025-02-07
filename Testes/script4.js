// Promessa 1

function carregarFrutas() {
    return Promise.resolve( ['Maçã', 'Laranja', 'Goiaba']); // Promise resolvida. Isso significa que não há 
    // espera ou tempo de processamento — a Promise já está pronta para ser consumida.
}

// Agora, a variável promessa contém a Promise que foi criada em carregarFrutas().
let promessa = carregarFrutas();

// O then() é chamado quando a Promise é resolvida com sucesso.
promessa.then( (frutas) => {
    console.log('As frutas são: ', frutas); // Esse é executado em segundo
});

console.log('FRUTAS'); // Esse é executado em primeiro