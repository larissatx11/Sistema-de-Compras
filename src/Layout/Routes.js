import React from 'react';
import '../App.css';
import '../components/Usuario/Usuario.css'
import Layout from './Layout';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaInicial from '../components/TelaInicial/PaginaInicial';
import ProductList from '../components/Produto/ProdutoList';
import StoreList from '../components/Loja/LojaList';
import ListaCompras from '../components/Compras/ListaCompras';
import CadastroUsuario from '../components/Usuario/CadastroUsuario'
import LoginUsuario from '../components/Usuario/LoginUsuario'
import PaginaUsuario from '../components/Usuario/PaginaUsuario'
import Home from '../components/Home/Home'

function RoutesComponents() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PaginaInicial />} index />
          <Route path="/paginaUsuario" element={<PaginaUsuario />} />
          <Route path="/compras" element={<ListaCompras />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/stores" element={<StoreList />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/login" element={<LoginUsuario />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        </Layout>
    </Router>
  );
}

export default RoutesComponents;
