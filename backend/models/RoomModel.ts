import mongoose, { Schema, Document } from "mongoose";
import { Message } from "../types/types";

export interface IRoom extends Document {
  roomID: string;
  messages: Message[];
}

const roomSchema: Schema = new Schema({
  roomID: {
    type: String,
    required: [true, "Room ID required"],
    unique: [true, "Room ID must be unique"],
  },
  messages: {
    type: Array,
    required: [true, "Message body required"],
    unique: [false],
  },
});

export default mongoose.model<IRoom>("Room", roomSchema);
