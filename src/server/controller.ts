import User from "../db/User";
import { RequestHandler } from "express";
import session from "express-session";

export const postJoin: RequestHandler = async (req, res) => {
  const {
    body: { id, password },
  } = req;
  try {
    await User.create({
      userId: id,
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
  const user = await User.findOne({ userId: id });
  console.log(user);
  if (!user) {
    return res.json({ ok: false, message: "ID does not exist" });
  }
  if (user?.password !== password) {
    return res.json({ ok: false, message: "Password does not match" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  req.session.save(() => {
    console.log(req.session);
    return res.json({ ok: true, message: "Login", session: req.session });
  });
};

export const getSession: RequestHandler = (req, res) => {
  console.log(req.session.id);
};
