import { Request, Response } from "express";
import guitarService from "../services/guitarService";

class GuitarController {
  getGuitar = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const guitar = await guitarService.getGuitar(id);
      if (!guitar) {
        return res.status(404).json({ message: "Guitar not found" });
      }
      return res.status(200).json(guitar);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };
  getGuitars = async (req: Request, res: Response) => {
    try {
      const guitars = await guitarService.getGuitars();
      if (!guitars) {
        return res.status(404).json({ message: "Guitars not found" });
      }
      return res.status(200).json(guitars);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };
}

const guitarController = new GuitarController();

export default guitarController;
