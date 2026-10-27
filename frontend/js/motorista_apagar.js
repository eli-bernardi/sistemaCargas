const btn_apagar = document.getElementById('btn_apagar')

btn_apagar.addEventListener('click', async (e) => {
    e.preventDefault()
    const codigo = document.getElementById('codigo').value
    if (!codigo) return mostrar('Informe o código do motorista!')
    if (!confirm('Deseja realmente excluir o motorista ' + codigo + '?')) return

    const { ok, dados } = await api('DELETE', '/motorista/' + codigo)
    mostrar(dados.message)
    if (ok) document.querySelector('form').reset()
})
