import { Schema, model } from "mongoose";

interface User {
  id: string;
  password: string;
}

const userSchema = new Schema<User>({
  id: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<User>("User", userSchema);

export default User;
