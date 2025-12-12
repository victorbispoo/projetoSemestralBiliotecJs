 const id = 5;
 localStorage.setItem("usuarioId", id);
let editando = false;
 const fotodePerfil = document.getElementById("fotoPerfil");
 const btnEditar = document.getElementById("editarPerfilBtn");
  const spanNome = document.getElementById("nomeUsuario")
  const spanEmail = document.getElementById("emailUsuario")
  const spanSenha = document.getElementById("senhaUsuario")



async function carregarPerfil() {
  try{
  const resposta = await fetch(`http://localhost:3000/usuarios/${id}`);
  const dados = await resposta.json();
    spanNome.textContent = dados.nome;
    spanEmail.textContent = dados.email;
    spanSenha.textContent = dados.senha;
    document.getElementById("fotoPerfil").src = dados.foto || "../IMGS/capas/domcasmurro.jpg";
  } catch (erro) {
    console.error("Erro ao carregar perfil:", erro);
  }
}

btnEditar.addEventListener("click", async () => {
    if (editando) {
        console.log("Entrou no modo Salvar.");
        await salvarPerfil(); 
    } else {
        console.log("Entrou no modo Editar.");
        entrarModoEdicao();
    }
});
function entrarModoEdicao() {
    editando = true;
    btnEditar.textContent = "Salvar Alterações";
    btnEditar.style.backgroundColor = "#28a745"; 
    btnEditar.style.color = "#fff";
    spanNome.innerHTML = `<input type="text" id="inputNome" value="${spanNome.textContent}">`;
    spanEmail.innerHTML = `<input type="email" id="inputEmail" value="${spanEmail.textContent}">`;
    spanSenha.innerHTML = `<input type="text" id="inputSenha" value="${spanSenha.textContent}">`;
}

async function salvarPerfil() {
    const novoNome = document.getElementById("inputNome").value;
    const novoEmail = document.getElementById("inputEmail").value;
    const novaSenha = document.getElementById("inputSenha").value;
        console.log("Valores a serem enviados:", {
        nome: novoNome,
        email: novoEmail,
        senha: novaSenha,
    });
    const body = {
        nome: novoNome,
        email: novoEmail,
        senha: novaSenha,
    };
    try {
        const resposta = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (resposta.ok) {
            alert("Perfil atualizado com sucesso!");
            editando = false;
            btnEditar.textContent = "Editar Perfil";
            btnEditar.style.backgroundColor = "";
            btnEditar.style.color = ""; 

            carregarPerfil(); 
        } else {
            alert("Erro ao atualizar.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro de conexão com o servidor.");
    }
}
carregarPerfil();

const fotoPerfil = document.getElementById("fotoPerfil");
const inputFoto = document.getElementById("inputFoto");

fotoPerfil.addEventListener("click", () => {
  inputFoto.click();
});
inputFoto.addEventListener("change", () => {
  const arquivo = inputFoto.files[0];
  if (!arquivo) return;

  const url = URL.createObjectURL(arquivo);
  fotoPerfil.src = url;
});

document.getElementById("inputFoto").addEventListener("change", async (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    const reader = new FileReader();
    reader.onload = async () => {
        const base64 = reader.result;

        await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ foto: base64 })
        });
    };
    
    reader.readAsDataURL(arquivo);
});
