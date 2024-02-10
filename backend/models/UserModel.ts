import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, "Username required"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Account with this email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

export default mongoose.model<IUser>("User", userSchema);

// module.exports = userModel;
