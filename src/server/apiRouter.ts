import express from "express";
import {
  getSession,
  postHeart,
  postJoin,
  postLogin,
  postLogout,
} from "./controller";

const apiRouter = express.Router();

apiRouter.post("/login", postLogin);
apiRouter.post("/logout", postLogout);
apiRouter.post("/join", postJoin);
apiRouter.get("/session", getSession);
apiRouter.post("/heart", postHeart);

export default apiRouter;
