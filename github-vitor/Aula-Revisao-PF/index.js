document.addEventListener("DOMContentLoaded", ()=>{
    cargaInicial();
    montaDivFiltro();
    document.getElementById("btnCadastrar").addEventListener("click", (ev) => {
        ev.preventDefault();
        var form = new FormData(document.getElementById("formCadastro"));
        var obj = {};
        var documentos = [];
        form.forEach((valor, chave)=>{
            if(chave.indexOf("Documento")>-1){
                if(chave.indexOf("tipo")>-1){
                    let chaveNumero = chave.replace("tipo", "numero");
                    documentos.push({tipo: valor, numero: form.get(chaveNumero)});
                }
               
            }else {
                obj[chave] = valor;
            }
           
        });
        obj["documentos"] = documentos;
        console.log(JSON.stringify(obj));
        console.log(form);
        cadastrarNomeNoArray(form);
    });
    var divAux = document.createElement("div");
    divAux.setAttribute("id", "divAux");
    var tBody = document.getElementsByTagName("body")[0];
    tBody.appendChild(divAux);
    montaDivTabela(divAux);       
    
});        
var cargaInicial = () =>{
    console.log(localStorage.getItem("nomes"));
    if(!localStorage.getItem("nomes")) {
        localStorage.setItem("nomes", JSON.stringify([]));
    }
}
function cadastrarNomeNoArray(nome){
    console.log(nome);
    var nomes = JSON.parse(localStorage.getItem("nomes"));
 
    nomes.push(nome);
    localStorage.setItem("nomes", JSON.stringify(nomes)); 
}

function apagaDivTabela(el, nome) {
    var divTabela = document.getElementById("divTabela");
    el.removeChild(divTabela);

    montaDivTabela(el, nome);
}

function montaDivTabela(el, nome) {
    console.log(el);
    var divTabela =  document.createElement("div");
    divTabela.setAttribute("id", "divTabela");
    el.appendChild(divTabela);
    var tTable = document.createElement("table");
    divTabela.appendChild(tTable);
    var trCabecalho = document.createElement("tr");
    tTable.appendChild(trCabecalho);
    var thCabecalhoNome = document.createElement("th");
    thCabecalhoNome.textContent = "Nome"
    trCabecalho.appendChild(thCabecalhoNome);
    var thCabecalhoAcao = document.createElement("th");
    thCabecalhoAcao.textContent = "Acao"
    trCabecalho.appendChild(thCabecalhoNome);
    trCabecalho.appendChild(thCabecalhoAcao);
    var nomes = JSON.parse(localStorage.getItem("nomes"));
    if(nomes) {
        nomes.filter(valor=>{
            if(valor.indexOf(nome)>-1)
                return true;
            return false;
        }).forEach(element => {
            console.log(element);
            var trCorpo = document.createElement("tr"); 
            var tdCorpo = document.createElement("td");
            tdCorpo.textContent = element;
            var tdCorpoAcao = document.createElement("td");
            var linkEnviar = document.createElement("a");
            linkEnviar.setAttribute("href", "#");
            linkEnviar.textContent = "Enviar para JSON SERVER";
            linkEnviar.addEventListener("click", ()=>{  
                enviarParaNuvem(element);
            })
            tdCorpoAcao.appendChild(linkEnviar);

            trCorpo.appendChild(tdCorpo);
            tTable.appendChild(trCorpo); 
            tTable.appendChild(tdCorpoAcao);
        });
    
    }
    
    
}

function enviarParaNuvem() {

}
function montaDivFiltro() {
    let tBody = document.getElementsByTagName("body")[0];
    let divFiltro =  document.createElement("div");
    divFiltro.setAttribute("id", "divFiltro");
    tBody.appendChild(divFiltro);
    let fFormFiltro = document.createElement("form");
    
    divFiltro.appendChild(fFormFiltro);

    let tLabel1 = document.createElement("label");
    tLabel1.setAttribute("for", "campo_nome_filtro");
    fFormFiltro.appendChild(tLabel1);

    let tInputNomeFiltro = document.createElement("input");
    tInputNomeFiltro.setAttribute("type", "text");
    tInputNomeFiltro.setAttribute("name", "nome");
    tInputNomeFiltro.setAttribute("id", "campo_nome_filtro");
    fFormFiltro.appendChild(tInputNomeFiltro);

    let tButtonFIltro = document.createElement("button");
    tButtonFIltro.setAttribute("type", "button");
    tButtonFIltro.setAttribute("name", "cadastrar");
    tButtonFIltro.textContent = "Filtrar"
    fFormFiltro.appendChild(tButtonFIltro);

    tButtonFIltro.addEventListener("click", ()=>{
        //cadastrarNomeNoArray(tInputNome.value);
        apagaDivTabela(document.getElementById("divAux"), tInputNomeFiltro.value);
    })
}

var contador = 0;
let addDoc = () => {
    var divDocumentos = document.getElementById("divDocumentos");
    var divWrapper = document.createElement("div");
    var labelTipoDocumento = document.createElement("label");
    labelTipoDocumento.setAttribute("for", "tipoDocumento"+contador);
    labelTipoDocumento.textContent = "Tipo de Documento: ";
    var tSelectTipoDocumento = document.createElement("select");
    tSelectTipoDocumento.setAttribute("name", "tipoDocumento"+contador);
    tSelectTipoDocumento.setAttribute("id", "tipoDocumento"+contador);
    var options = ["CPF", "RG", "CNH", "Passaporte"];
    options.forEach(element => {
        var option = document.createElement("option");
        option.setAttribute("value", element);
        option.textContent = element;
        tSelectTipoDocumento.appendChild(option);
    });
    divWrapper.appendChild(labelTipoDocumento);
    divWrapper.appendChild(tSelectTipoDocumento);

    var labelNumeroDocumento = document.createElement("label");
    labelNumeroDocumento.setAttribute("for", "numeroDocumento"+contador);
    labelNumeroDocumento.textContent = " Numero do Documento: ";
    divWrapper.appendChild(labelNumeroDocumento);
    var tInputNumeroDocumento = document.createElement("input");
    tInputNumeroDocumento.setAttribute("type", "text");
    tInputNumeroDocumento.setAttribute("name", "numeroDocumento"+contador);
    tInputNumeroDocumento.setAttribute("id", "numeroDocumento");
    divWrapper.appendChild(tInputNumeroDocumento);

    let btnRemover = document.createElement("button");
    btnRemover.setAttribute("type", "button");
    btnRemover.textContent = "Remover";
    btnRemover.addEventListener("click", ()=>{  
        divDocumentos.removeChild(divWrapper);
    });
    divWrapper.appendChild(btnRemover);
    divDocumentos.appendChild(divWrapper);
    contador++;
    
}