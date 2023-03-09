import User from "../db/User";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";

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
  if (!user) {
    return res.json({ ok: false, message: "ID does not exist" });
  }
  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return res.json({ ok: false, message: "Password does not match" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  req.session.save(() => {
    return res.json({ ok: true, message: "Login", session: req.session });
  });
};

export const getSession: RequestHandler = (req, res) => {
  return res.send({ session: req.session });
};

export const postHeart: RequestHandler = async (req, res) => {
  console.log(req.session);
  const {
    body: {
      _id,
      id,
      x,
      y,
      place_name,
      place_url,
      distance,
      road_address_name,
      address_name,
      phone,
    },
  } = req;
  const user = await User.findById(_id);
  if (user) {
    console.log(user);
    if (user.cafes.filter((cafe) => cafe.id === id).length > 0) {
      user.cafes = user.cafes.filter((cafe) => cafe.id !== id);
    } else {
      user.cafes.push({
        id,
        x,
        y,
        place_name,
        place_url,
        distance,
        road_address_name,
        address_name,
        phone,
      });
    }
    user.save();
    req.session.user = user;
    return res.json(user);
  } else {
    return res.sendStatus(400);
  }
};

export const postLogout: RequestHandler = (req, res) => {
  req.session.destroy(() => res.end());
};
