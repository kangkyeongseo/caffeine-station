import express from "express";
import { getSession, postJoin, postLogin } from "./controller";

const apiRouter = express.Router();

apiRouter.post("/login", postLogin);
apiRouter.post("/join", postJoin);
apiRouter.get("/session", getSession);

export default apiRouter;
