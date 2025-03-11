import nodemailer from "nodemailer";
const sendResetEmail = async (userEmail, token) => {
  // Create transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Officialscripthq@gmail.com", // Secured via .env
      pass: "xvfh jeuf lmtq tuev",
    },
  });

  // Email content
  let mailOptions = {
    from: '"Your App Name" <your-email@gmail.com>',
    to: "anshupatidar62@gmail.com",
    subject: "Reset Your Password",
    html: `
           <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
                <h2 style="color: #333;">Reset Your Password</h2>
                <p style="color: #555;">Enter your new password and confirm password, then click "Reset Password".</p>

                <div style="max-width: 400px; margin: auto; background: #f9f9f9; padding: 20px; border-radius: 10px;">
                    <form id="resetForm">
                        <label style="font-weight: bold;">New Password:</label>
                        <input type="password" id="password" name="password" required 
                            style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">

                        <label style="font-weight: bold;">Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required 
                            style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;">

                        <p id="error" style="color: red; display: none; font-weight: bold;">Passwords do not match!</p>

                        <button type="button" id="resetBtn" 
                            style="width: 100%; background-color: #28a745; color: white; padding: 12px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>

        `,
  };

  // Send email
  let info = await transporter.sendMail(mailOptions);
  console.log("Email sent: " + info.response);
};

export { sendResetEmail };
