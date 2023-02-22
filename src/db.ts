import mongoose from "mongoose";

const run = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/caffeine-station");
  mongoose.connection.on("error", (error) => console.log(error));
  mongoose.connection.once("open", () => console.log("db connect"));
};

run().catch((err) => console.log(err));
