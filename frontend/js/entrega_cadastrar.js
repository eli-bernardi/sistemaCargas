const btn_cadastrar = document.getElementById('btn_cadastrar')

// Carrega as cargas no select
async function carregarCargas() {
    const { dados } = await api('GET', '/cargas')
    document.getElementById('idCarga').innerHTML =
        '<option value="">Selecione...</option>' +
        dados.map(c => '<option value="' + c.codCarga + '">' + esc(c.codCarga + ' - ' + c.descricao + ' (rastreio ' + c.codigoRastreio + ')') + '</option>').join('')
}

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault()
    const valores = {
        idCarga: document.getElementById('idCarga').value,
        cidadeDestino: document.getElementById('cidadeDestino').value,
        status: document.getElementById('status').value,
        dataHora: document.getElementById('dataHora').value
    }

    const { ok, dados } = await api('POST', '/entrega', valores)
    mostrar(dados.message)
    if (ok) document.querySelector('form').reset()
})

carregarCargas()
