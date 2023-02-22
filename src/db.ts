import { Schema, model, connect } from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<User>("User", userSchema);

const run = async () => {
  await connect("mongodb://127.0.0.1:27017/caffeine-station");
};

run().catch((err) => console.log(err));
