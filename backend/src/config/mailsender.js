import nodemailer from "nodemailer";

// Create Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Officialscripthq@gmail.com", // Secured via .env
    pass: "xvfh jeuf lmtq tuev",
  },
});

// Function to Send Email
const sendEmail = async (
  to,
  from1,
  reasone,
  name,
  contact,
  subject,
  message
) => {
  try {
    const mailOptions = {
      from: `"Support Team"`, // Professional sender name
      to,
      name,
      from1,
      subject,
      text: message,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            line-height: 1.6;
        }
        .highlight {
            font-weight: bold;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Submission recived</h2>
        <p><span class="highlight">Subject:${subject}</span></p>
        <p><span class="highlight">To:</span> <span id="adminEmail"></span>${to}</p>
        <p><span class="highlight">From:</span> <span id="userEmail">${from1}</span></p>
        <p><span class="highlight">Mobile Number:</span> <span id="userEmail">${contact}</span></p>
        <p><span class="highlight">Reason:</span> <span id="userEmail">${reasone}</span></p>
        <p>Dear <span id="adminName">${name},</span>,</p>
        <p><span class="highlight">Message: ${message}</span></p>
        <p>Best regards,</p>
        <p><span id="userName3">Team ScriptHQ</span><br><span id="userEmail2">${from1}</span></p>
    </div>

  
</body>
</html>`, // Supports HTML content
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: ", info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    // console.error("Email sending failed: ", error);
    return { success: false, message: "Email sending failed" };
  }
};

export default sendEmail;
