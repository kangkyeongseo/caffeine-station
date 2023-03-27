import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface User {
  _id: mongoose.Schema.Types.ObjectId;
  userId: string;
  password: string;
  cafes: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<User>({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  cafes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cafe" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model<User>("User", userSchema);

export default User;
