import mongoose from "mongoose";

export interface ICafe {
  _id?: mongoose.Schema.Types.ObjectId;
  id: string;
  x: string;
  y: string;
  place_name: string;
  place_url: string;
  distance: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  hearts?: string[];
}

const CafeSchema = new mongoose.Schema<ICafe>({
  id: { type: String, require: true },
  x: { type: String, require: true },
  y: { type: String, require: true },
  place_name: { type: String, require: true },
  place_url: { type: String, require: true },
  distance: { type: String, require: true },
  road_address_name: { type: String, require: true },
  address_name: { type: String, require: true },
  phone: { type: String, require: true },
  hearts: [{ type: String }],
});

const Cafe = mongoose.model<ICafe>("Cafe", CafeSchema, "cafes");

export default Cafe;
