import { Router} from 'express';
import { userController } from '../controllers/usersController';
import { validateUserInput } from '../middlewares/userInputValidation';

const router = Router();

router.get('/getUsers', validateUserInput, userController.getAllUsers);
router.post('/createUser', validateUserInput, userController.createUser);
router.delete('/deleteUser', validateUserInput, userController.deleteUser);
router.put('/updateUser', validateUserInput, userController.updateUser);

export default router;
