import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    // 아주 가벼운 유효성 검사
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const pwOk = pw.length >= 8 && 
				/[A-Za-z]/.test(pw) &&
				/[^A-Za-z0-9]/.test(pw);
    if (!emailOk) {
      alert("이메일 형식을 확인해주세요.");
      return false;
    }
    if (!pwOk) {
      alert("비밀번호가 올바르지 않습니다.");
			return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pw }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("로그인 성공!");

      navigate("/goal1");
    } catch (err) {
      console.error(err);
      alert("로그인 중 오류가 발생했습니다.");
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

          <div className="new">
            <label className="label-new">새로 가입하신다면?</label>
            <Link to="/join" className="link">
              회원가입
              </Link>
          </div>

          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
