import User from "../models/User.js";
import bcrypt from "bcrypt";
import sendCookie  from "../utils/SendCookie.js";
import {ErrorHandler} from "../middlewares/ErrorMiddleware.js";


export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateUser = async (req, res, next) => {
    const { name, email, password,picture } = req.body;
    const user = await User.findOne({ email });
  try {
    if (user) {
        return res.status(409).json({
            success: false,
            message: "user already exist",
          });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        picture,
        password: hashedPassword,
      });
      const message = "User Registered Successfully";
      sendCookie(res, newUser, message, 201);
    }
  } catch (error) {
    return next(new ErrorHandler('',error.message));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("user not found", 404));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler("Invalid Credentials", 404));
    const message = "Welcome Back" + " " + user.name;
    sendCookie(res, user, message);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) return next(new ErrorHandler("User already exist", 400));
    else {
      return next(new ErrorHandler("user not found", 404));
    }
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res, next) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(404).json({success:false,user:null})
  }
};

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "you're logged out successfully",
    });
};
