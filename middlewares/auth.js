import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ErrorHandler } from "../middlewares/ErrorMiddleware.js";

export const isAuthanticated = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded_id = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decoded_id;
      const user = await User.findById({ _id: id }).select("-password");
      req.user = user;
      next();
    } catch (e) {
        return res.status(401).json({success:false,message:"Please Login First"})
    }
  }
  if(!token){
    return res
        .status(401)
        .json({ success: false, message: "invalid token received" });
  }
};
