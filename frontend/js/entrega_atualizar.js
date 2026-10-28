const token = localStorage.getItem('token')
if (!token) {
    location.href = '../index'
}

const btn_atualizar = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn_carregar.addEventListener('click', async (e) => {
    e.preventDefault()


    const id = Number(document.getElementById('id').value)

    const valores = {
        codEntrega: document.getElementById('codEntrega').value,
        status: document.getElementById('status').value,
    }
    fetch(`http://localhost:3000/entrega/atualizar`, {
        method: 'PUT',
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
            resposta.innerHTML = `<p>${dados.message}</p>`
            document.querySelector('form').reset()
        })
        .catch(err => {
            console.error('Erro ao atualizar cliente:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})