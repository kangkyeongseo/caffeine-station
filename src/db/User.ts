import { Schema, model } from "mongoose";

export interface User {
  userId: string;
  password: string;
  cafes: Cafe[];
}

interface Cafe {
  id: string;
  x: string;
  y: string;
  place_name: string;
  place_url: string;
  distance: string;
  road_address_name: string;
  address_name: string;
  phone: string;
}

const userSchema = new Schema<User>({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  cafes: [
    {
      id: { type: String },
      x: { type: String },
      y: { type: String },
      place_name: { type: String },
      place_url: { type: String },
      distance: { type: String },
      road_address_name: { type: String },
      address_name: { type: String },
      phone: { type: String },
    },
  ],
});

const User = model<User>("User", userSchema);

export default User;
