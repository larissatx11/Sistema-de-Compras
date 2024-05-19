import React, { useState } from 'react';

export function logout() {
  const confirmacao = window.confirm("Tem certeza que deseja sair?");
  if (confirmacao) {
  // Limpar dados de autenticação (por exemplo, ID de usuário, token de sessão, etc.)
  sessionStorage.removeItem('usuarioLogado');
  // Redirecionar para a página de login 
  window.location.href = '/Sistema-de-Compras/'; 
  }
}

export function excluirConta() {
  const confirmacao = window.confirm("Tem certeza que deseja excluir a conta?");
    
    if (confirmacao) {
        // Obter a lista de usuários do sessionStorage
        const usuarios = JSON.parse(sessionStorage.getItem('usuarios')) || [];
        // Remover o usuário logado da lista
        const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
        const novaListaUsuarios = usuarios.filter(usuario => usuario.email !== usuarioLogado.email);
        // Salvar a nova lista de usuários no sessionStorage
        sessionStorage.setItem('usuarios', JSON.stringify(novaListaUsuarios));
        // Limpar os dados de autenticação do usuário
        sessionStorage.removeItem('usuarioLogado');
        // Redirecionar para a página de login
        window.location.href = '/Sistema-de-Compras/';
    }
}

function realizarLogin(email, senha) {
    // Obter a lista de usuários do sessionStorage
    const usuarios = JSON.parse(sessionStorage.getItem('usuarios')) || [];
    console.log(usuarios);
  
    // Verificar se existe algum usuário com o email fornecido
    const usuario = usuarios.find(user => user.email === email);
  
    if (usuario) {
      // Se o usuário existir, verificar se a senha está correta
      if (usuario.senha === senha) {
        // Se a senha estiver correta, retornar o ID do usuário
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        return usuario.id;
      } else {
        // Se a senha estiver incorreta, retornar null
        return null;
      }
    } else {
      // Se o usuário não existir, retornar null
      return null;
    }
  }

  function LoginUsuario() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
         // Realizar o login
         const usuarioId = realizarLogin(email, senha);

         // Verificar se o usuário foi encontrado
         if (usuarioId !== null) {
             // Limpar os campos do formulário após o login
             setEmail('');
             setSenha('');
 
             // Aqui você pode redirecionar o usuário para outra página, por exemplo
              window.location.href = '/Sistema-de-Compras/home';
         } else {
             // Mostrar um alerta informando que o usuário não foi encontrado ou a senha está incorreta
             alert('Usuário não encontrado ou senha incorreta');
         }
    
        // Limpar os campos do formulário após o login
        setEmail('');
        setSenha('');
    };

    return (
      <div className="container">
        <div className="content-box">
        <header>
            <h1 className="title">Login</h1>
        </header>
        <form className="form-group" onSubmit={handleSubmit}>
          <div className = "campo-entrada">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className = "campo-entrada">
            <label>Senha:</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <button className="btn">Entrar</button>
          <h4>Não possui uma conta? <a href="/Sistema-de-Compras/cadastro">clique aqui</a></h4>
        </form>
        </div>
      </div>
    );
}

export default LoginUsuario;
