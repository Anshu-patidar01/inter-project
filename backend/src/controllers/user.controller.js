import UserModel from "../models/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import IdeaFormModel from "../models/IdeaForm.Model.js";
import validator from "validator";
import { FormSendEmail } from "../config/mailsender.js";
const register = async (req, res) => {
  try {
    const { fullname, email, mobileNumber, password } = req.body;

    if (!fullname) {
      throw new Error("Full Name is required.");
    }
    if (!mobileNumber) {
      throw new Error("Mobile Number is required.");
    }
    if (!email) {
      throw new Error("Email is required.");
    }
    if (!password) {
      throw new Error("Password is required.");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Email is Wrong please check!");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error(
        "Use at least 8 characters, including uppercase, lowercase, a number, and a special character.!"
      );
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new Error(
        "User already exist with this Email Address you can login.."
      );
    }
    const usermobilecheck = await UserModel.findOne({ mobileNumber });
    if (usermobilecheck) {
      throw new Error(
        "User already exist with this mobile number you can login.."
      );
    }

    const hashpassword = await bcrypt.hash(password, 10);
    // Creating new user
    const userx = await UserModel.create({
      fullname,
      email,
      mobileNumber,
      password: hashpassword,
    });
    const subject = "Welcome to ScriptHQ – Your Creative Journey Begins!";
    const message =
      "Congratulations! 🎉 You have successfully registered at ScriptHQ – The Head Quarter of Scripts.<br>We are thrilled to have you on board as part of our growing creative community. At ScriptHQ, we are committed to providing a secure, innovative, and collaborative platform where storytellers, filmmakers, and industry professionals come together to create magic.";
    const x = await FormSendEmail(
      userx.email,
      "Info@scripthq.in",
      userx.fullname,
      subject,
      message
    );
    // console.log(x);
    res.status(201).json({ user: userx });
    // }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Problem while registering", Error: `${error}` });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and Password is required!");
    }
    let user = "";
    const value = email;
    if (validator.isEmail(value)) {
      user = await UserModel.findOne({ email });
    } else if (validator.isMobilePhone(email, "en-IN")) {
      const mobileNumber = email;
      user = await UserModel.findOne({ mobileNumber });
    } else {
      throw new Error("Email Address or Mobile Number is incorrect");
    }
    if (!user) {
      throw new Error("Email Address or Mobile Number is incorrect");
    }
    // console.log(email, password);
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      console.log(isMatched);
      return res
        .status(400)
        .json({ message: "Problem while login", Error: `Wrong password.` });
    }
    const UserId = user._id;
    const token = jwt.sign({ UserId }, "wedsqrf", {
      expiresIn: "1h",
    });
    if (!token) {
      throw new Error("token not genrated.");
    }
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: "Problem while login", Error: `${error}` });
  }
};
const Likes = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).send("form Id not provided.", id);
    }
    const userId = req.user;
    const _id = id;
    const form = await IdeaFormModel.findById({ _id });
    // console.log(id);
    if (!form) {
      throw new Error("Form not found.");
    }
    if (form.likes.includes(userId.id)) {
      const UpdatedForm = await IdeaFormModel.findByIdAndUpdate(id, {
        $pull: { likes: userId._id },
      });
      res.send(UpdatedForm);
    } else {
      const UpdatedForm = await IdeaFormModel.findByIdAndUpdate(_id, {
        $push: { likes: userId._id },
      });
      res.send(UpdatedForm);
    }
  } catch (error) {
    res.json({ message: "Some problem at likes api", error: error.message });
  }
};
const forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!validator.isEmail) {
      throw new Error("Wrong Email Address.");
    }
    const ismail = await UserModel.findOne({ email });
    if (!ismail) {
      throw new Error("User not registered.");
    } else {
      const token = jwt.sign({ email: email }, "asdfgh", { expiresIn: "10m" });
      res.send(token);
    }
  } catch (error) {
    res.send(`error in forgot password:${error.massage}`);
  }
};
const resetpasswors = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, "asdfgh");
    res.send(decoded);
  } catch (error) {
    res.send(`Token Epired:${error.message}`);
  }
};

// Call function
export { register, login, Likes, forgotpassword, resetpasswors };
