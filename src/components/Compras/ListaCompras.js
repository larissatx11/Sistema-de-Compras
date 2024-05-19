import React from 'react';
import useProdutoFunctions from '../Produto/useProdutoFunctions';
import useLojaFunctions from '../Loja/useLojaFunctions';
import useListaComprasFunctions from './useListaComprasFunctions';
import { verificarUsuarioLogado } from '../Usuario/CadastroUsuario'; 

function ListaDeComponentes() {
    const { produtos } = useProdutoFunctions();
    const { lojas } = useLojaFunctions();
    const usuarioLogado = verificarUsuarioLogado(); 

    const {
        posts,
        selectedProdutoId,
        handleChangeProduto,
        handleSubmit,
        apagaComponente,
        atualizaContentDoComponente,
        toggleEdicao,
        buscarNomeLoja
    } = useListaComprasFunctions(produtos, lojas);
    
    const produtosSelecionadosUsuarioAtual = posts.filter(post => post.userId === usuarioLogado.id);
    console.log("Produtos selecionados: ",produtosSelecionadosUsuarioAtual);
    return (
        <div>
            <header>
                <h1>Lista de Compras</h1>
            </header>
            <img className="center-image" src="Site_Lista/compras.png" alt="Imagem Compras" />
            {usuarioLogado ? (
                <div>
                    <form onSubmit={handleSubmit}>
                        <select name="campoCriaComponente" value={selectedProdutoId || ''} onChange={handleChangeProduto} title="Selecione um produto">
                            <option value="">Selecione o produto</option>
                            {produtos.filter(produto => produto.userId === usuarioLogado.id).map(produto => (
                                <option key={produto.id} value={produto.id}>{produto.nome}</option>
                            ))}
                        </select>
                        <button type="submit" className="btn-add"><img className="adicionar-img" src="Site_Lista/adicionar.png" alt="Adicionar" /></button>
                    </form>
                    <ul className="listasDeComponentes">
                        {produtosSelecionadosUsuarioAtual.map(post => (
                            <li key={post.id}>
                                <input
                                    type="checkbox"                                  
                                    className="checkbox"
                                />
                                <span>
                                    <>
                                    <span className="label">Produto: </span>{post.nome} <br />
                                    <span className="label">Preço: </span>R$ {post.preco.toFixed(2)} <br />
                                    <span className="label">Loja: </span>{buscarNomeLoja(post.lojaId)}
                                    </>
                                </span>

                                {post.editando ? (
                                <div className="editando">
                                    <div className="campo-editar">
                                        <div className="inputs-container">
                                            <label for="produto">Produto:</label>
                                            <select
                                                value={post.content}
                                                onBlur={() => toggleEdicao(post.id)}
                                                onChange={(e) => atualizaContentDoComponente(post.id, e.target.value)}
                                                autoFocus // Foca automaticamente na combobox quando entra em modo de edição
                                            >
                                                <option value="">Selecione o produto</option>
                                                {produtos.filter(produto => produto.userId === usuarioLogado.id).map(produto => (
                                                    <option key={produto.id} value={produto.id}>{produto.nome}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="botoes-container">
                                        <button className="btn-edit" onClick={() => toggleEdicao(post.id)}>
                                            <img
                                                className="edit-img"
                                                src={"Site_Lista/ok.png"}
                                                alt={"Concluir"}
                                            />
                                        </button>
                                        <button className="btn-delete" onClick={() => apagaComponente(post.id)}>
                                            <img className="delete-img" src="Site_Lista/deletar.png" alt="Deletar" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="não-editando">
                                    <button className="btn-edit" onClick={() => toggleEdicao(post.id)}>
                                        <img
                                            className="edit-img"
                                            src={"Site_Lista/editar.png"}
                                            alt={"Editar"}
                                        />
                                    </button>
                                    <button className="btn-delete" onClick={() => apagaComponente(post.id)}>
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


export default ListaDeComponentes;