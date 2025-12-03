const express = require('express');
const cors = require('cors');
const app = express();
const mySQL = require('mysql');

app.use(express.json());
app.use(cors());
var chk = document.getElementById('btnMostrarSenha');
var senha = document.getElementById('password');
var btnEsqueciSenha = document.getElementById('lblEsqueciSenha');
document.addEventListener('DOMContentLoaded', function(){
    chk.addEventListener('change', function(){
        if(senha) senha.type = chk.checked ? 'text' : 'password';
    });
});
btnEsqueciSenha.addEventListener('click', function() 
{
    window.location.href = 'telaRecuperarSenha.html'; // Substitir pelo caminho da página
});

addEventListener('DOMContentLoaded', function() {
    var btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', function() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email === '' || password === '') {
            alert('Por favor, preencha todos os campos.');
        } else {
            // Aqui você pode adicionar a lógica para enviar os dados ao servidor
            alert('Tentando fazer login com email: ' + email);
        }
    });
});