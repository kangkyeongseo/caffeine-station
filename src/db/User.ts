import { Schema, model } from "mongoose";

export interface User {
  userId: string;
  password: string;
}

const userSchema = new Schema<User>({
  userId: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<User>("User", userSchema);

export default User;
