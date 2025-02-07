// Função autoexecutável assíncrona: o código desta página será executado assim que a página carregar

( async () => {

    try { // capturar possíveis erros durante a execução do código

        document.addEventListener('DOMContentLoaded', (ev) => {
            
            // Adiciona um evento ao elemento com id = 'estado-filtro'
            document.getElementById('estado-filtro').addEventListener('change', (ev) => {
                // change dispara quando o usuário escolhe uma nova opção

                console.log(ev.target.value);

                // ev.target -> elemento html que disparou o evento (select)
                // ev.target.value -> obtém o novo valor selecionado 
                
                carregarDadosEstado(ev.target.value); // chama a função passando o estado selecionado
            });
        });

    } catch(error) {
        console.log(error.message);
    }

}) ();


// Função assíncrona para buscar dados de uma API com base no estado selecionado
async function carregarDadosEstado(estadoEscolhido) {

    const response = await fetch('http://localhost:3000/pessoas');

    if(response.status >= 400) {
        throw new Error('Erro: ' + response.status);
    }
    
    return carregarDadosTabela(await response.json(), estadoEscolhido); // converte a resposta para json, passando os dados e o estado escolhido
}


// Função que filtra os dados e exibe na tabela
async function carregarDadosTabela(json, estadoEscolhido) {

    limpaTabelaSemTd(document.getElementById('table-dados'));

    let linha = document.createElement('tr');

    let colunaNome = document.createElement('th');
    colunaNome.textContent = 'Nome';

    let colunaTelefone = document.createElement('th');
    colunaTelefone.textContent = 'Telefone';

    let colunaCidade = document.createElement('th');
    colunaCidade.textContent = 'Cidade';

    let colunaEstado = document.createElement('th');
    colunaEstado.textContent = 'Estado';

    // Adiciona cada cabeçalho à linha da tabela
    linha.appendChild(colunaNome);
    linha.appendChild(colunaTelefone);
    linha.appendChild(colunaCidade);
    linha.appendChild(colunaEstado);

    // Adiciona a linha de cabeçalho à tabela na página 
    document.getElementById('table-dados').appendChild(linha);

    // Filtragem e exibição dos dados
    json.filter((campo) => {
        
        return estadoEscolhido === campo.estado;

    })
    .forEach(elemento => {
        
        console.log(elemento.nome); // exibe o nome de cada pessoa filtrada

        let linha = document.createElement('tr'); // cria uma nova linha para cada pessoa

        let colunaNome = document.createElement('td');
        colunaNome.textContent = elemento.nome;

        let colunaTelefone = document.createElement('td');
        colunaTelefone.textContent = elemento.telefone;

        let colunaCidade = document.createElement('td');
        colunaCidade.textContent = elemento.cidade;

        let colunaEstado = document.createElement('td');
        colunaEstado.textContent = elemento.estado;

        // Adiciona as colunas à linha criada
        linha.appendChild(colunaNome);
        linha.appendChild(colunaTelefone);
        linha.appendChild(colunaCidade);
        linha.appendChild(colunaEstado);

        // Adiciona a linha com os dados à tabela
        document.getElementById('table-dados').appendChild(linha);

    });
    
}


// Função para limpar a tela, removendo suas linhas
let limpaTabelaSemTd = (campo) => {

    let campoInterno;

    // Enquanto a tabela tiver elementos filhod, ele romve o primeiro filho repetidamente
    while(campoInterno = campo?.firstChild) {
        campo.removeChild(campoInterno);
    }
};
