import { Router, Request, Response } from 'express';
import { userController } from '../controllers/usersController';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
	const { name, email } = req.body;
	const result = await userController.createUser(name, email);
	res.status(200).json(result);
});

router.get('/', async (req: Request, res: Response) => {
	const result = await userController.getAllUsers();
	res.status(200).json(result);
});

export default router;
