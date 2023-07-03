import { createServer } from 'node:http';
import express, { Application } from 'express'; 
import cors from 'cors';
import routes from './routes';
import { Console } from './logging';
import { HandleUnkownRoute, HandleApiInfo } from './controllers/controller';

const app:Application = express();
const server = createServer(app);

app.use(cors());
app.use(HandleApiInfo);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);
app.use('/', HandleUnkownRoute);

export const StartServer = function (PORT: number, connectDb: CallableFunction, mongoURI: string) {
    try {
        server.listen(PORT, () => console.log(`server is running at http://127.0.0.1:${PORT}`));
        connectDb(mongoURI);
    } catch (error) {
        Console.Error(error);
    }
};


