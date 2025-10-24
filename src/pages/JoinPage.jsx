import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from "./img/login_join_logo.png";

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
		const pwOk = pw.length >= 8 && 
				/[A-Za-z]/.test(pw) &&
				/[^A-Za-z0-9]/.test(pw);
		const repwOk = pw === repw;
		if(name.trim() === ""){
			alert("이름을 입력해주세요.");
			return false;
		}
		if(id.trim() === ""){
			alert("이름을 입력해주세요.");
			return false;
		}
		if (!emailOk) {
			alert("이메일 형식을 확인해주세요.");
			return false;
		}
		if (!pwOk) {
			alert("비밀번호가 올바르지 않습니다.");
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
			const res = await fetch("http://localhost:5001/api/join", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, id, email, password: pw }),
			});

			const data = await res.json();

			if (res.ok) {
			alert("회원가입 성공!");
			navigate("/login");
			} else {
			alert(data.message || "회원가입 실패");
			}
		} catch (err) {
			console.error(err);
			alert("서버와 연결에 실패했습니다.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-wrap">
			<div className="login-card">
				<img src={Logo}  className="service-logo" />

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
						placeholder="영문, 특수문자 포함 8자 이상"
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
						placeholder="영문, 특수문자 포함 8자 이상"
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
