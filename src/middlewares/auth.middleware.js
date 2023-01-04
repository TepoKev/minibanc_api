import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const tokenVerify = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "Not token provided" });
  if (!token.trim())
    return res.status(403).json({ message: "Not token provided" });
  req.token = token;
  jwt.verify(req.token, process.env.KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.decoded = decoded;
    next();
  });
};
