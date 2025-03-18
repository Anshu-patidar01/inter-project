import express from "express";
import {
  FullForm,
  getfullform,
  GetidiaForm,
  getrequirementform,
  IdeaDelete,
  IdeaUpdate,
  IdiaFormController,
  limitedIdeaForm,
  RequirementForm,
} from "../controllers/forms.controller.js";
import userAuth from "../middelware/Auth.js";
import { getidiaforms } from "../controllers/Admin.controller.js";
const Router = express.Router();
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
Router.post(
  "/IdiaForm",
  upload.single("ROCAttachment"),
  userAuth,
  IdiaFormController
);
Router.patch("/IdeaForm", userAuth, IdeaUpdate);
Router.post("/IdeaFormdelete", userAuth, IdeaDelete);
Router.post("/Requirement", userAuth, RequirementForm);
Router.post("/Fullform", userAuth, FullForm);
// Admin
Router.get("/IdiaForm", getidiaforms);
Router.get("/Requirement", getrequirementform);
Router.get("/Fullform", getfullform);

Router.get("/getIdiaForm", GetidiaForm);
Router.get("/limitedIdiaForm", limitedIdeaForm);
export default Router;
