function carrega2() {
    var form: HTMLFormElement | null = <HTMLFormElement>document.getElementById("formTxt");
    alert((form.nextElementSibling as HTMLButtonElement) ?.innerText);3
    var texto: Text = document.createTextNode("OI")
    texto.nodeValue;
    var parag: HTMLElement = document.createElement("p")
    
    form.append(parag, "Oi");
    form.appendChild(texto);
}