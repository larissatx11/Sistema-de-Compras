import React from 'react';
import useLojaFunctions from './useLojaFunctions';
import { verificarUsuarioLogado } from '../Usuario/CadastroUsuario'; // Substitua pelo caminho correto do arquivo

function LojaList() {
    const {adicionaLoja, removeLoja, toggleEdicao, atualizaNomeDaLoja, atualizaEnderecoDaLoja, atualizarLojasDoUsuario, obterLojasDoUsuario } = useLojaFunctions();
    const lojas = obterLojasDoUsuario(); // Obtenha os produtos do usuário
    const usuarioLogado = verificarUsuarioLogado();

    return (
        <div>
            <header>
                <h1>Lojas</h1>
            </header>
            {usuarioLogado ? (
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const nome = e.target.nome.value.trim();
                        const endereco = e.target.endereco.value.trim();
                        if (nome !== '' && endereco !== '') {
                            adicionaLoja(nome, endereco);
                            const lojasAtualizados = [...lojas, { nome, endereco }];
                            atualizarLojasDoUsuario(lojasAtualizados);
                            e.target.nome.value = '';
                            e.target.endereco.value = '';
                        }
                    }}>
                        <input type="text" name="nome" placeholder="Nome da loja" />
                        <input type="text" name="endereco" placeholder="Endereço da loja" />
                        <button type="submit" className="btn-add"><img className="adicionar-img" src="Site_Lista/adicionar.png" alt="Adicionar"></img></button>
                    </form>
                    <ul className="listasDeComponentes">
                        {lojas.map(loja => (
                            <li key={loja.id}>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                />
                                <span>
                                    <>
                                    <span className="label">Loja:</span> {loja.nome} <br />
                                    <span className="label">Endereço:</span> {loja.endereco} <br />
                                    </>
                                </span>
                                {loja.editando ? (
                                    <div className="editando">
                                        <div className="campo-editar">
                                            <div className="inputs-container">
                                                <label for="loja">Loja:</label>
                                                <input
                                                    type="text"
                                                    value={loja.nome}
                                                    onChange={(e) => atualizaNomeDaLoja(loja.id, e.target.value)}
                                                    autoFocus
                                                />
                                                <label for="loja">Endereço:</label>
                                                <input
                                                    type="text"
                                                    value={loja.endereco}
                                                    onChange={(e) => atualizaEnderecoDaLoja(loja.id, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="botoes-container">
                                            <button className="btn-edit" onClick={() => toggleEdicao(loja.id)}>
                                                <img
                                                    className="edit-img"
                                                    src={loja.editando ? "Site_Lista/ok.png" : "Site_Lista/editar.png"}
                                                    alt={loja.editando ? "Concluir" : "Editar"}
                                                />
                                            </button>
                                            <button className="btn-delete" onClick={() => removeLoja(loja.id)}>
                                                <img className="delete-img" src="Site_Lista/deletar.png" alt="Deletar" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="não-editando">
                                        <button className="btn-edit" onClick={() => toggleEdicao(loja.id)}>
                                            <img
                                                className="edit-img"
                                                src={loja.editando ? "Site_Lista/ok.png" : "Site_Lista/editar.png"}
                                                alt={loja.editando ? "Concluir" : "Editar"}
                                            />
                                        </button>
                                        <button className="btn-delete" onClick={() => removeLoja(loja.id)}>
                                            <img className="delete-img" src="Site_Lista/deletar.png" alt="Deletar" />
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Usuário não logado!</p>
            )}
        </div>
    );
}

export default LojaList;
