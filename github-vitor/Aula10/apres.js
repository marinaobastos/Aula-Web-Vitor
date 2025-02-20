var arrayA = [ { nome: 'Ana', altura: 1.75 },
    { nome: 'Bia', altura: 1.40 },
    { nome: 'Carlos', altura: 1.72 },
    { nome: 'Darlan', altura: 1.68 }
    ]
    
    arrayB = arrayA.map(e=>{return {...e, altura2: e.altura*2}});
    console.log(arrayB);