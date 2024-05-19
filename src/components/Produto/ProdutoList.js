import React, { useState } from 'react';
import useProdutoFunctions from './useProdutoFunctions'; 
import useLojaFunctions from '../Loja/useLojaFunctions'; 
import { verificarUsuarioLogado } from '../Usuario/CadastroUsuario'; // Importe a função de verificação de usuário logado

function ProdutoList() {
    const {adicionaProduto, removeProduto, toggleEdicao, atualizaNomeDoProduto, atualizaPrecoDoProduto, atualizaLojaDoProduto, buscarNomeLoja, atualizarProdutosDoUsuario, 
    obterProdutosDoUsuario } = useProdutoFunctions(); 
    const { lojas } = useLojaFunctions(); 
    const [selectedLojaId, setSelectedLojaId] = useState('');
    const produtos = obterProdutosDoUsuario(); // Obtenha os produtos do usuário
    const usuarioLogado = verificarUsuarioLogado();
    const userId = usuarioLogado.id; // Obtém o ID do usuário logado
    console.log("Id do usuário: ",userId);

    const handleChangeLoja = (e) => {
        setSelectedLojaId(e.target.value);
    };

    return (
        <div>
            <header>
                <h1>Produtos</h1>
            </header>
            {usuarioLogado ? (
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const nome = e.target.nome.value.trim();
                        const preco = parseFloat(e.target.preco.value);
                        if (nome !== '' && !isNaN(preco) && preco > 0) {
                            adicionaProduto(nome, preco, selectedLojaId);
                            const produtosAtualizados = [...produtos, { nome, preco, lojaId: selectedLojaId }];
                            atualizarProdutosDoUsuario(produtosAtualizados);
                            e.target.nome.value = '';
                            e.target.preco.value = '';
                            setSelectedLojaId(''); // Limpa a seleção da loja após a adição do produto
                        }
                    }}>
                        <input type="text" name="nome" placeholder="Nome do produto" />
                        <input type="number" name="preco" step="0.01" placeholder="Preço do produto" />
                        <select value={selectedLojaId || ""} onChange={handleChangeLoja} title="Selecione uma loja">
                            <option value="">Selecione a loja</option>
                            {lojas.filter(loja => loja.userId === userId).map(loja => (
                                <option key={loja.id} value={loja.id}>{loja.nome}</option>
                            ))}
                        </select>
                        <button type="submit" className="btn-add"><img className="adicionar-img" src="Site_Lista/adicionar.png" alt="Adicionar"></img></button>
                    </form>
                    <ul className="listasDeComponentes">
                        {produtos.map(produto => (
                            <li key={produto.id}>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                />
                                <span> 
                                    <>
                                    <span className="label">Produto: </span> {produto.nome} <br />
                                    <span className="label">Preço:</span> R$  {produto.preco.toFixed(2)} <br />
                                    <span className="label">Loja: </span> {buscarNomeLoja(produto.lojaId, lojas)}
                                    </>
                                </span>
                                {produto.editando ? (
                                    <div className="editando">
                                        <div className="campo-editar">
                                            <div className="inputs-container">
                                                <label for="nome">Nome:</label>
                                                <input
                                                    type="text"
                                                    value={produto.nome}
                                                    onChange={(e) => atualizaNomeDoProduto(produto.id, e.target.value)}
                                                    autoFocus
                                                />
                                                <label for="preco">Preço:</label>
                                                <input
                                                    type="number"
                                                    value={produto.preco}
                                                    onChange={(e) => atualizaPrecoDoProduto(produto.id, parseFloat(e.target.value))}
                                                />
                                                <label for="loja">Loja:</label>
                                                <select value={produto.lojaId} onChange={(e) => atualizaLojaDoProduto(produto.id, e.target.value)}>
                                                {lojas.filter(loja => loja.userId === userId).map(loja => (
                                                    <option key={loja.id} value={loja.id}>{loja.nome}</option>
                                                ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="botoes-container">
                                            <button className="btn-edit" onClick={() => toggleEdicao(produto.id)}><img
                                                className="edit-img"
                                                src={produto.editando ? "Site_Lista/ok.png" : "Site_Lista/editar.png"}
                                                alt={produto.editando ? "Concluir" : "Editar"}
                                            /></button>
                                            <button className="btn-delete" onClick={() => removeProduto(produto.id)}>
                                                <img className="delete-img" src="Site_Lista/deletar.png" alt="Deletar" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn-edit" onClick={() => toggleEdicao(produto.id)}>
                                        <img
                                            className="edit-img"
                                            src={produto.editando ? "Site_Lista/ok.png" : "Site_Lista/editar.png"}
                                            alt={produto.editando ? "Concluir" : "Editar"}
                                        />
                                    </button>
                                    <button className="btn-delete" onClick={() => removeProduto(produto.id)}>
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

export default ProdutoList;
