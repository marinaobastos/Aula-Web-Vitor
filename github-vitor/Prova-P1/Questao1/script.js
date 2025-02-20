const estados = [...new Map(imoveis.map(i => [i.estado, { sigla: i.estado.split(' ')[0], nome: i.estado }])).values()];

const estadoSelect = document.getElementById('estado');
const cidadeSelect = document.getElementById('cidade');
const corretorSelect = document.getElementById('corretor');
const enderecoInput = document.getElementById('endereco');
const imoveisTable = document.getElementById('imoveis-table').querySelector('tbody');

function populateFilters() {
  estados.forEach(({ sigla, nome }) => {
    const option = document.createElement('option');
    option.value = sigla;
    option.textContent = nome;
    estadoSelect.appendChild(option);
  });
}

estadoSelect.addEventListener('change', () => {
  cidadeSelect.innerHTML = '<option value="">Selecione a cidade</option>';
  const cidades = [...new Set(imoveis.filter(i => i.estado.startsWith(estadoSelect.value)).map(i => i.cidade))];
  cidades.forEach(cidade => {
    const option = document.createElement('option');
    option.value = cidade;
    option.textContent = cidade;
    cidadeSelect.appendChild(option);
  });
  cidadeSelect.disabled = !cidades.length;

  corretorSelect.innerHTML = '<option value="">Selecione o corretor</option>';
  corretorSelect.disabled = true;
});

cidadeSelect.addEventListener('change', () => {
  corretorSelect.innerHTML = '<option value="">Selecione o corretor</option>';
  const corretores = [...new Set(imoveis.filter(i => i.cidade === cidadeSelect.value).map(i => i.corretor_responsavel))];
  corretores.forEach(corretor => {
    const option = document.createElement('option');
    option.value = corretor;
    option.textContent = corretor;
    corretorSelect.appendChild(option);
  });
  corretorSelect.disabled = !corretores.length;
});

function filterImoveis() {
  const endereco = enderecoInput.value.toLowerCase();
  const estado = estadoSelect.value;
  const cidade = cidadeSelect.value;
  const corretor = corretorSelect.value;

  return imoveis.filter(i =>
    (endereco === '' || i.endereco.toLowerCase().includes(endereco)) &&
    (estado === '' || i.estado.startsWith(estado)) &&
    (cidade === '' || i.cidade === cidade) &&
    (corretor === '' || i.corretor_responsavel === corretor)
  );
}

function renderTable(data) {
  imoveisTable.innerHTML = '';
  data.forEach(imovel => {
    const row = document.createElement('tr');
    Object.values(imovel).forEach(value => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    imoveisTable.appendChild(row);

    row.addEventListener('click', event => {
      const value = event.target.textContent;
      const column = event.target.cellIndex;

      enderecoInput.value = '';
      estadoSelect.value = '';
      cidadeSelect.innerHTML = '<option value="">Selecione a cidade</option>';
      cidadeSelect.disabled = true;
      corretorSelect.value = '';

      let filteredData;
      if (column === 5) { 
        filteredData = imoveis.filter(i => i.valor_do_imovel.toString() === value);
      } else {
        filteredData = imoveis.filter(i => Object.values(i).includes(value));
      }
      

      renderTable(filteredData);
    });
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'F1') {
    event.preventDefault();
    const filtered = filterImoveis();
    renderTable(filtered);
  }
});

populateFilters();
renderTable(imoveis);