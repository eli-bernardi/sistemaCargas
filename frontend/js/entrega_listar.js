const btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', async (e) => {
    e.preventDefault()
    const ordem = document.getElementById('ordem').value
    const status = document.getElementById('filtro_status').value
    const rota = '/entregas?ordem=' + ordem + (status ? '&status=' + status : '')

    const { dados } = await api('GET', rota)
    document.getElementById('lista').innerHTML = tabela(
        ['Código', 'Carga', 'Rastreio', 'Cidade destino', 'Status', 'Data e hora'],
        dados.map(en => [
            en.codEntrega,
            en.carga ? en.carga.codCarga + ' - ' + en.carga.descricao : en.idCarga,
            en.carga ? en.carga.codigoRastreio : '',
            en.cidadeDestino, en.status, dataHoraBR(en.dataHora)
        ])
    )
})
