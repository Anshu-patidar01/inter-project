import express from "express";
import {
  getidiaforms,
  updateideaform,
  deleteideaform,
  deletefullform,
  deleterequirementform,
  getAllUsers,
  updatedsold,
} from "../controllers/Admin.controller.js";
const Router = express.Router();
Router.get("/idiaforms", getidiaforms);
Router.post("/updateidiaforms", updateideaform);
Router.post("/updateSold", updatedsold);

Router.post("/deleteidiaforms", deleteideaform);
Router.post("/deletefullform", deletefullform);
Router.post("/deleteRequirementform", deleterequirementform);

Router.get("/getAllUsers", getAllUsers);
export default Router;
