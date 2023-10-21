import express, { Request, Response } from 'express';
import usersRoutes from './routes/usersRoutes';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.use('/users', usersRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
