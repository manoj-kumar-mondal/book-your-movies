import { Request, Response } from 'express';
import { hash, compare } from 'bcrypt';
import UserModel from '../models/user';
import { FulfillUserRequest, RejectUserRequest, e_HttpStatusCode, e_User_Success, e_User_error } from './controller';
import { Console } from '../logging';

export const SignIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const findEmail = await UserModel.findOne({ email });
        
        if(!findEmail) {
            return RejectUserRequest(res, e_User_error.loginError, e_HttpStatusCode.Forbidden);
        }

        const isPasswordMatched = await compare(password, findEmail.password);

        if(!isPasswordMatched) {
            return RejectUserRequest(res, e_User_error.loginError, e_HttpStatusCode.Forbidden);
        }

        /* TODO */
        // Create a jwt token and set a cookie for the user as well as send the requires data 
        FulfillUserRequest(res, findEmail, e_User_Success.loginSuccess, e_HttpStatusCode.Success)
    } catch (error) {
        Console.Error(error);
    }
};

export const SignUp = async (req: Request, res: Response) => {
    let { email, name, password, phone } = req.body;

    try {      
        const findEmail = await UserModel.findOne({ email });
        if(findEmail) {
            return RejectUserRequest(res, e_User_error.emailExists, e_HttpStatusCode.UnProcessableContnent);
        }
    
        password = await hash(password, 10);
        const newUser = await UserModel.create({email, name, phone, password });
    
        FulfillUserRequest(res, {newUser}, e_User_Success.userCreated, e_HttpStatusCode.Created);

    } catch (error) {
        Console.Error(error);
    }
}