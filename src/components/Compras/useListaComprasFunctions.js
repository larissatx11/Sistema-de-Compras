import { useState, useEffect } from 'react';

const useListaComprasFunctions = (produtos, lojas) => {
    const [posts, setPosts] = useState([]);
    const [selectedProdutoId, setSelectedProdutoId] = useState('');
    const [produtosSelecionadosUsuarioAtual, setProdutosSelecionadosUsuarioAtual] = useState([]);

    useEffect(() => {
        const listaComprasSalva = JSON.parse(sessionStorage.getItem('listaCompras'));
        if (listaComprasSalva) {
            setPosts(listaComprasSalva);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedProdutoId !== '') {
            criaComponente(selectedProdutoId); // Passa o ID do produto selecionado
          //  setSelectedProdutoId(''); // Limpa o ID do produto selecionado após a criação da postagem
        }
    };
    
    const handleChangeProduto = (e) => {
        setSelectedProdutoId(e.target.value);
    };

    // Função para criar um novo componente
    const criaComponente = () => {
        const produtoSelecionado = produtos.find(produto => produto.id === Number(selectedProdutoId));
        const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
        if (produtoSelecionado) {
            const novoComponente = {
                id: Date.now(),
                nome: produtoSelecionado.nome,
                preco: produtoSelecionado.preco,
                lojaId: produtoSelecionado.lojaId,
                userId: usuarioLogado.id, // Adiciona o ID do usuário
                editando: false
            };
            setPosts(prevPosts => [...prevPosts, novoComponente]); // Adiciona o novo componente à lista de posts

            // Atualiza a lista de produtos selecionados pelo usuário atual
            setProdutosSelecionadosUsuarioAtual(prevProducts => [...prevProducts, novoComponente]);
            
            // Atualiza o sessionStorage com os posts atualizados
            sessionStorage.setItem('listaCompras', JSON.stringify([...posts, novoComponente]));
        }
    };

    // Função para buscar o nome da loja pelo id
    const buscarNomeLoja = (id) => {
        const idNumero = parseInt(id);
        const lojaEncontrada = lojas.find(loja => loja.id === idNumero);
        return lojaEncontrada ? lojaEncontrada.nome : 'N/A';
    };

    // Função para remover um componente
    const apagaComponente = (id) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);

        // Remove o produto selecionado da lista de produtos selecionados pelo usuário atual
        const updatedSelectedProducts = produtosSelecionadosUsuarioAtual.filter(produto => produto.id !== id);
        setProdutosSelecionadosUsuarioAtual(updatedSelectedProducts);

        // Salva os posts atualizados no sessionStorage
        sessionStorage.setItem('postagens', JSON.stringify(updatedPosts));
    };

    const atualizaContentDoComponente = (id, novoProdutoId) => {
        // Encontrar o novo produto com base no ID fornecido
        const novoProduto = produtos.find(produto => produto.id === Number(novoProdutoId));
        if (novoProduto) {
            // Atualizar o componente com os valores do novo produto selecionado
            setPosts(posts.map(post => post.id === id ? { ...post, nome: novoProduto.nome, preco: novoProduto.preco, lojaId: novoProduto.lojaId } : post));
        }
    };

    // Função para alternar entre edição e visualização de um componente
    const toggleEdicao = (id) => {
        const updatedPosts = posts.map(post =>
            post.id === id
            ? { ...post, editando: !post.editando } // Inverte o estado de edição
            : { ...post, editando: false } // Garante que os outros componentes tenham edição desativada
       );
        setPosts(updatedPosts);
        // Salva os posts atualizados no sessionStorage
        sessionStorage.setItem('postagens', JSON.stringify(updatedPosts));
    };

    return {
        posts,
        selectedProdutoId,
        handleSubmit,
        handleChangeProduto,
        criaComponente,
        apagaComponente,
        atualizaContentDoComponente,
        toggleEdicao,
        buscarNomeLoja
    };
};

export default useListaComprasFunctions;
