import React, { useState, useEffect } from 'react';

function PaginaUsuario() {
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        const usuarioArmazenado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
        if (usuarioArmazenado) {
            setUsuario(usuarioArmazenado);
        }
    }, []);

    return (
        <div className="container ">
            <h1 className = "texto-topo">Olá, {usuario.nome}</h1>
            <p> Sistema de Controle de Compras</p>
        </div>
    );
}

export default PaginaUsuario;
