import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 2,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  otp:{
    type:String, 
    minLength:6,
    maxLength:6
  },
  reset:{
    type:String
  }
})

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User;