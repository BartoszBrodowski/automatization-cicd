import { Router } from "express";
import { userController } from "../controllers/userController";
import { validateUserInput } from "../middlewares/userInputValidation";

const router = Router();

router.get("/getUser", validateUserInput, userController.getUser);
router.post("/createUser", validateUserInput, userController.createUser);
router.delete("/deleteUser", validateUserInput, userController.deleteUser);
router.put("/updateUser", validateUserInput, userController.updateUser);

export default router;
