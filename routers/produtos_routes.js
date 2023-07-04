import express from "express"
import {getProdutos,getProdutosByCategoriaQuantidade, createProdutos, updateProdutos, deleteProdutos} from "../controllers/produtos_controller.js"
import {verifyToken} from "../verifyToken.js";
const router = express.Router()

router.get('/Produtos', verifyToken, getProdutos)
router.get('/Produtos/categoria/:id_categoria/quantidade/:qtde_pedido', verifyToken, getProdutosByCategoriaQuantidade)
router.post('/Produtos', verifyToken, createProdutos)
router.put('/Produtos/:nome', verifyToken, updateProdutos)
router.delete('/Produtos/:nome', verifyToken, deleteProdutos)

export default router
