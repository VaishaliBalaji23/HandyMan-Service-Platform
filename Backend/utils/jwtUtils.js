import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "Dev_Token";


export const authRequired = (req, res, next) => {
 try {
   const header = req.headers.authorization || "";
   const bearer = header.startsWith("Bearer ") ? header.slice(7) : null;
   const token = bearer || req.cookies?.access_token;


   if (!token) {
     return res.status(401).json({ message: "Missing token" });
   }


   const claims = jwt.verify(token, JWT_SECRET); // throws if invalid/expired
   req.user = claims; // { sub, auth_id, user_id, email, role, ... iat, exp }
   next();
 } catch (err) {
   // Differentiate common errors
   if (err.name === "TokenExpiredError") {
     return res.status(401).json({ message: "Token expired" });
   }
   if (err.name === "JsonWebTokenError") {
     return res.status(401).json({ message: "Invalid token" });
   }
   return res.status(401).json({ message: "Unauthorized" });
 }
};


