import dotenv from 'dotenv';
import { StartServer } from './src/server';
import { connectToMongoDB } from './src/db_connection';

dotenv.config();
const PORT = Number(process.env.PORT_NUMBER) || 5000;
const MongoURI = String(process.env.MONGO_DB_URI) || '';

StartServer(PORT, connectToMongoDB, MongoURI);
