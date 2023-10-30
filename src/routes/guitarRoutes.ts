import { Router } from "express";
import guitarController from "../controllers/guitarController";

const router = Router();

router.get("/getGuitar", guitarController.getGuitar);
router.get("/getGuitars", guitarController.getGuitars);

export default router;
