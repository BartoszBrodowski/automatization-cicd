import { UserService } from '../services/userService';
import { Request, Response } from 'express';

const userService = new UserService();

class UserController {
	getAllUsers = async (req: Request, res: Response): Promise<Response> => {
		try {
			const users = await userService.getAllUsers();
			if (!users) {
				return res.status(404).json({ message: 'No users found' });
			}
			return res.status(200).json(users);
		} catch(err: any) {
			return res.status(400).json(err.message);
		}
	};
	createUser = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { name, email } = req.body;
			if (!name || !email) {
				return res.status(400).json({ message: "Please provide both 'name' and 'email' fields." });
			}
			const userCreated = await userService.createUser(name, email)
			if (userCreated) {
				return res.status(200).json('User created!')
			}
			return res.status(404).json({message: "Can't find user with given id"})
		} catch(err: any) {
			return res.status(400).json(err.message)
		}
	};
	updateUser = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { id, name, email } = req.body;
			const userExists = await userService.updateUser(id, name, email);
			if (!userExists) {
				return res.status(404).json({ message: 'User not found' });
			}
			await userService.updateUser(id, name, email);
			return res.status(200).json({message: 'User updated!'});
		} catch (err: any) {
			return res.status(400).json(err.message);
		}
	};
	deleteUser = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { id } = req.body;
			const userDeleted = await userService.deleteUser(id);
			if (userDeleted) {
				return res.status(200).json({ message: 'User deleted!' });
			}
			return res.status(404).json({ message: 'User not found' });
		} catch (err: any) {
			return res.status(400).json(err.message);
		}
	}
}

export const userController = new UserController();
