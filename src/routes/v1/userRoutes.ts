import { Router } from 'express';
import { UserController } from '../../controllers/userController';
import { auth } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { UserSchema } from '../../models/User';

const router = Router();

router.post('/register', validate(UserSchema), UserController.register);
router.post('/login', UserController.login);
router.get('/profile', auth, UserController.getProfile);

export default router;
