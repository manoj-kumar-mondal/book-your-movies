import { Router } from 'express';
import { SignIn, SignUp } from '../controllers';
import { ValidateSignIn, ValidateSignUp } from '../middlewares/route_validators';

const router = Router();

router.post('/signup', ValidateSignUp, SignUp);
router.post('/signin', ValidateSignIn, SignIn);

export default router;