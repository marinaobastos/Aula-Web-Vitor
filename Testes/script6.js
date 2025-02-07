/**
 * PROMISE
 * 
Imagina que você pede uma pizza e fica esperando. Quando ela chega, você recebe uma mensagem dizendo 
"Aqui está sua pizza!" ou, se algo der errado, uma mensagem dizendo "Houve um erro, não conseguimos entregar sua pizza".

Aqui está como isso pode ser feito com Promises no código:

Passos:
  -> Você faz o pedido (inicia uma Promise).
  -> A entrega da pizza pode demorar um tempo (Promise está "em andamento").
  -> Quando a pizza chega, você recebe a resposta (a Promise é "resolvida").
  -> Se houver um problema na entrega, você recebe a mensagem de erro (a Promise é "rejeitada").

 */

// Função que simula o pedido da pizza
function pedirPizza() {

    return new Promise((sucesso, falha) => {

        console.log("Pedido realizado! 🍕 Estamos preparando sua pizza..."); // Mensagem antes do tempo de espera

        let pizzaPronta = true; // suponha que a pizza está pronta

        // Simulando um tempo de espera, como se a pizza estivesse sendo feita
        setTimeout(() => {
            console.log('Sua pizza está no forno... 🔥');
        }, 3000);


        // Simulando um tempo de espera, como se a pizza estivesse a caminho
        setTimeout(() => {
            console.log('Sua pizza está a caminho... 🚗');
        }, 4000);


        setTimeout(() => {
           
            if(pizzaPronta == true) {
                sucesso('Sua pizza chegou!');
            } else {
                falha('O motoboy comeu a sua pizza 😞');
            }

        }, 6000);

    });

}

// Fazendo o pedido da pizza
pedirPizza()
    .then((mensagem) => {
        console.log(mensagem); // sucesso
    })
    .catch((erro) => {
        console.log(erro); // falha
    });