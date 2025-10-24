import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/join", async (req, res) => {
  try {
    const { name, id, email, password } = req.body;

    // 유효성 검사
    if (!name || !id || !email || !password) {
      return res.status(400).json({ message: "모든 필드를 입력해주세요." });
    }

    // 이메일/아이디 중복 확인
    const exists = await User.findOne({ $or: [{ email }, { id }] });
    if (exists) {
      return res.status(400).json({ message: "이미 존재하는 계정입니다." });
    }

    // 비밀번호 해싱
    const hashedPw = await bcrypt.hash(password, 10);

    // DB에 저장
    const newUser = new User({ name, id, email, password: hashedPw });
    await newUser.save();

    res.status(201).json({ message: "회원가입 성공!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

export default router;
