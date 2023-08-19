import { ErrorHandler } from "../middlewares/ErrorMiddleware.js";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import cloudinary from "cloudinary";
import { URL } from 'url';


export const CreateBlog = async (req, res, next) => {
  const { title, description, image } = req.body;
  const author = req.user;
  try {
    const createdBlog = await Blog.create({
      title,
      description,
      author,
      image,
    });
    await User.updateOne(
      { _id: author },
      { $push: { blogs: createdBlog._id } }
    );
    res
      .status(201)
      .json({ success: true, message: "New Blog Created Successfully" });
  } catch (e) {
    return next(new ErrorHandler("", e.message));
  }
};

export const EditBlogById = async (req, res, next) => {
  const { id, ...data } = req.body;
  try {
    await Blog.findByIdAndUpdate({ _id: id }, data);
    res
      .status(200)
      .json({ success: true, message: "Blog Updated Successfuly" });
  } catch (e) {
    return next(new ErrorHandler("", e.message));
  }
};




export const deleteBlogById = async (req, res, next) => {
  const { id, image } = req.body;
  const parsedUrl = new URL(image);
  const pathnameParts = parsedUrl.pathname.split("/");
  let publicId = pathnameParts[pathnameParts.length - 1];
  publicId = publicId.substring(0,publicId.length-4)
  try {
    await cloudinary.uploader.destroy(publicId)
    await Blog.findByIdAndDelete({ _id: id });
    await User.updateOne({ _id: req.user._id }, { $pull: { blogs: id } });
    res
      .status(200)
      .json({ success: true, message: "Blog Deleted Successfully" });
  } catch (e) {
    console.log(e)
    return next(new ErrorHandler("", e.message));
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
      .sort({ updatedAt: -1 })
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "user",
          model: "user",
          select: ["name"],
        },
      })
      .populate({ path: "author", model: "user", select: "name" });
    res.status(200).json({ success: true, data: blogs });
  } catch (e) {
    return next(new ErrorHandler("", e.message));
  }
};

export const getUserBlogs = async (req, res, next) => {
  const id = req.user._id;
  try {
    const blogs = await Blog.find({ author: id })
      .sort({ createdAt: -1 })
    res.status(200).json({ success: true, data: blogs });
  } catch (e) {
    return next(new ErrorHandler("", e.message));
  }
};

export const getBlogById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id)
      .populate("author")
      .populate({
        path: "comments",
        model: "Comment",
        options: { sort: { updatedAt: -1 } },
        populate: {
          path: "user",
          model: "user",
          select: ["name","picture"],
        },
      });
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (e) {
    next(new ErrorHandler(404, "Blog not found"));
  }
};
