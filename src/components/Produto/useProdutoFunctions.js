import { useState, useEffect } from 'react';

function useProdutoFunctions() {
    const [produtos, setProdutos] = useState([]);

    // Função para obter os produtos armazenados no sessionStorage ao carregar a página
    useEffect(() => {
        const produtosSalvos = JSON.parse(sessionStorage.getItem('produtos'));
        if (produtosSalvos) {
            setProdutos(produtosSalvos);
        }
    }, []);

    // Função para buscar o nome da loja pelo id
    const buscarNomeLoja = (id, lojas) => {
        // Convertendo o ID para número, caso necessário
        const idNumero = parseInt(id);
        const lojaEncontrada = lojas.find(loja => loja.id === idNumero);
        return lojaEncontrada ? lojaEncontrada.nome : 'N/A';
    };

    const saveProdutosToSessionStorage = (produtos) => {
        // Salva os produtos atualizados no sessionStorage
        sessionStorage.setItem('produtos', JSON.stringify(produtos));
    };    

    // Função para adicionar um novo produto
    const adicionaProduto = (nome, preco, lojaId) => {
        const id = Date.now();
        const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
        const userId = usuarioLogado.id; // Obtém o ID do usuário logado
        const novoProduto = { id, nome, preco, lojaId, userId, editando: false };
        const novosProdutos = [...produtos, novoProduto];
        console.log("Produto: ",novoProduto);
        setProdutos(novosProdutos);
        // Salva os produtos atualizados no sessionStorage
        saveProdutosToSessionStorage(novosProdutos);
    };

    // Função para remover um produto
    const removeProduto = (id) => {
        const updatedProdutos = produtos.filter(produto => produto.id !== id);
        setProdutos(updatedProdutos);
        // Salva os produtos atualizados no sessionStorage
        saveProdutosToSessionStorage(updatedProdutos);
    };

    // Função para atualizar o nome de um produto
    const atualizaNomeDoProduto = (id, novoNome) => {
        const updatedProdutos = produtos.map(produto => produto.id === id ? { ...produto, nome: novoNome } : produto);
        setProdutos(updatedProdutos);
        // Salva os produtos atualizados no sessionStorage
        saveProdutosToSessionStorage(updatedProdutos);
    };

    // Função para atualizar o preço de um produto
    const atualizaPrecoDoProduto = (id, novoPreco) => {
        const updatedProdutos = produtos.map(produto => produto.id === id ? { ...produto, preco: novoPreco } : produto);
        setProdutos(updatedProdutos);
        // Salva os produtos atualizados no sessionStorage
        saveProdutosToSessionStorage(updatedProdutos);
    };

    // Função para atualizar a loja de um produto
    const atualizaLojaDoProduto = (id, novoIdLoja) => {
        const updatedProdutos = produtos.map(produto => produto.id === id ? { ...produto, lojaId: novoIdLoja } : produto);
        setProdutos(updatedProdutos);
        // Salva os produtos atualizados no sessionStorage
        saveProdutosToSessionStorage(updatedProdutos);
    };

    // Função para alternar entre edição e visualização de um produto
    const toggleEdicao = (id) => {
        const updatedProdutos = produtos.map(produto => produto.id === id ? { ...produto, editando: !produto.editando } : produto);
        setProdutos(updatedProdutos);
        // Salva os produtos atualizados no sessionStorage
        saveProdutosToSessionStorage(updatedProdutos);
    };

    // Função para adicionar ou atualizar a lista de produtos no objeto do usuário
    function atualizarProdutosDoUsuario(produtos) {
        // Obter o usuário logado do sessionStorage
        let usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado')) || {};

        // Adicionar ou atualizar a lista de produtos no objeto do usuário
        usuarioLogado.produtos = produtos;

        // Salvar o usuário atualizado no sessionStorage
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    }

    // Função para obter os produtos do objeto do usuário
    function obterProdutosDoUsuario() {
        // Obter o usuário logado do sessionStorage
        const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado')) || {};
        // Filtrar os produtos pelo ID do usuário
        return produtos.filter(produto => produto.userId === usuarioLogado.id);
    }

    return {
        produtos,
        adicionaProduto,
        removeProduto,
        atualizaNomeDoProduto,
        atualizaPrecoDoProduto,
        toggleEdicao,
        atualizaLojaDoProduto,
        buscarNomeLoja,
        atualizarProdutosDoUsuario, 
        obterProdutosDoUsuario
    };
}

export default useProdutoFunctions;
