import { connect, connection } from "mongoose";

const run = async () => {
  await connect("mongodb://127.0.0.1:27017/caffeine-station");
};

run().catch((err) => {
  return true;
});
