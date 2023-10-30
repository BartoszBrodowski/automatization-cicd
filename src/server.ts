import express, { Request, Response } from "express";
import usersRoutes from "./routes/userRoutes";
import guitarRoutes from "./routes/guitarRoutes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/users", usersRoutes);
app.use("/guitars", guitarRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export { app, server };
