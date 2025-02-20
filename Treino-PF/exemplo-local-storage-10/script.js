//

document.addEventListener('DOMContentLoaded', () => {

    cargaInicial();
    montaDivCadastro();
    montaDivFiltro();

    var divAux = document.createElement('div');
    divAux.setAttribute('id', 'div_aux');

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(divAux);

    montaDivTabela(divAux);
});


let nomes = [];

let cargaInicial = () => {

    if(localStorage.getItem('nomes')) {
        localStorage.setItem('nomes', JSON.stringify(nomes));
    }
}


function cadastrarNomeNoArray(nome) {

    console.log(nome);

    let nomes = JSON.parse(localStorage.getItem('nomes'));

    if(!nomes) {
        localStorage.setItem('nomes', JSON.stringify([]));
        nomes = [];
    }

    nomes.push(nome);

    localStorage.setItem('nomes', JSON.stringify(nomes));
}


function apagaDivTabela(elemento, nome) {
    
}