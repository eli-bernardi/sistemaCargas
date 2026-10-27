const btn_buscar = document.getElementById('btn_buscar')

function montarTabela(dados) {
    return tabela(
        ['Código', 'Nome', 'CNH', 'CPF', 'Telefone'],
        dados.map(m => [m.codMotorista, m.nome, m.cnh, m.cpf, m.telefone])
    )
}

btn_buscar.addEventListener('click', async (e) => {
    e.preventDefault()
    const nome = document.getElementById('nome').value
    if (!nome) return mostrar('Informe o nome para buscar!')

    const { dados } = await api('GET', '/motoristas?nome=' + encodeURIComponent(nome))
    document.getElementById('resposta').innerHTML = ''
    document.getElementById('lista').innerHTML = montarTabela(dados)
})
