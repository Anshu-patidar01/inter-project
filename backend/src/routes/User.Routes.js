import express from "express";
const Router = express.Router();
import {
  forgotpassword,
  Likes,
  login,
  register,
  resetpasswors,
} from "../controllers/user.controller.js";
import UserModel from "../models/User.Model.js";
import jwt from "jsonwebtoken";
import userAuth from "../middelware/Auth.js";
Router.post("/register", register);
Router.post("/login", login);
Router.post("/like", userAuth, Likes);
Router.post("/forgot", forgotpassword);
Router.post("/resetPassword", resetpasswors);

Router.post("/validate-token", async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, "wedsqrf");
    const isValidToken = await UserModel.findById({ _id: decoded.UserId });
    // console.log(isValidToken);
    if (!isValidToken) {
      res.json({
        message: "not a valid token.",
        error: "token expired!! Please login again.",
      });
    } else {
      res.status(200).json({ message: "valid token.", data: isValidToken });
    }
  } catch (error) {
    res.status(404).json({
      message: "Problem while verification of token.",
      Error: error,
    });
  }
});

export default Router;
