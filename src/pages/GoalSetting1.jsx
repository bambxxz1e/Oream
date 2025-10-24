import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Goal1.css";
import FairyCard from "./component/FairyCard";
import EditableTitle from "./component/EditableTitle";
import ProgressBar from "./component/ProgressBar";
// import NavigationButtons from "./component/NavigationButtons";

// 이미지 경로
import Sora from "./img/Sora.png";
import SoraAvatar from "./img/SoraAvatar.png";
import Romy from "./img/Romy.png";
import RomiAvatar from "./img/RomiAvatar.png";
import Chodam from "./img/Chodam.png";
import ChodamAvatar from "./img/ChodamAvatar.png";

export default function Goal1() {
  const navigate = useNavigate();
  
  // ===== 단계 진행 상태 =====
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("등반을 함께할 캐릭터를 선택해주세요!");
  const totalSteps = 3;

  // ===== 카드 데이터 =====
  const fairies = useMemo(
    () => [
      {
        key: "sora",
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
        key: "romi",
        title: "무한한 응원을 주는 등산 요정",
        name: "로미",
        desc: ["사랑스러운 등산 요정!", "당신과 함께 목표를 끈기있게 해내가요."],
        tags: ["사랑스러운", "공감적인", "친절한", "너그러운"],
        imgSrc: Romy,
        badgeSrc: RomiAvatar,
        titleColor: "#ff7693",
        tagColor: "#77bfff",
        pinColor: "#ff8ca9",
        borderColor: "#ffc9d7",
        cardGradient: "linear-gradient(180deg, #ffffff 0%, #ffeef3 100%)",
      },
      {
        key: "chodam",
        title: "따뜻한 희망을 주는 등산 요정",
        name: "초담",
        desc: ["신중하고 소중한 등산 요정!", "당신의 신중한 결정을 도와줘요!"],
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

  // 가운데 로미부터 시작 (index 1)
  const [idx, setIdx] = useState(1);
  const total = fairies.length;

  // 카드 좌우 이동
  const prevCard = useCallback(() => {
    setIdx((n) => (n - 1 + total) % total);
  }, [total]);

  const nextCard = useCallback(() => {
    setIdx((n) => (n + 1) % total);
  }, [total]);

  // 키보드 좌우 화살표 이동
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevCard();
      if (e.key === "ArrowRight") nextCard();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevCard, nextCard]);

  // 현재/좌/우 포지션 계산
  const getPos = useCallback(
    (i) => {
      if (i === idx) return "center";
      if (i === (idx - 1 + total) % total) return "left";
      if (i === (idx + 1) % total) return "right";
      return "hidden";
    },
    [idx, total]
  );

  // 단계 이전 버튼
  const handleStepPrev = useCallback(() => {
    const prevStep = currentStep - 1;
    if (prevStep < 1) {
      navigate(-1); // 첫 단계면 이전 페이지로
    } else {
      setCurrentStep(prevStep);

      if (prevStep === 1) {
        navigate("/goal");
      }
    }
  }, [currentStep, navigate]);


  // 단계 다음 버튼
 const handleStepNext = useCallback(() => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    if (nextStep === 2) {
      navigate("/map");
    }
  }, [currentStep, navigate]);

  return (
    <div className="g1-wrap">
      {/* 상단 단계/제목/네비 */}
      <div>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        <EditableTitle currentStep={currentStep} title={title} onTitleChange={setTitle} />
      </div>

      {/* 메인 캐릭터 카드 영역 */}
      <main className="g1-main">
        <div className="g1-panel">
          <button
            type="button"
            className="g1-arrow g1-left"
            onClick={prevCard}
            aria-label="이전 캐릭터"
          >
            ‹
          </button>

          <div className="g1-card-stage">
            {fairies.map((f, i) => {
              const pos = getPos(i);
              return (
                <div key={f.key} className={`g1-card-wrap is-${pos}`}>
                  <FairyCard {...f} />
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="g1-arrow g1-right"
            onClick={nextCard}
            aria-label="다음 캐릭터"
          >
            ›
          </button>
        </div>
      </main>

      {/* 하단 네비게이션 버튼 */}
       <div className="nav-buttons-wrap">
        <button
          className="nav-btn prev"
          onClick={handleStepPrev}  // ✅ 수정
          disabled={currentStep === 1}
        >
          이전
        </button>

        <button
          className="nav-btn next"
          onClick={handleStepNext}  // ✅ 수정
          disabled={currentStep === totalSteps}
        >
          다음
        </button>
      </div>
    </div>
  );
}