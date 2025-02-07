
// Está parte diz ao navegador para esperar até que toda a página tenha sido carregada, para rodar este código
// Isso garante que os elementos da página já existam antes de tentarmos manipulá-los
document.addEventListener('DOMContentLoaded', () => {

    montaDivCadastro(); // cadastrar nomes - cria um formulário para cadastrar o nome
    montaDivFiltro(); // filtrar nomes - cria um formulário para filtrar os nomes cadastrados

    // Cria uma div 
    let divTabelaNomes = document.createElement('div'); // aqui ficará a tabela que mostra os nomes cadastrados
    // Atribui um id para esta div
    divTabelaNomes.setAttribute('id', 'div-tabela-nomes');

    let body = document.getElementsByTagName('body')[0]; // pega o elemento body da página
    body.appendChild(divTabelaNomes); // adiciona a div divTabelaNomes dentro do body

    montaDivTabela(divTabelaNomes); // cria a tabela dentro da div divTabelaNomes
    // Essa tabela mostrará os nomes cadastrados

});


// Criando um cadastro para adicionar nomes
let arrayCadastro = []; // guarda os nomes cadastrados

function cadastrarNomeNoArray(nome) {

    console.log(nome);
    arrayCadastro.push(nome); // adiciona o nome no array

}


// Função para apagar a tabela e criar outra com os campos filtrados
function apagaDivTabela(elementoHTML, nome) {

    // elementoHTML -> o elemento pai onde a tabela está dentro
    // nome -> nome digitado pelo usuário para filtrar os nomes da tabela

    let divTabela = document.getElementById('divTabela'); // seleciona a div que contém a tabela

    // Verifica se a divTabela existe antes de tentar removê-la
    if (divTabela) {
        elementoHTML.removeChild(divTabela); // apaga a tabela atual e exibe uma nova tabela filtrada
    } else {
        console.log("Tabela não encontrada. Nenhuma tabela foi removida.");
    }

    montaDivTabela(elementoHTML, nome); // recria a tabela com os nomes filtrados

}


// Criando uma tabela para mostrar os nomes
function montaDivTabela(elementoHTML, nome) { 

    // elementoHTML -> o elemento HTML onde a tabela será criada
    // nome -> texto que será usado para filtrar os nomes da tabela

    console.log(elementoHTML);

    let divTabela = document.createElement('div'); // cria uma div que servirá de contêiner para a tabela
    divTabela.setAttribute('id', 'divTabela'); // AAAAAAAAAA

    // Adiciona divTabela dentro do elemento HTML 
    elementoHTML.appendChild(divTabela);

    // Cria o elemento table, que será a tabela em si
    let table = document.createElement('table');
    divTabela.appendChild(table); // Adiciona essa tabela dentro da div divTabela

    // Cria uma linha de cabeçalho para a tabela
    let trCabecalho = document.createElement('tr');
    table.appendChild(trCabecalho); // Adiciona esse cabeçalho na tabela

    // Cria um campo no cabeçalho da tabela th
    let thCabecalhoNome = document.createElement('th');
    thCabecalhoNome.textContent = 'Nome'; // 'Nome' será o texto dentro dessa célula
    trCabecalho.appendChild(thCabecalhoNome); // Adiciona th dentro de td, ou seja, cabeçalho dentro da linha de cabeçalho


    // Filtra os nomes dentro do array, verificando se ele contém o texto digitado no campo de filtragem
    let nomesFiltrados = arrayCadastro.filter(valorNome => { // valorNome -> um nome no array de cadastros

        // indexOf() verifica se existe um texto dentro de outro, e retorna a posição onde ele aparece pela primeira vez
        if(valorNome.indexOf(nome) > -1) { // quando não existe o texto, o retorno é -1
            return true;
        }

        return false;
    
    });

    // depois de filtrar os nomes, o forEach percorre cada nome que passou no filtro
    nomesFiltrados.forEach(elementoNome => {
        
        console.log(elementoNome); // exibe no console

        let tr = document.createElement('tr'); // cria uma nova linha na tabela
        let td = document.createElement('td'); // cria uma célula que receberá o nome da pessoa filtrada
        td.textContent = elementoNome;

        tr.appendChild(td); // adiciona a célula dentro da linha
        table.appendChild(tr); // adiciona a linha dentro da tabela

    });

}


// Cria e adiciona uma div para o filtro
function montaDivFiltro() {

    let body = document.getElementsByTagName('body')[0]; // obtém a tag body do documento
    
    let divFiltro = document.createElement('div'); // cria uma div que servirá de contêiner para o filtro
    divFiltro.setAttribute('id', 'div-filtro');
    body.appendChild(divFiltro); // adiciona a div ao body

    let formFiltro = document.createElement('form'); // cria um form dentro da div - o form irá conter os campos do filtro
    divFiltro.appendChild(formFiltro); // adiciona o form dentro da div

    let label1 = document.createElement('label'); // cria uma label
    label1.setAttribute('for', 'campo_nome_filtro');
    formFiltro.appendChild(label1); // adiciona a label dentro do form

    let inputNomeFiltro = document.createElement('input'); // cria um campo de entrada de texto
    inputNomeFiltro.setAttribute('type', 'text'); // campo de texto
    inputNomeFiltro.setAttribute('name', 'nome'); // nome do campo
    inputNomeFiltro.setAttribute('id', 'campo_nome_filtro'); // id
    formFiltro.appendChild(inputNomeFiltro); // adiciona o input dentro do form

    let buttonFiltro = document.createElement('button'); // cria um botão para filtrar
    buttonFiltro.setAttribute('type', 'button'); // indica que não submeterá um formulário, apenas executará uma ação
    // ao definir o atributo type como "button", o botão NÃO terá o comportamento padrão de um botão de envio de formulário (type="submit"). Ou seja, clicar neste botão não irá enviar os dados do formulário para um servidor.
    buttonFiltro.setAttribute('name', 'cadastrar'); // nome do botão
    buttonFiltro.textContent = 'Filtrar'; // texto do botão
    formFiltro.appendChild(buttonFiltro); // adiciona o botão dentro do form


    // Adicionando um evento ao botão
    // Quando o botão for clicado a função dentro do addEventListener será executada
    buttonFiltro.addEventListener('click', () => {
        
        // obtém a div onde a tabela está e obtém o nome digitado pelo usuário no campo de entrada
        apagaDivTabela(document.getElementById('div-tabela-nomes'), inputNomeFiltro.value);
        
    });

}


// Função para criar uma div de cadastro - cria uma estrutura de cadastro na página
function montaDivCadastro() {

    let body = document.getElementsByTagName('body')[0]; // pega o body da página

    let divCadastro = document.createElement('div'); // cria uma div que conterá o formulário de cadastro
    divCadastro.setAttribute('id', 'div-cadastro'); // cria um id
    body.appendChild(divCadastro); // insere a div dentro do body

    // Criando o formulário
    let form = document.createElement('form');
    form.setAttribute('action', 'cadastro.php'); // enviará os dados para o arquivo cadastro.php (que não existe, não queremos enviar só testar)
    form.setAttribute('method', 'POST'); // envia os dados de forma segura (sem aparecer na URL)
    divCadastro.appendChild(form); // insere o form dentro da divCadastro

    // Criando uma label para o campo nome 
    let label1 = document.createElement('label'); // cria uma label para identificar o campo de entrada
    label1.setAttribute('for', 'campo_nome'); // for='campo_nome' -> faz com que o clique no rótulo selecione automaticamente o campo de entrada
    form.appendChild(label1); // insere o label dentro do form

    // Criando um campo de entrada input
    let inputNome = document.createElement('input'); // campo de entrada de texto
    inputNome.setAttribute('type', 'text'); // campo de texto
    inputNome.setAttribute('name', 'nome'); // nome do campo ao enviar os dados
    inputNome.setAttribute('id', 'campo_nome'); // relacionar com a label
    form.appendChild(inputNome); // insere o campo de entrada input dentro do form

    // Criando um botão
    let button = document.createElement('button');
    button.setAttribute('type', 'button'); // não envia formulário
    button.setAttribute('name', 'cadastrar'); // nome do botão
    button.textContent = 'Cadastrar';
    form.appendChild(button); // insere o botão dentro do form 

    // Adicionando um evento de clique ao botão
    button.addEventListener('click', () => { // para executar um código quando o botão for clicado

        cadastrarNomeNoArray(inputNome.value); // chama a função e passa o valor digitado pelo usuário. Esse valor será adicionado ao array de nomes cadastrados
        
        apagaDivTabela(document.getElementById('div-tabela-nomes'), ''); // passa a div que contém a tabela, remove ela, e recria com os dados atualizados
        // a string vazia significa que todos os nomes serão exibidos sem filtro

    });

}



