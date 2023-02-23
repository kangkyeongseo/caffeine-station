import User from "../db/User";
import { RequestHandler } from "express";

export const postJoin: RequestHandler = async (req, res) => {
  const {
    body: { id, password },
  } = req;
  try {
    await User.create({
      id,
      password,
    });
  } catch {
    res.sendStatus(400);
  }
  res.sendStatus(200);
};

export const postLogin: RequestHandler = (req, res) => {
  console.log(req.body);
  res.json({ message: "login" });
};
