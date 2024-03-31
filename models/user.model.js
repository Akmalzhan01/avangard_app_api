import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: true
  },
  course: {
    type: String,
    default: "English"
  }
});

export default mongoose.model("user", userSchema)