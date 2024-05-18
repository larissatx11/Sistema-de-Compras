import React, { useState, useEffect } from 'react';

function PaginaUsuario() {
    const [usuario, setUsuario] = useState({});
    const [usuarioOriginal, setUsuarioOriginal] = useState({});
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        const usuarioArmazenado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
        if (usuarioArmazenado) {
            setUsuario(usuarioArmazenado);
            setUsuarioOriginal(usuarioArmazenado);
        }
    }, []);

    const atualizaInformacoesUsuario = (usuarioAtualizado) => {
        setUsuario(usuarioAtualizado);

        const usuarios = JSON.parse(sessionStorage.getItem('usuarios')) || [];
        const index = usuarios.findIndex(u => u.email === usuarioOriginal.email);

        if (index !== -1) {
            usuarios[index] = usuarioAtualizado;
            sessionStorage.setItem('usuarios', JSON.stringify(usuarios));
            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
            setUsuarioOriginal(usuarioAtualizado);
        }
    };

    const handleEditar = () => {
        setEditando(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        atualizaInformacoesUsuario(usuario);
        setEditando(false);
    };

    const handleCancelar = () => {
        setUsuario(usuarioOriginal);
        setEditando(false);
    };

    return (
        <div>       
        <div className="container">
            
            <div className="content-box-usuario">
                <header>
                    <h1 className="title">Informações do Usuário</h1>
                </header>
                {usuario && !editando ? (
                    <div>
                        <p><b>Nome: </b>{usuario.nome}</p>
                        <p><b>Email: </b>{usuario.email}</p>
                        <p><b>Senha: </b>{usuario.senha}</p>
                        <div>
                            <button className="btn" onClick={handleEditar}>Editar</button>
                        </div>
                    </div>
                ) : (
                    <form className="form-group" onSubmit={handleSubmit}>
                        <div className="campo-entrada">
                            <label>Nome:</label>
                            <input
                                type="text"
                                value={usuario.nome}
                                onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
                            />
                        </div>
                        <div className="campo-entrada">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={usuario.email}
                                onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                            />
                        </div>
                        <div className="campo-entrada">
                            <label>Senha:</label>
                            <input
                                type="text"
                                value={usuario.senha}
                                onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
                            />
                        </div>
                        <button className="botao-salvar" type="submit">Salvar</button>
                        <button className="btn" onClick={handleCancelar}>Cancelar</button>
                    </form>
                )}
            </div>
        </div>
        </div>
    );
}

export default PaginaUsuario;
