let aoPressionarTecla = function(tecla) {

    alert(`A tecla ${String.fromCharCode(tecla.keyCode).toLowerCase()} foi pressionada.`);
}

// tecla.keyCode → Obtém o código numérico da tecla pressionada.
// String.fromCharCode(...) → Converte esse código numérico em um caractere correspondente.
// toLowerCase() → Converte a letra para minúscula, garantindo que "A" vire "a"

document.getElementById('nome').addEventListener('keyup', aoPressionarTecla);

// addEventListener(evento, função) → Adiciona um ouvinte de evento ao elemento.
// Toda vez que o usuário digitar algo no campo <input id="nome"> e soltar a tecla, a função aoPressionarTecla será executada.

// 'evento' está na posição daquela função automática que executa sempre após determinado código
document.getElementsByTagName('form')[0].addEventListener('submit', (evento) => {
    evento.preventDefault();
});

// evento.preventDefault(); → Impede o comportamento padrão do formulário, ou seja, ele não será enviado para o servidor.
// Isso é útil quando queremos validar os dados antes de permitir o envio.