import express from "express";
import { getSession, postHeart, postJoin, postLogin } from "./controller";

const apiRouter = express.Router();

apiRouter.post("/login", postLogin);
apiRouter.post("/join", postJoin);
apiRouter.get("/session", getSession);
apiRouter.post("/heart", postHeart);

export default apiRouter;
