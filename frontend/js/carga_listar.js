const btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', async (e) => {
    e.preventDefault()
    const { dados } = await api('GET', '/cargas')
    document.getElementById('lista').innerHTML = tabela(
        ['Código', 'Descrição', 'Peso (kg)', 'Volume (m³)', 'Rastreio', 'Motorista'],
        dados.map(c => [
            c.codCarga, c.descricao, c.peso, c.volume, c.codigoRastreio,
            c.motorista ? c.motorista.codMotorista + ' - ' + c.motorista.nome : c.idMotorista
        ])
    )
})
