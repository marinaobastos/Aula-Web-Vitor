( async () => {
    try {
        document.addEventListener("DOMContentLoaded", (ev)=>{
            document.getElementById("estadofiltro").addEventListener("change", (ev)=>{
                console.log(ev.target.value);
                carregaDadosEstado(ev.target.value);
            })
    });
   
    } catch ( err ) {
    console.log( err.message );
    }
} )();


async function carregaDadosEstado(estadoEscolhido) {
    const response = await fetch( 'http://localhost:3000/pessoas' );
    if ( response.status >= 400 ) {
    throw new Error( 'Erro ' + response.status );
    }
    return carregaDadosTabela(await response.json(), estadoEscolhido);
}

async function carregaDadosTabela(json, estadoEscolhido) {
    limpaTabelaSemTd(document.getElementById("tblDados"));
    var linha = document.createElement("tr");

    var colunaNome = document.createElement("th");
    colunaNome.textContent = "Nome";

    var colunaTelefone = document.createElement("th");
    colunaTelefone.textContent = "Telefone";
    var colunaCidade = document.createElement("th");
    colunaCidade.textContent = "Cidade";
    var colunaEstado = document.createElement("th");
    colunaEstado.textContent = "Estado";
    linha.appendChild(colunaNome);
    linha.appendChild(colunaTelefone);
    linha.appendChild(colunaCidade);
    linha.appendChild(colunaEstado);
    document.getElementById("tblDados").appendChild(linha);
   json.filter((campo)=>{
    return estadoEscolhido === campo.estado
   }).forEach(element => {
        console.log(element.nome);
        var linha = document.createElement("tr");

        var colunaNome = document.createElement("td");
        colunaNome.textContent = element.nome;

        var colunaTelefone = document.createElement("td");
        colunaTelefone.textContent = element.telefone;
        var colunaCidade = document.createElement("td");
        colunaCidade.textContent = element.cidade;
        var colunaEstado = document.createElement("td");
        colunaEstado.textContent = element.estado;
        linha.appendChild(colunaNome);
        linha.appendChild(colunaTelefone);
        linha.appendChild(colunaCidade);
        linha.appendChild(colunaEstado);
        document.getElementById("tblDados").appendChild(linha);
    });
    
}



var limpaTabelaSemTd = (campo) =>{
    var campoInterno;
    while(campoInterno = campo?.firstChild) {
        campo.removeChild(campoInterno);
    }
};