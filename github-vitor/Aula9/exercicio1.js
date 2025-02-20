document.addEventListener('DOMContentLoaded', () => {
    var arrayCidades = [{valor:"1",nome:"Nova Friburgo"},
        {valor:"2",nome:"Bom Jardim"},
        {valor:"3",nome:"Miracema"},
        {valor:"4",nome:"Cordeiro"},
        {valor:"5",nome:"Cantagalo"}
    ];
    var select = document.createElement("select");
    arrayCidades.forEach((cidade)=>{
        var option = select.appendChild(document.createElement("option"));
        option.value = cidade.valor;
        option.textContent = cidade.nome;
    })

    document.body.appendChild(select);

    var botao = document.createElement("button");
    botao.setAttribute("type", "button");
    botao.textContent = "Exibir";

    var div = document.createElement("div");
    botao.addEventListener("click", (ev) => {
        div.textContent = select.options[select.selectedIndex].value + " - "+  select.options[select.selectedIndex].textContent+ " - \uD83D\uDC04";
    });
    document.body.appendChild(botao);
    document.body.appendChild(div);
});