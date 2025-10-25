import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) return res.status(401).json({ message: "Token expired" });
    if (error instanceof JsonWebTokenError) return res.status(403).json({ message: "Invalid token" });

    return res.status(500).json({ message: "Token verification failed" });
  }
};

export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "Refresh token missing" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as any;

    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" });

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    if (error instanceof TokenExpiredError) return res.status(401).json({ message: "Refresh token expired" });
    if (error instanceof JsonWebTokenError) return res.status(403).json({ message: "Invalid refresh token" });

    return res.status(500).json({ message: "Token verification failed" });
  }
};
