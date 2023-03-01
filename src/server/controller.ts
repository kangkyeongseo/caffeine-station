import User from "../db/User";
import { RequestHandler } from "express";
import { async } from "q";

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
    return res.json({ ok: true, message: "Login", session: req.session });
  });
};

export const getSession: RequestHandler = (req, res) => {};

export const postHeart: RequestHandler = async (req, res) => {
  const {
    body: { _id, id },
  } = req;
  const user = await User.findById(_id);
  if (user) {
    if (user.hearts.includes(id)) {
      const index = user.hearts.indexOf(id);
      user.hearts.splice(index, 1);
    } else {
      user.hearts.push(id);
    }
    user.save();
    req.session.user = user;
    return res.json(user);
  } else {
    return res.sendStatus(400);
  }
};
