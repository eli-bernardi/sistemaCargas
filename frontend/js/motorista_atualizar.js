const btn_carregar = document.getElementById('btn_carregar')
const btn_atualizar = document.getElementById('btn_atualizar')

btn_carregar.addEventListener('click', async (e) => {
    e.preventDefault()
    const codigo = document.getElementById('codigo').value
    if (!codigo) return mostrar('Informe o código do motorista!')

    const { ok, dados } = await api('GET', '/motorista/' + codigo)
    if (!ok) return mostrar(dados.message)

    document.getElementById('nome').value = dados.nome
    document.getElementById('cnh').value = dados.cnh
    document.getElementById('cpf').value = dados.cpf
    document.getElementById('telefone').value = dados.telefone
    mostrar('Dados carregados. Altere e clique em Atualizar.')
})

btn_atualizar.addEventListener('click', async (e) => {
    e.preventDefault()
    const codigo = document.getElementById('codigo').value
    if (!codigo) return mostrar('Informe o código do motorista!')
    const valores = {
        nome: document.getElementById('nome').value,
        cnh: document.getElementById('cnh').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    }

    const { dados } = await api('PUT', '/motorista/' + codigo, valores)
    mostrar(dados.message)
})
