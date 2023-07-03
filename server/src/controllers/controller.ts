import { NextFunction, Request, Response } from 'express';
import { Console } from '../logging';

export enum e_User_error {
    allFieldRequired = "please fill all required field",
    emailExists = "Email already Exists",
    invalidEmail = "please provide valid email",
    invalidPhone = "phone number is incorrect",
    invalidPassword = "Password policy mismatched",
    passwordMismatched = "Password mismatched",
    loginError = "Invalid username or password"
};

export enum e_User_Success {
    userCreated = "user created successfully"
    loginSuccess = "Successfully loggedin"
};

export enum e_HttpStatusCode {
    Success = 200,
    Created = 201,
    BadRequest = 400,
    UnAuthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    UnProcessableContnent = 422,
    InternalServerError = 500,
    ServiceUnavailable = 503
};

const MessageSentFromServer = (message: string) => {
    message = message[0].toUpperCase() + message.slice(1).toLowerCase();
    return message;
}

export const RejectUserRequest = (res: Response, message: e_User_error, statusCode?: e_HttpStatusCode): Response => {
    if(!statusCode)
        statusCode = e_HttpStatusCode.BadRequest;

    let newMessage = MessageSentFromServer(message);

    return res.status(statusCode).json({
        message: newMessage
    });
};

export const FulfillUserRequest = (res: Response, data: object, message: e_User_Success, statusCode?: e_HttpStatusCode) => {
    if(!statusCode)
        statusCode = e_HttpStatusCode.Success;

    let newMessage = MessageSentFromServer(message);
    
    return res.status(statusCode).json({
        message: newMessage,
        data
    });
}

export const HandleUnkownRoute = (req: Request, res: Response) => {
    const path = req.path;
    return res.status(404).json({
        message: `page not found for path ${path}`
    });
};

export const HandleApiInfo = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    res.on('finish', () => {
        const { method, path, hostname } = req;
        const handlingTimeInMilis = Date.now() - startTime;
        Console.LogApiInfo({method, path, hostname, statusCode: res.statusCode, handlingTimeInMilis });
    });
    next();
}