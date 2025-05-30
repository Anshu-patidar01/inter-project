import express from "express";
import dotenv from "dotenv";
import connection from "./src/config/db.js";
import userRouter from "./src/routes/User.Routes.js";
import FromRouter from "./src/routes/Form.Routes.js";
import AdminRouter from "./src/routes/Admin.Routes.js";
import cors from "cors";
import { sendEmail } from "./src/config/mailsender.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["https://intern-frontend-five.vercel.app", "https://scripthq.in"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

connection()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    })
  )
  .catch((error) => {
    "Server is not Running Due to Some Connection Problem.";
  });

app.use("/", userRouter);
app.post("/sendmail", async (req, res) => {
  const { name, to, from1, contact, reasone, subject, message } = req.body;
  try {
    if (!to || !subject || !message) {
      throw new Error("All fields are required");
    }

    const response = await sendEmail(
      to,
      from1,
      reasone,
      name,
      contact,
      subject,
      message
    );
    res.send(`respone mailer:${response.message}`);
  } catch (error) {
    res.json({ message: `Some error in mailer.`, error: error.message });
  }
});
app.use("/form", FromRouter);
app.use("/admin", AdminRouter);
