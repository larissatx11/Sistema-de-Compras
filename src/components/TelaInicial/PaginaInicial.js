// UserList.js
import React from 'react';
 
function UserList() {
    return (
        <div className="container">
            <div className="content-box-inicial">
                <header>
                    <h1 className="title">Bem vindo, Usuário!</h1>
                </header>
                <h2 className="subtitle">Cadastre sua conta aqui:</h2>
                <button className="btn"><a href="/Sistema-de-Compras/cadastro" className="btn-link">Cadastrar</a></button>

                <h2 className="subtitle">Já possui uma conta? Realize o login abaixo:</h2>

                <button className="btn"><a href="/Sistema-de-Compras/login" className="btn-link">Login</a></button>
            </div>
        </div>

    );
}

export default UserList;
