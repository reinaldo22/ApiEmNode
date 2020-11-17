import {Router} from 'express';
import * as productsCtr from '../controller/produto.controller';
import { authJwt } from '../middlewares/index';


const router = Router();


router.post('/', [authJwt.verifyToken, authJwt.isModerator],productsCtr.createProdutos);
router.get('/',productsCtr.getProdutos);
router.get('/:id', productsCtr.getByIdProdutos);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin],productsCtr.deletaProdutos);
router.put('/:id', [authJwt.verifyToken],productsCtr.atualizaProdutos);

export default router;