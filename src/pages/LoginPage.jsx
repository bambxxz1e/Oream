import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    // 아주 가벼운 유효성 검사
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const pwOk = pw.length >= 8;
    if (!emailOk) {
      alert("이메일 형식을 확인해주세요.");
      return false;
    }
    if (!pwOk) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      // TODO: 실제 로그인 연동 (예: Supabase/백엔드)
      // await api.login({ email, pw });
      alert(`로그인 시도\n이메일: ${email}`);
      // navigate("/home"); // 라우팅 사용 시
    } catch (err) {
      console.error(err);
      alert("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h1 className="service-name">서비스명</h1>

        <form className="form" onSubmit={onSubmit} noValidate>
          <label className="label">이메일을 적어주세요</label>
          <input
            className="input"
            type="email"
            placeholder="ex) d2433@e-mirim.hs.kr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <label className="label">비밀번호를 적어주세요</label>
          <div className="pw-field">
            <input
              className="input pw"
              type={showPw ? "text" : "password"}
              placeholder="영문,특수문자 포함 8자 이상"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="pw-toggle"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보이기"}
            >
              {showPw ? "숨김" : "보기"}
            </button>
          </div>

          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
