import { useState, useEffect } from 'react';

function useLojaFunctions() {
    const [lojas, setLojas] = useState([]);

    useEffect(() => {
        const storedLojas = JSON.parse(sessionStorage.getItem('lojas'));
        if (storedLojas) {
            setLojas(storedLojas);
        }
    }, []);

    const saveLojasToSessionStorage = (lojas) => {
        sessionStorage.setItem('lojas', JSON.stringify(lojas));
    };

    // Função para adicionar uma nova loja
    const adicionaLoja = (nome, endereco) => {
        const id = Date.now();
        const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
        const userId = usuarioLogado.id; // Obtém o ID do usuário logado
        console.log("id do usuário na loja: ",userId );
        const novaLoja = { id, nome, endereco, userId, editando: false };
        const updatedLojas = [...lojas, novaLoja];
        setLojas(updatedLojas);
        saveLojasToSessionStorage(updatedLojas);
    };

    // Função para remover uma loja
    const removeLoja = (id) => {
        const updatedLojas = lojas.filter(loja => loja.id !== id);
        setLojas(updatedLojas);
        saveLojasToSessionStorage(updatedLojas);
    };

    // Função para atualizar o nome de uma loja
    const atualizaNomeDaLoja = (id, novoNome) => {
        const updatedLojas = lojas.map(loja => loja.id === id ? { ...loja, nome: novoNome } : loja);
        setLojas(updatedLojas);
        saveLojasToSessionStorage(updatedLojas);
    };

    // Função para atualizar o nome de uma loja
    const atualizaEnderecoDaLoja = (id, novoEndereco) => {
        const updatedLojas = lojas.map(loja => loja.id === id ? { ...loja, endereco: novoEndereco } : loja);
        setLojas(updatedLojas);
        saveLojasToSessionStorage(updatedLojas);
    };

    // Função para alternar entre edição e visualização de uma loja
    const toggleEdicao = (id) => {
        const updatedLojas = lojas.map(loja => loja.id === id ? { ...loja, editando: !loja.editando } : loja);
        setLojas(updatedLojas);
        saveLojasToSessionStorage(updatedLojas);
    };

    // Função para adicionar ou atualizar a lista de produtos no objeto do usuário
    function atualizarLojasDoUsuario(produtos) {
        // Obter o usuário logado do sessionStorage
        let usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado')) || {};

        // Adicionar ou atualizar a lista de produtos no objeto do usuário
        usuarioLogado.lojas = lojas;

        // Salvar o usuário atualizado no sessionStorage
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    }

    // Função para obter os produtos do objeto do usuário
    function obterLojasDoUsuario() {
        // Obter o usuário logado do sessionStorage
        const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado')) || {};
        // Filtrar os produtos pelo ID do usuário
        return lojas.filter(loja => loja.userId === usuarioLogado.id);
    }

    return {
        lojas,
        adicionaLoja,
        removeLoja,
        atualizaNomeDaLoja,
        toggleEdicao,
        atualizaEnderecoDaLoja,
        atualizarLojasDoUsuario,
        obterLojasDoUsuario
    };
}

export default useLojaFunctions;
