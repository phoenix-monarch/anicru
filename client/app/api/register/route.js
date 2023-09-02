import { NextResponse } from "next/server";
import User from "@models/models";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// Nodemailer Function
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
    subject: "Verification For Anirealm",
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
              <h1 style="font-weight: medium; font-size: 16px; font-weight: 400;">Here's your verification code, @${name}</h1>
            </td>
          </tr>
          <tr>
            <td align="center">
              <div style="border:1px solid #f4f4f4; padding: 20px 10px; border-radius: 5px; ">
                <img src="https://i.pinimg.com/originals/f6/aa/92/f6aa92650be36ef62a43cfa232e5ba1a.gif" width="100" style="border-radius: 50%;" alt="">
              <p>Continue signing up for Anirealm by entering the code below:</p>
              <span style="background-color: #BEB7A4; text-align: center; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 20px;">
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

async function DatabaseConnect() {
  const Connection = await mongoose.connect(
    `mongodb+srv://avegyaindia:${process.env.DATABASE_KEY}@cluster0.ncuhyvg.mongodb.net/Anirealm`,
  );
  const { connection } = Connection;
  return NextResponse.json({
    success: true,
    message: `Databse Connected Successfully! Connection String : ${connection}`,
  });
}

export async function POST(request) {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  try {
    const { name, email, password } = await request.json();
    await DatabaseConnect();
    const checkEmail = await User.findOne({ email });

    if (!checkEmail) {
      const ePass = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: ePass,
        otp: OTP,
        reset: "",
      });

      sendVerification(email, name, OTP);
    } else {
      return NextResponse.json({
        success: true,
        message: "Email already Exists!",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Registered Successfully!",
      otp: OTP,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: "false",
      errorMessage: ` Cannot Register : ${error}`,
    });
  }
}
