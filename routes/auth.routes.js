import {Router} from 'express';
const router = Router();
import * as userctr from '../controller/usuario.controller';
import {verifySignup} from '../middlewares';

router.post('/signup',[verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], userctr.signUp);
router.post('/signin', userctr.signIn);

export default router;