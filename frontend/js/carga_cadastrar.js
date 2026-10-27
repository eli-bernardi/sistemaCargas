const btn_cadastrar = document.getElementById('btn_cadastrar')

// Carrega os motoristas no select
async function carregarMotoristas() {
    const { dados } = await api('GET', '/motoristas')
    document.getElementById('idMotorista').innerHTML =
        '<option value="">Selecione...</option>' +
        dados.map(m => '<option value="' + m.codMotorista + '">' + esc(m.codMotorista + ' - ' + m.nome) + '</option>').join('')
}

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault()
    const valores = {
        descricao: document.getElementById('descricao').value,
        peso: document.getElementById('peso').value,
        volume: document.getElementById('volume').value,
        codigoRastreio: document.getElementById('codigoRastreio').value,
        idMotorista: document.getElementById('idMotorista').value
    }

    const { ok, dados } = await api('POST', '/carga', valores)
    mostrar(dados.message)
    if (ok) document.querySelector('form').reset()
})

carregarMotoristas()
