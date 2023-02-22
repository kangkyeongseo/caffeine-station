import express from "express";
import path from "path";
import "./db";

const app = express();
const PORT = 8000;

app.use(express.static(path.join(process.cwd(), "build")));

app.get("/", (req, res) =>
  res.sendFile(path.join(process.cwd(), "build/index.html"))
);

app.listen(PORT, () => console.log(`Listening on http://localhost${PORT}`));
