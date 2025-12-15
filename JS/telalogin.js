const API_URL = "http://localhost:3000";
var chk = document.getElementById('btnMostrarSenha');
var senha = document.getElementById('password');
var username = document.getElementById('username');
var lblEsqueciSenha = document.getElementById('lblEsqueciSenha');
var id = null;
async function extrairListaUsuarios() {
    try {
        const resp = await fetch(`${API_URL}/usuarios`);
        if (!resp.ok) throw new Error(`Erro ao buscar usuários: ${resp.status}`);
        const listaUsuarios = await resp.json();
        console.log('Lista de usuários extraída:', listaUsuarios);
        return listaUsuarios;
    } catch (erro) {
        console.error('Erro ao extrair usuários:', erro.message);
        return [];
    }
}
chk.addEventListener('change', function () {
    if (senha) senha.type = chk.checked ? 'text' : 'password';
});
btnEntrar.addEventListener('click', async function (e) {
    e.preventDefault();
    const listaUsuarios = await extrairListaUsuarios();
    if (!username || !senha) return;
    const usernameValue = username.value;
    const senhaValue = senha.value;
    const usuarioEncontrado = listaUsuarios.find(perfil =>
        (perfil.nome === usernameValue || perfil.email === usernameValue) && perfil.senha === senhaValue
    );
    if (usuarioEncontrado) {
        const isAdmin = String(usuarioEncontrado.perfil).trim().toLowerCase() === 'admin';
        localStorage.setItem('isAdmin', isAdmin.toString());
        localStorage.setItem('perfil', usuarioEncontrado.perfil);
        localStorage.setItem('userId', String(usuarioEncontrado.id));
        window.location.href = '../FrontEnd/telaInicial.html';
    }
    else {
        alert('Usuário ou senha incorretos. Tente novamente.');
    }
});
