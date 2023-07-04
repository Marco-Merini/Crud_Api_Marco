# Documentação Servidor API REST com Token

## Descrição
Este programa consiste no desenvolvimento de uma aplicação servidora que lida com produtos, categorias e pedidos. A aplicação permite realizar operações CRUD (criar, consultar, atualizar e excluir) por meio de uma API REST, além de consultas específicas de produtos por categoria e quantidade de pedido. Também é implementada uma funcionalidade de autenticação com token JWT em um dos endpoints da API.

## Requisitos
- Node.js
- Banco de dados MySQL Workbench

## Configuração do Banco de Dados
1. Crie um banco de dados chamado "Produtos".
2. Execute as seguintes instruções SQL para criar as tabelas necessárias:
```
CREATE TABLE categorias (
  id_categoria INT PRIMARY KEY AUTO_INCREMENT,
  nome_categoria VARCHAR(255) NOT NULL
);

CREATE TABLE produto (
  cod_produto INT PRIMARY KEY AUTO_INCREMENT,
  nome_produto VARCHAR(255) NOT NULL,
  qtde_produto INT NOT NULL,
  id_categoria INT,
  FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria)
);

CREATE TABLE pedidos (
  num_pedido INT PRIMARY KEY AUTO_INCREMENT,
  cod_produto INT,
  qtde_pedido INT NOT NULL,
  FOREIGN KEY (cod_produto) REFERENCES produtos (cod_produto)
);
```
## Instalação das Dependências
1. Abra o terminal na raiz do projeto.
2. Execute o seguinte comando para instalar as dependências:
```
npm install
```

## Configuração do Banco de Dados
1. Abra o arquivo src/config/database.js.
2. Verifique se as configurações de conexão com o banco de dados estão corretas. Caso necessário, altere as informações do host, usuário, senha e nome do banco de dados.

## Execução do Programa
1. No terminal, execute o seguinte comando para iniciar o servidor:
```
npm start
```
2. O servidor será iniciado na porta 3000. Acesse http://localhost:3000 para verificar se o servidor está funcionando corretamente. Você deverá ver a mensagem "Servidor base '/' funcionando".

## Endpoints da API

### GET /
Descrição: Endpoint inicial para verificar se o servidor está funcionando corretamente.
Retorno:
```
{
  "message": "Servidor base '/' funcionando"
}
```

### GET /exemplo
Descrição: Endpoint de exemplo mockado.
Requer autenticação: Sim (Token JWT)
Retorno:
```
{
  "id": 1,
  "nome": "camargo"
}
```

### POST /login
Descrição: Endpoint para autenticação. Retorna um token JWT válido para uso nos endpoints autenticados.
Parâmetros:

- user (string): Nome de usuário.
- pwd (string): Senha do usuário.
Retorno (sucesso):
```
{
  "auth": true,
  "token": "TOKEN_JWT"
}
```
Retorno (falha):
```
{
  "message": "Login Inválido"
}
```

### GET /produtos
Descrição: Retorna todos os produtos cadastrados.
Requer autenticação: Sim (Token JWT)
Retorno:
```
[
  {
    "cod_produto": 1,
    "nome_produto": "Produto 1",
    "qtde_produto": 10,
    "id_categoria": 1
  },
  {
    "cod_produto": 2,
    "nome_produto": "Produto 2",
    "qtde_produto": 5,
    "id_categoria": 2
  },
  ...
]
```

### GET /produtos/categoria/:id_categoria/quantidade/:qtde_pedido
Descrição: Retorna os produtos de uma determinada categoria e com a quantidade de pedido especificada.
Parâmetros:

- id_categoria (number): ID da categoria.
- qtde_pedido (number): Quantidade de pedido.
Requer autenticação: Sim (Token JWT)
Retorno:
```
{
  "produtos": [
    {
      "cod_produto": 1,
      "nome_produto": "Produto 1",
      "qtde_produto": 10,
      "id_categoria": 1,
      "pedido": {
        "num_pedido": 1,
        "qtde_pedido": 4,
        "cod_produto": 1
      }
    },
    {
      "cod_produto": 2,
      "nome_produto": "Produto 2",
      "qtde_produto": 5,
      "id_categoria": 1,
      "pedido": {
        "num_pedido": 2,
        "qtde_pedido": 4,
        "cod_produto": 2
      }
    },
    ...
  ]
}
```

### POST /produtos
Descrição: Cria um novo produto no banco de dados.
Parâmetros:

- cod_produto (number): Código do produto.
- nome_produto (string): Nome do produto.
- id_categoria (number): ID da categoria do produto.
- qtde_produto (number): Quantidade do produto.
Requer autenticação: Sim (Token JWT)
Retorno:
```
{
  "message": "Um novo registro de produto foi inserido no Banco de dados",
  "produto": {
    "cod_produto": 3,
    "nome_produto": "Produto 3",
    "qtde_produto": 7,
    "id_categoria": 2
  }
}
```

### PUT /produtos/:nome
Descrição: Atualiza as informações de um produto pelo nome.
Parâmetros:

- nome (string): Nome do produto a ser atualizado.
Requer autenticação: Sim (Token JWT)
Retorno:
```
{
  "message": "O produto foi atualizado!",
  "produto": {
    "cod_produto": 1,
    "nome_produto": "Produto Atualizado",
    "qtde_produto": 10,
    "id_categoria": 1
  }
}
```

### DELETE /produtos/:nome
Descrição: Exclui um produto pelo nome.
Parâmetros:

- nome (string): Nome do produto a ser excluído.
Requer autenticação: Sim (Token JWT)
Retorno:
```
{
  "message": "O produto Produto Excluído foi excluído do Banco de Dados"
}
```

## Autenticação com Token JWT
- Os endpoints **/exemplo**, **/produtos**, **/produtos/categoria/:id_categoria/quantidade/:qtde_pedido**, **/produtos**, **/produtos/:nome** e **/produtos/:nome** requerem autenticação por meio de um token JWT.
- Para obter um token JWT válido, faça uma requisição POST para **/login** com os parâmetros **user** e **pwd**. Caso as credenciais sejam válidas, um token JWT será retornado no campo **token** da resposta.
- Adicione o token JWT obtido no cabeçalho das requisições para os endpoints autenticados, utilizando o header Authorization: **JWT Bearer**, Algorithm ``h5256``, Secret ``camargo``. Certifique-se de substituir **<token>** pelo token JWT válido.
- Payload:
``
  "alg": "HS256"
  "typ": "JWT"
``

## Banco de Dados
O banco de dados utilizado é o MySQL. Para criar a estrutura do banco de dados, execute os seguintes comandos:
```
CREATE DATABASE Produtos;

USE Produtos;

CREATE TABLE categorias (
  id_categoria INT PRIMARY KEY AUTO_INCREMENT,
  nome_categoria VARCHAR(255) NOT NULL
);

CREATE TABLE produto (
  cod_produto INT PRIMARY KEY AUTO_INCREMENT,
  nome_produto VARCHAR(255) NOT NULL,
  qtde_produto INT NOT NULL,
  id_categoria INT,
  FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria)
);

CREATE TABLE pedidos (
  num_pedido INT PRIMARY KEY AUTO_INCREMENT,
  cod_produto INT,
  qtde_pedido INT NOT NULL,
  FOREIGN KEY (cod_produto) REFERENCES produtos (cod_produto)
);
```

## Desenvolvedores: Marco Leone Merini e Mateus Akira
