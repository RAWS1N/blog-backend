import jwt from "jsonwebtoken";

const sendCookie = async (res, user, message, statusCode = 200) => {
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  const cookieOptions = {
    httpOnly: true,
    maxAge: 1000*60*60*168,
    sameSite: process.env.NODE_ENV === 'development'? "lax" :"none",
    secure: process.env.NODE_ENV === 'development' ? false : true,
  }
  res
    .status(statusCode)
    .cookie("token", token,cookieOptions)
    .json({
      success: true,
      message,
      user
    });
};



export default sendCookie