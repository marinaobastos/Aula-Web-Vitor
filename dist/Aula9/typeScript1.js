"use strict";
class Cidade {
    constructor(valor, nome) {
        this.nome = nome;
        this.valor = valor;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    var arrayCidades = [new Cidade(1, "Nova Friburgo"),
        new Cidade(2, "Bom Jardim"),
        new Cidade(3, "Miracema"),
        new Cidade(4, "Cordeiro"),
        new Cidade(5, "Cantagalo")
    ];
    var select = document.createElement("select");
    arrayCidades.forEach((cidade) => {
        var option = select.appendChild(document.createElement("option"));
        option.value = cidade.valor.toString();
        option.textContent = cidade.nome;
    });
    document.body.appendChild(select);
    var botao = document.createElement("button");
    botao.setAttribute("type", "button");
    botao.textContent = 'Exibir\u{0169}';
    var div = document.createElement("div");
    botao.addEventListener("click", (ev) => {
        div.textContent = select.options[select.selectedIndex].value + " - " + select.options[select.selectedIndex].textContent + " -  \uD83D\uDC04";
    });
    document.body.appendChild(botao);
    document.body.appendChild(div);
});
