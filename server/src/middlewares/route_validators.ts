import { Response, Request, NextFunction } from 'express';
import { RejectUserRequest, e_HttpStatusCode, e_User_error } from '../controllers/controller';
import { Validator } from '../error/handler';

export const ValidateSignUp = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, phone, password, confirmPassword } = req.body;

    if(!name || !email || !password || !confirmPassword) {
        return RejectUserRequest(res, e_User_error.allFieldRequired, e_HttpStatusCode.BadRequest);
    }

    if(!Validator.isEmail(email)) {
        return RejectUserRequest(res, e_User_error.invalidEmail, e_HttpStatusCode.UnProcessableContnent);
    }

    if(phone && !Validator.isPhone(phone)) {
        return RejectUserRequest(res, e_User_error.invalidPhone, e_HttpStatusCode.UnProcessableContnent);
    }

    if(!Validator.isStrongPassword(password)) {
        return RejectUserRequest(res, e_User_error.invalidPassword, e_HttpStatusCode.UnProcessableContnent);
    }

    if(password !== confirmPassword) {
        return RejectUserRequest(res, e_User_error.passwordMismatched, e_HttpStatusCode.UnProcessableContnent);
    }

    next();
};

export const ValidateSignIn = (req: Request, res: Response, next: NextFunction) => {
    const { email, phone, password } = req.body;

    if(!email || !password) {
        return RejectUserRequest(res, e_User_error.allFieldRequired, e_HttpStatusCode.BadRequest);
    }

    next();
}