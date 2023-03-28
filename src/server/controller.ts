import User from "../db/User";
import Cafe from "../db/Cafe";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import type { ICafe } from "../db/Cafe";

export const postJoin: RequestHandler = async (req, res) => {
  const {
    body: { id, password },
  } = req;
  const userExist = await User.exists({ userId: id });
  if (userExist) {
    return res.json({ ok: false, message: "이미 존재하는 아이디입니다." });
  }
  try {
    await User.create({
      userId: id,
      password,
    });
  } catch {
    res.sendStatus(400);
  }
  res.json({ ok: true, message: "가입을 환영합니다." });
};

export const postLogin: RequestHandler = async (req, res) => {
  const {
    body: { id, password },
  } = req;
  const user = await User.findOne({ userId: id });
  if (!user) {
    return res.json({ ok: false, message: "아이디가 존재하지 않습니다." });
  }
  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return res.json({ ok: false, message: "비밀번호가 일치하지 않습니다." });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  req.session.save(() => {
    return res.json({ ok: true, message: "안녕하세요!", session: req.session });
  });
};

export const getSession: RequestHandler = (req, res) => {
  return res.json({ session: req.session });
};

export const getHeart: RequestHandler = async (req, res) => {
  if (!req.session.user) return;
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;
  const cafe = await Cafe.findOne({ id });
  const ok = cafe?.hearts?.includes(String(_id));
  res.json({ ok });
};

export const postHeart: RequestHandler = async (req, res) => {
  if (!req.session.user) return;
  const {
    body: {
      id,
      x,
      y,
      place_name,
      place_url,
      road_address_name,
      address_name,
      phone,
    },
    session: {
      user: { _id },
    },
  } = req;
  const cafe = await Cafe.findOne({ id });
  const user = await User.findById(_id);
  if (!cafe && user) {
    const newCafe = await Cafe.create({
      id,
      x,
      y,
      place_name,
      place_url,
      road_address_name,
      address_name,
      phone,
    });
    newCafe?.hearts?.push(String(_id));
    await newCafe.save();
    user?.cafes.push(newCafe._id);
    await user?.save();
    return res.json({ user, message: "프로필에 카페가 추가되었습니다." });
  }
  const heartExist = cafe?.hearts?.includes(String(_id));
  if (!heartExist && user) {
    cafe?.hearts?.push(String(_id));
    await cafe?.save();
    user?.cafes.push(cafe!._id);
    await user?.save();
    req.session.user = user;
    return res.json({ user, message: "프로필에 카페가 추가되었습니다." });
  }
  const index = cafe?.hearts?.indexOf(String(_id));
  cafe?.hearts?.splice(index!, 1);
  await cafe?.save();
  if (cafe?.hearts?.length === 0) {
    await cafe?.delete();
  }
  const cafeIndex = user?.cafes.indexOf(cafe!._id);
  user?.cafes.splice(cafeIndex!, 1);
  await user?.save();
  if (user) req.session.user = user;
  return res.json({ user, message: "프로필에 카페가 제거되었습니다." });
};

export const postLogout: RequestHandler = (req, res) => {
  req.session.destroy(() => res.json({ message: "안녕히가세요." }));
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

export const getCafes: RequestHandler = async (req, res) => {
  if (!req.session.user) return;
  const {
    session: {
      user: { _id },
    },
  } = req;
  let cafes: ICafe[] = [];
  const user = await User.findById(_id);
  for (const value of user!.cafes) {
    const findCafe = await Cafe.findById(value);
    if (findCafe) cafes.push(findCafe);
  }

  res.json({ cafes });
};
