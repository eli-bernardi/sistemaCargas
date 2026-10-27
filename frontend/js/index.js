const API = 'http://localhost:3000'

const token = localStorage.getItem('token')
const prefixo = location.pathname.includes('/html/') ? '../' : './'
const paginaLogin = location.pathname.endsWith('login.html')

// Páginas privadas: sem token volta para o login
if (!token && !paginaLogin) {
    location.href = prefixo + 'html/login.html'
}

// Funcionário logado + logout (menu no topo)
document.addEventListener('DOMContentLoaded', () => {
    const spanFunc = document.getElementById('funcionario')
    const btnLogout = document.getElementById('btn_logout')
    if (spanFunc) spanFunc.textContent = localStorage.getItem('nomeFuncionario') || ''
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault()
            localStorage.clear()
            location.href = prefixo + 'html/login.html'
        })
    }
})

// Escapa texto antes de inserir no HTML (evita XSS)
function esc(valor) {
    const d = document.createElement('div')
    d.textContent = valor ?? ''
    return d.innerHTML
}

// fetch autenticado; se a sessão (180 min) expirar, volta para o login
async function api(metodo, rota, corpo) {
    const res = await fetch(API + rota, {
        method: metodo,
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: corpo ? JSON.stringify(corpo) : undefined
    })
    if (res.status === 401) {
        localStorage.clear()
        alert('Sessão expirada. Faça login novamente!')
        location.href = prefixo + 'html/login.html'
        throw new Error('Sessão expirada')
    }
    return { ok: res.ok, dados: await res.json() }
}

function mostrar(msg) {
    document.getElementById('resposta').innerHTML = '<p>' + esc(msg) + '</p>'
}

function tabela(colunas, linhas) {
    if (!linhas.length) return '<p>Nenhum registro encontrado.</p>'
    return '<table border="1"><thead><tr>' + colunas.map(c => '<th>' + esc(c) + '</th>').join('') +
        '</tr></thead><tbody>' + linhas.map(l => '<tr>' + l.map(c => '<td>' + esc(c) + '</td>').join('') + '</tr>').join('') +
        '</tbody></table>'
}

function dataHoraBR(iso) {
    return new Date(iso).toLocaleString('pt-BR')
}
