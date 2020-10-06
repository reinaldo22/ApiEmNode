import {Router} from 'express';
import * as productsCtr from '../controller/produto.controller'

const router = Router();


router.get('/', productsCtr.getProdutos);
router.get('/:id', productsCtr.getByIdProdutos);
router.post('/', productsCtr.createProdutos);
router.delete('/:id', productsCtr.deletaProdutos);
router.put('/:id', productsCtr.atualizaProdutos);

export default router;