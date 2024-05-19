import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { verificarUsuarioLogado } from '../components/Usuario/CadastroUsuario'; // Importe a função de verificação de usuário logado
import { excluirConta, logout } from '../components/Usuario/LoginUsuario';

function Layout({ children }) {
  const [menuWidth, setMenuWidth] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIconPosition, setMenuIconPosition] = useState(0);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const usuarioLogado = verificarUsuarioLogado(); // Verifica se há usuário logado

  const location = useLocation();

  useEffect(() => {
    const menu = document.querySelector('.menu');
    if (menu) {
      const width = menu.offsetWidth;
      setMenuWidth(width);
    }
  }, []);

  const toggleMenu = () => {
    if (!usuarioLogado && (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/cadastro")) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000); // Oculta a mensagem após 3 segundos
    } else {
      setMenuOpen(!menuOpen);
      setMenuIconPosition(menuOpen ? 0 : menuWidth);
    }
  };

  const handleClickOutside = (event) => {
    const menu = document.querySelector('.menu');
    const menuIcon = document.querySelector('.menu-icon');

    if (menu && menuIcon && !menu.contains(event.target) && !menuIcon.contains(event.target)) {
      setMenuOpen(false);
      setMenuIconPosition(0);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div>
      {usuarioLogado && (
        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/home" className="menu-link">Home</Link></li>
            <li><Link to="/paginaUsuario" className="menu-link">Perfil</Link></li>
            <li><Link to="/stores" className="menu-link">Lista de Lojas</Link></li>
            <li><Link to="/products" className="menu-link">Lista de Produtos</Link></li>
            <li><Link to="/compras" className="menu-link">Lista de Compras</Link></li>
            <li><div className="menu-link" onClick={logout}>Logout</div></li> 
            <li><div className="menu-link" onClick={excluirConta}>Excluir Conta</div></li>
          </ul>
        </div>
      )}
      <div className="menu-icon" style={{ marginLeft: menuIconPosition }} onClick={toggleMenu}>
        <img src="Site_Lista/menu.png" alt="Ícone de menu" />
      </div>

      {showLoginMessage && <div className="login-message">Faça Login para ativar o menu</div>}

      {children}
    </div>
  );
}

export default Layout;
