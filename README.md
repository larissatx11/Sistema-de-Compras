# Sistema de Compras - Organização de Compras Pessoais

O **Sistema de Compras** é um projeto desenvolvido em React.js que permite aos usuários organizar suas compras de forma eficiente. Com um design temático rosa fofo, o sistema oferece funcionalidades como cadastro e login, gerenciamento de lojas, produtos e listas de compras, além de edição de perfil e exclusão de conta.

Este foi meu primeiro projeto com React.js e me permitiu aprender conceitos importantes como gerenciamento de estado, componentes reutilizáveis, integração com `sessionStorage` e CRUD (Create, Read, Update, Delete).

## Funcionalidades

### Autenticação
- **Cadastro**: Permite ao usuário criar uma nova conta.
- **Login**: Autentica o usuário e armazena os dados no `sessionStorage`.
- **Logout**: Encerra a sessão do usuário.
- **Excluir Conta**: Remove a conta do usuário do sistema.

### Menu Lateral
- **Home**: Página inicial do sistema.
- **Perfil**: Permite ao usuário editar suas informações pessoais.
- **Lista de Lojas**: CRUD de lojas, onde o usuário pode adicionar, editar e excluir lojas (nome e endereço).
- **Lista de Produtos**: CRUD de produtos, onde o usuário pode adicionar, editar e excluir produtos (nome, preço e seleção de loja).
- **Lista de Compras**: CRUD de listas de compras, onde o usuário pode adicionar, editar e excluir produtos selecionados para compra.
- **Logout**: Encerra a sessão do usuário.

### Dependências entre Funcionalidades
- Para adicionar um produto, é necessário ter uma loja cadastrada.
- Para adicionar um item à lista de compras, é necessário ter um produto cadastrado.

## Tecnologias Utilizadas

### Front-end
- **React.js**: Biblioteca JavaScript para construção da interface do usuário.
- **React Router**: Para gerenciamento de rotas e navegação.
- **CSS Modules**: Para estilização dos componentes.
- **sessionStorage**: Para armazenar dados de autenticação do usuário durante a sessão.

### Outras Ferramentas
- **Git**: Controle de versão do projeto.

### Deploy no GitHub Pages
O projeto está hospedado no GitHub Pages e pode ser acessado através do link:
https://larissatx11.github.io/Sistema-de-Compras/
