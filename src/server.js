// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// .env 파일 로드
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Express 앱 생성
const app = express();
app.use(cors());
app.use(express.json());

// 기본 라우트
app.get("/api/health", (req, res) => {
  res.json({ status: "✅ Server is running!" });
});

// MongoDB 연결
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ .env에 MONGO_URI가 없음!");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB 연결 성공!"))
  .catch((err) => console.error("❌ MongoDB 연결 실패:", err));

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
