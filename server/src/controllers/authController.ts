import { NextFunction, Request, Response } from "express";
import * as authService from '../services/authService';

export const register = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const userData = req.body;
        console.log(userData)
        const user = await authService.registerUser(userData);
        res.status(201).json({
            status: 'success',
            data: user
          });
    } catch (error) {
        next(error);
    }
}



export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const loginData = req.body;
      const user = await authService.loginUser(loginData);
      
      res.status(200).json({
        status: 'success',
        data: user
      });
    } catch (error) {
      next(error);
    }
  };