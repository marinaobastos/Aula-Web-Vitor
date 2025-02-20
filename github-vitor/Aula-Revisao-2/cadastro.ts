document.addEventListener('DOMContentLoaded',  (ev)=>{    
    if(window.location.search != "" && window.location.search.includes("idProduto=")){
  
      const idProduto = window.location.search.split("=")[1];

      recuperaDadosProduto(idProduto);
    }

    document.getElementById("btnCadastrar")?.addEventListener('click', async (ev)=>{
        var form: FormData = new FormData(document.getElementById("formCadastro") as HTMLFormElement);
        const campoId: HTMLInputElement = document.getElementById("idProduto") as HTMLInputElement;
        if(validaCampos(form)){
            if(campoId.value != ""){
              cadastrarEditarProduto(form, "editar");
            }
            else {
              cadastrarEditarProduto(form, "cadastrar");
            }
            
        }
        ev.preventDefault();
    });

});


function validaCampos(form: FormData): boolean{
    let campos: string[] = ["nome", "preco", "fabricante", "tipoUnidade"];
    let valido: boolean = true;
    let informacoes: string = "";
    
    campos.forEach((campo)=>{
        if(!form.has(campo) || form.get(campo)?.toString().trim() == ""){
            valido = false;
            informacoes += `Campo ${campo} não foi preenchido\n`;
        }
    });
    if(informacoes != ""){
        alert(informacoes);
    }
    return valido;
}
async function cadastrarEditarProduto(produto: FormData, op: string){
    try {
      if(produto.has("id") && produto.get("id") == ""){
        produto.delete("id");
      }
      const url: string = 'http://localhost:3000/produtos'+ (op=="cadastrar"?'':'/'+produto.get("id"));
      const response = await fetch(url, {
        method: op=="cadastrar"?'POST':'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(produto)),
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao cadastrar produto: ${response.statusText}`);
      }
  
      const data = await response.json();
      //setTimeout(()=>{}, 2000);
      console.log("Dentro da funcao async");
      alert('Produto cadastrado com sucesso');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
}

async function  recuperaDadosProduto(idProduto: string) {
  try {
    const response = await fetch('http://localhost:3000/produtos/'+idProduto, {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error(`Erro ao excluir: ${response.statusText}`);
    }
    const dadosProduto = await response.json();
    carregaDadosEditarNoFormulario(dadosProduto)
    //limparTabelaProdutod(document.getElementById("tabelaProdutosLista") as HTMLTableElement);
    //listarProdutos();
} catch (error) {
    console.error('Erro ao excluir produto:', error);
}
}

function carregaDadosEditarNoFormulario(produto: any){
    var form: HTMLFormElement = document.getElementById("formCadastro") as HTMLFormElement;

    form.querySelectorAll("input").forEach((input)=>{
            input.setAttribute("value", produto[input.name]);
    });
    form.querySelectorAll("select").forEach((select)=>{
       marcaSelect(select, produto[select.name]);
  });
}

function marcaSelect(campo: HTMLSelectElement, valor: string){
  campo.querySelectorAll("option").forEach((opcao)=>{
    if(opcao.value == valor){
      opcao.setAttribute("selected", "selected");
    }
  });

}