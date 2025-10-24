import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Intro.css";

export default function Intro() {
  const navigate = useNavigate();

  // ✅ 5초 뒤 /login 으로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000); // 5000ms = 5초

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  return (
    <div className="intro-page">
      <h1>Intro 페이지 입니다</h1>
    </div>
  );
}
