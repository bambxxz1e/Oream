// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

// CORS 설정 - 프론트 localhost 포트 허용
app.use(cors());

// JSON body 파싱
app.use(express.json());

// MySQL 연결
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0121",
  database: "mithon2025",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 회원가입 API
app.post("/api/join", async (req, res) => {
  const { name, id, email, password } = req.body;

  if (!name || !id || !email || !password) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요." });
  }

  try {
    // 비밀번호 해시
    const hashedPw = await bcrypt.hash(password, 10);

    // DB에 저장
    const [result] = await pool.query(
      "INSERT INTO users (username, user_id, email, password) VALUES (?, ?, ?, ?)",
      [name, id, email, hashedPw]
    );

    res.status(201).json({ message: "회원가입 성공!" });
  } catch (err) {
    console.error(err);

    // 중복 ID/Email 처리
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "이미 존재하는 ID 또는 이메일입니다." });
    }

    res.status(500).json({ message: "회원가입 실패" });
  }
});

// 로그인 API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "이메일과 비밀번호를 입력해주세요." });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "사용자가 존재하지 않습니다." });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "비밀번호가 틀렸습니다." });
    }

    res.status(200).json({ message: "로그인 성공", userId: user.user_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "로그인 실패" });
  }
});

// 서버 실행
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`)
);
