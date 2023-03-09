import express from "express";
import {
  getSession,
  postHeart,
  postJoin,
  postLogin,
  postLogout,
  postPassword,
} from "./controller";

const apiRouter = express.Router();

apiRouter.post("/login", postLogin);
apiRouter.post("/logout", postLogout);
apiRouter.post("/join", postJoin);
apiRouter.post("/password", postPassword);
apiRouter.get("/session", getSession);
apiRouter.post("/heart", postHeart);

export default apiRouter;
