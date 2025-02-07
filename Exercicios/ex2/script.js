// Simule uma corrida com 5 veículos, representados como Promessas com duração entre 2 e 5 
// segundos, escolhidos aleatoriamente. Dado que o trajeto percorrido por todos é o mesmo, o veículo 
// considerado mais rápido é aquele que concluir o trajeto em menor tempo. Sendo assim, simule a 
// corrida e informe o veículo mais rápido.

function simularVeiculo(id) {

    const tempo = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000; // tempo aleatório

    return new Promise((resolve) => {

        setTimeout(() => {
            resolve({id, tempo});
        }, tempo);
    });
}


async function simularCorrida() {

    let veiculos = [1, 2, 3, 4, 5];

    const promessas = veiculos.map(veiculo => 
        simularVeiculo(veiculo)
    );

    let resultado = await Promise.all(promessas);

    let vencedor = resultado.reduce((maisRapido, atual) =>
        atual.tempo < maisRapido.tempo ? atual : maisRapido
    );

    console.log(`Veículo mais rápido ${vencedor.id} com ${vencedor.tempo / 1000} segundos.`);

}

simularCorrida();
