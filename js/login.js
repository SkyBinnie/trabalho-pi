function validaLogin(event) {
    event.preventDefault() // Evita o recarregamento da página

    // Obtendo os valores digitados nos campos
    let loginEmail = btoa(document.getElementById('loginEmail').value)
    let loginSenha = btoa(document.getElementById('loginSenha').value)


    if (!loginEmail || !loginSenha) {
        alert('É obrigatório informar o email e a senha!')
        return
    } 
}


function validaLogin(event) {
    event.preventDefault() // Evita o recarregamento da página

    // Obtendo os valores digitados nos campos
    let cadastroEmail = btoa(document.getElementById('cadastroEmail').value)
    let cadastroSenha = btoa(document.getElementById('cadastroSenha').value)


    if (!cadastroEmail || !cadastroSenha) {
        alert('É obrigatório informar o email e a senha!')
        return
    }
    
}


