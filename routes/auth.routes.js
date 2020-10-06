import {Router} from 'express';
const router = Router();
import * as userctr from '../controller/usuario.controller';


router.post('/signup', userctr.signUp);
router.post('/signin', userctr.signIn);

export default router;