import { Request, Response, NextFunction } from "express";
import { JsonObject } from "swagger-ui-express";

export const validateGuitarInput = (
  req: Request,
  res: Response,
  next: NextFunction
): JsonObject | void => {
  const { id, manufacturer, title, price } = req.body;

  if (req.path === "/getGuitar" && !id) {
    return res.status(400).json({ message: "No id provided" });
  }

  if (req.path === "/createGuitar") {
    if (
      !manufacturer ||
      !title ||
      !price ||
      manufacturer === "" ||
      title === "" ||
      price === ""
    ) {
      return res
        .status(400)
        .json({
          message:
            "Please provide a valid 'manufacturer', 'title' and 'price'.",
        });
    }
  }

  if (req.path === "/updateGuitar") {
    if (
      !id ||
      (!manufacturer && !title && !price) ||
      manufacturer === "" ||
      title === "" ||
      price === ""
    ) {
      return res
        .status(400)
        .json({ message: "Invalid input for updating guitar." });
    }
  }

  if (req.path === "/deleteGuitar" && !id) {
    return res.status(400).json({ message: "Please provide 'id' field." });
  }

  next();
};
