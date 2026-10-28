const token = localStorage.getItem('token')
if (!token) {
    location.href = '../index'
}

const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')


btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault()

    const valores = {
        idCarga: document.getElementById('idCarga').value,
        cidadeDestino: document.getElementById('cidadeDestino').value,
        status: document.getElementById('status').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        idMotorista: document.getElementById('idMotorista').value
    }

    fetch(`http://localhost:3000/entrega/cadastrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = `<p>${dados.message}</p>`
            document.querySelector('form').reset()
        })
        .catch(err => {
            console.error('Erro ao cadastrar entrega:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})