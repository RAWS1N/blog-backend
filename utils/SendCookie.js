import jwt from "jsonwebtoken";

const sendCookie = async (res, user, message, statusCode = 200) => {
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  const cookieOptions = {
    httpOnly: true,
    maxAge: 1000*60*60*168,
    sameSite:false,
    secure: true,
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