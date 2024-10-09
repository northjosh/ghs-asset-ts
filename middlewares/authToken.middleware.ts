import { verify } from "jsonwebtoken";

import { configDotenv } from "dotenv";
import { NextFunction, Request, Response } from "express";

configDotenv()

function authenticateToken(req:Request, res:Response, next: NextFunction) {
  // Ignore the login route
  if (req.path === "/api/user/login") {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  verify(token, process.env.AUTH_SECRET!, (err:any, user:any) => {
    if (err) return res.sendStatus(403);

    // Access level check
    if (user.role === "admin") {
      // Admins have full access
      req.user = user;
      return next();
    }

    if (user.role === "director") {
      // Directors have access to their own department
      req.user = user;
      return next();
    }

    if (user.role === "officer") {
      // Officers have basic access
      req.user = user;
      return next();
    }

    // If none of the above conditions are met, access is denied
    return res.status(403).json({ message: "Forbidden" });
  });
}

export  {authenticateToken} ;
