import express from "express";
import {
  getidiaforms,
  updateideaform,
  deleteideaform,
  deletefullform,
  deleterequirementform,
  getAllUsers,
  updatedsold,
  getrequirementform,
} from "../controllers/Admin.controller.js";
import {
  RequirementForm,
  RequistUpdate,
} from "../controllers/forms.controller.js";
const Router = express.Router();
Router.get("/idiaforms", getidiaforms);
Router.get("/getAllUsers", getAllUsers);
Router.get("/requireforms", getrequirementform);
Router.post("/updateidiaforms", updateideaform);
Router.post("/updateSold", updatedsold);
Router.post("/updaterequirementform", RequistUpdate);
Router.post("/deleteidiaforms", deleteideaform);
Router.post("/deletefullform", deletefullform);
Router.post("/deleteRequirementform", deleterequirementform);
export default Router;
