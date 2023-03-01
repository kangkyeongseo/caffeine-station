import { Schema, model } from "mongoose";

export interface User {
  userId: string;
  password: string;
  hearts: string[];
}

const userSchema = new Schema<User>({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  hearts: [{ type: String }],
});

const User = model<User>("User", userSchema);

export default User;
