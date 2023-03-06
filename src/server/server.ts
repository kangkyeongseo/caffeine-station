import express from "express";
import session from "express-session";
import cors from "cors";
import "../db/db";
import apiRouter from "./apiRouter";
import { User } from "db/User";
import MongoStore from "connect-mongo";

declare module "express-session" {
  interface SessionData {
    loggedIn: boolean | null;
    user: User | null;
  }
}

const app = express();
const PORT = 8000;

/* app.use(express.static(path.join(process.cwd(), "build")));`

app.get("/", (req, res) =>
  res.sendFile(path.join(process.cwd(), "build/index.html"))
);
app.use(cors({ credentials: true, origin: true }));
 */

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/caffeine-station",
    }),
  })
);
app.use((req, res, next) => {
  req.sessionStore.all!((error, sessions) => {
    next();
  });
});

app.get("/", (req, res) => {
  console.log(req.session.id);
  res.end();
});

app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`Listening on http://localhost${PORT}`));
