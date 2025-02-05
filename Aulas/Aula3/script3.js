// Usando Object.assign
var a = { "nome": "Vitor", "cidade": "Nova Friburgo" };
var b = { "cidade": "Miracema", "gostosMusicais": ["Rock"] };
var c = Object.assign(Object.assign({}, a), b);

/*
Object.assign({}, a)
Cria um novo objeto vazio {}.
Copia todas as propriedades do objeto 'a' para esse novo objeto.

Agora 'c' contém as mesmas propriedades de 'a', mas é um novo objeto independente.

Object.assign(novoObjeto, b)
Pega novoObjeto (que já tem as propriedades de 'a').
Copia todas as propriedades de 'b' para ele.
Se 'b' tiver propriedades com o mesmo nome que 'a', os valores de 'b' sobrescrevem os de 'a'.
*/

console.log(c);