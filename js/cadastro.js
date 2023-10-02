function salvarCadastro(event){

    event.preventDefault();

    //obtendo os dados do formulário
    let cadastroEmail = document.getElementById('cadastroEmail');
if (cadastroEmail) {
    cadastroEmail = cadastroEmail.value;
}
    let cadastroSenha = document.getElementById('cadastroSenha').value;


    let cadastroNome = document.getElementById('cadastroNome').value;
    let cadastroData = document.getElementById('cadastroData').value;
    let cadastroSexo;
    let sexoElems = document.getElementsByName('sexo');
    for(let i = 0; i < sexoElems.length; i++) {
        if(sexoElems[i].checked) {
            cadastroSexo = sexoElems[i].value;
            break;
        }     
    }
    let cadastroNumero = document.getElementById('cadastroNumero').value;
    let cadastroEndereco = document.getElementById('cadastroEndereco').value;
    let cadastroEnderecoRef = document.getElementById('cadastroEnderecoRef').value;
    
    // Para cidade
    let cidadeElems = document.getElementsByName('cities');
    let cidadesSelecionadas = [];
    for(let i = 0; i < cidadeElems.length; i++){
        if(cidadeElems[i].checked){
            cidadesSelecionadas.push(cidadeElems[i].value);
        }
    }
    let cidade = cidadesSelecionadas.join(", ");

    let cadastroEstado = document.getElementById('inputState').value;

    if (!cadastroSenha || !cadastroEmail){
        alert('É obrigatório preencher todos os campos!!')

        return    
    }
    if (!cadastroNome || !cadastroData){
        alert('É obrigatório preencher todos os campos!!') 
        return    
    }
    if (!cadastroSexo || !cadastroNumero){
        alert('É obrigatório preencher todos os campos!!') 
        return  
    }
    if (!cadastroEndereco|| !cadastroEnderecoRef){
        alert('É obrigatório preencher todos os campos!!')  
        return  
    }
    if (!cidade || !cadastroEstado){
        alert('É obrigatório preencher todos os campos!!')
        return  
    }
    else {
        alert('Cadastro completo!')

       
    }
    //criando um objeto com os dados do cliente

        let cadastro = 
    {   cadastroEmail:cadastroEmail,
        cadastroSenha:cadastroSenha,
        cadastroNome:cadastroNome,
        cadastroData:cadastroData,
        cadastroSexo:cadastroSexo,
        cadastroNumero:cadastroNumero,
        cadastroEndereco:cadastroEndereco,
        cadastroEnderecoRef:cadastroEnderecoRef,
        cidade:cidade,
        cadastroEstado:cadastroEstado
    }
        //criando o array de clientes

    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []

    //adicionando o cliente ao array de clientes.
    //método push adiciona no fim do array

    cadastros.push(cadastro)

    //salva a lista atualizada no localstorage

    localStorage.setItem('cadastros', JSON.stringify(cadastros))

    //atualizamos a tabela

    listarCadastros()
}

function listarCadastros() {
    // obtendo os dados
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []
    //obtendo onde iremos inserir a tabela
    let tabela = document.getElementById('listagem')
    tabela.innerHTML = ''// limpamos a tabela
    // criamos uma tabela em HTML
    let table = document.createElement('table')
    table.className = 'table table-bordered'
    table.innerHTML =  `<thead>
                        <tr class='table-success'>
                        <th>cadastroEmail</th>
                        <th>cadastroSenha</th>
                        <th>cadastroNome</th>
                        <th>cadastroData</th>
                        <th>cadastroSexo</th>
                        <th>cadastroNumero</th>
                        <th>cadastroEndereco</th>
                        <th>cadastroEnderecoRef</th>
                        <th>cidade</th>
                        <th>cadastroEstado</th>
                       </tr>
                       </thead>
                       <tbody>
                       </tbody>`

    //preenchendo a atabela com os dados do cliente

    let tbody = table.querySelector('tbody')

    for(let i=0; i<cadastros.length; i++){
        let cadastro = cadastros[i]
        let row = tbody.insertRow(i)
        row.innerHTML = `
    <td>${cadastro.cadastroEmail}</td>
    <td>${cadastro.cadastroSenha}</td>
    <td>${cadastro.cadastroNome}</td>
    <td>${cadastro.cadastroData}</td>
    <td>${cadastro.cadastroSexo}</td>
    <td>${cadastro.cadastroNumero}</td>
    <td>${cadastro.cadastroEndereco}</td>
    <td>${cadastro.cadastroEnderecoRef}</td>
    <td>${cadastro.cidade}</td>
    <td>${cadastro.cadastroEstado}</td>
    <td><button class='btn btn-danger' onclick="apagarCadastro('${cadastro.cadastroNumero}')">Apagar</button></td>
`;
    }

 
    tabela.appendChild(table)

}

//chamar a função logo que carregar a pagina

listarCadastros()

function apagarCadastro(cadastroNumero){

    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []

    //filtramos a lista de clientes para remover o Cpf

    cadastros = cadastros.filter(function(cadastro){

        return cadastro.cadastroNumero !== cadastroNumero
    })

    //atualizamos o localStorage com a nova lista de clientes

    localStorage.setItem('cadastros', JSON.stringify(cadastros))

    //atualizamos a UI

    listarCadastros()

}

function formatarcadastroNumero(cadastroNumero){

    //remove todos os caracteres não numericos

    cadastroNumero = cadastroNumero.replace(/\D/g,'') //substitui não digito por nada ''

 

    //adiciona pontos e traços no formato do telefone

    cadastroNumero=cadastroNumero.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3')

    return cadastroNumero

}

 

//exemplo de uso:

const cadastroNumero=document.getElementById('cadastroNumero')

document.addEventListener("DOMContentLoaded", listarCadastros);

document.addEventListener("DOMContentLoaded", function() {
    const cadastroNumero = document.getElementById('cadastroNumero');
    cadastroNumero.addEventListener('input', function() {
        this.value = formatarcadastroNumero(this.value);
    });
});