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

export const postLogin: RequestHandler = async (req, res) => {
  const {
    body: { id, password },
  } = req;
  const user = await User.findOne({ id });
  if (!user) {
    return res.json({ ok: false, message: "ID does not exist" });
  }
  if (user?.password !== password) {
    return res.json({ ok: false, message: "Password does not match" });
  }
  req.session.loggedIn = true;
  req.session.id = user.id;
  return res.json({ ok: true, message: "Login" });
};
