import { Request, Response, NextFunction } from 'express';
import { JsonObject } from 'swagger-ui-express';

export const validateUserInput = (req: Request, res: Response, next: NextFunction): JsonObject | void => {
    const { name, email, id } = req.body;

    if (req.path === '/createUser' && (!name || !email)) {
        return res.status(400).json({ message: "Please provide both 'name' and 'email' fields." });
    }

    if (req.path === '/updateUser' && (!id || (!name && !email))) {
        return res.status(400).json({ message: "Invalid input for updating user." });
    }

    if (req.path === '/deleteUser' && !id) {
        return res.status(400).json({ message: "Please provide 'id' field." });
    }
    next();
};
