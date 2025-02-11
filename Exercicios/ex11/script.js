// Simule uma corrida com 5 veículos, representados como Promessas com duração entre 2 e 5 
// segundos, escolhidos aleatoriamente. Dado que o trajeto percorrido por todos é o mesmo, 
// o veículo considerado mais rápido é aquele que concluir o trajeto em menor tempo. Sendo 
// assim, simule a corrida e informe o veículo mais rápido.

function simularVeiculo(id) {

    const tempo = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000; // Tempo aleatório entre 2 e 5 segundos

    return new Promise((resolve) => {

      setTimeout(() => {
        resolve({ id, tempo });
      }, tempo);

    });
}
  
async function simularCorrida() {

    const veiculos = [1, 2, 3, 4, 5];
    const promessas = veiculos.map(veiculo => simularVeiculo(veiculo));

    const resultados = await Promise.all(promessas);
    
    const vencedor = resultados.reduce((maisRapido, atual) => 
    atual.tempo < maisRapido.tempo ? atual : maisRapido
    );

    console.log(`Veículo mais rápido: Veículo ${vencedor.id} com ${vencedor.tempo / 1000} segundos.`);
}
  
// Iniciar a simulação da corrida
simularCorrida();
  