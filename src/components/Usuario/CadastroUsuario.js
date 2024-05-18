import React, { useState } from 'react';

export function verificarUsuarioLogado() {
    // Verificar se há um usuário logado armazenado na sessionStorage
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    return usuarioLogado;
}

function cadastrarNovoUsuario(usuario) {
    // Obter a lista de usuários do sessionStorage
    const usuarios = JSON.parse(sessionStorage.getItem('usuarios')) || [];
  
    // Gerar um ID único para o novo usuário
    const id = Date.now();
  
    // Atualizar os dados das listas associadas ao usuário
    const novoUsuario = {
      id: id,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
    };
  
    // Adicionar o novo usuário à lista de usuários
    usuarios.push(novoUsuario);
    
    // Atualizar a lista de usuários no sessionStorage
    sessionStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Retornar o ID do novo usuário
    window.location.href = '/login';
    return id;
  }

  
function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoUsuario = {
      nome: nome,
      email: email,
      senha: senha,
    };
    // Chamada da função de callback para notificar que o usuário foi cadastrado com sucesso
    cadastrarNovoUsuario(novoUsuario);
    // Limpar os campos do formulário após o cadastro
    setNome('');
    setEmail('');
    setSenha('');
  };

  return (
    <div className="container">
      <div className="content-box">
        <header>
            <h1 className="title">Cadastro de Novo Usuário</h1>
        </header>
        <form className="form-group" onSubmit={handleSubmit}>
          <div className = "campo-entrada">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div> 
          <div className = "campo-entrada">
            <label for="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className = "campo-entrada">
            <label for="senha">Senha:</label>
            <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div> 
            <button className="btn">Cadastrar</button>

            <h4>Já possui uma conta? <a href="/login">clique aqui</a></h4>
        </form>
      </div>
    </div>

  );
}

export default CadastroUsuario;

