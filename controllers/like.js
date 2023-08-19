import { ErrorHandler } from "../middlewares/ErrorMiddleware.js";
import Blog from "../models/Blog.js";

export const likeBlog = async (req, res, next) => {
  const { blogId } = req.body;
  const userId = req.user._id
  try {
    const alreadyLiked = await Blog.exists({ _id: blogId, likes: userId });
    if (alreadyLiked) {
      await Blog.updateOne({ _id: blogId }, { $pull: { likes: userId } });
      return res.status(200).json({ success: true, message: "Successfully removed",type:'remove',user:userId });
    } else {
      await Blog.updateOne({ _id: blogId }, { $push: { likes: userId } });
      return res.status(200).json({ success: true, message: "Successfully liked",type:'add',user:userId });
    }
  } catch (err) {
    return next(new ErrorHandler("", err.message));
  }
};

