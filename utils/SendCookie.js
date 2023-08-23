import jwt from "jsonwebtoken";

const sendCookie = async (req,res, user, message, statusCode = 200) => {
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  const cookieOptions = {
    httpOnly: true,
    maxAge: 1000*60*60*168,
    sameSite:"None",
    secure: true,
    path : "/"
  }

  res.set("Access-Control-Allow-Origin",req.headers.origin)
  res.set("Access-Control-Allow-Credentials","true")
  res.set("Access-Control-Expose-Headers","date,etag,access-control-allow-origin,access-control-allow-credentials")
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