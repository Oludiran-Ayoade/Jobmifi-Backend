import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, IUser, SendUserDto } from '../dtos/Dtos.dto';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include the 'user' property
declare global {
    namespace Express {
      interface Request {
        user?: IUser; 
      }
    }
  }

export const verifyToken = (req:Request<{}, {}, CreateUserDto>, res:Response<SendUserDto>, next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).send({ status: false, message: "Unauthorized - Missing Authorization Header" });
        return;
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.SECRET_KEY;

    try {
        const decoded = jwt.verify(token, secret) as IUser;

        req.user = decoded; // Attach the decoded user object to the request for later use

        // Check if the user is an admin (assuming you have a role field in your JWT payload)
        if (decoded.role === 1 || decoded.role === 2) {
            next(); // Move to the next middleware or route handler
        } else {
            console.log(decoded.role);
            res.status(403).send({ status: false, message: "Forbidden - Not an Admin" });
        }
    } catch (err) {
        console.error("Error verifying token:", err);
        res.status(401).send({ status: false, message: "Unauthorized - Invalid Token" });
    }
};