const token = localStorage.getItem('token')
if (!token) {
    location.href = '../index'
}

const btn_listar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

btn_listar.addEventListener('click', async (e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/entrega/listar`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
        .then(res => {
            if (!res.ok) {
                localStorage.clear()
                alert('Faça login novamente, tempo expirado!')
                location.href = '../index.html'
                throw new Error('Sessão expirada')
            }
            return res.json()
        })
        .then(dados => {
            console.log(dados)
            resposta.innerHTML = ''
            resposta.innerHTML += `
        <table>
            ${criarThead()}
            ${criarTbody(dados)}
        </table>
    `
        })
        .catch((err) => {
            console.error('Erro ao listar os dados', err)
            resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
        })
})

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.idCarga}</td>`
        corpo += `<td>${el.cidadeDestino}</td>`
        corpo += `<td>${el.status}</td>`
        corpo += `<td>${el.data}</td>`
        corpo += `<td>${el.hora}</td>`
        corpo += `<td>${el.idMotorista}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
    <thead>
        <tr>
            <th>ID da Carga:/th>
            <th>Cidade Destino:</th>
            <th>Status:</th>
            <th>Data:</th>
            <th>Hora:</th>
            <th>ID do Motorista:</th>
        </tr>
    </thead>
`
}