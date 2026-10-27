const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault()
    const valores = {
        nome: document.getElementById('nome').value,
        cnh: document.getElementById('cnh').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    }

    const { ok, dados } = await api('POST', '/motorista', valores)
    mostrar(dados.message)
    if (ok) document.querySelector('form').reset()
})
