const btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', async (e) => {
    e.preventDefault()
    const codigo = document.getElementById('codigo').value
    if (!codigo) return mostrar('Informe o código da entrega!')

    const { dados } = await api('PUT', '/entrega/' + codigo, { status: document.getElementById('status').value })
    mostrar(dados.message)
})
