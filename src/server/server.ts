import express from "express";
import path from "path";
import cors from "cors";
import "../db/db";
import apiRouter from "./apiRouter";

const app = express();
const PORT = 8000;

/* app.use(express.static(path.join(process.cwd(), "build")));

app.get("/", (req, res) =>
  res.sendFile(path.join(process.cwd(), "build/index.html"))
);
 */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRouter);
app.get("/", (req, res) => res.send("express server"));

app.listen(PORT, () => console.log(`Listening on http://localhost${PORT}`));
