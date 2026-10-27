const btn_login = document.getElementById('btn_login')

btn_login.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }

    fetch(API + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados => {
        mostrar(dados.message)
        if (dados.token) {
            localStorage.setItem('token', dados.token)
            localStorage.setItem('nomeFuncionario', dados.nome)
            location.href = '../index.html'
        }
    })
    .catch((err) => {
        console.error('Erro no login:', err)
        mostrar('Erro ao tentar conectar com o servidor.')
    })
})
