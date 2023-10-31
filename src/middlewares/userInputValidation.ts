import { Request, Response, NextFunction } from "express";
import { JsonObject } from "swagger-ui-express";

const isValidEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

export const validateUserInput = (
  req: Request,
  res: Response,
  next: NextFunction
): JsonObject | void => {
  const { name, email, id } = req.body;

  if (req.path === "/createUser") {
    if (!name || !email || !isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid 'name' and 'email'." });
    }
  }

  if (req.path === "/updateUser") {
    if (
      !id ||
      (!name && !email) ||
      email === "" ||
      name === "" ||
      !isValidEmail(email)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid input for updating user." });
    }
  }

  if (req.path === "/deleteUser" && !id) {
    return res.status(400).json({ message: "Please provide 'id' field." });
  }

  next();
};
