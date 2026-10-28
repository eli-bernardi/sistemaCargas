const token = localStorage.getItem('token')
if (!token) {
    location.href = '../index'
}

const btn_apagar = document.getElementById('btn_apagar')
const resposta = document.getElementById('resposta')

btn_apagar.addEventListener('click', async (e) => {
    e.preventDefault()

    const id = Number(document.getElementById('id').value)

    if (!id) {
        resposta.innerHTML = '<p>Informe o Código do Cliente!</p>'
        return
    }

    if (!confirm('Tem certeza que deseja excluir este Cliente?')) {
        return
    }
    fetch(`http://localhost:3000/motorista/apagar/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
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
            console.error('Erro ao apagar motorista:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})