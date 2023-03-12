import mongoose from "mongoose";

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
  hearts: mongoose.Schema.Types.ObjectId;
}

const CafeSchema = new mongoose.Schema<Cafe>({
  id: { type: "string", require: true },
  x: { type: "string", require: true },
  y: { type: "string", require: true },
  place_name: { type: "string", require: true },
  place_url: { type: "string", require: true },
  distance: { type: "string", require: true },
  road_address_name: { type: "string", require: true },
  address_name: { type: "string", require: true },
  phone: { type: "string", require: true },
  hearts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Cafe = mongoose.model<Cafe>("Cafe", CafeSchema);

export default Cafe;
