import { useMemo, useState, useCallback, useEffect } from "react";
import "./Goal1.css";                 // 스타일 파일 경로 맞게
import FairyCard from "./component/FairyCard";

// 이미지 경로는 프로젝트 구조에 맞게 수정
import Sora from "./img/Sora.png";
import SoraAvatar from "./img/SoraAvatar.png";
import Romy from "./img/Romy.png";
import RomiAvatar from "./img/RomiAvatar.png";
import Chodam from "./img/Chodam.png";
import ChodamAvatar from "./img/ChodamAvatar.png";

export default function Goal1({ onNext, onPrev }) {
  const fairies = useMemo(
    () => [
      {
        id: "sora",
        title: "큰 용기를 주는 등산 요정",
        name: "소라",
        desc: ["활기차고 명랑한 등산 요정!", "당신의 목표 해결법을 알려줘요!"],
        tags: ["열정적인", "명랑한", "응원하는", "용기있는"],
        imgSrc: Sora,
        badgeSrc: SoraAvatar,
        titleColor: "#2aa0ff",
        tagColor: "#79bfff",
        pinColor: "#8ecbff",
        borderColor: "#9fd6ff",
        cardGradient: "linear-gradient(180deg, #ffffff 0%, #eaf7ff 100%)",
      },
      {
        id: "romi",
        title: "무한한 응원을 주는 등산 요정",
        name: "로미",
        desc: ["사랑스러운 등산 요정!", "당신과 함께 목표를 끈기있게 해내가요."],
        tags: ["사랑스러운", "공감적인", "친절한", "너그러운"],
        imgSrc: Romy,            // ✅ 대소문자 동일
        badgeSrc: RomiAvatar,    // ✅ 대소문자 동일
        titleColor: "#ff7693",
        tagColor: "#77bfff",
        pinColor: "#ff8ca9",
        borderColor: "#ffc9d7",
        cardGradient: "linear-gradient(180deg, #ffffff 0%, #ffeef3 100%)",
      },
      {
        id: "chodam",
        title: "따뜻한 희망을 주는 등산 요정",
        name: "초담",
        desc: ["신중하고 소중은 등산 요정!", "당신의 신중한 결정을 도와줘요!"],
        tags: ["꼼꼼한", "신중한", "깊은", "따뜻한"],
        imgSrc: Chodam,
        badgeSrc: ChodamAvatar,
        titleColor: "#78b24a",
        tagColor: "#79bfff",
        pinColor: "#a6e08f",
        borderColor: "#bdeab3",
        cardGradient: "linear-gradient(180deg, #ffffff 0%, #ecf9ef 100%)",
      },
    ],
    []
  );

  const [idx, setIdx] = useState(1); // 로미부터
  const total = fairies.length;
  const current = fairies[idx];

  const prevCard = useCallback(() => {
    setIdx((n) => (n - 1 + total) % total);
  }, [total]);

  const nextCard = useCallback(() => {
    setIdx((n) => (n + 1) % total);
  }, [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevCard();
      if (e.key === "ArrowRight") nextCard();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevCard, nextCard]);

  const handleNext = () => {
    if (onNext) onNext(current);
    // 라우팅 쓸 땐 여기서 navigate("/goal/2")
  };

  return (
    <div className="g1-wrap">
      <header className="g1-header">
        <div className="g1-step">
          <span className="g1-stepnum">1</span>
          <span className="g1-stepline" />
          <span className="g1-steptitle">등반을 함께할 캐릭터를 선택해주세요!</span>
        </div>
      </header>

      <main className="g1-main">
        <div className="g1-panel-shadow">
          <div className="g1-panel">
            <button className="g1-arrow g1-left" onClick={prevCard} aria-label="이전">
              ‹
            </button>

            <div className="g1-card-slot">
              {/* ✅ key는 JSX에 직접 전달, 객체 spread엔 넣지 않음 */}
              <FairyCard key={current.id} {...current} />
            </div>

            <button className="g1-arrow g1-right" onClick={nextCard} aria-label="다음">
              ›
            </button>
          </div>
        </div>
      </main>

      <footer className="g1-footer">
        <button className="g1-btn g1-btn-prev" disabled onClick={() => onPrev?.()}>
          이전
        </button>
        <button className="g1-btn g1-btn-next" onClick={handleNext}>
          다음
        </button>
      </footer>
    </div>
  );
}
