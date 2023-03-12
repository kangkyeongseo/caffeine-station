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
  return res.json({ session: req.session });
};

export const postHeart: RequestHandler = async (req, res) => {
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

export const postPassword: RequestHandler = async (req, res) => {
  const {
    body: { existingPassword, changingPassword },
    session: { user },
  } = req;
  if (!user) {
    return res.json({ ok: false, message: "login pls" });
  }
  const loginUser = await User.findById(user._id);
  const comparePassword = await bcrypt.compare(
    existingPassword,
    loginUser!.password
  );
  if (!comparePassword) {
    return res.json({ ok: false, message: "password dose not compare" });
  }
  loginUser!.password = changingPassword;
  await loginUser!.save();
  req.session.destroy(() => {
    return res.json({ ok: true, message: "change password" });
  });
};
