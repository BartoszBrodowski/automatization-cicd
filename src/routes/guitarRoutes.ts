import { Router } from "express";
import guitarController from "../controllers/guitarController";
import { validateGuitarInput } from "../middlewares/guitarInputValidation";

const router = Router();

router.get("/getGuitar", validateGuitarInput, guitarController.getGuitar);
router.get("/getGuitarPage", guitarController.getGuitarPage);
router.get("/getGuitars", validateGuitarInput, guitarController.getGuitars);
router.put("/updateGuitar", validateGuitarInput, guitarController.updateGuitar);
router.delete(
  "/deleteGuitar",
  validateGuitarInput,
  guitarController.deleteGuitar
);

export default router;
