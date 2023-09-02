import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@models/models";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { email, passwordClient } = await req.json();

    const result = await User.findOne({ email }).select('+password');

    if (result) { // Check if there's a valid result
      const { password, _id } = result;
      const passResult = await bcrypt.compare(passwordClient, password); // Compare passwords
      if (passResult) {
        const jwtAuth = sign({ id: _id }, process.env.JWT_TOKEN_SECRET);
        cookies().set("_token", jwtAuth, {
          httpOnly: true,
          maxAge: 24 * 60 * 60,
        });
        return NextResponse.json({
          success: true,
          message: `Successfully Logged In`,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: `Invalid email or password`,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: `Invalid email or password`,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `An error occurred: ${error}`,
    });
  }
}
