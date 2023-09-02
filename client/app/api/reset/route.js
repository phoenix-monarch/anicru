import User from "@models/models";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req) {
  try {
    const { newPassword, token } = await req.json();

    const encPass = await bcrypt.hash(newPassword, 10)

    const userWithToken = await User.findOne({ reset: token });

    if (userWithToken) {
      // Update the password and reset token in the database
      await User.updateOne(
        { reset: token },
        {
          $set: {
            password: encPass,
          },
        }
      );
      await User.updateOne(
        { reset: token },
        {
          $set: {
            reset: '',
          },
        }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Successfully Changed Password!",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
