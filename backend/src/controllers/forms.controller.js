import { FormSendEmail } from "../config/mailsender.js";
import FullFormModel from "../models/FullForm.Model.js";
import IdeaFormModel from "../models/IdeaForm.Model.js";
import formModel from "../models/IdeaForm.Model.js";
import RequirementModel from "../models/RequirementForm.Model.js";
import { updateideaform } from "./Admin.controller.js";
const IdiaFormController = async (req, res) => {
  let {
    state,
    correspondingAddress,
    city,
    gender,
    title,
    language,
    categories,
    containt,
    copyright,
    ROCNumber,
    ROCAttachment,
    summary,
    termAndCondition,
    requestedByformId,
  } = req.body;

  try {
    if (
      !state ||
      !correspondingAddress ||
      !city ||
      !gender ||
      !title ||
      !language ||
      !categories ||
      !containt ||
      !copyright ||
      !summary ||
      !termAndCondition
    ) {
      throw new Error("All fields are mandatory");
    }
    const forms = await formModel.find({});
    const formId = categories[0] + (100 + Object.keys(forms).length);
    const status = "Pendding";
    const userId = req.user.id;
    const form = {
      formId,
      state,
      correspondingAddress,
      city,
      gender,
      title,
      language,
      categories,
      containt,
      copyright,
      ROCNumber,
      ROCAttachment,
      requestedByformId,
      summary,
      termAndCondition,
    };
    // console.log(form);
    let fileURL = "";
    // console.log(req.file);
    if (req.file) {
      fileURL = `https://api.scripthq.in/uploads/` + req.file.filename;
    }

    await formModel.create({
      userId,
      state,
      formId,
      correspondingAddress,
      city,
      gender,
      title,
      language,
      categories,
      containt,
      copyright,
      requestedByformId,
      ROCNumber,
      ROCAttachment: fileURL,
      summary,
      termAndCondition,
      status,
    });
    // console.log(req.user);
    const user = req.user;
    const subject = "Submission Received – Your Creative Work is in Review ";
    const message =
      "Thank you for submitting your creative idea to ScriptHQ. We have successfully received your submission and appreciate your trust in us.<br>What Happens Next?<br>- Our team will review your submission to ensure it meets all required aspects and criteria.<br>- If your work aligns with the requirements of production houses, we will share it with them for consideration.<br>- This process may take approximately 15 to 30 days to display on ScriptHQ.in .<br>- If we receive any confirmation or interest from a production house, we will notify you immediately.  <br>We value your creativity and look forward to working together to bring great stories to life. Stay connected and keep innovating.<br><br>For any queries, feel free to reach out at info@scripthq.in.";
    const x = await FormSendEmail(
      user.email,
      "Info@scripthq.in",
      user.fullname,
      subject,
      message
    );
    console.log(x);
    res.status(201).json({ message: form });
  } catch (err) {
    res.status(400).json({
      message: "Some Problem in Idia Form.",
      error: err.message,
    });
  }
};
const RequirementForm = async (req, res) => {
  const { company, mobile, city, language, interested, Summary, containt } =
    req.body;

  try {
    if (!company || !mobile || !city || !language || !interested || !Summary) {
      throw new Error("All fields are required.");
    }

    const forms = await RequirementModel.find({});
    const formId = interested[0] + (100 + Object.keys(forms).length);
    const userId = req.user.id;
    const form = await RequirementModel.create({
      company,
      mobile,
      city,
      language,
      interested,
      Summary,
      formId,
      containt,
      userId,
    });
    const user = req.user;
    const subject = " Confirmation of Your Script Requirement Submission";
    const message =
      "Thank you for submitting your requirement. We have received your request and appreciate your interest in working with us.<br>If we need any additional information, we will reach out to you shortly. In the meantime, please feel free to share any specific preferences or deadlines you may have. We aim to provide you with a tailored script that meets your expectations.<br>If you have any urgent queries, please feel free to contact us at scriptHQ.in<br><br>Looking forward to collaborating with you!";
    const x = await FormSendEmail(
      user.email,
      "Info@scripthq.in",
      user.fullname,
      subject,
      message
    );
    // console.log(x);
    res.status(201).json({
      message: "Required Form was Created.",
      data: form,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const FullForm = async (req, res) => {
  const { company, mobile, city, language, interested } = req.body;

  try {
    if (!company || !mobile || !city || !language || !interested) {
      throw new Error("All fields are required.");
    }

    const forms = await FullFormModel.find({});
    const formId = company + (100 + Object.keys(forms).length);
    const userId = req.user.id;
    const form = await FullFormModel.create({
      company,
      mobile,
      city,
      language,
      interested,
      formId,
      userId,
    });
    res.status(201).json({
      message: "Full Form was Created.",
      data: form,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const limitedIdeaForm = async (req, res) => {
  try {
    const forms = await IdeaFormModel.find(
      { status: "Approved" },
      "city gender title language categories copyright containt summary likes _id createdAt formId ROCAttachment updatedAt requestedByformId sold"
    )
      .sort({ _id: -1 })
      .populate("userId", "fullname");
    // console.log(forms);
    const modifiedForm = forms.map((form) => {
      let modifiedSummary = "";
      switch (form.categories) {
        case "Short Story":
          modifiedSummary =
            form.summary.split(" ").slice(0, 10).join(" ") + ".....";
          break;
        case "Story":
          modifiedSummary =
            form.summary.split(" ").slice(0, 25).join(" ") + ".....";

          break;
        case "Full Script":
          modifiedSummary =
            form.summary.split(" ").slice(0, 100).join(" ") + ".....";

          break;
        case "Lyrics":
          modifiedSummary =
            form.summary.split(" ").slice(0, 10).join(" ") + ".....";

          break;
        case "Poem":
          modifiedSummary =
            form.summary.split(" ").slice(0, 10).join(" ") + ".....";
          break;
        case "other":
          modifiedSummary =
            form.summary.split(" ").slice(0, 25).join(" ") + ".....";

          break;

        default:
          modifiedSummary =
            form.summary.split(" ").slice(0, 25).join(" ") + ".....";

          break;
      }
      return {
        city: form.city,
        gender: form.gender,
        title: form.title,
        language: form.language,
        categories: form.categories,
        copyright: form.copyright,
        summary: modifiedSummary,
        fullname: form.userId.fullname,
        containt: form.containt,
        likes: form.likes,
        formId: form.formId,
        updatedAt: form.updatedAt,
        _id: form._id,
        ROCAttachment: form.ROCAttachment,
        requestedByformId: form.requestedByformId,
        sold: form.sold,
      };
    });
    res.send(modifiedForm);
  } catch (error) {
    res.status(400).json({
      message: "some problem in limitedideaform.",
      error: error.message,
    });
  }
};

const IdeaUpdate = async (req, res) => {
  // console.log("hello");
  const { formId, title, summary } = req.body;
  try {
    if (!formId) {
      throw new Error("Form Id not found");
    }
    const _id = formId;
    const updateform = await IdeaFormModel.findByIdAndUpdate(
      { _id },
      { title: title, summary: summary }
    );
    res.send("Updated.");
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const IdeaDelete = async (req, res) => {
  // console.log("hello");
  const { formId } = req.body;
  try {
    if (!formId) {
      throw new Error("Form Id not found");
    }
    const _id = formId;
    await IdeaFormModel.findByIdAndDelete({ _id });
    res.send("Deleted..");
  } catch (error) {
    res.status(404).send(error);
  }
};
const RequistUpdate = async (req, res) => {
  // res.send("hello");
  const { formId, status } = req.body;
  try {
    if (!formId) {
      throw new Error("Form Id not found");
    }
    const _id = formId;
    const updateform = await RequirementModel.findByIdAndUpdate(
      { _id },
      { status }
    );
    res.send("Updated.");
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const GetidiaForm = async (req, res) => {
  try {
    const User = req.user;
    if (!User) {
      throw new Error("user not found.");
    }
    const forms = await IdeaFormModel.find({ userId: User._id }).populate(
      "userId",
      "fullname"
    );
    res.send(forms);
  } catch (error) {
    res
      .status(400)
      .json({ message: "some problem in getideaform.", error: error.message });
  }
};
const getrequirementform = async (req, res) => {
  try {
    const forms = await RequirementModel.find({ status: "Approved" })
      .sort({ _id: -1 })
      .populate("userId", "fullname email");
    // console.log(forms);
    res.send(forms);
  } catch (error) {
    res.status(400).json({
      message: "some problem in getRequirement form.",
      error: error.message,
    });
  }
};
const getfullform = async (req, res) => {
  try {
    const forms = await FullFormModel.find({})
      .sort({ _id: -1 })
      .populate("userId", "fullname");
    res.send(forms);
  } catch (error) {
    res.status(400).json({
      message: "some problem in get Full Form.",
      error: error.message,
    });
  }
};

export {
  IdiaFormController,
  RequirementForm,
  IdeaDelete,
  FullForm,
  IdeaUpdate,
  GetidiaForm,
  limitedIdeaForm,
  RequistUpdate,
  getfullform,
  getrequirementform,
};
("");
