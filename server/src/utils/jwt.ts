import jwt from 'jsonwebtoken';
interface User {
  id: string | number;
  email: string;
  role: string;
}

export const generateToken = async (user: User): Promise<string> => {
    const secret = process.env.JWT_SECRET||"some secret";
    
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      secret as string, 
      {
        expiresIn: '1d'
      }
    );
};