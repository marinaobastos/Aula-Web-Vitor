function carrega() {
    var form: HTMLFormElement | null = <HTMLFormElement>document.getElementById("formTxt");
    alert((form.nextElementSibling as HTMLButtonElement) ?.innerText);
}