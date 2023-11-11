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
  getGuitarPage = async (req: Request, res: Response) => {
    try {
      const params = req.query;
      const { totalGuitars, guitars } = await guitarService.getGuitarPage(
        Number(params.page),
        Number(params.size)
      );
      if (!guitars) {
        return res.status(404).json({ message: "Guitars not found" });
      }
      return res.status(200).json({ totalGuitars, guitars });
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
  updateGuitar = async (req: Request, res: Response) => {
    try {
      const { id, name, price } = req.body;
      const guitarExists = await guitarService.updateGuitar(id, name, price);
      if (!guitarExists) {
        return res.status(404).json({ message: "Guitar not found" });
      }
      const guitar = await guitarService.updateGuitar(id, name, price);
      return res.status(200).json(guitar);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };
  deleteGuitar = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const guitarDeleted = await guitarService.deleteGuitar(id);
      if (guitarDeleted) {
        return res.status(200).json({ message: "Guitar deleted" });
      }
      return res.status(404).json({ message: "Guitar not found" });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };
}

const guitarController = new GuitarController();

export default guitarController;
