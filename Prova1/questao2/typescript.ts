document.addEventListener("DOMContentLoaded", ()=>{
    var botaoCriar = document.getElementById("btnCriar");
    var tipoCampo: HTMLSelectElement | null = <HTMLSelectElement>document.getElementById("tipoCampo");
    var exibirMultiplos: HTMLDivElement = <HTMLDivElement>document.getElementById("exibirMultiplos");
    var opcoesMultiplos: HTMLDivElement = <HTMLDivElement>document.getElementById("opcoesMultiplos");
    var qtdOpcoes: HTMLInputElement = <HTMLInputElement>document.getElementById("qtdOpcoes");
    
    botaoCriar?.addEventListener("click", ()=>{
        
        var vlTipoCampo = tipoCampo?.options[tipoCampo.selectedIndex].value;
        exibirMultiplos.hidden = true;
        var idCampo: string  = (<HTMLInputElement>document.getElementById("idCampo"))?.value;
        var nameCampo: string  = (<HTMLInputElement>document.getElementById("nameCampo"))?.value;
        var placeholderCampo: string  = (<HTMLInputElement>document.getElementById("placeholderCampo"))?.value;
        var valores = retiraValoresMultiplos();
        if(vlTipoCampo =="select") {
            criaSelect(opcoesMultiplos, idCampo, nameCampo, placeholderCampo, valores)
        }
        else if(vlTipoCampo =="radio" ||vlTipoCampo =="checkbox" ) {
            criaRadioouCheckbox(vlTipoCampo,opcoesMultiplos, idCampo, nameCampo, placeholderCampo, valores)
        }
        else if(vlTipoCampo =="text" ||vlTipoCampo =="number" ) {
            criaTextOuNumber(vlTipoCampo,opcoesMultiplos, idCampo, nameCampo, placeholderCampo)
        }
        else if(vlTipoCampo =="textarea"  ) {
            criaTextArea(vlTipoCampo,opcoesMultiplos, idCampo, nameCampo, placeholderCampo)
        }
    });
    tipoCampo?.addEventListener("change", ()=>{
        var vlTipoCampo = tipoCampo?.options[tipoCampo.selectedIndex].value;
        if(vlTipoCampo == "select" || vlTipoCampo == "radio" || vlTipoCampo == "checkbox") {
            exibirMultiplos.hidden = false;
        }
        exibirMultiplos.hidden = true;
    });

    qtdOpcoes.addEventListener("change", (ev)=>{
        var valor: number = parseInt(qtdOpcoes.value);
        limpaCampo(opcoesMultiplos);
        for(var i=0;i<valor;i++){
            var label = document.createElement("label");
            label.setAttribute("for", "label_"+i);
            label.textContent=`Valor do Campo ${i}`;
            var campoTexto = document.createElement("input");
            campoTexto.setAttribute('type', "text");
            campoTexto.setAttribute("id","label_"+i);
            opcoesMultiplos.appendChild(label);
            opcoesMultiplos.appendChild(campoTexto);
        }
    })

});

var criaSelect = (campo: HTMLDivElement, idCampo: string, nameCampo: string, placeholderCampo: string, valores: string[])=>{
    var select = document.createElement("select");
    select.setAttribute("name", nameCampo);
    select.setAttribute("id", idCampo);
    select.setAttribute("placeholder", placeholderCampo);
    valores.forEach(element => {
        var option = document.createElement("option");
        option.textContent = element;
        select.appendChild(option);
    });
    campo.appendChild(select);
}

var criaRadioouCheckbox = (tipo: string, campo: HTMLDivElement, idCampo: string, nameCampo: string, placeholderCampo: string, valores: string[])=>{
    
    valores.forEach(element => {
        var campoRadioOuCheckbox = document.createElement("input");
        campoRadioOuCheckbox.setAttribute("name", nameCampo);
        campoRadioOuCheckbox.setAttribute("id", idCampo);
        campoRadioOuCheckbox.value = element;
        campo.appendChild(campoRadioOuCheckbox);
    });
    
}

var criaTextOuNumber= (tipo: string, campo: HTMLDivElement, idCampo: string, nameCampo: string, placeholderCampo: string)=>{
    
        var campoText = document.createElement("input");
        campoText.setAttribute("type", tipo);
        campoText.setAttribute("name", nameCampo);
        campoText.setAttribute("id", idCampo);
        campoText.setAttribute("placeholder", placeholderCampo);
        campo.appendChild(campoText); 
}

var criaTextArea= (tipo: string, campo: HTMLDivElement, idCampo: string, nameCampo: string, placeholderCampo: string)=>{
    var campoText = document.createElement("textarea");
    campoText.setAttribute("name", nameCampo);
    campoText.setAttribute("id", idCampo);
    campoText.setAttribute("placeholder", placeholderCampo);
    campo.appendChild(campoText); 
}

var limpaCampo = (campo: HTMLDivElement | null) =>{
    var campoInterno;
    while(campoInterno = campo?.firstChild) {
        campo.removeChild(campoInterno);
    }
};

var retiraValoresMultiplos = (): string[] => {
    var campos = document.getElementsByTagName("input");
    var retorno = [];
    for(var i = 0; i<campos.length; i++) {
        if(campos[i].getAttribute("id")?.includes("label_")) {
            retorno.push(campos[i].value);
        }
    }
    return retorno;
}