import { Produtos, Pedidos } from "../models/produtos_model.js";
import jwt from "jsonwebtoken";

// Consulta de produto por categoria e quantidade de pedido
export const getProdutosByCategoriaQuantidade = async (req, res) => {
  try {
    const { id_categoria, qtde_pedido } = req.params;

    // Consultar produtos por categoria e quantidade de pedido
    const produtos = await Produtos.findAll({
      include: [
        {
          model: Pedidos,
          where: { qtde_pedido },
          required: true,
        },
      ],
      where: { id_categoria },
    });

    res.json({
      produtos,
    });
  } catch (e) {
    console.log('Erro ao consultar produtos por categoria e quantidade', e);
    res.status(500).json({ error: 'Erro ao consultar produtos por categoria e quantidade' });
  }
};

// Método GET para obter todos os produtos
export const getProdutos = async (req, res) => {
  try {
    const produtos = await Produtos.findAll();

    res.json(produtos);
  } catch (e) {
    console.log('Erro ao acessar a tabela Produtos', e);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// funcao create
export const createProdutos = async (req, res) => {
  try {
    const { cod_produto, nome_produto, qtde_produto, id_categoria } = req.body;
    
    // Verificar a quantidade do produto e definir a quantidade de pedido correspondente
    let qtde_pedido = 0;
    if (qtde_produto <= 3) {
      qtde_pedido = 4;
    } else if (qtde_produto > 3 && qtde_produto < 7) {
      qtde_pedido = 3;
    }

    // Criar o registro de produto
    const produto = await Produtos.create({ cod_produto, nome_produto, qtde_produto, id_categoria });

    // Criar o registro de pedido, caso a quantidade seja maior que zero
    if (qtde_pedido > 0) {
      await Pedidos.create({ cod_produto, qtde_pedido });
    }

    res.json({
      message: 'Um novo registro de produto foi inserido no Banco de dados',
      produto
    });
  } catch (e) {
    console.log('Erro ao inserir um novo produto', e);
  }
};

//função update
export const updateProdutos = async (req, res) => {
  try {
    await Produtos.update(req.body, {
      where: {
        nome_produto: req.params.nome
      }
    });
    res.json({
      message: `O produto foi atualizado!`,
      produto: Produtos
    });
  } catch (e) {
    console.log("Erro ao atualizar o cadastro do produto", e)
  }
}

//funcao delete
export const deleteProdutos = async (req, res) => {
  try {
    await Produtos.destroy({
      where: {
        nome_produto: req.params.nome
      }
    });
    res.json({
      "message": "O produto " + req.params.nome + " foi excluído do Banco de Dados"
    });
  } catch (e) {
    console.log("Erro ao excluir o cadastro do Produto", e);
  }
}