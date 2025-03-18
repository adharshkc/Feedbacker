import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string;
    role: string; 
  }
  
  declare global {
    namespace Express {
      interface Request {
        user?: UserPayload|any;
      }
    }
  }
  

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) { res.status(401).json({ message: "Access denied" }); return}
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET||'some secret');
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token" });
    }
  };


  export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== "ADMIN") {
       res.status(403).json({ message: "Forbidden" })
       return
    }
    next();
  };