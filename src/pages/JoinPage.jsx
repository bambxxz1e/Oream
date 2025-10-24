import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Join() {
	const [name, setName] = useState("");
	const [id, setId] = useState("");
	const [email, setEmail] = useState("");
	const [pw, setPw] = useState("");
	const [repw, setRePw] = useState("");
	const [showPw, setShowPw] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const validate = () => {
		// 아주 가벼운 유효성 검사
		const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		const pwOk = pw.length >= 8;
		const repwOk = pw === repw;
		if (!emailOk) {
		alert("이메일 형식을 확인해주세요.");
		return false;
		}
		if (!pwOk) {
		alert("비밀번호는 8자 이상이어야 합니다.");
		return false;
		}
		if (!repwOk){
			alert("비밀번호가 일치하지 않습니다.");
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
			alert(`회원가입 시도\n이메일: ${email}`);
			navigate("/login"); // 라우팅 사용 시
		} catch (err) {
			console.error(err);
			alert("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-wrap">
			<div className="login-card">
				<h1 className="service-name">서비스명</h1>

				<form className="form" onSubmit={onSubmit} noValidate>
					<label className="label">사용자 이름</label>
					<input
						className="input"
						type="text"
						placeholder="ex) 김하나"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					<label className="label">아이디</label>
					<input
						className="input"
						type="text"
						placeholder="ex) d2433"
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>

					<label className="label">이메일을 적어주세요</label>
					<input
						className="input"
						type="email"
						placeholder="ex) d2433@e-mirim.hs.kr"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete="email"
					/>

					<label className="label">비밀번호</label>
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

					<label className="label">비밀번호 재확인</label>
					<div className="pw-field">
						<input
						className="input pw"
						type={showPw ? "text" : "password"}
						placeholder="영문,특수문자 포함 8자 이상"
						value={repw}
						onChange={(e) => setRePw(e.target.value)}
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
						{loading ? "회원가입 중..." : "회원가입"}
					</button>
				</form>
			</div>
		</div>
	);
}
