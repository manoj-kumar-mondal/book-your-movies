import { Schema, model } from 'mongoose';
import { IUser } from './types';

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },

    phone: String,
});

const UserModel = model('user', UserSchema);
export default UserModel;