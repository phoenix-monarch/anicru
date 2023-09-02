import User from "@models/models";
import { NextResponse } from "next/server";
import Randomstring from "randomstring";
import nodemailer from "nodemailer";

function sendVerification(email, name, otp) {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "imailaryan01@gmail.com",
    to: email,
    subject: "Reset Password For Anirealm",
    html: ` 
      <!DOCTYPE html>
  <html>
  <head>
    <!-- Meta tags and title -->
  </head>
  <body style="font-family: 'Poppins', sans-serif; color: #f4f4f4; margin: 0; padding: 0;">
  
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="80%" style="max-width: 600px; padding: 20px; background-color: #202020; border-radius: 10px;">
            <tr>
              <td align="center">
                <img src="https://drive.google.com/uc?id=1VwgV_VBLdOYZ5JfIxJX00aZOq6Bbw44r" width="50" alt="Logo">
                <h1 style="font-weight: medium; font-size: 16px; font-weight: 400;">Here's your reset link, @${name}</h1>
              </td>
            </tr>
            <tr>
              <td align="center">
                <div style="border:1px solid #f4f4f4; padding: 20px 10px; border-radius: 5px; ">
                  <img src="https://i.pinimg.com/originals/f6/aa/92/f6aa92650be36ef62a43cfa232e5ba1a.gif" width="100" style="border-radius: 50%;" alt="">
                <p>Continue changing password for Anirealm by opening the link below :</p>
                <span style="background-color: #BEB7A4; text-align: center; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px; color:white">
                ${otp}
                </span>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  
    <script>
      // JavaScript script
    </script>
  </body>
  </html>
  
      
      `,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("An error Occured", error);
    }
    console.log("Mail sent successfully :", info);
  });
}

export async function POST(req) {
  try {
    const _string = Randomstring.generate();
    const { email } = await req.json();
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      await User.updateOne(
        { email: email },
        {
          $set: { reset: _string },
        }
      );

      let link = `http://localhost:3000/reset/${_string}`;

      sendVerification(email, userCheck.name, link);

      return NextResponse.json({
        success: true,
        message: "Successfully Updated Token",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `Email does not exists!`,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `${error}`,
    });
  }
}
