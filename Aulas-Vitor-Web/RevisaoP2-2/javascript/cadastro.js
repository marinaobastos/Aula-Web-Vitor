document.addEventListener('DOMContentLoaded', (ev) => {

    // Verifia se a URL não está vazia, e se depois do "?", possui "idProduto="
    if (window.location.search !== "" && window.location.search.includes("idProduto=")) {

        // Pega a string e divide em um array, e em seguida, o índice [1] é usado para acessar o segundo elemento do array resultante.
        const idProduto = window.location.search.split("=")[1];
        recuperaDadosProduto(idProduto);
    }

    document.getElementById("btnCadastrar")?.addEventListener('click', async (ev) => {

        var form = new FormData(document.getElementById("formCadastro"));

        const campoId = document.getElementById("idProduto");

        if (validaCampos(form)) {
            if (campoId.value !== "") {
                cadastrarEditarProduto(form, "editar");
            } else {
                cadastrarEditarProduto(form, "cadastrar");
            }
        }

        ev.preventDefault();
    });
});


function validaCampos(form) {
    
    let campos = ["nome", "preco", "fabricante", "tipoUnidade"];
    let valido = true;
    let informacoes = "";
    
    campos.forEach((campo) => {
        if (!form.has(campo) || (form.get(campo) || "").toString().trim() === "") {
            valido = false;
            informacoes += `Campo ${campo} não foi preenchido\n`;
        }
    });

    if (informacoes !== "") {
        alert(informacoes);
    }
    return valido;
}


async function cadastrarEditarProduto(produto, op) {

    try {
        const url = 'http://localhost:3000/produtos/' + (op === "cadastrar" ? '' : '/' + produto.get("id"));
        
        const response = await fetch(url, {

            method: op === "cadastrar" ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(produto)),
        });
        
        if (!response.ok) {
            throw new Error(`Erro ao cadastrar produto: ${response.statusText}`);
        }

        const data = await response.json();

        console.log("Dentro da função async");

        alert('Produto cadastrado com sucesso');

    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
    }
}


async function recuperaDadosProduto(idProduto) {

    try {
        const response = await fetch('http://localhost:3000/produtos/' + idProduto, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir: ${response.statusText}`);
        }

        const dadosProduto = await response.json();

        carregaDadosEditarNoFormulario(dadosProduto);

    } catch (error) {
        console.error('Erro ao excluir produto:', error);
    }
}


function carregaDadosEditarNoFormulario(produto) {

    var form = document.getElementById("formCadastro");

    form.querySelectorAll("input").forEach((input) => {
        input.setAttribute("value", produto[input.name]);
    });

    form.querySelectorAll("select").forEach((select) => {
        marcaSelect(select, produto[select.name]);
    });
}


function marcaSelect(campo, valor) {

    campo.querySelectorAll("option").forEach((opcao) => {

        if (opcao.value === valor) {
            opcao.setAttribute("selected", "selected");
        }
    });
}
