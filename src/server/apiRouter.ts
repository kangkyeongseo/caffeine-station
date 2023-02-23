import express from "express";
import { postJoin, postLogin } from "./controller";

const apiRouter = express.Router();

apiRouter.post("/login", postLogin);
apiRouter.post("/join", postJoin);

export default apiRouter;
