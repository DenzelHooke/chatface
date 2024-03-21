import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  friends: Array<string>;
  friendRequests: Array<string>;
  friendRequestsSent: Array<string>;
  roomsJoined: Array<string>;
  roomsCreated: Array<string>;
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
  profilePicture: {
    type: String,
    required: [true, "Profile picture is required"],
  },
  friends: {
    type: Array,
    required: [false],
  },
  friendRequests: {
    type: Array,
    required: [true],
    unique: [false],
  },
  friendRequestsSent: {
    type: Array,
    required: [false],
    unique: [false],
  },
  roomsJoined: {
    type: Array,
    required: [false],
    unique: [false],
  },
  roomsCreated: {
    type: Array,
    required: [false],
    unique: [false],
  },
});

export default mongoose.model<IUser>("User", userSchema);

// module.exports = userModel;
