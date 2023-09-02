import User from "@models/models";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { otp } = await req.json();
    const userFind = await User.findOne({ otp });
    if (userFind !== []) {
      await User.updateOne({ otp }, { $set: { otp: "" } });
    }
    return NextResponse.json({
      success: true,
      message: "User Base Updated Successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `An error occurred : ${error}`,
    });
  }
}
