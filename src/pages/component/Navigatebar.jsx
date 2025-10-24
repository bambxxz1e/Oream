import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navigatebar.css";

/** 아이콘 — 현재색(currentColor)로 칠해집니다 **/
function MountainIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 19h18l-6.5-10l-3.2 4.9l-1.8-2.5zM17.5 7a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z"
      />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a4 4 0 1 0-4-4a4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
      />
    </svg>
  );
}

/**
 * SelectDestination
 * - 왼쪽: 오늘의 등반 → /home (Home())
 * - 오른쪽: 내 공간   → /profile (Profile())
 * - props.initial: "home" | "profile" (선택 상태 기본값, 선택사항)
 */
export default function Navigatebar({ initial = "home" }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [active, setActive] = useState(initial); // "home" | "profile"

  // URL에 따라 기본 선택 동기화(선택사항)
  useEffect(() => {
    if (pathname.startsWith("/profile")) setActive("profile");
    else if (pathname.startsWith("/home")) setActive("home");
  }, [pathname]);

  const goHome = () => {
    setActive("home");
    navigate("/home");
  };
  const goProfile = () => {
    setActive("profile");
    navigate("/profile");
  };

  return (
    <div className="navigatebar">
      <div className="dest-wrap" role="group" aria-label="메뉴 선택">
        <button
          type="button"
          className={`dest-item left ${active === "home" ? "selected" : ""}`}
          onClick={goHome}
        >
          <MountainIcon />
          <span className="dest-label">오늘의 등반</span>
        </button>

        <button
          type="button"
          className={`dest-item right ${
            active === "profile" ? "selected" : ""
          }`}
          onClick={goProfile}
        >
          <UserIcon />
          <span className="dest-label">내 공간</span>
        </button>
      </div>
    </div>
  );
}
