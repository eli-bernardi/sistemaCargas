const btn_listar = document.getElementById('btn_listar')

function montarTabela(dados) {
    return tabela(
        ['Código', 'Nome', 'CNH', 'CPF', 'Telefone'],
        dados.map(m => [m.codMotorista, m.nome, m.cnh, m.cpf, m.telefone])
    )
}

async function listar() {
    const { dados } = await api('GET', '/motoristas')
    document.getElementById('lista').innerHTML = montarTabela(dados)
}

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()
    listar()
})
