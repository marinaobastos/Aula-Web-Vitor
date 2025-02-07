document.addEventListener('DOMContentLoaded', (evento) => {

    // Este trecho de código verifica se a URL da página contém um parâmetro de consulta (query string) chamado idProduto
    if(window.location.search != '' && window.location.search.includes('idProduto=')) {

        let idProduto = window.location.search.split('=')[1]; console.log(idProduto);

        recuperarDadosProduto(idProduto);
    }

        document.getElementById('btnCadastrar')?.addEventListener('click', async (evento) => {

        let form = new FormData(document.getElementById('formCadastro')); console.log(form);
        let campoId = document.getElementById('idProduto'); console.log(campoId);

        if(validaCampos(form) == true) {
            cadastrarEditarProduto(form, 'editar');

        } else {
            cadastrarEditarProduto(form, 'cadastrar');
        }

        evento.preventDefault();
    
    });

});


function validaCampos(form) {

    let campos = ['nome', 'preco', 'fabricante', 'tipoUnidade'];
    let valido = true;
    let informacoes = '';

    campos.forEach((campo) => {

        if(!form.has(campo) || form.get(campo)?.toString().trim() == '') {
            valido = false;
            informacoes += `Campo ${campo} não foi preenchido.\n`;
        }
    });

    if(informacoes != '') {
        alert(informacoes);
    }

    return valido;
}


async function cadastrarEditarProduto(produto, op) {

    try {

        const url = 'http://localhost:3000/produtos' + 
        (op == 'cadastrar' ? '' : '/' + produto.get('id'));

        let response = await fetch(url, {

            method: op == 'cadastrar' ? 'POST' : 'PUT',
            
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(Object.fromEntries(produto))
        });

        if(!response.ok) {
            throw new Error(`Erro ao cadastrar produto: ${response.statusText}`);
        }

        let data = await response.json();
        console.log("Dentro da função async em cadastro.js");

        alert('Produto cadastrado com sucesso!');

    } catch(error) {
        console.error('Erro ao cadastrar produto: ', error);
    }
    
}


async function recuperarDadosProduto(idProduto) {

    try {

        const response = await fetch('http://localhost:3000/produtos/' + idProduto, {
            method: 'GET'
        });

        if(!response.ok) {
            throw new Error(`Erro ao excluir: ${response.statusText}`);
        }

        let dadosProduto = await response.json();

        carregaDadosEditarNoFormulario(dadosProduto);

    } catch(error) {
        console.log('Erro ao excluir produto: ', error);
    }
}


function carregaDadosEditarNoFormulario(produto) {

    let form = document.getElementById('formCadastro');

    form.querySelectorAll('input').forEach((select) => {

        marcaSelect(select, produto[select.name]);
    });
}


function marcaSelect(campo, valor) {

    campo.querySelectorAll('option').forEach((opcao) => {

        if(opcao.value == valor) {
            opcao.setAttribute('selected', 'selected');
        }
    });
}