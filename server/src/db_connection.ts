import { connect } from 'mongoose';
import { Console } from './logging';

export const connectToMongoDB = function (mongoURI: string) {
    connect(mongoURI, {dbName: 'BookMovie'})
    .then(res => Console.Info(`Connected to Database at ${res.connection.host}`))
    .catch(err => Console.Error(`Connection Error to Database: ${err.message}`));
}